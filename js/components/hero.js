import { splitHTML } from '../ui/motion.js';
import { media } from '../ui/art.js';

export function header(site) {
  return `
  <header class="header">
    <a class="header__logo display" href="#top" aria-label="${site.brand}">${site.brand}</a>
    <nav class="header__nav" aria-label="Principal">
      ${site.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    </nav>
  </header>`;
}

export function hero({ hero: h, brand }) {
  const [a, b, c] = h.collage;
  const badge = h.badge;
  return `
  <section class="hero" id="top">
    <div class="hero__bg" aria-hidden="true"><i></i><i></i></div>
    <div class="wrap hero__grid">
      <div class="hero__copy">
        <span class="eyebrow" data-reveal>${h.eyebrow}</span>
        <h1 class="display hero__title split" style="--base:200ms">${splitHTML(h.title)}</h1>
        <p class="hero__lead" data-reveal style="--i:5">${h.lead}</p>
        <div class="hero__cta" data-reveal style="--i:6">
          <a class="btn" href="${h.cta.href}" data-quiz-start data-magnetic>${h.cta.label}<span class="arrow">→</span></a>
          <a class="btn btn--ghost" href="${h.secondary.href}">${h.secondary.label}</a>
        </div>
      </div>

      <div class="hero__collage" aria-hidden="false">
        <figure class="frame frame--arch" data-mask style="--mask-r:999px 999px 28px 28px"><div class="para" data-parallax="0.06">${media(a)}</div></figure>
        <figure class="frame frame--round" data-mask style="--i:2;--mask-r:50%"><div class="para" data-parallax="-0.1">${media(b)}</div></figure>
        <figure class="frame frame--tall" data-mask style="--i:3"><div class="para" data-parallax="0.14">${media(c)}</div></figure>
        <div class="badge" data-parallax="-0.05">
          <svg viewBox="0 0 120 120" style="animation:spin 22s linear infinite">
            <defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
            <text><textPath href="#circ" textLength="270" lengthAdjust="spacing">${badge}</textPath></text>
          </svg>
          <span>✦</span>
        </div>
      </div>
    </div>
    <a class="hero__scroll" href="#nosotros" aria-label="Bajar"><span></span></a>
  </section>`;
}

export function marquee({ marquee: items }) {
  const row = items.map((t) => `<span>${t}</span><i>✦</i>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track display"><div>${row}</div><div>${row}</div></div></div>`;
}
