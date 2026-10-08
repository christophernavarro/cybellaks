// Contenido de marca. PLACEHOLDER: reemplazar con los textos reales.
export const site = {
  brand: 'Atelier Blush',
  nav: [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Categorías', href: '#categorias' },
    { label: 'Quiz', href: '#quiz' },
  ],
  hero: {
    eyebrow: 'Decoración de interiores',
    title: 'Espacios que se sienten *como tú*',
    lead: 'Diseñamos interiores cálidos, luminosos y llenos de carácter. Responde un breve quiz y te recomendamos la solución ideal para tu hogar.',
    cta: { label: 'Descubre tu estilo', href: '#quiz' },
    secondary: { label: 'Conócenos', href: '#nosotros' },
    badge: 'Descubre tu estilo · Quiz de 2 minutos · ',
    // image: ruta a foto real (assets/...) o null para usar ilustración
    collage: [
      { art: 'room', image: null, alt: 'Sala luminosa en tonos rosados' },
      { art: 'lamp', image: null, alt: 'Lámpara de luz cálida' },
      { art: 'garden', image: null, alt: 'Plantas y paisajismo interior' },
    ],
  },
  marquee: ['Iluminación', 'Espacios pequeños', 'Paisajismo', 'Diseño a medida', 'Color y textura', 'Hogares con alma'],
  info: {
    eyebrow: 'Quiénes somos',
    statement:
      'Creemos que un hogar bien pensado cambia cómo te sientes. Mezclamos luz, color y proporción para crear espacios sencillos, bellos y profundamente tuyos.',
    pillars: [
      { title: 'Diseño con intención', text: 'Cada elemento tiene un porqué: función primero, belleza después, siempre juntas.' },
      { title: 'Color que abraza', text: 'Paletas suaves y cálidas que aportan calma y personalidad sin saturar.' },
      { title: 'A tu medida', text: 'Soluciones pensadas para tu espacio, tu rutina y tu presupuesto.' },
    ],
    stats: [
      { value: 250, suffix: '+', label: 'Espacios transformados' },
      { value: 12, suffix: '', label: 'Años de experiencia' },
      { value: 98, suffix: '%', label: 'Clientes felices' },
    ],
    images: [
      { art: 'room', image: null, alt: 'Interior diseñado por la marca' },
      { art: 'garden', image: null, alt: 'Detalle de plantas' },
    ],
  },
  services: {
    eyebrow: 'Categorías',
    title: 'Tres formas de *transformar* tu espacio',
    lead: 'Elige por dónde empezar. Cada categoría reúne ideas, materiales y soluciones pensadas para ese reto.',
  },
  quiz: {
    eyebrow: 'Quiz interactivo',
    title: 'Encuentra la solución *perfecta* para ti',
    lead: 'Unas pocas preguntas, una recomendación hecha a tu medida. Sin registro y en menos de dos minutos.',
    introTitle: 'Tu hogar tiene un *estilo*. Descúbrelo en unos minutos',
    start: 'Comenzar el quiz',
  },
  footer: {
    title: 'Hagamos de tu casa *tu lugar favorito*',
    cta: { label: 'Escríbenos', href: 'mailto:hola@ejemplo.com' },
    note: '© ' + new Date().getFullYear() + ' Atelier Blush. Todos los derechos reservados.',
  },
};
