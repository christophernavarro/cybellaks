import { site } from './data/site.js';
import { services } from './data/services.js';
import { questions } from './data/quiz.questions.js';
import { results } from './data/quiz.results.js';
import { validate } from './quiz/engine.js';
import { mountQuiz } from './quiz/view.js';
import { header, hero, marquee } from './components/hero.js';
import { servicesSection } from './components/services.js';
import { spacesSection, initSpacesLightbox } from './components/spaces.js';
import { quizSection } from './components/quiz.js';
import { footer } from './components/footer.js';
import { initModal } from './components/modal.js';
import { initCheckout } from './components/checkout.js';
import { initReveal, initScroll, initMagnetic, initHoverMove } from './ui/motion.js';
import { initLens } from './ui/lens.js';
import { initHeroNight, initHeroSpots } from './ui/heroNight.js';
import { initTheme } from './ui/theme.js';

document.getElementById('app').innerHTML = [
  header(site),
  '<main>',
  hero(site),
  marquee(site),
  servicesSection(site, services),
  spacesSection(site),
  quizSection(site),
  '</main>',
  footer(site),
].join('');

const issues = validate(questions, results);
if (issues.length) console.warn('[quiz] Revisa la tabla de resultados:\n' + issues.join('\n'));

mountQuiz({ questions, results, copy: site.quiz });
initModal(services);
initSpacesLightbox(site);
initCheckout(site.quiz.actions.fullQuiz);
initReveal();
initScroll();
initMagnetic();
initHoverMove();
initLens();
initTheme();
initHeroNight();
initHeroSpots();

// El header cambia de estilo al bajar
const hd = document.querySelector('.header');
const onScroll = () => hd.classList.toggle('is-stuck', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();
