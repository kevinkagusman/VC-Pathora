# Pathora: Briefing Backend

Untuk: teman Vania yang mengerjakan backend (FastAPI).
Dari: Vania (UI dan front-end). Dokumen ini menjelaskan apa yang sudah ada di front-end, apa yang perlu dibuat di backend, dan kontrak API-nya.

## 1. Gambaran singkat

Pathora adalah planner dan pemesanan kegiatan alam dan budaya Bali bersama host lokal. Traveler menyusun trip bersama asisten AI, mengajukan kegiatan ke host, host setuju atau tolak, baru traveler membayar. Front-end sudah jadi (HTML, CSS, JS murni, tanpa build) dan semua datanya masih disimpan di `localStorage` browser. Tugas backend: memindahkan data itu ke server, dan menyambungkan asisten ke Gemini.

Catatan: folder `backend/` yang ada di repo sekarang kelihatannya dibuat untuk konsep lama (bisnis penginapan, "Ask AI", stay_area). Domainnya tidak cocok dengan Pathora (kegiatan, host, persetujuan, patungan). Bagian yang bisa dipakai ulang: struktur FastAPI, `security.py` (auth), `db.py`, dan pola kuota harian di `routers/chat.py`. Router dan tabel domainnya perlu ditulis ulang.

## 2. Prinsip desain (penting)

1. **Gemini hanya mengerti kalimat, bukan menentukan jadwal.** Gemini mengubah kalimat bebas traveler menjadi JSON terstruktur (berapa hari, berapa orang, tanggal, minat, dst). Penyusunan jadwal, skor cuaca, keramaian, hari tutup host, dan harga tetap dihitung kode (sudah ada di `assets/js/ai.js` dan `data.js`). Alasannya: Gemini tidak boleh mengarang kegiatan, harga, atau ketersediaan.
2. **API key Gemini hanya di server.** Jangan pernah ada di front-end atau repo. Pakai environment variable.
3. **Selalu ada fallback.** Kalau backend mati, lambat (lebih dari 8 detik), atau JSON-nya aneh, front-end otomatis memakai mesin aturan lokal. Jadi endpoint boleh gagal tanpa merusak situs.
4. **Privasi.** Front-end hanya mengirim ringkasan trip (tanggal, jumlah anggota, daftar id kegiatan). Tidak ada nama atau email anggota yang dikirim ke Gemini. Jangan simpan pesan chat mentah untuk analitik tanpa persetujuan user.

## 3. Prioritas pekerjaan

| Prioritas | Pekerjaan |
|---|---|
| P0 | `POST /api/assistant/parse` (Gemini), CORS, rate limit |
| P1 | Auth (traveler dan host), katalog kegiatan, trip dan anggota |
| P1 | Pengajuan kegiatan ke host dan keputusan host (setuju atau tolak) |
| P2 | Pembayaran (mulai dari simulasi), patungan, payout host |
| P2 | Paspor Alam (stempel), jadwal tutup host, langganan Plus |

P0 bisa dikerjakan sendirian dan langsung diuji karena front-end sudah siap memanggilnya.

## 4. P0: endpoint asisten (Gemini)

### Request

`POST /api/assistant/parse`

```json
{
  "message": "3 hari di Bali, suka alam, ajak anak, hindari tempat ramai",
  "lang": "id",
  "context": {
    "start": "2026-11-12",
    "end": "2026-11-14",
    "members": 1,
    "items": [{ "act": "tukik", "date": "2026-11-12" }]
  }
}
```

`lang` adalah `id` atau `en`. User bisa menulis dalam bahasa apa pun, jadi Gemini harus mengerti keduanya.

### Response (kontrak yang dibaca front-end)

Semua field opsional. Isi hanya yang benar-benar disebut atau jelas tersirat. Jangan menebak.

```json
{
  "days": 3,
  "people": 2,
  "start": "2026-11-20",
  "end": "2026-11-22",
  "budget_per_person": 500000,
  "cats": ["hutan", "satwa"],
  "kids": true,
  "calm": true,
  "cheap": false,
  "slow": false
}
```

Aturan nilai (front-end membuang nilai yang melanggar, tapi sebaiknya server juga memvalidasi):

- `days`: integer 1 sampai 14 (front-end membatasi rencana maksimal 5 hari).
- `people`: integer 1 sampai 30.
- `start`, `end`: format `YYYY-MM-DD`. Kalau user hanya menyebut satu tanggal, isi `start` saja atau samakan `end` dengan `start`. Tahun diasumsikan tahun depan terdekat yang masuk akal dari tanggal hari ini.
- `budget_per_person`: rupiah per orang, integer. Kalau user menyebut total, bagi dengan `people` di server (kalau `people` tidak diketahui, jangan isi).
- `cats`: hanya dari daftar ini: `laut`, `satwa`, `sawah`, `hutan`, `budaya`, `kuliner`, `kerajinan`. Nilai lain dibuang.
- `kids`, `calm`, `cheap`, `slow`: boolean. `kids` berarti ada anak atau keluarga. `calm` berarti ingin sepi atau tenang. `cheap` berarti hemat. `slow` berarti santai.

