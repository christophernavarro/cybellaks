import { splitHTML } from '../ui/motion.js';
import { media } from '../ui/art.js';

export function servicesSection({ services: copy }, items) {
  return `
  <section class="section sheet services" id="categorias">
    <div class="wrap">
      <header class="section__head">
        <span class="eyebrow" data-reveal>${copy.eyebrow}</span>
        <h2 class="display section__title split">${splitHTML(copy.title)}</h2>
        <p class="section__lead" data-reveal style="--i:2">${copy.lead}</p>
      </header>

      <div class="cards">
        ${items.map((s, i) => `
          <article class="card" data-reveal style="--i:${i}" data-service="${s.id}">
            <div class="card__media" data-hover><div class="card__zoom">${media(s)}</div><span class="card__n display">${s.number}</span></div>
            <div class="card__body">
              <h3 class="display">${s.title}</h3>
              <p>${s.description}</p>
              ${s.href
                ? `<a class="link-arrow" href="${s.href}">${s.cta} <span>→</span></a>`
                : `<button class="link-arrow" type="button" data-open="${s.id}">${s.cta} <span>→</span></button>`}
            </div>
          </article>`).join('')}
      </div>
    </div>
  </section>`;
}
