import { resolveResult } from './engine.js';
import { loadState, saveState, resetState } from './state.js';
import { media } from '../ui/art.js';
import { petals } from '../ui/motion.js';

const LETTERS = 'ABCDEFGH';
const RISE = ['~2 minutos', 'Sin registro', 'Recomendación a tu medida'];   // textos que rotan en la intro

export function mountQuiz({ questions, results, copy }) {
  const stage = document.getElementById('quiz-stage');
  const progress = document.querySelector('.quiz__progress');
  const bar = progress.querySelector('.quiz__bar');
  const count = progress.querySelector('.quiz__count');
  const petalsBox = document.querySelector('.quiz__petals');
  const layout = document.querySelector('.quiz__layout');
  const arts = [...layout.querySelectorAll('.qaside__art')];
  const numBox = layout.querySelector('.qaside__num');
  const chips = layout.querySelector('.qaside__chips');
  const bg = layout.querySelector('.qbg');
  const KINDS = ['room', 'lamp', 'garden'];
  const em = (t) => t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const pad = (n) => String(n).padStart(2, '0');
  let state = loadState();

  // Lateral: ilustración que cambia con cada pregunta, numeral grande y chips con lo ya respondido
  function updateAside() {
    const mode = state.done ? 'result' : state.started ? 'q' : 'intro';
    layout.dataset.mode = mode;
    const idx = mode === 'q' ? state.step % arts.length : 0;
    arts.forEach((a, i) => a.classList.toggle('on', i === idx));
    numBox.innerHTML = mode === 'q'
      ? `<span class="qnum" key="${state.step}">${pad(state.step + 1)}</span><small>/ ${pad(questions.length)}</small>` : '';
    const labels = mode === 'q'
      ? questions.slice(0, state.step).map((q) => {
          const a = state.answers[q.id];
          return q.options.filter((o) => (Array.isArray(a) ? a.includes(o.id) : a === o.id)).map((o) => o.label).join(', ');
        }).filter(Boolean)
      : [];
    chips.innerHTML = labels.map((l, i) => `<li style="--i:${i}">${l}</li>`).join('');
  }

  // Cambia de pantalla con salida/entrada animadas
  function swap(html, dir = 1) {
    const paint = () => {
      stage.innerHTML = html;
      stage.dataset.dir = dir;
      stage.classList.remove('leave');
      stage.classList.add('enter');
      stage.querySelector('[data-focus]')?.focus({ preventScroll: true });
    };
    if (!stage.firstElementChild) return paint();
    stage.classList.remove('enter');
    stage.classList.add('leave');
    setTimeout(paint, 280);
  }

  function setProgress(step, total) {
    progress.hidden = false;
    bar.style.setProperty('--p', total ? step / total : 0);
    count.textContent = step >= total ? 'Listo' : `Pregunta ${step + 1} de ${total}`;
  }

  // Fondo de la derecha: imagen de la opción en foco o seleccionada, con borde difuminado
  function showBg(id) {
    bg.querySelectorAll('.qbg__img').forEach((el) => el.classList.toggle('on', el.dataset.opt === id));
    bg.classList.toggle('has', !!id);
  }
  function buildBg(q) {
    bg.innerHTML = q.options.map((o, i) =>
      `<div class="qbg__img" data-opt="${o.id}">${media({ image: o.image, art: o.art ?? KINDS[i % KINDS.length], alt: '' })}</div>`).join('');
  }
  function currentSel() {
    const a = state.answers[questions[state.step]?.id];
    return Array.isArray(a) ? a[a.length - 1] : a;
  }

  function renderIntro() {
    showBg(null);
    progress.hidden = true;
    updateAside();
    swap(`
      <div class="qintro">
        <span class="qintro__tag">✦ Quiz de ${questions.length} preguntas</span>
        <h3 class="display qintro__title">${em(copy.introTitle ?? copy.title)}</h3>
        <p class="qintro__lead">${copy.lead}</p>
        <p class="qintro__rotor" aria-label="${RISE.join('. ')}">
          <span class="rotor" aria-hidden="true"><span class="rotor__word is-in" data-i="0">${RISE[0]}</span></span>
        </p>
        <button class="btn btn--xl qintro__cta" type="button" data-act="start" data-focus>${copy.start}<span class="arrow">→</span></button>
      </div>`);
  }

  function renderQuestion(dir = 1) {
    const q = questions[state.step];
    const picked = state.answers[q.id];
    const sel = (id) => (Array.isArray(picked) ? picked.includes(id) : picked === id);
    setProgress(state.step, questions.length);
    updateAside();
    buildBg(q); showBg(currentSel());
    swap(`
      <div class="qstep">
        <h3 class="display qstep__title">${q.title}</h3>
        ${q.subtitle ? `<p class="qstep__sub">${q.subtitle}</p>` : ''}
        <div class="options" role="${q.type === 'multi' ? 'group' : 'radiogroup'}" aria-label="${q.title}">
          ${q.options.map((o, i) => `
            <button type="button" class="option ${sel(o.id) ? 'is-selected' : ''}" style="--i:${i}"
                    role="${q.type === 'multi' ? 'checkbox' : 'radio'}" aria-checked="${sel(o.id)}" data-opt="${o.id}">
              <span class="option__key">${LETTERS[i]}</span>
              <span class="option__text"><b>${o.label}</b>${o.hint ? `<small>${o.hint}</small>` : ''}</span>
              <span class="option__check" aria-hidden="true">✓</span>
            </button>`).join('')}
        </div>
        <div class="qstep__nav">
          <button class="link-arrow link-arrow--back" type="button" data-act="back" ${state.step === 0 ? 'hidden' : ''}>← Anterior</button>
          ${q.type === 'multi' ? `<button class="btn" type="button" data-act="next" ${picked?.length ? '' : 'disabled'}>Continuar<span class="arrow">→</span></button>` : ''}
        </div>
      </div>`, dir);
  }

  function renderResult() {
    const r = resolveResult(state.answers, results);
    setProgress(questions.length, questions.length);
    updateAside();
    showBg(null);
    swap(`
      <div class="result">
        <div class="result__media" data-mask-lite>${media({ ...r, alt: r.title })}<span class="result__sticker">✦ Tu estilo</span></div>
        <div class="result__body">
          <span class="eyebrow">${r.eyebrow}</span>
          <h3 class="display result__title">${r.title}</h3>
          <p class="result__summary">${r.summary}</p>
          <p>${r.description}</p>
          <ul class="result__tips">${r.tips.map((t, i) => `<li style="--i:${i}">${t}</li>`).join('')}</ul>
          <div class="result__cta">
            <a class="btn" href="${r.cta.href}">${r.cta.label}<span class="arrow">→</span></a>
            <button class="btn btn--ghost" type="button" data-act="restart">Repetir el quiz</button>
          </div>
        </div>
      </div>`);
    setTimeout(() => petals(petalsBox), 350);
  }

  function render(dir = 1) {
    if (state.done) return renderResult();
    if (!state.started) return renderIntro();
    renderQuestion(dir);
  }

  function choose(optId) {
    const q = questions[state.step];
    showBg(optId);
    if (q.type === 'multi') {
      const cur = new Set(state.answers[q.id] ?? []);
      cur.has(optId) ? cur.delete(optId) : cur.add(optId);
      state.answers[q.id] = [...cur];
      saveState(state);
      stage.querySelectorAll('.option').forEach((b) => {
        const on = cur.has(b.dataset.opt);
        b.classList.toggle('is-selected', on); b.setAttribute('aria-checked', on);
      });
      stage.querySelector('[data-act="next"]').disabled = !cur.size;
      return;
    }
    state.answers[q.id] = optId;
    saveState(state);
    stage.querySelectorAll('.option').forEach((b) => {
      const on = b.dataset.opt === optId;
      b.classList.toggle('is-selected', on); b.setAttribute('aria-checked', on);
    });
    setTimeout(next, 700); // deja ver la micro-interacción de selección
  }

  function next() {
    if (state.step < questions.length - 1) { state.step++; saveState(state); renderQuestion(1); }
    else { state.done = true; saveState(state); renderResult(); }
  }

  const optId = (e) => e.target.closest('[data-opt]')?.dataset.opt;
  stage.addEventListener('pointerover', (e) => { if (e.pointerType === 'mouse' && optId(e)) showBg(optId(e)); });
  stage.addEventListener('pointerout', (e) => { if (e.pointerType === 'mouse' && optId(e) && !e.relatedTarget?.closest?.('[data-opt]')) showBg(currentSel()); });
  stage.addEventListener('focusin', (e) => { if (optId(e)) showBg(optId(e)); });
  stage.addEventListener('focusout', (e) => { if (optId(e) && !e.relatedTarget?.closest?.('[data-opt]')) showBg(currentSel()); });

  stage.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-opt]');
    if (opt) return choose(opt.dataset.opt);
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'start') { state.started = true; saveState(state); renderQuestion(1); }
    if (act === 'next') next();
    if (act === 'back' && state.step > 0) { state.step--; saveState(state); renderQuestion(-1); }
    if (act === 'restart') { state = resetState(); render(); }
  });

  // CTA externos (hero, modal): llevan al quiz y lo inician si aún no empezó
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-quiz-start]')) return;
    if (!state.started && !state.done) setTimeout(() => stage.querySelector('[data-act="start"]')?.focus({ preventScroll: true }), 700);
  });

  // Intro: un solo texto con subrayado que va cambiando
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) setInterval(() => {
    const w = stage.querySelector('.rotor__word');
    if (!w || document.hidden) return;
    w.classList.remove('is-in'); w.classList.add('is-out');
    setTimeout(() => {
      if (!w.isConnected) return;
      const i = (+w.dataset.i + 1) % RISE.length;
      w.dataset.i = i; w.textContent = RISE[i];
      w.classList.remove('is-out'); void w.offsetWidth; w.classList.add('is-in');
    }, 420);
  }, 2800);

  render();
}
