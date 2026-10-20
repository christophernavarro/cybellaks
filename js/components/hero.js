import { splitHTML } from '../ui/motion.js';
import { logo } from '../ui/logo.js';

export function header(site) {
  return `
  <header class="header">
    <a class="header__logo" href="#top" aria-label="${site.brand}, ir al inicio">${logo(site.brand)}</a>
    <nav class="header__nav" aria-label="Principal">
      ${site.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    </nav>
  </header>`;
}

export function hero({ hero: h }) {
  const img = h.image;
  const pos = img.pos ? ` style="object-position:${img.pos}"` : '';
  return `
  <section class="hero" id="top">
    <div class="hero__bg" aria-hidden="true">
      <img class="hero__img hero__img--day" src="${img.day}" alt="" fetchpriority="high" decoding="async"${pos}>
      <img class="hero__img hero__img--night" src="${img.night}" alt="" decoding="async"${pos}>
    </div>
    <div class="wrap hero__grid">
      <div class="hero__copy" tabindex="0" aria-label="${img.alt}">
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
  const row = items.map((t) => `<span>${t}</span><i>✦</i>`).join('');
  return `<div class="marquee sheet" aria-hidden="true"><div class="marquee__track display"><div>${row}</div><div>${row}</div></div></div>`;
}
