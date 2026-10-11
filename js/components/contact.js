import { splitHTML } from '../ui/motion.js';
import { loadState } from '../quiz/state.js';
import { resolveResult } from '../quiz/engine.js';
import { results } from '../data/quiz.results.js';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function contactSection({ contact: c }, services) {
  return `
  <section class="section contact" id="contacto">
    <div class="wrap contact__grid">
      <div class="contact__intro">
        <span class="eyebrow" data-reveal>${c.eyebrow}</span>
        <h2 class="display section__title split">${splitHTML(c.title)}</h2>
        <p class="section__lead" data-reveal style="--i:2">${c.lead}</p>
        <ul class="contact__info" data-reveal style="--i:3">
          <li><span>Correo</span><a href="mailto:${c.email}">${c.email}</a></li>
          <li><span>WhatsApp</span><a href="${c.whatsapp.href}" target="_blank" rel="noopener">${c.whatsapp.label}</a></li>
          <li><span>Horario</span><b>${c.hours}</b></li>
        </ul>
      </div>

      <div class="cform-wrap" data-reveal style="--i:2">
        <form class="cform" id="contact-form" novalidate>
          <div class="cform__quiz" hidden></div>

          <div class="field">
            <label for="cf-name">Nombre</label>
            <input id="cf-name" name="name" type="text" autocomplete="name" required placeholder="Tu nombre">
            <p class="field__err" data-err="name"></p>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="cf-email">Correo</label>
              <input id="cf-email" name="email" type="email" autocomplete="email" required placeholder="tu@correo.com">
              <p class="field__err" data-err="email"></p>
            </div>
            <div class="field">
              <label for="cf-phone">Teléfono <small>(opcional)</small></label>
              <input id="cf-phone" name="phone" type="tel" autocomplete="tel" placeholder="+56 9 ...">
            </div>
          </div>
          <div class="field">
            <label for="cf-topic">¿Qué te interesa?</label>
            <select id="cf-topic" name="topic">
              ${services.map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`).join('')}
              <option value="Otro">Otro / aún no lo sé</option>
            </select>
          </div>
          <div class="field">
            <label for="cf-message">Mensaje</label>
            <textarea id="cf-message" name="message" rows="5" required placeholder="Cuéntanos sobre tu espacio, medidas, ideas o presupuesto"></textarea>
            <p class="field__err" data-err="message"></p>
          </div>

          <input class="cform__hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">

          <label class="check" for="cf-consent">
            <input id="cf-consent" name="consent" type="checkbox" required>
            <span class="check__box" aria-hidden="true">✓</span>
            <span>Acepto que usen mis datos para responder esta consulta.</span>
          </label>
          <p class="field__err" data-err="consent"></p>

          <button class="btn" type="submit">${c.submit}<span class="arrow">→</span></button>
          <p class="cform__status" role="status" aria-live="polite"></p>
        </form>

        <div class="cform-done" hidden>
          <span class="cform-done__icon" aria-hidden="true">✓</span>
          <h3 class="display">¡Gracias!</h3>
          <p class="cform-done__msg"></p>
          <button class="btn btn--ghost" type="button" data-again>Enviar otro mensaje</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function initContact(c, services) {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const done = document.querySelector('.cform-done');
  const status = form.querySelector('.cform__status');
  const quizBox = form.querySelector('.cform__quiz');
  const topic = form.elements.topic;

  // Si la persona ya hizo el quiz, se muestra su resultado y se preselecciona la categoría relacionada
  let quizResult = null;
  const syncQuiz = () => {
    const st = loadState();
    quizResult = st.done ? resolveResult(st.answers, results) : null;
    quizBox.hidden = !quizResult;
    quizBox.innerHTML = quizResult ? `<span>Tu resultado del quiz</span><b>${esc(quizResult.title)}</b>` : '';
    const svc = quizResult && services.find((s) => s.id === quizResult.service);
    if (svc && !topic.dataset.touched) topic.value = svc.title;
  };
  topic.addEventListener('change', () => { topic.dataset.touched = '1'; });
  syncQuiz();
  document.getElementById('quiz').addEventListener('click', () => setTimeout(syncQuiz, 900));  // el resultado aparece al terminar el quiz

  const rules = {
    name: (v) => (v.trim().length < 2 ? 'Escribe tu nombre.' : ''),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escribe un correo válido, por ejemplo tu@correo.com.'),
    message: (v) => (v.trim().length < 10 ? 'Cuéntanos un poco más (mínimo 10 caracteres).' : ''),
    consent: () => (form.elements.consent.checked ? '' : 'Necesitamos tu autorización para responderte.'),
  };
  const showErr = (name, msg) => {
    const el = form.querySelector(`[data-err="${name}"]`);
    const input = form.elements[name];
    if (el) el.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    input.closest('.field, .check')?.classList.toggle('has-error', !!msg);
  };
  const validate = (name) => {
    const v = name === 'consent' ? '' : form.elements[name].value;
    const msg = rules[name](v);
    showErr(name, msg);
    return !msg;
  };
  Object.keys(rules).forEach((n) => {
    form.elements[n].addEventListener('blur', () => validate(n));
    form.elements[n].addEventListener('input', () => { if (form.elements[n].getAttribute('aria-invalid') === 'true') validate(n); });
  });

  const buildText = (d) => [
    `Nombre: ${d.name}`,
    `Correo: ${d.email}`,
    d.phone ? `Teléfono: ${d.phone}` : null,
    `Interés: ${d.topic}`,
    quizResult ? `Resultado del quiz: ${quizResult.title}` : null,
    '',
    d.message,
  ].filter((line) => line !== null).join('\n');

  const finish = (msg) => {
    form.hidden = true; done.hidden = false;
    done.querySelector('.cform-done__msg').textContent = msg;
    done.classList.remove('is-in'); void done.offsetWidth; done.classList.add('is-in');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(validate).every(Boolean);
    if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); status.textContent = 'Revisa los campos marcados.'; return; }
    status.textContent = '';
    const d = Object.fromEntries(new FormData(form));
    if (d.website) return finish('Gracias.');   // trampa para bots: campo oculto que una persona no llena
    const btn = form.querySelector('button[type="submit"]');

    if (c.endpoint) {
      btn.disabled = true; btn.classList.add('is-loading');
      try {
        const res = await fetch(c.endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: d.name, email: d.email, phone: d.phone, topic: d.topic, quiz: quizResult?.title ?? '', message: d.message }),
        });
        if (!res.ok) throw new Error(res.status);
        form.reset(); finish('Recibimos tu mensaje. Te responderemos pronto.');
      } catch {
        status.textContent = `No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a ${c.email}.`;
      } finally { btn.disabled = false; btn.classList.remove('is-loading'); }
    } else {
      // Sin servicio de formularios configurado: abre el correo del visitante con el mensaje listo
      const href = `mailto:${c.email}?subject=${encodeURIComponent('Consulta desde el sitio: ' + d.topic)}&body=${encodeURIComponent(buildText(d))}`;
      location.href = href;
      finish(`Se abrió tu aplicación de correo con el mensaje listo. Envíalo para completar tu consulta, o escríbenos a ${c.email}.`);
    }
  });

  done.querySelector('[data-again]').addEventListener('click', () => {
    form.hidden = false; done.hidden = true; form.reset(); syncQuiz();
    form.querySelectorAll('.has-error').forEach((n) => n.classList.remove('has-error'));
    form.elements.name.focus();
  });
}
