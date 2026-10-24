const em = (t) => t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Modal para enviar el resultado del quiz por correo (PDF). Se abre con el evento 'cybella:email-result'.
// DISEÑO: aún no genera ni envía el PDF. Cuando exista el correo corporativo, se conecta con cfg.endpoint
// (recibe { email, result, answers }) y el evento 'cybella:email-send' avisa que se pidió el envío.
export function initEmailResult(cfg) {
  const dlg = document.createElement('dialog');
  dlg.className = 'modal modal--email';
  document.body.appendChild(dlg);
  let ctx = null;

  const open = (e) => {
    ctx = e.detail ?? {};
    dlg.innerHTML = `
      <div class="emailres">
        <button class="modal__close" type="button" aria-label="Cerrar">✕</button>
        <form class="emailres__form" novalidate>
          <span class="eyebrow">${cfg.eyebrow}</span>
          <h3 class="display emailres__title">${em(cfg.title)}</h3>
          ${ctx.result ? `<p class="emailres__chip"><span>✦</span>${esc(ctx.result.title)}</p>` : ''}
          <p class="emailres__desc">${cfg.description}</p>
          <label class="emailres__field">
            <span>${cfg.field}</span>
            <input type="email" name="email" inputmode="email" autocomplete="email" placeholder="${cfg.placeholder}" required>
            <small class="emailres__err" role="alert" hidden>${cfg.error}</small>
          </label>
          <button class="btn btn--xl" type="submit">${cfg.submit}<span class="arrow">→</span></button>
          <p class="emailres__legal">${cfg.legal}</p>
        </form>
        <div class="emailres__done" hidden>
          <span class="emailres__tick" aria-hidden="true">✓</span>
          <h3 class="display emailres__title">${em(cfg.doneTitle)}</h3>
          <p class="emailres__desc emailres__sent"></p>
          <button class="btn" type="button" data-close>${cfg.close}</button>
        </div>
      </div>`;
    dlg.showModal();
    dlg.querySelector('input').focus({ preventScroll: true });
  };

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('.modal__close') || e.target.closest('[data-close]')) dlg.close();
  });

  dlg.addEventListener('input', (e) => {
    if (!e.target.matches('input')) return;
    e.target.closest('.emailres__field').classList.remove('has-error');
    dlg.querySelector('.emailres__err').hidden = true;
  });

  dlg.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = dlg.querySelector('input');
    const email = input.value.trim();
    if (!EMAIL.test(email)) {
      input.closest('.emailres__field').classList.add('has-error');
      dlg.querySelector('.emailres__err').hidden = false;
      input.focus();
      return;
    }
    const btn = dlg.querySelector('button[type="submit"]');
    btn.disabled = true; btn.firstChild.textContent = cfg.sending;
    document.dispatchEvent(new CustomEvent('cybella:email-send', { detail: { email, ...ctx } }));
    if (cfg.endpoint) {
      try {
        const res = await fetch(cfg.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, result: ctx.result?.id, answers: ctx.answers }) });
        if (!res.ok) throw new Error(res.status);
      } catch {
        btn.disabled = false; btn.firstChild.textContent = cfg.submit;
        return;
      }
    }
    dlg.querySelector('.emailres__form').hidden = true;
    const done = dlg.querySelector('.emailres__done');
    done.querySelector('.emailres__sent').innerHTML = cfg.doneText.replace('{email}', `<b>${esc(email)}</b>`);
    done.hidden = false;
  });

  document.addEventListener('cybella:email-result', open);
}
