// Lógica pura (sin DOM): respuestas → perfil.
//
// Cada opción elegida suma 1 punto al perfil de su `profile` (ver quiz.questions.js). Gana el perfil con más puntos.
// - Mayoría simple: el perfil con 2 o más puntos gana.
// - Empate (por ejemplo 2-2, o 1-1-1-1): gana el perfil de la respuesta a la pregunta del principal problema
//   (TIEBREAK_QUESTION), porque resolver el problema técnico es lo más urgente.
import { TIEBREAK_QUESTION } from '../data/quiz.questions.js';

// Puntos por perfil: { p1: 2, p2: 0, ... }
export function scoreAnswers(answers, questions) {
  const scores = {};
  for (const q of questions) {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (opt?.profile) scores[opt.profile] = (scores[opt.profile] ?? 0) + 1;
  }
  return scores;
}

export function resolveResult(answers, results, questions) {
  const scores = scoreAnswers(answers, questions);
  const top = Math.max(0, ...results.map((r) => scores[r.id] ?? 0));
  const tied = results.filter((r) => (scores[r.id] ?? 0) === top);
  if (tied.length > 1) {
    const tq = questions.find((q) => q.id === TIEBREAK_QUESTION);
    const pick = tq?.options.find((o) => o.id === answers[tq.id])?.profile;
    const byProblem = tied.find((r) => r.id === pick);
    if (byProblem) return byProblem;
  }
  return tied[0] ?? results[0];
}

// Valida la tabla: cada opción debe apuntar a un perfil que exista, y la pregunta de desempate debe existir.
export function validate(questions, results) {
  const issues = [];
  const ids = new Set(results.map((r) => r.id));
  for (const q of questions) {
    for (const o of q.options) {
      if (!o.profile) issues.push(`${q.id}/${o.id}: la opción no tiene perfil`);
      else if (!ids.has(o.profile)) issues.push(`${q.id}/${o.id}: el perfil "${o.profile}" no existe`);
    }
  }
  if (!questions.some((q) => q.id === TIEBREAK_QUESTION)) issues.push(`falta la pregunta de desempate "${TIEBREAK_QUESTION}"`);
  return issues;
}
