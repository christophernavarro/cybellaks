import { site } from './data/site.js';
import { services } from './data/services.js';
import { questions } from './data/quiz.questions.js';
import { results } from './data/quiz.results.js';
import { validate } from './quiz/engine.js';
import { mountQuiz } from './quiz/view.js';
import { header, hero, marquee } from './components/hero.js';
import { servicesSection } from './components/services.js';
import { quizSection } from './components/quiz.js';
import { contactSection, initContact } from './components/contact.js';
import { footer } from './components/footer.js';
import { initModal } from './components/modal.js';
import { initDots } from './ui/dots.js';
import { initReveal, initScroll, initMagnetic } from './ui/motion.js';

document.getElementById('app').innerHTML = [
  header(site),
  '<main>',
  hero(site),
  marquee(site),
  servicesSection(site, services),
  quizSection(site),
  contactSection(site, services),
  '</main>',
  footer(site),
].join('');

const issues = validate(questions, results);
if (issues.length) console.warn('[quiz] Revisa la tabla de resultados:\n' + issues.join('\n'));

mountQuiz({ questions, results, copy: site.quiz });
initModal(services);
initContact(site.contact, services);
initReveal();
initScroll();
initMagnetic();
initDots(document.querySelector('.hero'));

// El header cambia de estilo al bajar
const hd = document.querySelector('.header');
const onScroll = () => hd.classList.toggle('is-stuck', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();
