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
        <figure class="tile" data-parallax="${t.speed}" data-parallax-x="${t.speedX ?? 0}">
          <div class="tile__img" data-mask data-hover style="--i:${i};--mask-r:22px">${media(t)}</div>
          <figcaption data-reveal style="--i:${i + 1}">${t.label}</figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>`;
}
