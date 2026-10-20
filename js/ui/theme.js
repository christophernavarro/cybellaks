// Modo día / noche de toda la página. Se activa con el símbolo del encabezado y se recuerda en el navegador.
// En modo noche el punto del símbolo se ve rosa y encendido; de día es oscuro.
const KEY = 'cybellaks.theme';
const root = document.documentElement;

export const isNight = () => root.dataset.theme === 'night';

export function initTheme() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const paint = () => {
    const night = isNight();
    const label = night ? 'Cambiar a modo día' : 'Cambiar a modo noche';
    btn.setAttribute('aria-pressed', String(night));
    btn.setAttribute('aria-label', label);
    btn.title = label;
  };
  paint();
  btn.addEventListener('click', () => {
    root.classList.add('theme-anim');
    const night = !isNight();
    if (night) root.dataset.theme = 'night'; else delete root.dataset.theme;
    try { localStorage.setItem(KEY, night ? 'night' : 'day'); } catch (e) { /* sin almacenamiento: no se recuerda */ }
    paint();
    dispatchEvent(new CustomEvent('cybella:theme'));
    setTimeout(() => root.classList.remove('theme-anim'), 800);
  });
}
