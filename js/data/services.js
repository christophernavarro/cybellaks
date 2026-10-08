// Las 3 cards. PLACEHOLDER: textos e imágenes pendientes.
// Al hacer clic se abre un panel de detalle (detail). Para que enlacen a otra página, definir `href`.
export const services = [
  {
    id: 'iluminacion',
    number: '01',
    title: 'Iluminación',
    description: 'Capas de luz cálida que dan profundidad, ambiente y vida a cada rincón.',
    art: 'lamp',
    image: null,        // ej. 'assets/iluminacion.jpg'
    alt: 'Lámpara colgante con luz cálida',
    cta: 'Ver más',
    href: null,         // ej. 'iluminacion.html' para abrir página propia
    detail: {
      intro: 'La luz define cómo se ve y se siente un espacio. Combinamos luz general, de acento y decorativa.',
      points: ['Luz ambiental, de tarea y de acento', 'Temperaturas cálidas para descansar', 'Lámparas como piezas escultóricas'],
    },
  },
  {
    id: 'espacios-pequenos',
    number: '02',
    title: 'Espacios pequeños',
    description: 'Ideas inteligentes para ganar amplitud, orden y estilo en pocos metros.',
    art: 'room',
    image: null,
    alt: 'Sala compacta y acogedora',
    cta: 'Ver más',
    href: null,
    detail: {
      intro: 'Menos metros no significa menos estilo. Diseñamos con proporción, multifunción y color claro.',
      points: ['Muebles multifunción', 'Almacenaje invisible', 'Espejos y tonos claros que amplían'],
    },
  },
  {
    id: 'paisajismo',
    number: '03',
    title: 'Paisajismo',
    description: 'Terrazas, jardines y rincones verdes que conectan tu hogar con la naturaleza.',
    art: 'garden',
    image: null,
    alt: 'Jardín con plantas y macetas',
    cta: 'Ver más',
    href: null,
    detail: {
      intro: 'Llevamos lo verde al interior y exterior con especies y composiciones fáciles de cuidar.',
      points: ['Selección de plantas por luz y clima', 'Terrazas y balcones', 'Macetas y jardineras de diseño'],
    },
  },
];
