/* Pathora: jembatan ke backend (Gemini). Aman dimatikan: kalau backend belum diisi atau gagal,
   asisten otomatis memakai mesin aturan lokal di ai.js, jadi situs tetap jalan.
   Cara menyalakan: isi alamat backend sekali di Console browser:
     localStorage.setItem('pathora_api', 'https://alamat-backend-kamu')
   Matikan: localStorage.removeItem('pathora_api')  (atau isi window.PATHORA_API_BASE sebelum file ini dimuat) */
(function (g) {
  'use strict';
  const base = () => {
    let b = g.PATHORA_API_BASE || '';
    try { b = b || localStorage.getItem('pathora_api') || ''; } catch (e) { /* abaikan */ }
    return String(b).replace(/\/+$/, '');
  };
  const CATS = ['laut', 'satwa', 'sawah', 'hutan', 'budaya', 'kuliner', 'kerajinan'];
  const ISO = /^\d{4}-\d{2}-\d{2}$/;
  const num = (v, lo, hi) => { v = Number(v); return isFinite(v) && v >= lo && v <= hi ? Math.round(v) : null; };

  /* Merapikan jawaban backend jadi "hint" yang aman. Nilai aneh dibuang, tidak pernah dipercaya mentah. */
  function clean(j) {
    if (!j || typeof j !== 'object') return null;
    const h = {};
    const d = num(j.days, 1, 14); if (d) h.days = d;
    const p = num(j.people, 1, 30); if (p) h.people = p;
    if (j.start && ISO.test(j.start)) { h.start = j.start; h.end = ISO.test(j.end) ? j.end : j.start; }
    const b = num(j.budget_per_person, 10000, 50000000); if (b) h.budgetPP = b;
    if (Array.isArray(j.cats)) h.cats = j.cats.filter((c) => CATS.includes(c));
    ['kids', 'calm', 'cheap', 'slow'].forEach((k) => { if (typeof j[k] === 'boolean') h[k] = j[k]; });
    return Object.keys(h).length ? h : null;
  }

  /* context = ringkasan trip. Tidak mengirim nama atau email siapa pun. */
  async function parse(message, context) {
    const b = base(); if (!b) return null;
    const ac = new AbortController(); const to = setTimeout(() => ac.abort(), 8000);
    try {
      const r = await fetch(b + '/api/assistant/parse', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ac.signal, body: JSON.stringify({ message, lang: (g.I18N && g.I18N.lang) || 'id', context }) });
      if (!r.ok) return null;
      return clean(await r.json());
    } catch (e) { return null; } finally { clearTimeout(to); }
  }
  g.PAPI = { enabled: () => !!base(), parse, clean };
})(window);
