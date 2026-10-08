import { splitHTML } from '../ui/motion.js';
import { art } from '../ui/art.js';

// Contenedor del quiz; el flujo lo pinta quiz/view.js dentro de #quiz-stage y actualiza el lateral (.qaside).
export function quizSection({ quiz: q }) {
  return `
  <section class="section quiz" id="quiz">
    <div class="quiz__ghost" aria-hidden="true">Quiz</div>
    <div class="quiz__petals" aria-hidden="true"></div>
    <div class="wrap quiz__wrap">
      <header class="section__head section__head--center">
        <span class="eyebrow" data-reveal>${q.eyebrow}</span>
        <h2 class="display section__title split">${splitHTML(q.title)}</h2>
      </header>

      <div class="quiz__layout" data-mode="intro" data-reveal style="--i:2">
        <aside class="qaside" aria-hidden="true">
          <div class="qaside__frame">
            ${['room', 'lamp', 'garden'].map((k, i) => `<div class="qaside__art ${i === 0 ? 'on' : ''}">${art(k)}</div>`).join('')}
            <div class="qaside__num display"></div>
          </div>
          <ul class="qaside__chips"></ul>
          <div class="qaside__sticker"><span>✦</span></div>
        </aside>

        <div class="quiz__panel">
          <div class="quiz__progress" hidden><span class="quiz__bar"></span><span class="quiz__count"></span></div>
          <div id="quiz-stage" class="quiz__stage" aria-live="polite"></div>
        </div>
      </div>
    </div>
  </section>`;
}
