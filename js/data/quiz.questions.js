// Preguntas del quiz. PLACEHOLDER: reemplazar por el archivo oficial (texto exacto).
// Los `id` de pregunta y de opción son los que se usan en quiz.results.js.
// Cada opción puede llevar `image` (foto real, ej. 'assets/sala.jpg') o `art` ('room' | 'lamp' | 'garden') para el fondo que aparece al seleccionarla.
export const questions = [
  {
    id: 'espacio',
    type: 'single',
    title: '¿Qué espacio quieres transformar?',
    subtitle: 'Elige el que más te urge.',
    options: [
      { id: 'sala', label: 'Sala o comedor', art: 'room' },
      { id: 'dormitorio', label: 'Dormitorio', art: 'lamp' },
      { id: 'pequeno', label: 'Un espacio pequeño', art: 'room' },
      { id: 'exterior', label: 'Terraza o jardín', art: 'garden' },
    ],
  },
  {
    id: 'sensacion',
    type: 'single',
    title: '¿Qué quieres sentir al llegar a casa?',
    options: [
      { id: 'calma', label: 'Calma y descanso', art: 'lamp' },
      { id: 'energia', label: 'Energía y alegría', art: 'garden' },
      { id: 'amplitud', label: 'Amplitud y orden', art: 'room' },
      { id: 'naturaleza', label: 'Conexión con la naturaleza', art: 'garden' },
    ],
  },
  {
    id: 'estilo',
    type: 'single',
    title: '¿Con qué estilo te identificas?',
    options: [
      { id: 'calido', label: 'Cálido y acogedor', art: 'lamp' },
      { id: 'minimal', label: 'Minimalista y limpio', art: 'room' },
      { id: 'romantico', label: 'Romántico y suave', art: 'lamp' },
      { id: 'organico', label: 'Natural y orgánico', art: 'garden' },
    ],
  },
  {
    id: 'inversion',
    type: 'single',
    title: '¿Cuánto quieres cambiar?',
    options: [
      { id: 'detalles', label: 'Solo algunos detalles', art: 'lamp' },
      { id: 'parcial', label: 'Renovar parte del espacio', art: 'room' },
      { id: 'total', label: 'Un cambio completo', art: 'garden' },
    ],
  },
];
