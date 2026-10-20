// Al poner el cursor sobre el texto del inicio (o enfocarlo con el teclado), la foto pasa a su versión de noche.
// En pantallas táctiles, un toque sobre el texto alterna día y noche.
export function initHeroNight() {
  const hero = document.querySelector('.hero');
  const copy = hero?.querySelector('.hero__copy');
  if (!copy) return;
  const set = (on) => {
    hero.classList.toggle('is-night', on);
    document.documentElement.toggleAttribute('data-night', on);
  };
  copy.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') set(true); });
  copy.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') set(false); });
  copy.addEventListener('focusin', () => set(true));
  copy.addEventListener('focusout', () => set(false));
  copy.addEventListener('click', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse' && !e.target.closest('a')) set(!hero.classList.contains('is-night'));
  });
}
