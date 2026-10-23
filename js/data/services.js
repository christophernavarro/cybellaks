// Las 3 cards. PLACEHOLDER: textos e imágenes pendientes.
// Al hacer clic se abre un panel de detalle (detail). Para que enlacen a otra página, definir `href`.
export const services = [
  {
    id: 'iluminacion',
    number: '01',
    title: 'Iluminación',
    description: 'Capas de luz cálida que dan profundidad, ambiente y vida a cada rincón.',
    art: 'lamp',
    image: 'assets/img/salon-luz-esfera.webp',
    pos: '50% 45%',
    alt: 'Salón con lámpara esférica e iluminación indirecta',
    cta: 'Ver más',
    href: null,         // ej. 'iluminacion.html' para abrir página propia
    detail: {
      intro: 'La luz define cómo se ve y se siente un espacio. Combinamos luz general, de acento y decorativa.',
      points: ['Luz ambiental, de tarea y de acento', 'Temperaturas cálidas para descansar', 'Lámparas como piezas escultóricas'],
    },
  },
  {
    id: 'jerarquizacion',
    number: '02',
    title: 'Jerarquización',
    description: 'Espacios bien organizados: cada zona con su función y un orden claro que guía la mirada.',
    art: 'room',
    image: 'assets/img/salon-muebles-medida.webp',
    pos: '50% 50%',
    alt: 'Living ordenado con muebles a medida, repisas iluminadas y cajones integrados',
    cta: 'Ver más',
    href: null,
    detail: {
      intro: 'Un espacio se siente en orden cuando todo tiene su lugar. Definimos zonas, recorridos y un punto focal para que el ambiente se lea con claridad.',
      points: ['Zonas según el uso de cada área', 'Un punto focal que ordena la mirada', 'Almacenaje a medida para que todo tenga su lugar'],
    },
  },
  {
    id: 'biofilia',
    number: '03',
    title: 'Biofilia',
    description: 'Plantas y materiales naturales que traen la naturaleza a tu espacio y lo llenan de vida.',
    art: 'garden',
    image: 'assets/img/terraza-jardin.webp',
    pos: '50% 60%',
    alt: 'Terraza con jardín, olivo y escalones de piedra',
    cta: 'Ver más',
    href: null,
    detail: {
      intro: 'La biofilia es nuestra conexión natural con la vida verde. Integramos plantas, luz natural y materiales orgánicos para crear espacios que calman y se sienten vivos.',
      points: ['Plantas de interior según la luz y el cuidado que pidan', 'Madera, piedra y fibras naturales', 'Jardineras, muros verdes y rincones con plantas'],
    },
  },
];
