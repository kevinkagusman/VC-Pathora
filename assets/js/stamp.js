/* Pathora: stempel Paspor Alam untuk dipakai di halaman lain (salinan gaya dari paspor.html) */
(function (g) {
  'use strict';
  const esc = (g.UI && g.UI.esc) || function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  const light = function (hex) { const n = parseInt(hex.slice(1), 16), m = function (v) { return Math.round(v + (244 - v) * 0.68); }; return 'rgb(' + m(n >> 16) + ',' + m((n >> 8) & 255) + ',' + m(n & 255) + ')'; };
  const INK = { laut:'#2C6E86', air:'#2C6E86', hutan:'#3B6B3C', sawah:'#4F7A2F', budaya:'#9A3B26', kuliner:'#B0601C', satwa:'#6A4A86', kerajinan:'#8A5A2B' };
  const SHAPE = { laut:'circle', air:'circle', satwa:'circle', hutan:'oct', sawah:'oct', budaya:'rect', kerajinan:'rect', kuliner:'rect' };
  const GLY = {
    laut:'<path d="M2 14c2.5-3 4.5-3 7 0s4.5 3 7 0 4-3 6 0"/><path d="M2 19c2.5-3 4.5-3 7 0s4.5 3 7 0 4-3 6 0"/><circle cx="17" cy="7" r="2.5"/>',
    air:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/><path d="M9.5 15a2.8 2.8 0 0 0 2.5 2.4"/>',
    hutan:'<path d="M12 3l6 8h-3.5l4 6H5.5l4-6H6z"/><path d="M12 17v4"/>',
    sawah:'<path d="M3 19h18M5 15h14M8 11h8M10.5 7h3"/>',
    budaya:'<path d="M4 20V9l3-3 3 3v11M14 20V9l3-3 3 3v11M3 20h8M13 20h8"/>',
    kuliner:'<path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M9 3.5c-1 1.5 1 2 0 4M13 3.5c-1 1.5 1 2 0 4"/>',
    satwa:'<circle cx="6.5" cy="10" r="1.7"/><circle cx="10.5" cy="6.5" r="1.7"/><circle cx="15.5" cy="6.5" r="1.7"/><circle cx="19" cy="10" r="1.7"/><path d="M12.8 11.5c-3.2 0-5.6 2.8-5.6 5 0 2 2.4 2.4 5.6 1.4 3.2 1 5.6.6 5.6-1.4 0-2.2-2.4-5-5.6-5z"/>',
    kerajinan:'<path d="M8 4h8M9 4c0 2-3 3-3 8 0 4 2.5 8 6 8s6-4 6-8c0-5-3-6-3-8"/>'
  };
  const GA = {
    tukik:'<ellipse cx="12" cy="13" rx="6.2" ry="4.6"/><circle cx="19.2" cy="12" r="1.8"/><path d="M7 16.5l-2 3M16.5 16.5l2 3M7 9.5L5 6.5M16.5 9.5l2-3M5.8 13H3M9 11.5l3 3M12 10.5l3 3"/>',
    mangrove:'<path d="M12 4v7M12 4c-3 0-5 2-5 4.5M12 4c3 0 5 2 5 4.5M12 11l-4.5 8M12 11v8M12 11l4.5 8M3 21h18"/>',
    burung:'<path d="M3 16c4 0 6.5-2 7.5-5.5l3 3c2-2 4.5-2.4 7-1.2-1 3.4-4.2 6.2-8.2 6.2-3.2 0-6-.8-9.3-2.5z"/><path d="M15.5 8.5L17 6M13.5 10.5l1.5-2"/>',
    airterjun:'<path d="M5 3h14M8 3v7M12 3v11M16 3v8M4 20c3-3 5-3 8 0s5 3 8 0"/>',
    canang:'<circle cx="12" cy="12" r="1.8"/><path d="M12 3c2 2.2 2 4.5 0 7.2-2-2.7-2-5 0-7.2zM12 13.8c2 2.7 2 5 0 7.2-2-2.200-2-4.500 0-7.200zM3 12c2.2-2 4.500-2 7.200 0-2.700 2-5 2-7.200 0zM13.800 12c2.700-2 5-2 7.200 0-2.200 2-4.500 2-7.200 0z"/>',
    tenun:'<path d="M5 5h14v14H5zM5 9.700h14M5 14.300h14M9.700 5v14M14.300 5v14"/><path d="M5 5l14 14" stroke-dasharray="1.500 2.200"/>',
    masak:'<path d="M5 11h14v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM3 11h18M9 4c-1 1.500 1 2 0 4M13 4c-1 1.500 1 2 0 4"/>',
    bebek:'<path d="M4.500 15c0 3 3 5 7.500 5s7.500-2 7.500-5c-3 1-5.500 0-6.500-3 0-2 1-4-1-5.200-2-1-4.500 0-4.500 2.200 0 2 2 3 0 5-1 1-2 1-3 1z"/><path d="M16.800 7l3.200.9-3.200 1"/>',
    kopi:'<ellipse cx="12" cy="12" rx="5.800" ry="8" transform="rotate(30 12 12)"/><path d="M8.500 5.500c4.500 3 1.500 7.500 6.500 13"/>',
    gerabah:'<path d="M8 4h8M9 4c0 2-3 3-3 8 0 4 2.500 8 6 8s6-4 6-8c0-5-3-6-3-8"/><path d="M7 11h10M7.600 15h8.800"/>',
    karang:'<path d="M12 21v-8M12 13c-3 0-5-2-5-6M12 13c3 0 5-2 5-6M12 16c-2 0-4-1-4-3M12 16c2 0 4-1 4-3M4 21h16"/>',
    melukat:'<path d="M12 3c3.500 4.500 5 7 5 9.500a5 5 0 0 1-10 0C7 10 8.500 7.500 12 3z"/><path d="M4 20c3-2 5-2 8 0s5 2 8 0"/>',
    topeng:'<path d="M5 6c4-2 10-2 14 0 0 8-2 13-7 15-5-2-7-7-7-15z"/><path d="M8.500 10.500c1-1 2-1 3 0M12.500 10.500c1-1 2-1 3 0M9.500 16c1.500 1.200 3.500 1.200 5 0"/>'
  };
  const MON = ['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
  function dshort(d){ const p = d.split('-'); return p[2] + ' ' + MON[+p[1] - 1] + ' ' + p[0]; }
  function hash(str){ let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }
  function clip(t, n){ t = t.toUpperCase(); return t.length > n ? t.slice(0, n - 1) + '.' : t; }

  function stampSVG(a, st, locked, opts){
    const cat = a.cats[0], ink = locked ? 'currentColor' : ((opts && opts.light) ? light(INK[cat]) : INK[cat]), sh = SHAPE[cat], rot = (hash(a.id) % 13) - 6;
    const uid = 's' + a.id, glyph = '<g transform="translate(44 40) scale(1.5)" fill="none" stroke="' + ink + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (GA[a.id] || GLY[cat]) + '</g>';
    const t = function(x, y, size, txt, ls){ return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="' + size + '" letter-spacing="' + ls + '" fill="' + ink + '">' + esc(txt) + '</text>'; };
    let inner = '';
    if (sh === 'circle') {
      inner = '<circle cx="60" cy="60" r="56" fill="none" stroke="' + ink + '" stroke-width="2.6"/><circle cx="60" cy="60" r="34" fill="none" stroke="' + ink + '" stroke-width="1.2"/>' +
        '<defs><path id="u' + uid + '" d="M17 60A43 43 0 0 1 103 60"/><path id="l' + uid + '" d="M9 60A51 51 0 0 0 111 60"/></defs>' +
        '<text font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="8.2" letter-spacing="1.4" fill="' + ink + '" text-anchor="middle"><textPath href="#u' + uid + '" startOffset="50%">' + esc(clip(a.short, 20)) + '</textPath></text>' +
        '<text font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="7.4" letter-spacing="1.3" fill="' + ink + '" text-anchor="middle"><textPath href="#l' + uid + '" startOffset="50%">' + (st ? esc(dshort(st.date)) : esc(clip(a.place.split(',')[0], 16))) + '</textPath></text>' +
        '<circle cx="14" cy="60" r="1.6" fill="' + ink + '"/><circle cx="106" cy="60" r="1.6" fill="' + ink + '"/>' + glyph;
    } else {
      const frame = sh === 'oct'
        ? '<polygon points="36,6 84,6 114,36 114,84 84,114 36,114 6,84 6,36" fill="none" stroke="' + ink + '" stroke-width="2.6"/><polygon points="38,14 82,14 106,38 106,82 82,106 38,106 14,82 14,38" fill="none" stroke="' + ink + '" stroke-width="1.1"/>'
        : '<rect x="6" y="14" width="108" height="92" rx="12" fill="none" stroke="' + ink + '" stroke-width="2.6"/><rect x="12" y="20" width="96" height="80" rx="8" fill="none" stroke="' + ink + '" stroke-width="1.1"/>';
      const words = clip(a.short, 30).split(' '); let l1 = words[0], l2 = '';
      for (let i = 1; i < words.length; i++) { if ((l1 + ' ' + words[i]).length <= 13 && !l2) l1 += ' ' + words[i]; else l2 += (l2 ? ' ' : '') + words[i]; }
      const two = l2 ? t(60, 31, 7.2, l1, 1) + t(60, 40.5, 7.2, l2, 1) : t(60, 36, 8, l1, 1.1);
      inner = frame + two + glyph.replace('translate(44 40)', 'translate(48 47)').replace('scale(1.5)', 'scale(1.05)') +
        '<line x1="30" y1="84" x2="90" y2="84" stroke="' + ink + '" stroke-width="1"/>' + t(60, 95, 7, st ? dshort(st.date) : clip(a.place.split(',')[0], 16), 1.1);
    }
    const body = '<g transform="rotate(' + rot + ' 60 60)"' + (locked ? ' class="gh" stroke-dasharray="3 3"' : ' filter="url(#ink)"') + '>' + inner + '</g>';
    return '<svg viewBox="0 0 120 120" role="img" aria-label="' + (locked ? 'Stempel ' + esc(a.short) + ', belum didapat' : 'Stempel ' + esc(a.short) + (st ? ', ' + esc(dshort(st.date)) : '')) + '">' + body + '</svg>';
  }

  
  g.PSTAMP = { svg: stampSVG };
})(window);
