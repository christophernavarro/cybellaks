// Lógica pura (sin DOM): respuestas → resultado.

const toList = (v) => (Array.isArray(v) ? v : [v]);

// ¿La respuesta del usuario (string o array si es multi) cumple la condición?
function matches(answer, accepted) {
  if (answer == null) return false;
  const given = toList(answer);
  return toList(accepted).some((a) => given.includes(a));
}

// Devuelve cuántas condiciones tiene la combinación si se cumple completa; si no, 0.
function ruleScore(rule, answers) {
  const keys = Object.keys(rule);
  if (!keys.length) return 0;
  return keys.every((k) => matches(answers[k], rule[k])) ? keys.length : 0;
}

export function resolveResult(answers, results) {
  let best = null;
  let bestScore = 0;
  for (const r of results) {
    for (const rule of r.rules ?? []) {
      const s = ruleScore(rule, answers);
      if (s > bestScore) { best = r; bestScore = s; }  // empate: gana el primero
    }
  }
  return best ?? results.find((r) => r.fallback) ?? results[0];
}

// Útil para validar la tabla: avisa de ids inexistentes en las reglas.
export function validate(questions, results) {
  const issues = [];
  const qs = Object.fromEntries(questions.map((q) => [q.id, new Set(q.options.map((o) => o.id))]));
  for (const r of results) {
    for (const rule of r.rules ?? []) {
      for (const [q, vals] of Object.entries(rule)) {
        if (!qs[q]) { issues.push(`${r.id}: pregunta desconocida "${q}"`); continue; }
        for (const v of toList(vals)) if (!qs[q].has(v)) issues.push(`${r.id}: opción "${v}" no existe en "${q}"`);
      }
    }
  }
  return issues;
}
