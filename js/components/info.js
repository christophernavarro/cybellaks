import { splitHTML } from '../ui/motion.js';
import { media } from '../ui/art.js';

export function info({ info: d }) {
  return `
  <section class="section info" id="nosotros">
    <div class="wrap">
      <span class="eyebrow" data-reveal>${d.eyebrow}</span>
      <p class="info__statement display lit">${d.statement}</p>

      <div class="info__gallery">
        <figure class="frame" data-mask style="--mask-r:200px 200px 28px 28px"><div class="para" data-parallax="0.08">${media(d.images[0])}</div></figure>
        <div class="info__side">
          <ul class="stats">
            ${d.stats.map((s, i) => `
              <li data-reveal style="--i:${i}">
                <strong class="display"><span data-count="${s.value}" data-suffix="${s.suffix}">0</span></strong>
                <span>${s.label}</span>
              </li>`).join('')}
          </ul>
          <figure class="frame frame--wide" data-mask style="--i:2"><div class="para" data-parallax="-0.08">${media(d.images[1])}</div></figure>
        </div>
      </div>

      <div class="pillars">
        ${d.pillars.map((p, i) => `
          <article class="pillar" data-reveal style="--i:${i}">
            <span class="pillar__n display">0${i + 1}</span>
            <h3 class="display">${p.title}</h3>
            <p>${p.text}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>`;
}

export function servicesSection({ services: copy }, items) {
  return `
  <section class="section services" id="categorias">
    <div class="wrap">
      <header class="section__head">
        <span class="eyebrow" data-reveal>${copy.eyebrow}</span>
        <h2 class="display section__title split">${splitHTML(copy.title)}</h2>
        <p class="section__lead" data-reveal style="--i:2">${copy.lead}</p>
      </header>

      <div class="cards">
        ${items.map((s, i) => `
          <article class="card" data-reveal style="--i:${i}" data-service="${s.id}">
            <div class="card__media"><div class="card__zoom">${media(s)}</div><span class="card__n display">${s.number}</span></div>
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
    <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0,60 C240,120 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z"/></svg>
  </section>`;
}
