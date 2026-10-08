// Preguntas del quiz. PLACEHOLDER: reemplazar por el archivo oficial (texto exacto).
// Los `id` de pregunta y de opción son los que se usan en quiz.results.js.
export const questions = [
  {
    id: 'espacio',
    type: 'single',
    title: '¿Qué espacio quieres transformar?',
    subtitle: 'Elige el que más te urge.',
    options: [
      { id: 'sala', label: 'Sala o comedor' },
      { id: 'dormitorio', label: 'Dormitorio' },
      { id: 'pequeno', label: 'Un espacio pequeño' },
      { id: 'exterior', label: 'Terraza o jardín' },
    ],
  },
  {
    id: 'sensacion',
    type: 'single',
    title: '¿Qué quieres sentir al llegar a casa?',
    options: [
      { id: 'calma', label: 'Calma y descanso' },
      { id: 'energia', label: 'Energía y alegría' },
      { id: 'amplitud', label: 'Amplitud y orden' },
      { id: 'naturaleza', label: 'Conexión con la naturaleza' },
    ],
  },
  {
    id: 'estilo',
    type: 'single',
    title: '¿Con qué estilo te identificas?',
    options: [
      { id: 'calido', label: 'Cálido y acogedor' },
      { id: 'minimal', label: 'Minimalista y limpio' },
      { id: 'romantico', label: 'Romántico y suave' },
      { id: 'organico', label: 'Natural y orgánico' },
    ],
  },
  {
    id: 'inversion',
    type: 'single',
    title: '¿Cuánto quieres cambiar?',
    options: [
      { id: 'detalles', label: 'Solo algunos detalles' },
      { id: 'parcial', label: 'Renovar parte del espacio' },
      { id: 'total', label: 'Un cambio completo' },
    ],
  },
];
