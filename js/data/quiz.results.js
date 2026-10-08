// Resultados y mapeo respuesta → resultado. PLACEHOLDER: reemplazar con la tabla oficial.
//
// rules: lista de combinaciones alternativas (OR). En cada una, todas las preguntas listadas deben coincidir (AND).
//        Un valor puede ser un id de opción o una lista de ids aceptados.
// Gana la combinación más específica (más condiciones). Con empate, el primero de la lista.
// fallback: true → se usa si nada coincide.
export const results = [
  {
    id: 'refugio-luz',
    eyebrow: 'Tu recomendación',
    title: 'Refugio de luz cálida',
    summary: 'Tu espacio pide capas de luz suave y materiales acogedores.',
    description:
      'Texto de ejemplo. Tu casa se beneficia de una iluminación pensada en capas: lámparas de ambiente, luz de acento y detalles decorativos que hacen que cada tarde se sienta especial.',
    tips: ['Usa luz cálida (2700 K) en zonas de descanso', 'Combina 3 puntos de luz a distintas alturas', 'Añade una pieza escultórica como protagonista'],
    art: 'lamp',
    image: null,
    service: 'iluminacion',
    cta: { label: 'Agendar asesoría', href: '#' },
    rules: [
      { espacio: ['sala', 'dormitorio'], sensacion: 'calma' },
      { estilo: 'calido', sensacion: 'calma' },
    ],
  },
  {
    id: 'pequeno-amplio',
    eyebrow: 'Tu recomendación',
    title: 'Pequeño, pero infinito',
    summary: 'Ganar amplitud y orden es tu mejor inversión.',
    description:
      'Texto de ejemplo. Con muebles multifunción, colores claros y almacenaje inteligente, tu espacio se verá más grande y se sentirá más ligero.',
    tips: ['Elige muebles que cumplan dos funciones', 'Usa espejos frente a la luz natural', 'Mantén una paleta clara y continua'],
    art: 'room',
    image: null,
    service: 'espacios-pequenos',
    cta: { label: 'Agendar asesoría', href: '#' },
    rules: [
      { espacio: 'pequeno' },
      { sensacion: 'amplitud', estilo: 'minimal' },
    ],
  },
  {
    id: 'oasis-verde',
    eyebrow: 'Tu recomendación',
    title: 'Tu oasis verde',
    summary: 'La naturaleza es la protagonista de tu hogar ideal.',
    description:
      'Texto de ejemplo. Plantas, texturas naturales y rincones al aire libre crearán un ambiente fresco que invita a quedarse.',
    tips: ['Agrupa plantas en alturas distintas', 'Mezcla macetas de cerámica y fibras naturales', 'Aprovecha balcones y ventanas'],
    art: 'garden',
    image: null,
    service: 'paisajismo',
    cta: { label: 'Agendar asesoría', href: '#' },
    rules: [
      { espacio: 'exterior' },
      { sensacion: 'naturaleza', estilo: 'organico' },
    ],
  },
  {
    id: 'general',
    eyebrow: 'Tu recomendación',
    title: 'Un hogar a tu medida',
    summary: 'Tu perfil mezcla varias ideas: lo mejor es una asesoría personalizada.',
    description: 'Texto de ejemplo. Combinaremos luz, color y proporción para crear un plan que se adapte a ti.',
    tips: ['Cuéntanos tu rutina y tus gustos', 'Definimos prioridades y presupuesto', 'Recibe una propuesta visual'],
    art: 'room',
    image: null,
    service: null,
    cta: { label: 'Agendar asesoría', href: '#' },
    fallback: true,
    rules: [],
  },
];
