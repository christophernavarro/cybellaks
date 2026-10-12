// Utilidades de animación: reveal, split de texto, parallax, botones magnéticos y pétalos.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// "Hola *mundo*" → palabras con máscara; lo marcado con * va en cursiva (<em>)
export function splitHTML(text) {
  let i = 0;
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((chunk) => {
      const em = chunk.startsWith('*');
      const words = (em ? chunk.slice(1, -1) : chunk).split(/\s+/).filter(Boolean);
      const html = words.map((w) => `<span class="w" style="--wi:${i++}"><span>${w}</span></span>`).join(' ');
      return em ? `<em>${html}</em>` : html;
    })
    .join(' ');
}
export const plain = (t) => t.replace(/\*/g, '');

export function initReveal(root = document) {
  const els = root.querySelectorAll('[data-reveal], [data-mask], [data-lines], .split');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  // Un elemento recortado por clip-path tiene área 0 y nunca "intersecta": se observa su contenedor.
  const targetOf = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      targetOf.get(e.target).forEach((el) => el.classList.add('is-in'));
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => {
    const t = el.hasAttribute('data-mask') ? el.parentElement : el;
    if (!targetOf.has(t)) { targetOf.set(t, []); io.observe(t); }
    targetOf.get(t).push(el);
  });
}

// Parallax + barra de progreso, un único rAF
export function initScroll() {
  const items = [...document.querySelectorAll('[data-parallax]')];
  const bar = document.querySelector('.scroll-progress');
  const hero = document.querySelector('.hero');
  let ticking = false;
  const run = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    if (hero) hero.style.setProperty('--cover', Math.min(1, Math.max(0, scrollY / innerHeight)).toFixed(3));
    if (reduce) return;
    const k = innerWidth < 900 ? 0.45 : 1;   // menos desplazamiento en pantallas chicas
    for (const el of items) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      const mid = r.top + r.height / 2 - innerHeight / 2;
      el.style.setProperty('--py', `${(-mid * parseFloat(el.dataset.parallax) * k).toFixed(1)}px`);
      if (el.dataset.parallaxX) el.style.setProperty('--px', `${(-mid * parseFloat(el.dataset.parallaxX) * k).toFixed(1)}px`);
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  addEventListener('resize', run);
  run();
}

// Las imágenes con [data-hover] se desplazan en sentido contrario al mouse. Delegado, así también cubre lo que se crea después.
export function initHoverMove() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let cur = null;
  const set = (el, x, y) => { el.style.setProperty('--mx', x.toFixed(3)); el.style.setProperty('--my', y.toFixed(3)); };
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest?.('[data-hover]') ?? null;
    if (cur && cur !== el) set(cur, 0, 0);
    cur = el;
    if (!el) return;
    const r = el.getBoundingClientRect();
    set(el, ((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  }, { passive: true });
}

// Botones que "siguen" levemente al cursor
export function initMagnetic() {
  if (reduce || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Lluvia de pétalos al mostrar el resultado
export function petals(container, count = 26) {
  if (reduce) return;
  const colors = ['#dca4a9', '#c98791', '#e6bcc1', '#a24f5d'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % 4]};--dx:${(Math.random() - 0.5) * 160}px;--rot:${Math.random() * 540}deg;animation-delay:${Math.random() * 0.6}s;animation-duration:${2.4 + Math.random() * 1.8}s;width:${8 + Math.random() * 10}px;height:${12 + Math.random() * 12}px`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 5200);
  }
}
