// Contenido de marca. PLACEHOLDER: reemplazar con los textos reales.
export const site = {
  brand: 'Atelier Blush',
  nav: [
    { label: 'Categorías', href: '#categorias' },
    { label: 'Quiz', href: '#quiz' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Decoración de interiores',
    title: 'Espacios que se sienten *como tú*',
    lead: 'Diseñamos interiores cálidos, luminosos y llenos de carácter. Responde un breve quiz y te recomendamos la solución ideal para tu hogar.',
    cta: { label: 'Descubre tu estilo', href: '#quiz' },
    secondary: { label: 'Ver categorías', href: '#categorias' },
    badge: 'Descubre tu estilo · Quiz de 2 minutos · ',
    // image: ruta a foto real (assets/...) o null para usar ilustración
    collage: [
      { art: 'room', image: null, alt: 'Sala luminosa en tonos rosados' },
      { art: 'lamp', image: null, alt: 'Lámpara de luz cálida' },
      { art: 'garden', image: null, alt: 'Plantas y paisajismo interior' },
    ],
  },
  marquee: ['Iluminación', 'Espacios pequeños', 'Paisajismo', 'Diseño a medida', 'Color y textura', 'Hogares con alma'],
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
  // Formulario de contacto. PLACEHOLDER: reemplazar correo, WhatsApp y horario.
  // endpoint: URL de un servicio de formularios (Formspree, Web3Forms, etc.). Si está vacío, el formulario abre el correo del visitante con el mensaje listo.
  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos tu *proyecto*',
    lead: 'Escríbenos qué espacio quieres transformar y te respondemos con ideas y los siguientes pasos.',
    email: 'hola@ejemplo.com',
    whatsapp: { label: '+56 9 0000 0000', href: 'https://wa.me/56900000000' },
    hours: 'Lunes a viernes · 9:00 a 18:00',
    endpoint: '',
    submit: 'Enviar mensaje',
  },
  footer: {
    title: 'Hagamos de tu casa *tu lugar favorito*',
    cta: { label: 'Escríbenos', href: '#contacto' },
    note: '© ' + new Date().getFullYear() + ' Atelier Blush. Todos los derechos reservados.',
  },
};
