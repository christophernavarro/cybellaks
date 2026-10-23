import { splitHTML } from '../ui/motion.js';
import { logo } from '../ui/logo.js';

export function footer({ footer: f, brand }) {
  return `
  <footer class="footer sheet">
    <div class="wrap footer__inner">
      <h2 class="display footer__title split">${splitHTML(f.title)}</h2>
    </div>
    <div class="footer__brand wrap">${logo(brand, 'logo logo--lg')}</div>
    <p class="footer__note wrap">${f.note}</p>
  </footer>`;
}
