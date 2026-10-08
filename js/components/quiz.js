import { splitHTML } from '../ui/motion.js';

// Contenedor del quiz; el flujo lo pinta quiz/view.js dentro de #quiz-stage.
export function quizSection({ quiz: q }) {
  return `
  <section class="section quiz" id="quiz">
    <div class="quiz__petals" aria-hidden="true"></div>
    <div class="wrap quiz__wrap">
      <header class="section__head section__head--center">
        <span class="eyebrow" data-reveal>${q.eyebrow}</span>
        <h2 class="display section__title split">${splitHTML(q.title)}</h2>
      </header>
      <div class="quiz__panel" data-reveal style="--i:2">
        <div class="quiz__progress" hidden><span class="quiz__bar"></span><span class="quiz__count"></span></div>
        <div id="quiz-stage" class="quiz__stage" aria-live="polite"></div>
      </div>
    </div>
  </section>`;
}
