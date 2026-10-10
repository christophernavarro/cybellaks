# Arquitectura y esquema de datos

Sitio estático (HTML + CSS + JavaScript con módulos ES). **Sin build**: el único paquete es un servidor local de desarrollo.

```bash
npm install     # una sola vez
npm start       # abre http://localhost:8123 en el navegador (sin caché)
npm run dev     # igual, sin abrir el navegador
```

El sitio se puede subir tal cual a Netlify, Vercel, GitHub Pages, etc.

## Principio clave

> **Todo el contenido vive en `js/data/`. Los componentes no contienen textos.**

Para cambiar preguntas, resultados, textos de marca o cards solo se editan los archivos de `js/data/`.

## Estructura de carpetas

```
index.html                  Shell mínimo (fuentes, <main id="app">)
css/
  tokens.css                Paleta, tipografías, espaciados, easing  ← aquí se cambian los colores de la tarjeta
  base.css                  Reset, tipografía, botones, utilidades
  sections.css             Hero, información, servicios, footer
  quiz.css                  Quiz, barra de progreso, resultado
  motion.css                Estados de animación (reveal, máscaras, marquee)
js/
  main.js                   Arranque: monta secciones, inicia animaciones
  data/
    site.js                 Marca, hero, bloque de información, footer
    services.js             Las 3 cards (Iluminación, Espacios pequeños, Paisajismo)
    quiz.questions.js       Preguntas y opciones
    quiz.results.js         Resultados + reglas respuesta → resultado
  components/
    header.js  hero.js  marquee.js  info.js  services.js  quiz.js  footer.js
    modal.js                Detalle de cada card (<dialog>)
  quiz/
    state.js                Estado de la sesión (sessionStorage)
    engine.js               Lógica pura: respuestas → resultado (sin DOM)
    view.js                 Render del quiz paso a paso
  ui/
    art.js                  Ilustraciones SVG de reserva (cuando aún no hay foto)
    motion.js               Reveal, parallax, split de texto, contadores, botones magnéticos
docs/ARQUITECTURA.md
assets/                     Aquí van las fotos reales (ver "Imágenes")
```

## Componentes

| Componente | Responsabilidad | Datos |
|---|---|---|
| `header` | Logo + navegación + barra de progreso de scroll | `site.nav` |
| `hero` | Titular grande, collage de imágenes con parallax, CTA al quiz | `site.hero` |
| `marquee` | Cinta con texto en movimiento | `site.marquee` |
| `info` | Frase de marca que se "ilumina" al hacer scroll, pilares, cifras | `site.info` |
| `services` | 3 cards con aparición escalonada y hover | `services` |
| `modal` | Detalle ampliado de una card | `services[i].detail` |
| `quiz` | Contenedor + pantallas: intro → preguntas → resultado | `questions`, `results` |
| `footer` | Cierre y CTA final | `site.footer` |

## Esquema: preguntas (`quiz.questions.js`)

```js
{
  id: 'espacio',                 // identificador único, estable (se usa en las reglas)
  type: 'single',                // 'single' (avanza al elegir) | 'multi' (botón Continuar)
  title: '¿Qué espacio quieres transformar?',
  subtitle: 'Opcional',
  options: [
    { id: 'sala', label: 'Sala', hint: 'Opcional', art: 'room' }
    //  id    → valor que se guarda y que usan las reglas
    //  label → texto exacto que ve el usuario
  ]
}
```

## Esquema: resultados y mapeo (`quiz.results.js`)

Cada resultado declara **las combinaciones de respuestas** que lo producen:

```js
{
  id: 'luz-calida',
  title: 'Refugio de luz cálida',
  eyebrow: 'Tu resultado',
  summary: 'Frase corta',
  description: 'Texto largo…',
  tips: ['Consejo 1', 'Consejo 2'],
  art: 'lamp',                   // ilustración de reserva
  image: null,                   // ruta a foto real, ej. 'assets/resultado-luz.jpg'
  service: 'iluminacion',        // card relacionada (opcional)
  cta: { label: 'Agendar asesoría', href: '#contacto' },

  // rules = lista de combinaciones alternativas (OR).
  // Dentro de cada combinación, TODAS las preguntas deben cumplirse (AND).
  // Un valor puede ser una opción o una lista de opciones aceptadas.
  rules: [
    { espacio: 'sala', estilo: ['calido', 'clasico'] },
    { espacio: 'dormitorio' }
  ]
}
```

Un resultado con `fallback: true` se usa cuando ninguna regla coincide.

**Regla de decisión** (`engine.js`): gana el resultado cuya combinación satisfecha tenga **más condiciones** (la más
específica). Si hay empate, gana el que aparece primero en la lista. Si tu tabla es "combinación exacta → resultado",
basta con escribir una regla completa por resultado; si es más flexible, usa reglas parciales.

## Estado de la sesión

`sessionStorage['cybella.quiz.v1'] = { answers: { espacio: 'sala', … }, step: 2, done: false }`.
Si la persona recarga la página durante la misma sesión, retoma donde estaba. "Repetir quiz" lo reinicia.

## Imágenes

Cada `image` apunta a un archivo de `assets/`. Mientras sea `null`, se muestra una ilustración SVG rosada de reserva
(`ui/art.js`) para que el diseño ya se vea completo. Basta con rellenar la ruta para reemplazarla.

## Contenido pendiente → dónde va

| Pendiente | Archivo |
|---|---|
| Preguntas y opciones | `js/data/quiz.questions.js` |
| Tabla respuesta → resultado + textos | `js/data/quiz.results.js` |
| Tarjeta de colores | `css/tokens.css` |
| Textos/imágenes de marca | `js/data/site.js` |
| Textos/imágenes de las 3 cards | `js/data/services.js` |
