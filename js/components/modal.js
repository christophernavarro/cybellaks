import { media } from '../ui/art.js';

// Panel de detalle de una card (<dialog>). Se abre con [data-open="id"].
export function initModal(items) {
  const dlg = document.createElement('dialog');
  dlg.className = 'modal';
  document.body.appendChild(dlg);

  const open = (id) => {
    const s = items.find((x) => x.id === id);
    if (!s) return;
    dlg.innerHTML = `
      <div class="modal__inner">
        <button class="modal__close" type="button" aria-label="Cerrar">✕</button>
        <div class="modal__media">${media(s)}</div>
        <div class="modal__body">
          <span class="eyebrow">${s.number}</span>
          <h3 class="display">${s.title}</h3>
          <p>${s.detail.intro}</p>
          <ul>${s.detail.points.map((p) => `<li>${p}</li>`).join('')}</ul>
          <a class="btn" href="#quiz" data-close data-quiz-start>Descubre tu estilo <span class="arrow">→</span></a>
        </div>
      </div>`;
    dlg.showModal();
  };

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('.modal__close') || e.target.closest('[data-close]')) dlg.close();
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (b) open(b.dataset.open);
  });
}
