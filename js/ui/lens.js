// Punto pequeño burdeos que sigue al mouse por toda la página. Es solo visual: pointer-events:none, así no impide ningún clic.
// No se activa en pantallas táctiles ni si la persona pidió reducir el movimiento.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initLens() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const el = document.createElement('div');
  el.className = 'lens';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);

  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
  const loop = () => {
    const dx = tx - x, dy = ty - y;
    x += dx * 0.18; y += dy * 0.18;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
  };

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY;
    el.classList.add('on');
    el.classList.toggle('is-link', !!e.target.closest?.('a, button, input, select, textarea, label, [role="button"]'));
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => el.classList.remove('on'));
  addEventListener('pointerdown', () => el.classList.add('is-down'));
  addEventListener('pointerup', () => el.classList.remove('is-down'));
}
