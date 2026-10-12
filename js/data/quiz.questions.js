// Preguntas del quiz. PLACEHOLDER: reemplazar por el archivo oficial (texto exacto).
// Los `id` de pregunta y de opción son los que se usan en quiz.results.js.
// Cada opción puede llevar `image` (foto, ej. 'assets/img/sala.webp') y `pos` (recorte, ej. '30% 50%'); `art` es la ilustración de reserva.
export const questions = [
  {
    id: 'espacio',
    type: 'single',
    title: '¿Qué espacio quieres transformar?',
    subtitle: 'Elige el que más te urge.',
    options: [
      { id: 'sala', label: 'Sala, comedor o recepción', art: 'room', image: 'assets/img/salon-arcos.webp', pos: '35% 55%' },
      { id: 'dormitorio', label: 'Dormitorio o zona de descanso', art: 'lamp', image: 'assets/img/rincon-calido.webp', pos: '45% 55%' },
      { id: 'pequeno', label: 'Un espacio pequeño', art: 'room', image: 'assets/img/espacio-pequeno.webp', pos: '60% 62%' },
      { id: 'exterior', label: 'Terraza, jardín o patio', art: 'garden', image: 'assets/img/salon-arcos.webp', pos: '4% 45%' },
    ],
  },
  {
    id: 'sensacion',
    type: 'single',
    title: '¿Qué quieres sentir al entrar a tu espacio?',
    options: [
      { id: 'calma', label: 'Calma y descanso', art: 'lamp', image: 'assets/img/rincon-calido.webp', pos: '45% 55%' },
      { id: 'energia', label: 'Energía y alegría', art: 'garden', image: 'assets/img/salon-moderno.webp', pos: '50% 45%' },
      { id: 'amplitud', label: 'Amplitud y orden', art: 'room', image: 'assets/img/carpinteria-madera.webp', pos: '50% 55%' },
      { id: 'naturaleza', label: 'Conexión con la naturaleza', art: 'garden', image: 'assets/img/salon-arcos.webp', pos: '4% 45%' },
    ],
  },
  {
    id: 'estilo',
    type: 'single',
    title: '¿Con qué estilo te identificas?',
    options: [
      { id: 'calido', label: 'Cálido y acogedor', art: 'lamp', image: 'assets/img/rincon-calido.webp', pos: '45% 55%' },
      { id: 'minimal', label: 'Minimalista y limpio', art: 'room', image: 'assets/img/salon-moderno.webp', pos: '50% 45%' },
      { id: 'romantico', label: 'Romántico y suave', art: 'lamp', image: 'assets/img/salon-arcos.webp', pos: '35% 55%' },
      { id: 'organico', label: 'Natural y orgánico', art: 'garden', image: 'assets/img/carpinteria-madera.webp', pos: '50% 55%' },
    ],
  },
  {
    id: 'inversion',
    type: 'single',
    title: '¿Cuánto quieres cambiar?',
    options: [
      { id: 'detalles', label: 'Solo algunos detalles', art: 'lamp', image: 'assets/img/rincon-calido.webp', pos: '40% 55%' },
      { id: 'parcial', label: 'Renovar parte del espacio', art: 'room', image: 'assets/img/espacio-pequeno.webp', pos: '60% 62%' },
      { id: 'total', label: 'Un cambio completo', art: 'garden', image: 'assets/img/salon-moderno.webp', pos: '50% 45%' },
    ],
  },
];
