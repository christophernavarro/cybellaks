import { isNight } from './theme.js';

// Al poner el cursor sobre el texto del inicio (o enfocarlo con el teclado), la foto pasa a su versión contraria:
// de día a noche, o de noche a día si toda la página está en modo noche.
// En pantallas táctiles, un toque sobre el texto alterna día y noche.
export function initHeroNight() {
  const hero = document.querySelector('.hero');
  const copy = hero?.querySelector('.hero__copy');
  if (!copy) return;
  // El cursor sobre el texto invierte el estado: de día pasa a noche, y con la página en modo noche pasa a día.
  let hover = false;
  const sync = () => {
    const on = hover !== isNight();
    hero.classList.toggle('is-night', on);
    document.documentElement.toggleAttribute('data-night', on);
  };
  const set = (on) => { hover = on; sync(); };
  addEventListener('cybella:theme', sync);
  sync();
  copy.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') set(true); });
  copy.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') set(false); });
  copy.addEventListener('focusin', () => set(true));
  copy.addEventListener('focusout', () => set(false));
  copy.addEventListener('click', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse' && !e.target.closest('a')) set(!hover);
  });
}

// Puntos sobre la foto: se ubican según la parte visible de la imagen (recorte "cover") y se abren al pasar el mouse o al tocar.
export function initHeroSpots() {
  const hero = document.querySelector('.hero');
  const layers = [...document.querySelectorAll('.hero__spots')];
  if (!hero || !layers.length) return;

  const place = () => {
    const W = hero.clientWidth, H = hero.clientHeight;
    layers.forEach((layer) => {
      const r = parseFloat(layer.dataset.ratio);
      const [px, py] = layer.dataset.pos.split(' ').map((v) => parseFloat(v) / 100);
      const iw = Math.max(W, H * r), ih = iw / r;                 // tamaño de la foto al cubrir el inicio
      const ox = (W - iw) * px, oy = (H - ih) * py;               // desplazamiento por el recorte
      layer.querySelectorAll('.spot').forEach((s) => {
        const x = ox + iw * parseFloat(s.style.getPropertyValue('--x')) / 100;
        const y = oy + ih * parseFloat(s.style.getPropertyValue('--y')) / 100;
        s.style.left = x.toFixed(1) + 'px';
        s.style.top = y.toFixed(1) + 'px';
        s.classList.toggle('is-left', x > W * 0.5);
        s.classList.toggle('is-up', y > H * 0.55);
      });
    });
  };
  place();
  addEventListener('resize', place, { passive: true });

  const closeAll = (except) => layers.forEach((l) => l.querySelectorAll('.spot.is-open').forEach((s) => {
    if (s !== except) { s.classList.remove('is-open'); s.setAttribute('aria-expanded', 'false'); }
  }));
  hero.addEventListener('click', (e) => {
    const s = e.target.closest('.spot');
    closeAll(s);
    if (!s) return;
    const open = s.classList.toggle('is-open');
    s.setAttribute('aria-expanded', String(open));
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}
