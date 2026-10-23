// Punto pequeño burdeos que sigue al mouse por toda la página. Reemplaza la flecha del mouse. Es solo visual: pointer-events:none, así no impide ningún clic.
// No se activa en pantallas táctiles ni si la persona pidió reducir el movimiento.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initLens() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const el = document.createElement('div');
  el.className = 'lens';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  document.documentElement.classList.add('has-lens');   // oculta la flecha del mouse; el punto la reemplaza

  // Los modales (<dialog>) se abren en la capa superior del navegador, por encima de cualquier z-index, y tapaban el punto.
  // El punto vive en esa misma capa (popover) y se vuelve a poner encima cada vez que se abre o cierra un modal.
  if ('showPopover' in el) {
    el.popover = 'manual';
    el.showPopover();
    const raise = () => { el.hidePopover(); el.showPopover(); };
    new MutationObserver(raise).observe(document.body, { subtree: true, attributeFilter: ['open'] });
  }

  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
  const loop = () => {
    const dx = tx - x, dy = ty - y;
    x += dx * 0.45; y += dy * 0.45;   // casi pegado al mouse, como un puntero real
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
