// Logo de Cybellaks: símbolo (arco con un punto, como una ventana o una puerta) + nombre.
// Un solo lugar para cambiarlo. El arco usa currentColor (toma el color del texto); el punto cambia entre día (oscuro) y noche (rosa) en css/night.css.
export const markSVG = (cls = 'logo__mark') =>
  `<svg class="${cls}" viewBox="0 0 24 30" aria-hidden="true" focusable="false">
    <path d="M3 29V12a9 9 0 0 1 18 0v17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle class="logo__dot" cx="12" cy="15" r="2.9"/>
  </svg>`;

export const logo = (brand, cls = 'logo') =>
  `<span class="${cls}">${markSVG()}<span class="logo__word display">${brand.toLowerCase()}</span></span>`;
