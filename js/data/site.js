// Contenido de marca. PLACEHOLDER: reemplazar con los textos reales.
export const site = {
  brand: 'Atelier Blush',
  nav: [
    { label: 'Categorías', href: '#categorias' },
    { label: 'Quiz', href: '#quiz' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Diseño de interiores',
    title: 'Espacios que se sienten *como tú*',
    lead: 'Diseñamos interiores cálidos, luminosos y llenos de carácter para cualquier espacio: hogares, oficinas, locales y terrazas. Responde un breve quiz y te recomendamos la solución ideal.',
    cta: { label: 'Descubre tu estilo', href: '#quiz' },
    secondary: { label: 'Ver categorías', href: '#categorias' },
    badge: 'Descubre tu estilo · Quiz de 2 minutos · ',
    // image: ruta a foto real (assets/...) o null para usar ilustración
    collage: [
      { art: 'room', image: null, alt: 'Sala luminosa y ordenada' },
      { art: 'lamp', image: null, alt: 'Lámpara de luz cálida' },
      { art: 'garden', image: null, alt: 'Plantas y paisajismo interior' },
    ],
  },
  marquee: ['Iluminación', 'Espacios pequeños', 'Paisajismo', 'Diseño a medida', 'Color y textura', 'Para cualquier espacio'],
  services: {
    eyebrow: 'Categorías',
    title: 'Tres formas de *transformar* tu espacio',
    lead: 'Elige por dónde empezar. Cada categoría reúne ideas, materiales y soluciones pensadas para cualquier tipo de espacio.',
  },
  quiz: {
    eyebrow: 'Quiz interactivo',
    title: 'Encuentra la solución *perfecta* para tu espacio',
    lead: 'Unas pocas preguntas, una recomendación hecha a tu medida. Sin registro y en menos de dos minutos.',
    introTitle: 'Tu espacio tiene un *estilo*. Descúbrelo en unos minutos',
    start: 'Comenzar el quiz',
    // Botones de la pantalla de resultado. PLACEHOLDER: precios y textos de ejemplo.
    actions: {
      // Visita a terreno. href: enlace de agenda (AgendaPro, etc.). Si está vacío, lleva al formulario de contacto con el tema ya elegido.
      visit: { label: 'Agendar visita a terreno', href: '' },
      // Quiz completo de pago. paymentUrl: enlace de la pasarela (Flow, Mercado Pago, Webpay...). Si está vacío, el botón del panel lleva al formulario de contacto.
      fullQuiz: {
        label: 'Quiz completo',
        price: '$9.990',
        eyebrow: 'Quiz completo',
        title: 'Un diagnóstico *mucho más detallado*',
        description: 'Un quiz más largo y profundo que analiza tu espacio, tus hábitos y tu estilo para entregarte una propuesta mucho más precisa.',
        includes: ['Preguntas detalladas sobre tu espacio y tu rutina', 'Recomendaciones específicas por ambiente', 'Paleta de colores y materiales sugeridos'],
        pay: 'Ir a pagar',
        payNote: 'Serás redirigido a la pasarela de pago segura.',
        paymentUrl: '',
        fallback: 'Solicitar acceso',
        fallbackNote: 'El pago en línea estará disponible muy pronto. Déjanos tus datos y te damos acceso.',
      },
    },
  },
  // Formulario de contacto. PLACEHOLDER: reemplazar correo, WhatsApp y horario.
  // endpoint: URL de un servicio de formularios (Formspree, Web3Forms, etc.). Si está vacío, el formulario abre el correo del visitante con el mensaje listo.
  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos tu *proyecto*',
    lead: 'Cuéntanos qué espacio quieres transformar, sea un hogar, una oficina o un local, y te respondemos con ideas y los siguientes pasos.',
    email: 'hola@ejemplo.com',
    whatsapp: { label: '+56 9 0000 0000', href: 'https://wa.me/56900000000' },
    hours: 'Lunes a viernes · 9:00 a 18:00',
    endpoint: '',
    submit: 'Enviar mensaje',
  },
  footer: {
    title: 'Hagamos de tu espacio *el lugar que imaginas*',
    cta: { label: 'Escríbenos', href: '#contacto' },
    note: '© ' + new Date().getFullYear() + ' Atelier Blush. Todos los derechos reservados.',
  },
};
