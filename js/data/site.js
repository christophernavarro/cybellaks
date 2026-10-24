// Contenido de marca. PLACEHOLDER: reemplazar con los textos reales.
export const site = {
  brand: 'Cybellaks',
  // Menú del header (y del menú hamburguesa en celular): una entrada por sección de la página.
  nav: [
    { label: 'Inicio', href: '#top' },
    { label: 'Categorías', href: '#categorias' },
    { label: 'Espacios', href: '#espacios' },
    { label: 'Quiz', href: '#quiz' },
  ],
  // Botón flotante de WhatsApp (abajo a la derecha). number: solo dígitos, con código de país (56 9 2025 3338).
  whatsapp: {
    number: '56920253338',
    label: 'Escríbenos por WhatsApp',
    message: 'Hola Cybellaks, quiero más información.',
    // Globo que aparece junto al botón después de un rato en la página. delay: segundos de espera. Si la persona lo cierra, no vuelve a salir en esa visita.
    bubble: { text: '¿Conversemos?', delay: 12 },
  },
  // Inicio: una sola imagen de fondo con la frase. Al poner el cursor sobre el texto, la misma foto pasa a su versión de noche.
  // PLACEHOLDER: la frase y los textos de los puntos están por confirmar.
  // desktop / mobile: foto de escritorio y foto vertical para celular (cada una con su pareja día/noche).
  // ratio: ancho / alto de la foto. pos: parte de la foto que se ve al recortar (object-position).
  // spots: puntos sobre la foto. x, y: posición en % de la foto (no de la pantalla). Se abren al pasar el mouse o al tocar.
  hero: {
    title: 'Tu espacio, más cerca de lo que *crees*',
    cta: { label: 'Descubre tu estilo', href: '#quiz' },
    desktop: {
      day: 'assets/img/salon-arcos.webp',
      night: 'assets/img/salon-arcos-noche.webp',
      ratio: 1, pos: '50% 60%',
      alt: 'Salón con ventanales en arco, de día y de noche',
      spots: [
        { x: 38, y: 40, title: 'Luz', text: 'Ventanales en arco que llenan el espacio de luz natural durante el día.' },
        { x: 72, y: 38, title: 'Espejo', text: 'Un espejo con forma orgánica que amplía el espacio y refleja la luz.' },
        { x: 84, y: 69, title: 'Butacas', text: 'Piezas de madera y fibras naturales que suman calidez y textura.' },
      ],
    },
    mobile: {
      day: 'assets/img/cafe-dorado-dia.webp',
      night: 'assets/img/cafe-dorado-noche.webp',
      ratio: 0.75, pos: '70% 50%',
      alt: 'Cafetería con luz natural de día y luces cálidas de noche',
      spots: [
        { x: 68, y: 17, title: 'Lámparas', text: 'Luz colgante que da calidez y define cada zona del local.' },
        { x: 84, y: 50, title: 'Vitrina', text: 'Un punto de atención iluminado que invita a acercarse.' },
        { x: 70, y: 66, title: 'Barra', text: 'Iluminación indirecta que resalta los materiales y la textura.' },
      ],
    },
  },
  // Cinta de palabras bajo el inicio: los seis ejes del enfoque de la marca.
  marquee: ['Tu mente', 'La luz', 'El color', 'El orden', 'Naturaleza', 'Consejos'],
  // Sección de espacios con imágenes flotantes que se mueven al hacer scroll.
  // desc: texto que se muestra al abrir la imagen en grande. image: foto real (assets/...) o null para la ilustración. speed: velocidad vertical del parallax (negativo = sube); speedX: deriva horizontal.
  spaces: {
    eyebrow: 'Para cualquier espacio',
    statement: 'Un buen diseño no depende del tamaño. Transformamos *hogares, oficinas, locales y terrazas* con la misma dedicación.',
    cta: { label: 'Descubre tu estilo', href: '#quiz' },
    items: [
      { label: 'Hogares', desc: 'Salas, comedores y dormitorios con luz cálida, materiales nobles y piezas que cuentan tu historia.', art: 'room', image: 'assets/img/rincon-calido.webp', pos: '35% 55%', alt: 'Rincón cálido con lámpara, aparador de madera y sillón', speed: -0.16, speedX: 0.02 },
      { label: 'Oficinas', desc: 'Espacios de trabajo que ordenan la mente: muebles a medida, buena luz y zonas para concentrarse.', art: 'office', image: 'assets/img/escritorio-ventanal.webp', pos: '35% 68%', alt: 'Escritorio integrado frente a un gran ventanal', speed: 0.1, speedX: -0.02 },
      { label: 'Locales', desc: 'Tiendas y locales que invitan a quedarse: estantes, iluminación y recorridos pensados para tu marca.', art: 'shop', image: 'assets/img/tienda-ropa.webp', pos: '50% 55%', alt: 'Tienda con estantes de madera y ropa colgada', speed: -0.08, speedX: 0.03 },
      { label: 'Terrazas', desc: 'Terrazas, patios y jardines iluminados para disfrutar de día y de noche.', art: 'garden', image: 'assets/img/patio-nocturno.webp', pos: '50% 55%', alt: 'Patio con jardín iluminado al anochecer', speed: 0.12, speedX: -0.03 },
      { label: 'Cafeterías', desc: 'Cafés con identidad: texturas, luz indirecta y mobiliario cómodo que hacen volver a la gente.', art: 'lamp', image: 'assets/img/cafe-boveda.webp', pos: '50% 62%', alt: 'Cafetería con techo abovedado y barra de madera', speed: -0.12, speedX: 0.02 },
      { label: 'Recepciones', desc: 'Recepciones que reciben bien: barras iluminadas, materiales cálidos y un primer impacto memorable.', art: 'office', image: 'assets/img/recepcion-calida.webp', pos: '50% 60%', alt: 'Recepción cálida con barra iluminada', speed: 0.1, speedX: -0.02 },
    ],
  },
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
    // Imágenes del lateral: una por pregunta, rotan en orden. image: foto real o null para la ilustración.
    aside: [
      { art: 'room', image: 'assets/img/sofa-curvo.webp', pos: '50% 50%', alt: 'Sofá curvo frente a un muro de listones de madera' },
      { art: 'office', image: 'assets/img/patio-olivo.webp', pos: '50% 50%', alt: 'Patio interior con un olivo entre muros de piedra' },
      { art: 'garden', image: 'assets/img/salon-belleza.webp', pos: '50% 50%', alt: 'Salón de belleza con iluminación cálida' },
    ],
    // Botones de la pantalla de resultado. PLACEHOLDER: precios y textos de ejemplo.
    actions: {
      // Visita a terreno. href: enlace de agenda (AgendaPro, etc.). Si está vacío, el botón no lleva a ningún lado (el flujo del final del quiz está pendiente).
      visit: { label: 'Agendar visita a terreno', href: '' },
      // Quiz completo de pago. paymentUrl: enlace de la pasarela (Flow, Mercado Pago, Webpay...). Si está vacío, el botón del panel solo lo cierra (pendiente).
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
      // Enviar el resultado por correo en PDF (modal). DISEÑO: todavía no se envía nada.
      // endpoint: URL del servicio que arma y envía el PDF (se conecta cuando exista el correo corporativo). Vacío = solo muestra la confirmación.
      email: {
        label: 'Enviar al correo',
        eyebrow: 'Tu resultado',
        title: 'Recíbelo en tu *correo*',
        description: 'Escribe tu correo y te enviamos tu resultado en un PDF para que lo guardes y lo revises cuando quieras.',
        field: 'Correo electrónico',
        placeholder: 'tu@correo.com',
        error: 'Revisa tu correo: parece que le falta algo.',
        submit: 'Enviar PDF',
        sending: 'Enviando…',
        legal: 'Usamos tu correo solo para enviarte este resultado.',
        doneTitle: 'Revisa tu *correo*',
        doneText: 'Te enviaremos el PDF a {email}. Si no lo ves en unos minutos, mira en spam.',
        close: 'Listo',
        endpoint: '',
      },
    },
  },
  footer: {
    title: 'Haz de tu espacio *el lugar que imaginas*',
    note: '© ' + new Date().getFullYear() + ' Cybellaks. Todos los derechos reservados.',
  },
};
