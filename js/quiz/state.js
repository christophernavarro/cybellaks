// Estado del quiz guardado en la sesión del navegador (sessionStorage).
const KEY = 'cybella.quiz.v1';
const fresh = () => ({ answers: {}, step: 0, started: false, done: false });

export function loadState() {
  try { return { ...fresh(), ...JSON.parse(sessionStorage.getItem(KEY) || '{}') }; }
  catch { return fresh(); }
}
export function saveState(state) {
  try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* modo privado: se ignora */ }
}
export function resetState() {
  const s = fresh();
  saveState(s);
  return s;
}
