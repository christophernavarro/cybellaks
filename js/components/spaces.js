import { splitHTML } from '../ui/motion.js';
import { media } from '../ui/art.js';

// Frase central con imágenes flotantes alrededor. Cada imagen se mueve a su propia velocidad al hacer scroll
// (data-parallax / data-parallax-x) y responde al mouse (data-hover).
export function spacesSection({ spaces: s }) {
  return `
  <section class="section sheet lines spaces" id="espacios" data-lines>
    <div class="wrap spaces__stage">
      <div class="spaces__copy">
        <span class="eyebrow" data-reveal>${s.eyebrow}</span>
        <p class="display spaces__statement split">${splitHTML(s.statement)}</p>
        <a class="btn" href="${s.cta.href}" data-quiz-start data-magnetic data-reveal style="--i:3">${s.cta.label}<span class="arrow">→</span></a>
      </div>
      <div class="spaces__tiles">
        ${s.items.map((t, i) => `
        <figure class="tile" data-parallax="${t.speed}" data-parallax-x="${t.speedX ?? 0}" data-tile="${i}" tabindex="0" role="button" aria-label="Ver ${t.label} en grande">
          <div class="tile__img" data-mask data-hover style="--i:${i};--mask-r:22px">${media(t)}</div>
          <figcaption data-reveal style="--i:${i + 1}">${t.label}</figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>`;
}

// Al hacer clic (o Enter) en una imagen se abre en el centro, grande, con título y descripción; flechas para recorrer las demás.
export function initSpacesLightbox({ spaces: s }) {
  const dlg = document.createElement('dialog');
  dlg.className = 'modal modal--lightbox';
  document.body.appendChild(dlg);
  let cur = 0;

  const paint = (dir = 0) => {
    const t = s.items[cur];
    dlg.innerHTML = `
      <div class="lb">
        <button class="modal__close" type="button" aria-label="Cerrar">✕</button>
        <div class="lb__media" data-hover>${media(t)}</div>
        <div class="lb__body">
          <span class="eyebrow">${cur + 1} / ${s.items.length}</span>
          <h3 class="display">${t.label}</h3>
          <p>${t.desc ?? ''}</p>
          <div class="lb__nav">
            <button class="lb__arrow" type="button" data-step="-1" aria-label="Anterior">←</button>
            <button class="lb__arrow" type="button" data-step="1" aria-label="Siguiente">→</button>
          </div>
        </div>
      </div>`;
    const img = dlg.querySelector('.lb__media');
    if (dir) img.style.animation = `${dir > 0 ? 'lbNext' : 'lbPrev'} .6s var(--ease-out)`;
  };
  const open = (i) => { cur = i; paint(); dlg.showModal(); dlg.querySelector('.modal__close').focus(); };
  const step = (d) => { cur = (cur + d + s.items.length) % s.items.length; paint(d); };

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('.modal__close')) return dlg.close();
    const b = e.target.closest('[data-step]'); if (b) step(+b.dataset.step);
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  const trigger = (e) => { const t = e.target.closest('[data-tile]'); if (t) open(+t.dataset.tile); };
  document.addEventListener('click', trigger);
  document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[data-tile]')) { e.preventDefault(); trigger(e); } });
}
