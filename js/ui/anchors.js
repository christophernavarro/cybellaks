// Enlaces internos (#seccion): el desplazamiento se calcula a mano en vez de dejarlo al navegador.
// - "#top" siempre sube al principio (en escritorio el inicio es sticky y el navegador cree que ya está ahí).
// - En las demás secciones se salta el espacio vacío de arriba y el contenido queda centrado bajo el header;
//   si no cabe entero, el título queda justo bajo el header con un poco de aire.
// - El desplazamiento es una animación propia (el "smooth" del navegador es muy rápido y no se puede ajustar).
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GAP = 24;   // aire entre el header y el contenido
// Duración del desplazamiento en milisegundos: crece con la distancia, entre MIN y MAX
const MIN = 900, MAX = 1800, PER_PX = 0.35;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);   // arranca y frena suave
let anim = 0, stopPrev = () => {};

function glide(to) {
  stopPrev();   // si había otra animación en curso (clic rápido en otra sección), se corta antes de empezar
  const from = scrollY, dist = to - from;
  if (reduce || Math.abs(dist) < 2) return scrollTo({ top: to, behavior: 'instant' });
  const dur = Math.min(MAX, Math.max(MIN, Math.abs(dist) * PER_PX));
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';   // el CSS tiene scroll-behavior: smooth y suavizaría cada paso
  let start = 0;
  const stop = () => { cancelAnimationFrame(anim); root.style.scrollBehavior = ''; removeEventListener('wheel', stop); removeEventListener('touchstart', stop); };
  stopPrev = stop;
  addEventListener('wheel', stop, { passive: true });        // si la persona mueve la rueda o toca la pantalla, la animación se detiene
  addEventListener('touchstart', stop, { passive: true });
  const step = (now) => {
    start ||= now;
    const t = Math.min(1, (now - start) / dur);
    scrollTo(0, from + dist * ease(t));
    if (t < 1) anim = requestAnimationFrame(step); else stop();
  };
  anim = requestAnimationFrame(step);
}

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
    glide(targetY(section));
    history.replaceState(null, '', id === 'top' ? location.pathname + location.search : `#${id}`);
  });
}
