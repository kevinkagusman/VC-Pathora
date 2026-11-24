/* Pathora: bahasa Indonesia / English.
   Cara kerja: kalimat sumber ditulis dalam bahasa Indonesia di HTML dan JS. Saat bahasa EN
   aktif, setiap teks di halaman (termasuk yang dibuat belakangan oleh JS) dicocokkan ke kamus
   di en.js lalu diganti. Kunci kamus boleh memakai {} sebagai tempat angka atau nama.
   Berkas ini harus dimuat paling awal, sebelum data.js. */
(function (g) {
  'use strict';
  let lang = 'id';
  try { lang = localStorage.getItem('pathora_lang') === 'en' ? 'en' : 'id'; } catch (e) { /* abaikan */ }
  const I18N = { lang, dict: {}, pats: [], add: null, t: null, set: null };
  g.I18N = I18N;
  document.documentElement.lang = lang;

  /* ---------- kamus ---------- */
  const esc = (s) => s.replace(/[.*+?^$()|[\]\\]/g, '\\$&');
  I18N.add = function (map) {
    Object.keys(map).forEach((k) => {
      if (k.indexOf('{}') >= 0) {
        const parts = k.split('{}');
        const re = new RegExp('^' + parts.map(esc).join('(.+?)') + '$', 's');
        I18N.pats.push({ re, to: map[k], n: parts.length - 1 });
      } else I18N.dict[k] = map[k];
    });
  };
  const fill = (to, m) => to.replace(/\{(\d)\}/g, (_, i) => { const v = m[+i + 1]; return v == null ? '' : tr(v); });
  function tr(s) {
    if (lang !== 'en' || !s) return s;
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    if (!core) return s;
    if (Object.prototype.hasOwnProperty.call(I18N.dict, core)) return lead + I18N.dict[core] + trail;
    for (let i = 0; i < I18N.pats.length; i++) {
      const p = I18N.pats[i], m = core.match(p.re);
      if (m) return lead + fill(p.to, m) + trail;
    }
    if (core.indexOf(' · ') > 0) {
      const parts = core.split(' · '), out = parts.map(tr);
      if (out.some((x, i) => x !== parts[i])) return lead + out.join(' · ') + trail;
    }
    if (core.indexOf(', ') > 0) {
      const parts = core.split(', ');
      if (parts.every((x) => Object.prototype.hasOwnProperty.call(I18N.dict, x))) return lead + parts.map((x) => I18N.dict[x]).join(', ') + trail;
    }
    if (/[.!?] +\S/.test(core)) {
      const parts = core.split(/(?<=[.!?])\s+/);
      if (parts.length > 1) { const out = parts.map(tr); if (out.some((x, i) => x !== parts[i])) return lead + out.join(' ') + trail; }
    }
    const u = units(core);
    return u !== core ? lead + u + trail : s;
  }
  /* satuan yang sering muncul di tengah kalimat: orang, jam, menit, sesi, dan sebagainya */
  function units(c) {
    return c
      .replace(/\bper orang\b/g, 'per person').replace(/\buntuk (\d+) orang\b/g, 'for $1 people')
      .replace(/\b1 orang\b/g, '1 person').replace(/\b(\d+) orang\b/g, '$1 people')
      .replace(/\b(\d+),(\d+) jam\b/g, '$1.$2 h').replace(/\b(\d+) jam\b/g, '$1 h').replace(/\b(\d+) menit\b/g, '$1 min')
      .replace(/\bmaks\. /g, 'max. ').replace(/\bsesi (?=\d)/g, 'sessions ')
      .replace(/(\d\d[.:]\d\d) atau (\d\d[.:]\d\d)/g, '$1 or $2')
      .replace(/\b(\d+),(\d+) juta\b/g, '$1.$2 million').replace(/STEMPEL/g, 'STAMPS');
  }
  I18N.t = tr;
  I18N.set = function (l) {
    try { localStorage.setItem('pathora_lang', l === 'en' ? 'en' : 'id'); } catch (e) { /* abaikan */ }
    location.reload();
  };
  if (lang !== 'en') return;

  /* ---------- penerjemah DOM ---------- */
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt', 'data-tip'];
  const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 0, CODE: 1 };
  const mine = new WeakMap(); /* node teks -> teks hasil terjemahan yang kita tulis */
  function doText(n) {
    const v = n.nodeValue; if (!v || !v.trim()) return;
    if (mine.get(n) === v) return;
    const pe = n.parentElement; if (pe && pe.closest && pe.closest('.msg .bubble')) return; /* balasan asisten tetap Indonesia */
    const t = tr(v);
    if (t !== v) { mine.set(n, t); n.nodeValue = t; }
  }
  function doAttrs(el) {
    for (let i = 0; i < ATTRS.length; i++) {
      const a = ATTRS[i]; if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      const v = el.getAttribute(a), t = tr(v);
      if (t !== v) el.setAttribute(a, t);
    }
    if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) { const t = tr(el.value); if (t !== el.value) el.value = t; }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1 || SKIP[root.tagName]) return;
    doAttrs(root);
    for (let c = root.firstChild; c; c = c.nextSibling) walk(c);
  }
  let busy = false;
  const mo = new MutationObserver((list) => {
    if (busy) return; busy = true;
    try {
      list.forEach((m) => {
        if (m.type === 'characterData') doText(m.target);
        else if (m.type === 'attributes') doAttrs(m.target);
        else m.addedNodes.forEach(walk);
      });
    } finally { busy = false; }
  });
  function start() {
    document.title = tr(document.title);
    walk(document.body);
    mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  I18N.refresh = function () { busy = true; try { walk(document.body); document.title = tr(document.title); } finally { busy = false; } };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  document.addEventListener('DOMContentLoaded', I18N.refresh);
})(window);