Kalau pesan bukan permintaan penyusunan rencana (misalnya "hapus tenun" atau "bagaimana cuaca"), kembalikan `{}`. Front-end tetap menangani itu dengan aturan lokal.

### Cara memanggil Gemini

- Pakai structured output (JSON schema / `response_mime_type: application/json`) dan `temperature` 0 sampai 0.2.
- System prompt (inti): "Kamu hanya mengekstrak parameter perjalanan dari pesan user ke JSON sesuai skema. Jangan menjawab pertanyaan, jangan merekomendasikan tempat, jangan mengarang. Kalau tidak disebut, kosongkan field."
- Kirim tanggal hari ini ke prompt supaya "minggu depan" atau "20 sampai 22 Nov" bisa diubah jadi tanggal yang benar.
- Anggap isi `message` sebagai data, bukan instruksi (jaga dari prompt injection). Validasi hasil dengan Pydantic sebelum dikirim balik.
- Timeout sisi server sekitar 6 detik (front-end menunggu maksimal 8 detik).
- Model: pilih yang murah dan cepat (kelas Flash). Cek nama model terbaru di dokumentasi Gemini saat mengerjakan.

### Kuota dan keamanan

- Gratis: 5 pertanyaan AI per hari. Plus: tanpa batas. Saat ini kuota dihitung di front-end (`localStorage`), jadi backend perlu menghitung sendiri per user atau per guest id, lalu balas `429` kalau habis. Front-end akan menganggap 429 sebagai "pakai aturan lokal" (nanti bisa kita ubah menampilkan modal Plus).
- Rate limit per IP, CORS hanya untuk domain Netlify Pathora dan localhost.

### Cara menyalakan dari sisi front-end

File `assets/js/api.js` sudah ada. Saat backend sudah jalan, di Console browser jalankan:

```js
localStorage.setItem('pathora_api', 'http://localhost:8000')
```

Setelah itu setiap pesan di asisten akan memanggil endpoint di atas. Hapus dengan `localStorage.removeItem('pathora_api')`. Untuk produksi, isi `window.PATHORA_API_BASE` (nanti kita tentukan bareng).

## 5. P1 dan P2: model data

Ini mengikuti struktur yang sekarang dipakai front-end di `assets/js/store.js` dan `data.js`.

**User**: id, email, password hash, name, role (`traveler` atau `host`), plan (`gratis` atau `plus`), avatar (id string), untuk host: community, place, phone.

**Activity** (katalog, 14 kegiatan di `data.js`, `id` berupa string seperti `tukik`, `subak`):
id, host_id, name, short, cats[], region (Selatan, Ubud, dst), place, lat, lng, dur (jam), times[] (jam mulai sesi, `HH:MM`), price (rupiah per orang), cap (kuota per sesi), kid (aman untuk anak), outdoor, indoorOk, crowd (0 sampai 1), moon (apakah terpengaruh purnama atau tilem), festival, teks cerita, highlight, etika, barang bawaan, titik kumpul, kontribusi. Teks tampilan ada versi `id` dan `en` (lihat `data-en.js`), jadi simpan sebagai field per bahasa atau tabel terjemahan.

**Trip**: id, name, start, end, treasurer_id, invite_code.
**TripMember**: trip_id, user_id, busy_dates[] (hari sibuk per anggota).
**TripItem** (satu kegiatan di kalender): id, trip_id, activity_id, date, time, people, status, added_by.
**Event** (acara pribadi di kalender): trip_id, date, time, title, by.
**Expense**: trip_id, title, amount, paid_by, split_among[], category.
**Settlement**: trip_id, from, to, settled (bool).
**HostClosed**: activity_id, date.
**Payout**: item_id, activity_id, amount, date.
**PassportStamp**: user_id, activity_id, date, code.
**ChatMessage** (opsional, hanya kalau perlu riwayat lintas perangkat).

## 6. Aturan bisnis

