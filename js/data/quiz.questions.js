// Preguntas del quiz (texto oficial de la clienta).
// Cada opción suma 1 punto al perfil indicado en `profile` (p1…p4, ver quiz.results.js). Las opciones A, B, C y D de cada pregunta
// apuntan, en ese orden, a los perfiles 1, 2, 3 y 4.
// La pregunta `problema` (la 2) es la que desempata: ver js/quiz/engine.js.
// Cada opción puede llevar `image` (foto, ej. 'assets/img/sala.webp') y `pos` (recorte, ej. '30% 50%'); `art` es la ilustración de reserva.
export const TIEBREAK_QUESTION = 'problema';

export const questions = [
  {
    id: 'espacio',
    type: 'single',
    title: '¿Qué tipo de espacio necesitas intervenir?',
    options: [
      { id: 'a', profile: 'p1', label: 'Privado (Habitaciones)', art: 'lamp', image: 'assets/img/estudio-compacto.webp', pos: '50% 50%' },
      { id: 'b', profile: 'p2', label: 'Almacenamiento (Bodega, closet, otros)', art: 'room', image: 'assets/img/carpinteria-madera.webp', pos: '50% 50%' },
      { id: 'c', profile: 'p3', label: 'Sociales (Terraza, comedor)', art: 'garden', image: 'assets/img/terraza-jardin.webp', pos: '50% 50%' },
      { id: 'd', profile: 'p4', label: 'Tránsitos (Acceso, jardines, pasillos)', art: 'garden', image: 'assets/img/jardin-urbano.webp', pos: '50% 50%' },
    ],
  },
  {
    id: 'problema',
    type: 'single',
    title: '¿Cuál es el principal problema a resolver?',
    options: [
      { id: 'a', profile: 'p1', label: 'La iluminación', art: 'lamp', image: 'assets/img/salon-luz-esfera.webp', pos: '50% 50%' },
      { id: 'b', profile: 'p2', label: 'Los materiales', art: 'room', image: 'assets/img/recepcion-calida.webp', pos: '50% 50%' },
      { id: 'c', profile: 'p3', label: 'El almacenamiento', art: 'room', image: 'assets/img/salon-muebles-medida.webp', pos: '50% 50%' },
      { id: 'd', profile: 'p4', label: 'La distribución', art: 'room', image: 'assets/img/escritorio-ventanal.webp', pos: '50% 50%' },
    ],
  },
  {
    id: 'sensacion',
    type: 'single',
    title: '¿Qué te gustaría sentir al entrar a tu espacio?',
    options: [
      { id: 'a', profile: 'p1', label: 'Calma y tranquilidad', art: 'lamp', image: 'assets/img/rincon-calido.webp', pos: '50% 50%' },
      { id: 'b', profile: 'p2', label: 'Energía y motivación', art: 'garden', image: 'assets/img/jardin-atardecer.webp', pos: '50% 50%' },
      { id: 'c', profile: 'p3', label: 'Calidez y conexión', art: 'lamp', image: 'assets/img/cafe-boveda.webp', pos: '50% 50%' },
      { id: 'd', profile: 'p4', label: 'Concentración y claridad', art: 'room', image: 'assets/img/espacio-pequeno.webp', pos: '50% 50%' },
    ],
  },
  {
    id: 'estilo',
    type: 'single',
    title: '¿Cómo describirías un estilo que te represente?',
    options: [
      { id: 'a', profile: 'p1', label: 'Suave y confortable', art: 'lamp', image: 'assets/img/sofa-curvo.webp', pos: '50% 50%' },
      { id: 'b', profile: 'p2', label: 'Cómodo y dinámico', art: 'room', image: 'assets/img/cafe-dorado.webp', pos: '50% 50%' },
      { id: 'c', profile: 'p3', label: 'Sencillo y natural', art: 'garden', image: 'assets/img/patio-olivo.webp', pos: '50% 50%' },
      { id: 'd', profile: 'p4', label: 'Sofisticado y atemporal', art: 'room', image: 'assets/img/salon-arcos.webp', pos: '50% 50%' },
    ],
  },
];
