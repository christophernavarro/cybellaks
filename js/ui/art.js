// Ilustraciones SVG de reserva (se usan mientras no haya foto real). Tonos neutros, coherentes con tokens.css.
let n = 0;

const scenes = {
  lamp: (id) => `
    <defs>
      <linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e4dc"/><stop offset="1" stop-color="#dcd5cb"/></linearGradient>
      <radialGradient id="${id}glow"><stop offset="0" stop-color="#fff3d6" stop-opacity=".95"/><stop offset="1" stop-color="#ffe3c2" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <circle cx="200" cy="230" r="170" fill="url(#${id}glow)" style="transform-origin:200px 230px;animation:pulseGlow 4.5s ease-in-out infinite"/>
    <rect x="0" y="390" width="400" height="110" fill="#bdb4a8" opacity=".55"/>
    <g style="transform-origin:200px 0;animation:sway 6s ease-in-out infinite">
      <line x1="200" y1="0" x2="200" y2="150" stroke="#4a443f" stroke-width="3"/>
      <path d="M130 235 Q200 90 270 235 Z" fill="#fbf4ec"/>
      <path d="M130 235 Q200 90 270 235" fill="none" stroke="#4a443f" stroke-width="3"/>
      <ellipse cx="200" cy="238" rx="30" ry="9" fill="#fff3d6"/>
    </g>
    <rect x="60" y="330" width="90" height="100" rx="12" fill="#f3efe9"/>
    <path d="M85 330 Q105 280 125 330" fill="#4a443f" opacity=".25"/>
    <rect x="300" y="170" width="6" height="250" fill="#4a443f" opacity=".8"/>
    <path d="M270 170 L336 170 L322 120 L284 120 Z" fill="#fbf4ec"/>
    <rect x="285" y="420" width="36" height="8" rx="4" fill="#4a443f"/>
    <circle cx="90" cy="300" r="26" fill="#fbf4ec"/><circle cx="90" cy="300" r="14" fill="#bdb4a8"/>`,

  room: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3efe9"/><stop offset="1" stop-color="#dcd5cb"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <rect y="360" width="400" height="140" fill="#ecdfd0"/>
    <rect x="48" y="70" width="140" height="190" rx="70" fill="#fffaf6"/>
    <rect x="58" y="80" width="120" height="170" rx="60" fill="#e9e4dc" opacity=".55"/>
    <line x1="118" y1="80" x2="118" y2="250" stroke="#fffaf6" stroke-width="4"/>
    <rect x="240" y="90" width="110" height="140" rx="10" fill="#fbf4ec"/>
    <circle cx="295" cy="150" r="34" fill="#bdb4a8"/><circle cx="318" cy="190" r="22" fill="#4a443f" opacity=".55"/>
    <rect x="70" y="290" width="260" height="90" rx="40" fill="#bdb4a8"/>
    <rect x="50" y="300" width="60" height="100" rx="26" fill="#a79e92"/>
    <rect x="290" y="300" width="60" height="100" rx="26" fill="#a79e92"/>
    <rect x="95" y="268" width="210" height="64" rx="30" fill="#cdc5b9"/>
    <ellipse cx="200" cy="420" rx="130" ry="22" fill="#e9e4dc"/>
    <rect x="320" y="330" width="12" height="70" fill="#4a443f"/>
    <g style="transform-origin:326px 330px;animation:sway 7s ease-in-out infinite">
      <ellipse cx="326" cy="300" rx="14" ry="34" fill="#9bb08f" transform="rotate(-20 326 300)"/>
      <ellipse cx="344" cy="310" rx="12" ry="28" fill="#b7c8a9" transform="rotate(25 344 310)"/>
    </g>`,

  garden: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3efe9"/><stop offset="1" stop-color="#e9e4dc"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <circle cx="290" cy="120" r="54" fill="#fff3d6"/>
    <circle cx="290" cy="120" r="80" fill="#fff3d6" opacity=".4" style="transform-origin:290px 120px;animation:pulseGlow 5s ease-in-out infinite"/>
    <path d="M0 330 Q120 250 230 320 T400 300 V500 H0 Z" fill="#cdc5b9"/>
    <path d="M0 390 Q140 330 260 390 T400 380 V500 H0 Z" fill="#bdb4a8"/>
    <g style="transform-origin:110px 420px;animation:sway 6s ease-in-out infinite">
      <path d="M110 420 C70 340 60 280 110 220 C160 280 150 340 110 420Z" fill="#9bb08f"/>
      <path d="M110 420 C110 350 110 290 110 230" stroke="#fbf4ec" stroke-width="2" fill="none" opacity=".6"/>
    </g>
    <g style="transform-origin:200px 430px;animation:sway 8s ease-in-out infinite reverse">
      <path d="M200 430 C150 370 140 320 190 270 C230 320 240 380 200 430Z" fill="#b7c8a9"/>
      <path d="M200 430 C250 380 280 330 260 280 C220 300 190 360 200 430Z" fill="#9bb08f"/>
    </g>
    <g style="transform-origin:310px 440px;animation:sway 5s ease-in-out infinite">
      <rect x="306" y="300" width="8" height="140" fill="#4a443f" opacity=".7"/>
      <circle cx="310" cy="296" r="30" fill="#fbf4ec"/><circle cx="310" cy="296" r="12" fill="#e9e4dc"/>
      <circle cx="282" cy="330" r="20" fill="#fbf4ec"/><circle cx="282" cy="330" r="8" fill="#dcd5cb"/>
    </g>
    <path d="M70 440 h80 l-12 50 h-56z" fill="#4a443f"/>
    <path d="M170 450 h80 l-12 45 h-56z" fill="#a79e92"/>`,

  office: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3efe9"/><stop offset="1" stop-color="#e2dcd2"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <rect y="385" width="400" height="115" fill="#ddd6cb"/>
    <rect x="40" y="60" width="320" height="170" rx="8" fill="#fffaf6"/>
    <rect x="50" y="70" width="300" height="150" fill="#e9e4dc" opacity=".7"/>
    <line x1="150" y1="70" x2="150" y2="220" stroke="#fffaf6" stroke-width="4"/><line x1="250" y1="70" x2="250" y2="220" stroke="#fffaf6" stroke-width="4"/>
    <rect x="60" y="305" width="280" height="14" rx="4" fill="#4a443f"/>
    <rect x="72" y="319" width="10" height="78" fill="#4a443f"/><rect x="318" y="319" width="10" height="78" fill="#4a443f"/>
    <rect x="150" y="238" width="104" height="62" rx="6" fill="#4a443f"/><rect x="157" y="245" width="90" height="46" rx="3" fill="#cdc5b9"/>
    <rect x="195" y="298" width="14" height="10" fill="#a79e92"/>
    <rect x="262" y="330" width="64" height="14" rx="7" fill="#a79e92"/><rect x="284" y="262" width="14" height="76" rx="7" fill="#a79e92"/><rect x="289" y="344" width="4" height="56" fill="#4a443f"/>
    <rect x="92" y="272" width="28" height="33" rx="4" fill="#bdb4a8"/>
    <g style="transform-origin:106px 272px;animation:sway 6s ease-in-out infinite"><ellipse cx="100" cy="250" rx="9" ry="24" fill="#9bb08f" transform="rotate(-18 100 250)"/><ellipse cx="116" cy="254" rx="8" ry="20" fill="#b7c8a9" transform="rotate(22 116 254)"/></g>
    <g style="transform-origin:330px 0;animation:sway 7s ease-in-out infinite"><line x1="330" y1="0" x2="330" y2="40" stroke="#4a443f" stroke-width="3"/><path d="M308 70 Q330 28 352 70 Z" fill="#fbf4ec"/></g>`,

  shop: (id) => `
    <defs><linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3efe9"/><stop offset="1" stop-color="#dcd5cb"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#${id}bg)"/>
    <path d="M55 500V200a145 145 0 0 1 290 0V500Z" fill="#fffaf6"/>
    <path d="M92 500V215a108 108 0 0 1 216 0V500Z" fill="#e9e4dc"/>
    <path d="M62 150H338L352 192H48Z" fill="#bdb4a8"/>
    <path d="M62 150L82 192M110 150L122 192M158 150L162 192M206 150V192M254 150L250 192M302 150L290 192M338 150L318 192" stroke="#fbf4ec" stroke-width="5"/>
    <rect x="150" y="96" width="100" height="26" rx="4" fill="#4a443f"/>
    <rect x="118" y="262" width="164" height="6" fill="#4a443f"/><rect x="118" y="336" width="164" height="6" fill="#4a443f"/><rect x="118" y="410" width="164" height="6" fill="#4a443f"/>
    <rect x="128" y="232" width="26" height="30" rx="3" fill="#cdc5b9"/><circle cx="184" cy="248" r="14" fill="#fbf4ec"/><rect x="214" y="224" width="22" height="38" rx="3" fill="#a79e92"/><rect x="246" y="236" width="24" height="26" rx="3" fill="#bdb4a8"/>
    <rect x="128" y="306" width="40" height="30" rx="3" fill="#bdb4a8"/><rect x="180" y="296" width="24" height="40" rx="3" fill="#fbf4ec"/><circle cx="238" cy="320" r="16" fill="#cdc5b9"/>
    <rect x="130" y="380" width="30" height="30" rx="3" fill="#a79e92"/><rect x="172" y="372" width="34" height="38" rx="3" fill="#cdc5b9"/><circle cx="244" cy="394" r="16" fill="#fbf4ec"/>`,
};

export function art(kind = 'room') {
  const id = 'a' + ++n;
  const body = (scenes[kind] || scenes.room)(id);
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// Foto real si existe; si no, la ilustración de reserva.
// pos: recorte de la foto (object-position, ej. '30% 50%'). eager: carga prioritaria para lo que se ve al abrir la página.
export function media({ image, art: kind, alt = '', pos, eager }) {
  return image
    ? `<img src="${image}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${pos ? ` style="object-position:${pos}"` : ''}>`
    : `<div class="art" role="img" aria-label="${alt}">${art(kind)}</div>`;
}