1. **Status TripItem**: `draft` (baru ditambahkan, belum diajukan) lalu `diajukan` (menunggu host) lalu `disetujui` (host setuju, boleh dibayar) atau `ditolak` (traveler tidak dikenai biaya, bisa cari pengganti). Setelah dibayar jadi `lunas`. Traveler tidak boleh membayar sebelum `disetujui`.
2. **Keputusan host** hanya boleh oleh host pemilik kegiatan itu. Satu permintaan = satu TripItem dengan status `diajukan`.
3. **Kuota**: jumlah orang yang disetujui pada satu sesi (activity + date + time) tidak boleh melebihi `cap`.
4. **Hari tutup**: kegiatan tidak bisa diajukan pada tanggal di `HostClosed`. Kegiatan yang `moon: true` dianggap tutup saat purnama atau tilem. Kegiatan yang `festival: true` dianggap tutup saat ada upacara desa. Kalender purnama, tilem, dan upacara perlu sumber data yang benar (di front-end sekarang masih contoh).
5. **Duplikat**: kegiatan yang sama di tanggal yang sama (kecuali yang `ditolak`) tidak boleh ditambah dua kali.
6. **Harga**: biaya item = `price` x `people`. Total trip dan estimasi per orang dihitung dari item yang bukan `ditolak`.
7. **Patungan (split bill)**: setiap pengeluaran punya `paid_by` dan `split_among`. Hitung saldo setiap anggota (dibayar dikurangi bagian), lalu pelunasan dibuat dengan cara greedy: yang paling banyak berutang membayar yang paling banyak piutang, sampai impas. Implementasi referensi: `PS.settle()` di `assets/js/store.js`. Item kegiatan otomatis ikut jadi pengeluaran, dibayar bendahara trip.
8. **Paspor Alam**: stempel diberikan hanya setelah kegiatan `lunas` dan host memberi kode kehadiran. Satu stempel per kegiatan per user.
9. **Paket**: Gratis (5 pertanyaan AI per hari) dan Plus (Rp49.000 per bulan, uji coba 7 hari). Pembayaran Plus belum ada, mulai dari simulasi.

## 7. Endpoint yang disarankan (P1 dan P2)

Boleh diubah, yang penting didiskusikan dulu supaya front-end disesuaikan.

```
POST /api/auth/signup, /api/auth/login, GET /api/me, PATCH /api/me
GET  /api/activities, GET /api/activities/{id}?lang=id|en
GET  /api/activities/{id}/availability?from=&to=      (hari tutup, sisa kuota, keramaian)
POST /api/trips, GET /api/trips/{id}, PATCH /api/trips/{id}
POST /api/trips/join                                   (kode undangan)
POST /api/trips/{id}/items, DELETE /api/trips/{id}/items/{item}
POST /api/trips/{id}/items/{item}/request              (ajukan ke host)
GET  /api/host/requests, POST /api/host/requests/{id}/decision   {approve: bool}
POST /api/host/closed                                  (atur hari tutup)
POST /api/trips/{id}/expenses, GET /api/trips/{id}/settlement
POST /api/trips/{id}/pay                               (simulasi dulu)
GET  /api/passport, POST /api/passport/stamp
```

## 8. Catatan teknis

- Mata uang rupiah disimpan sebagai integer (tanpa desimal). Tanggal disimpan `YYYY-MM-DD`, jam `HH:MM`, zona waktu Asia/Makassar (WITA).
- Respons error: JSON `{ "detail": "..." }`. Pesan yang tampil ke user sebaiknya dikembalikan dalam `id` atau `en` sesuai header `Accept-Language`.
- Front-end berbahasa Indonesia dan Inggris. Balasan asisten saat ini masih Indonesia karena disusun dari template di `ai.js`. Kalau nanti mau balasan asisten ikut bahasa, itu pekerjaan lanjutan (Gemini hanya menulis teks balasan dari data hasil hitung, bukan menentukan isinya).
- Jalankan lokal: `uvicorn app.main:app --reload`, front-end di `python3 -m http.server 8000` dari root repo (ubah port salah satunya supaya tidak bentrok, dan daftarkan origin-nya di CORS).
- Tulis test untuk aturan bisnis nomor 1 sampai 8 (folder `backend/tests/`).

## 9. Yang perlu didiskusikan dulu

1. Database: SQLite untuk MVP, atau langsung Postgres?
2. Hosting backend (Netlify hanya untuk front-end statis). Opsi: Render, Railway, Fly.io.
3. Auth: sesi cookie atau JWT? Front-end sekarang belum punya token handling, jadi kabari Vania sebelum mengubah alur login.
4. Sumber data cuaca, kalender purnama dan tilem, dan upacara adat. Sekarang semuanya data contoh.
5. Payment gateway (misalnya Midtrans atau Xendit) kapan masuk.

## 10. Definisi selesai untuk P0

- `POST /api/assistant/parse` mengembalikan JSON valid sesuai kontrak untuk kalimat Indonesia dan Inggris.
- Kalimat tidak jelas atau di luar topik mengembalikan `{}` dan tidak error.
- Gemini mati atau timeout mengembalikan `{}` atau status 5xx, dan situs tetap jalan lewat fallback.
- API key tidak ada di repo.
- Di front-end, pesan "3 days in Bali, love nature, with kids, avoid crowds" menghasilkan rencana 3 hari dengan kegiatan ramah anak dan lengang.
