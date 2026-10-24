
const em = (t) => t.replace(/\*([^*]+)\*/g, '<em>$1</em>');

// Panel del quiz completo de pago. Se abre con el evento 'cybella:checkout'.
// Con paymentUrl lleva a la pasarela; sin él, el botón solo cierra el panel (el flujo del final del quiz está pendiente).
export function initCheckout(cfg) {
  const dlg = document.createElement('dialog');
  dlg.className = 'modal modal--checkout';
  document.body.appendChild(dlg);

  const open = () => {
    dlg.innerHTML = `
      <div class="checkout">
        <button class="modal__close" type="button" aria-label="Cerrar">✕</button>
        <span class="eyebrow">${cfg.eyebrow}</span>
        <h3 class="display checkout__title">${em(cfg.title)}</h3>
        <p class="checkout__desc">${cfg.description}</p>
        <ul class="checkout__list">${cfg.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
        <div class="checkout__buy">
          ${cfg.paymentUrl
            ? `<a class="btn btn--xl" href="${cfg.paymentUrl}" data-pay>${cfg.pay}<span class="arrow">→</span></a>`
            : `<button class="btn btn--xl" type="button" data-fallback>${cfg.fallback}<span class="arrow">→</span></button>`}
        </div>
        <p class="checkout__note">${cfg.paymentUrl ? cfg.payNote : cfg.fallbackNote}</p>
      </div>`;
    dlg.showModal();
  };

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('.modal__close') || e.target.closest('[data-fallback]')) dlg.close();
  });
  document.addEventListener('cybella:checkout', open);
}
