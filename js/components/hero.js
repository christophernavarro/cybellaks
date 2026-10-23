import { splitHTML } from '../ui/motion.js';
import { markSVG } from '../ui/logo.js';

export function header(site) {
  return `
  <header class="header">
    <button class="theme-toggle" type="button" aria-pressed="false" aria-label="Cambiar a modo noche" title="Cambiar a modo noche">${markSVG()}<span class="logo__word display">${site.brand.toLowerCase()}</span></button>
    <nav class="header__nav" aria-label="Principal">
      ${site.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    </nav>
    <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Abrir menú"><span></span></button>
  </header>
  <nav class="mnav" id="mnav" aria-label="Menú" inert>
    ${site.nav.map((n, i) => `<a href="${n.href}" style="--i:${i}"><small>${String(i + 1).padStart(2, '0')}</small>${n.label}</a>`).join('')}
  </nav>`;
}

const spots = (v, key) => `
      <div class="hero__spots hero__spots--${key}" data-ratio="${v.ratio}" data-pos="${v.pos}">
        ${v.spots.map((p) => `<button class="spot" type="button" style="--x:${p.x};--y:${p.y}" aria-expanded="false" aria-label="${p.title}">
          <span class="spot__dot"></span>
          <span class="spot__card"><strong>${p.title}</strong>${p.text}</span>
        </button>`).join('')}
      </div>`;

export function hero({ hero: h }) {
  const d = h.desktop, m = h.mobile;
  const pic = (k) => `<picture class="hero__pic hero__pic--${k}">
        <source media="(max-width: 699px)" srcset="${m[k]}">
        <img class="hero__img" src="${d[k]}" alt="" ${k === 'day' ? 'fetchpriority="high"' : ''} decoding="async">
      </picture>`;
  return `
  <section class="hero" id="top" style="--pos-d:${d.pos};--pos-m:${m.pos}">
    <div class="hero__bg" aria-hidden="true">
      ${pic('day')}
      ${pic('night')}
      <div class="hero__dusk"></div>
    </div>
    ${spots(d, 'desktop')}${spots(m, 'mobile')}
    <div class="wrap hero__grid">
      <div class="hero__copy">
        <h1 class="display hero__title split" style="--base:200ms">${splitHTML(h.title)}</h1>
        <div class="hero__cta" data-reveal style="--i:5">
          <a class="btn" href="${h.cta.href}" data-quiz-start data-magnetic>${h.cta.label}<span class="arrow">→</span></a>
        </div>
      </div>
    </div>
    <a class="hero__scroll" href="#categorias" aria-label="Bajar"><span></span></a>
  </section>`;
}

export function marquee({ marquee: items }) {
  // La cinta se mueve la mitad de su ancho y vuelve a empezar: cada mitad debe ser más ancha que la pantalla,
  // si no se ve un hueco a la derecha antes de reiniciar. Por eso se repiten las palabras varias veces.
  const row = items.map((t) => `<span>${t}</span><i>✦</i>`).join('').repeat(4);
  return `<div class="marquee sheet" aria-hidden="true"><div class="marquee__track display"><div>${row}</div><div>${row}</div></div></div>`;
}
