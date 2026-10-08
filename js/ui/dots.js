// Campo de puntos del hero: los puntos se apartan del cursor (como despejando el área) y vuelven a su lugar con resorte.
const SPACING = 26;        // distancia entre puntos
const RADIUS = 150;        // radio del área que se despeja
const PUSH = 70;           // cuánto se desplazan los puntos
const RGB = '162,79,93';   // --rose-deep

export function initDots(hero) {
  const canvas = hero.querySelector('.hero__dots');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dots = [], w = 0, h = 0, dpr = 1, raf = 0, visible = true;
  const mouse = { x: -9999, y: -9999 };

  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    const cols = Math.ceil(w / SPACING) + 1, rows = Math.ceil(h / SPACING) + 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = c * SPACING + (r % 2 ? SPACING / 2 : 0), y = r * SPACING;
      dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
    }
    draw();
  }

  function step() {
    for (const d of dots) {
      const dx = d.ox - mouse.x, dy = d.oy - mouse.y, dist = Math.hypot(dx, dy);
      let tx = d.ox, ty = d.oy;
      if (dist < RADIUS && dist > 0.01) {
        const k = Math.pow(1 - dist / RADIUS, 1.6) * PUSH;   // más empuje cerca del cursor
        tx += (dx / dist) * k * 2; ty += (dy / dist) * k * 2;
      }
      d.vx = (d.vx + (tx - d.x) * 0.12) * 0.78;
      d.vy = (d.vy + (ty - d.y) * 0.12) * 0.78;
      d.x += d.vx; d.y += d.vy;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      const near = Math.max(0, 1 - Math.hypot(d.ox - mouse.x, d.oy - mouse.y) / RADIUS);
      const alpha = 0.34 * (1 - near * 0.6);
      ctx.fillStyle = `rgba(${RGB},${alpha.toFixed(3)})`;
      ctx.beginPath(); ctx.arc(d.x, d.y, 1.5 + near * 1.1, 0, 6.2832); ctx.fill();
    }
  }

  function loop() {
    step(); draw();
    // se detiene cuando todo está en reposo y no hay cursor encima
    const moving = dots.some((d) => Math.abs(d.vx) + Math.abs(d.vy) > 0.02 || Math.abs(d.x - d.ox) > 0.1);
    raf = visible && moving ? requestAnimationFrame(loop) : 0;
  }
  const wake = () => { if (!raf && visible && !reduce) raf = requestAnimationFrame(loop); };

  const move = (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; wake();
  };
  const leave = () => { mouse.x = mouse.y = -9999; wake(); };
  hero.addEventListener('pointermove', move);
  hero.addEventListener('pointerdown', move);
  hero.addEventListener('pointerleave', leave);
  hero.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') leave(); });
  new ResizeObserver(build).observe(hero);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); }).observe(hero);
  build();
}
