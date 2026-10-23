import { splitHTML } from '../ui/motion.js';
import { markSVG } from '../ui/logo.js';

export function footer({ footer: f, brand }) {
  return `
  <footer class="footer sheet">
    <div class="wrap footer__inner">
      <h2 class="display footer__title split">${splitHTML(f.title)}</h2>
    </div>
    <div class="footer__brand wrap">
      <button class="theme-toggle logo logo--lg" type="button" aria-pressed="false" aria-label="Cambiar a modo noche" title="Cambiar a modo noche">${markSVG()}<span class="logo__word display">${brand.toLowerCase()}</span></button>
    </div>
    <p class="footer__note wrap">${f.note}</p>
  </footer>`;
}
