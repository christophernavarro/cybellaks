// Ilustraciones SVG de reserva (se usan mientras no haya foto real). Paleta rosada coherente con tokens.css.
let n = 0;

const scenes = {
  lamp: (id) => `
    <defs>
      <linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c9b6"/><stop offset="1" stop-color="#f1c3c4"/></linearGradient>
      <radialGradient id="${id}glow"><stop offset="0" stop-color="#fff3d6" stop-opacity=".95"/><stop offset="1" stop-color="#ffe3c2" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <circle cx="200" cy="230" r="170" fill="url(#${id}glow)" style="transform-origin:200px 230px;animation:pulseGlow 4.5s ease-in-out infinite"/>
    <rect x="0" y="390" width="400" height="110" fill="#dca4a9" opacity=".55"/>
    <g style="transform-origin:200px 0;animation:sway 6s ease-in-out infinite">
      <line x1="200" y1="0" x2="200" y2="150" stroke="#a24f5d" stroke-width="3"/>
      <path d="M130 235 Q200 90 270 235 Z" fill="#fbf4ec"/>
      <path d="M130 235 Q200 90 270 235" fill="none" stroke="#a24f5d" stroke-width="3"/>
      <ellipse cx="200" cy="238" rx="30" ry="9" fill="#fff3d6"/>
    </g>
    <rect x="60" y="330" width="90" height="100" rx="12" fill="#fbe4e2"/>
    <path d="M85 330 Q105 280 125 330" fill="#a24f5d" opacity=".25"/>
    <rect x="300" y="170" width="6" height="250" fill="#a24f5d" opacity=".8"/>
    <path d="M270 170 L336 170 L322 120 L284 120 Z" fill="#fbf4ec"/>
    <rect x="285" y="420" width="36" height="8" rx="4" fill="#a24f5d"/>
    <circle cx="90" cy="300" r="26" fill="#fbf4ec"/><circle cx="90" cy="300" r="14" fill="#dca4a9"/>`,

  room: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe4e2"/><stop offset="1" stop-color="#f1c3c4"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <rect y="360" width="400" height="140" fill="#ecdfd0"/>
    <rect x="48" y="70" width="140" height="190" rx="70" fill="#fffaf6"/>
    <rect x="58" y="80" width="120" height="170" rx="60" fill="#f7c9b6" opacity=".55"/>
    <line x1="118" y1="80" x2="118" y2="250" stroke="#fffaf6" stroke-width="4"/>
    <rect x="240" y="90" width="110" height="140" rx="10" fill="#fbf4ec"/>
    <circle cx="295" cy="150" r="34" fill="#dca4a9"/><circle cx="318" cy="190" r="22" fill="#a24f5d" opacity=".55"/>
    <rect x="70" y="290" width="260" height="90" rx="40" fill="#dca4a9"/>
    <rect x="50" y="300" width="60" height="100" rx="26" fill="#d08e96"/>
    <rect x="290" y="300" width="60" height="100" rx="26" fill="#d08e96"/>
    <rect x="95" y="268" width="210" height="64" rx="30" fill="#e8b0b3"/>
    <ellipse cx="200" cy="420" rx="130" ry="22" fill="#f7c9b6"/>
    <rect x="320" y="330" width="12" height="70" fill="#a24f5d"/>
    <g style="transform-origin:326px 330px;animation:sway 7s ease-in-out infinite">
      <ellipse cx="326" cy="300" rx="14" ry="34" fill="#9bb08f" transform="rotate(-20 326 300)"/>
      <ellipse cx="344" cy="310" rx="12" ry="28" fill="#b7c8a9" transform="rotate(25 344 310)"/>
    </g>`,

  garden: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe4e2"/><stop offset="1" stop-color="#f7c9b6"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <circle cx="290" cy="120" r="54" fill="#fff3d6"/>
    <circle cx="290" cy="120" r="80" fill="#fff3d6" opacity=".4" style="transform-origin:290px 120px;animation:pulseGlow 5s ease-in-out infinite"/>
    <path d="M0 330 Q120 250 230 320 T400 300 V500 H0 Z" fill="#e8b0b3"/>
    <path d="M0 390 Q140 330 260 390 T400 380 V500 H0 Z" fill="#dca4a9"/>
    <g style="transform-origin:110px 420px;animation:sway 6s ease-in-out infinite">
      <path d="M110 420 C70 340 60 280 110 220 C160 280 150 340 110 420Z" fill="#9bb08f"/>
      <path d="M110 420 C110 350 110 290 110 230" stroke="#fbf4ec" stroke-width="2" fill="none" opacity=".6"/>
    </g>
    <g style="transform-origin:200px 430px;animation:sway 8s ease-in-out infinite reverse">
      <path d="M200 430 C150 370 140 320 190 270 C230 320 240 380 200 430Z" fill="#b7c8a9"/>
      <path d="M200 430 C250 380 280 330 260 280 C220 300 190 360 200 430Z" fill="#9bb08f"/>
    </g>
    <g style="transform-origin:310px 440px;animation:sway 5s ease-in-out infinite">
      <rect x="306" y="300" width="8" height="140" fill="#a24f5d" opacity=".7"/>
      <circle cx="310" cy="296" r="30" fill="#fbf4ec"/><circle cx="310" cy="296" r="12" fill="#f7c9b6"/>
      <circle cx="282" cy="330" r="20" fill="#fbf4ec"/><circle cx="282" cy="330" r="8" fill="#f1c3c4"/>
    </g>
    <path d="M70 440 h80 l-12 50 h-56z" fill="#a24f5d"/>
    <path d="M170 450 h80 l-12 45 h-56z" fill="#d08e96"/>`,
};

export function art(kind = 'room') {
  const id = 'a' + ++n;
  const body = (scenes[kind] || scenes.room)(id);
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// Foto real si existe; si no, la ilustración de reserva.
export function media({ image, art: kind, alt = '' }) {
  return image
    ? `<img src="${image}" alt="${alt}" loading="lazy" decoding="async">`
    : `<div class="art" role="img" aria-label="${alt}">${art(kind)}</div>`;
}
