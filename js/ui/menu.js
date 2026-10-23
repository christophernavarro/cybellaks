// Menú hamburguesa para celular: el botón del header abre un panel a pantalla completa con las secciones.
// Se cierra con el mismo botón, al elegir una sección, con Escape o si la pantalla vuelve a ser ancha.
export function initMenu() {
  const hd = document.querySelector('.header');
  const btn = document.querySelector('.burger');
  const panel = document.getElementById('mnav');
  if (!hd || !btn || !panel) return;
  const wide = matchMedia('(min-width: 761px)');

  const set = (open) => {
    hd.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.documentElement.classList.toggle('menu-open', open);   // bloquea el scroll de la página detrás
    hd.classList.toggle('is-stuck', open || scrollY > 40);
  };

  btn.addEventListener('click', () => set(!hd.classList.contains('is-open')));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hd.classList.contains('is-open')) { set(false); btn.focus(); }
  });
  wide.addEventListener('change', (e) => { if (e.matches) set(false); });
}
