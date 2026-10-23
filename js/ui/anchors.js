// Enlaces internos (#seccion): el desplazamiento se calcula a mano en vez de dejarlo al navegador.
// - "#top" siempre sube al principio (en escritorio el inicio es sticky y el navegador cree que ya está ahí).
// - En las demás secciones se salta el espacio vacío de arriba y el contenido queda centrado bajo el header;
//   si no cabe entero, el título queda justo bajo el header con un poco de aire.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GAP = 24;   // aire entre el header y el contenido

function targetY(section) {
  if (section.id === 'top') return 0;
  const header = document.querySelector('.header')?.offsetHeight ?? 0;
  const cs = getComputedStyle(section);
  const r = section.getBoundingClientRect();
  const top = r.top + scrollY + parseFloat(cs.paddingTop);              // donde empieza el contenido
  const height = r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const room = innerHeight - header - GAP * 2;                          // alto visible bajo el header
  const offset = height < room ? (room - height) / 2 : 0;
  return Math.max(0, top - header - GAP - offset);
}

export function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = a.getAttribute('href').slice(1);
    const section = id && document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    // Si el clic vino del menú hamburguesa, este acaba de quitar el bloqueo de scroll: leer el alto obliga al navegador a aplicarlo antes de desplazar
    void document.documentElement.offsetHeight;
    scrollTo({ top: targetY(section), behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id === 'top' ? location.pathname + location.search : `#${id}`);
  });
}
