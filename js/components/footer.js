import { splitHTML } from '../ui/motion.js';

export function footer({ footer: f, brand }) {
  return `
  <footer class="footer">
    <div class="wrap footer__inner">
      <h2 class="display footer__title split">${splitHTML(f.title)}</h2>
      <a class="btn btn--light" href="${f.cta.href}" data-magnetic>${f.cta.label}<span class="arrow">→</span></a>
    </div>
    <p class="footer__note wrap">${f.note}</p>
  </footer>`;
}
