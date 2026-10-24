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
  sections.css             Hero, servicios, footer
  night.css                Modo noche: solo redefine colores (variables) y unos pocos ajustes
  effects.css              Hojas, líneas, mover imágenes, sección flotante, lupa
  quiz.css                  Quiz, barra de progreso, resultado
  motion.css                Estados de animación (reveal, máscaras, marquee)
js/
  main.js                   Arranque: monta secciones, inicia animaciones
  data/
    site.js                 Marca, hero, footer
    services.js             Las 3 cards (Iluminación, Jerarquización, Biofilia)
    quiz.questions.js       Preguntas y opciones
    quiz.results.js         Resultados + reglas respuesta → resultado
  components/
    header.js  hero.js  emailResult.js  marquee.js  services.js  spaces.js  quiz.js  checkout.js  footer.js
    modal.js                Detalle de cada card (<dialog>)
  quiz/
    state.js                Estado de la sesión (sessionStorage)
    engine.js               Lógica pura: respuestas → resultado (sin DOM)
    view.js                 Render del quiz paso a paso
  ui/
    art.js                  Ilustraciones SVG de reserva (cuando aún no hay foto)
    lens.js                 Punto burdeos que sigue al mouse
    theme.js                Modo día/noche de toda la página (símbolo del encabezado); se recuerda en el navegador
    heroNight.js            Inicio: día/noche al pasar el cursor sobre el texto y puntos sobre la foto
    motion.js               Reveal, parallax, split de texto, contadores, botones magnéticos
docs/ARQUITECTURA.md
assets/                     Aquí van las fotos reales (ver "Imágenes")
```

## Componentes

| Componente | Responsabilidad | Datos |
|---|---|---|
| `header` | Logo + navegación + barra de progreso de scroll | `site.nav` |
| `hero` | Imagen de fondo con la frase; al poner el cursor sobre el texto pasa de día a noche; CTA al quiz | `site.hero` |
| `marquee` | Cinta con texto en movimiento | `site.marquee` |
| `services` | 3 cards con aparición escalonada y hover | `services` |
| `spaces` | Frase central con imágenes flotantes que se mueven al hacer scroll | `site.spaces` |
| `modal` | Detalle ampliado de una card | `services[i].detail` |
| `quiz` | Contenedor + pantallas: intro → preguntas → resultado | `questions`, `results` |
| `checkout` | Panel del quiz completo de pago (precio, qué incluye, botón a la pasarela) | `site.quiz.actions.fullQuiz` |
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

## Botones del resultado (visita y quiz completo)

Se configuran en `site.quiz.actions` (`js/data/site.js`), iguales para todos los resultados:

| Botón | Qué hace | Cómo conectarlo |
|---|---|---|
| Agendar visita a terreno | Abre el enlace de agenda | `visit.href` = enlace de AgendaPro u otra agenda. Vacío → por ahora no hace nada (flujo pendiente) |
| Quiz completo | Abre un panel con precio y contenido; "Ir a pagar" envía a la pasarela | `fullQuiz.paymentUrl` = enlace de pago (Flow, Mercado Pago, Webpay…). Vacío → "Solicitar acceso" solo cierra el panel (flujo pendiente) |

**Pendiente:** el quiz detallado en sí, y la verificación del pago. Un enlace de pago por sí solo no impide que alguien abra la página del quiz
sin pagar; para protegerlo hace falta confirmar el pago en un servidor (webhook de la pasarela) y entregar un acceso firmado.

## Estado de la sesión

`sessionStorage['cybella.quiz.v1'] = { answers: { espacio: 'sala', … }, step: 2, done: false }`.
Si la persona recarga la página durante la misma sesión, retoma donde estaba. "Repetir quiz" lo reinicia.

## Imágenes (fotos realistas)

Mientras un `image` sea `null`, se muestra una ilustración de reserva (`ui/art.js`). Para usar una foto, copia el archivo a `assets/`
y escribe su ruta en el campo `image`, por ejemplo `image: 'assets/hogar-sala.jpg'`. No hay que tocar el código.

| Dónde se ve | Archivo de datos | Campo | Formato recomendado |
|---|---|---|---|
| Inicio, escritorio y celular (día y noche) | `js/data/site.js` → `hero.desktop` y `hero.mobile` | `day`, `night`, `ratio`, `pos` | Cada foto con su pareja de noche, mismo encuadre y tamaño. En celular se usa una foto vertical (3:4) |
| Puntos sobre la foto del inicio | `js/data/site.js` → `hero.*.spots` | `x`, `y` (% de la foto), `title`, `text` | Se abren al pasar el mouse o al tocar |
| Imágenes flotantes (6) | `js/data/site.js` → `spaces.items` | `image` | Vertical 4:5, cuadrada 1:1 o 1:1,15 (según la posición) |
| Tarjetas de categorías (3) | `js/data/services.js` | `image` | Casi cuadrada 10:11 |
| Lateral del quiz (3, rotan por pregunta) | `js/data/site.js` → `quiz.aside` | `image` | Vertical 4:5,2 |
| Fondo al elegir una opción | `js/data/quiz.questions.js` → cada opción | `image` | Horizontal o vertical, se funde por la izquierda |
| Resultado del quiz (4) | `js/data/quiz.results.js` | `image` | Vertical 4:5 |

**Fotos** (en `assets/img/`, optimizadas a WebP; los originales están en `assets/originales/`): hay 22 fotos distintas y cada lugar usa una propia.
Para sumar o cambiar una, copia el original a `assets/originales/`, genera su versión WebP (lado largo de 1600 px) en `assets/img/` y escribe la ruta en `image`.
El recorte se controla con el campo `pos` (por ejemplo `pos: '30% 50%'`: primer valor = horizontal, segundo = vertical).
La foto `salon-de-unas` (la del letrero de un negocio real) no se usó a propósito.

**Consejos para las fotos**
- Lado largo de 1600 px, en JPG o WebP y por debajo de 300 KB para que la página cargue rápido.
- Deja un margen de ~10 % alrededor del sujeto: las imágenes se agrandan un poco y se desplazan con el mouse, así que los bordes se recortan.
- Para que se vean serias y de la misma familia, conviene una luz y un tratamiento de color parecidos entre todas.
- Escribe un `alt` descriptivo en cada una (qué se ve en la imagen).

## Efectos de movimiento

| Efecto | Dónde se configura |
|---|---|
| Hojas que se cubren entre secciones (el inicio queda fijo y se atenúa) | clase `sheet` · `css/effects.css` |
| Líneas verticales finas | clase `lines` + `data-lines` · `--cols` en `css/effects.css` |
| Imágenes que se mueven con el mouse | atributo `data-hover` |
| Imágenes flotantes con scroll | `data-parallax` (vertical) y `data-parallax-x` (horizontal); en pantallas chicas el movimiento se reduce a menos de la mitad |
| Modo día / noche de toda la página | `js/ui/theme.js` + `css/night.css` (paleta nocturna en `:root[data-theme="night"]`) |
| Punto burdeos que sigue al mouse | `js/ui/lens.js` + `.lens` en `css/effects.css` (punto rojo con brillo que reemplaza la flecha: tamaño `--d`, color en `background`) |

Todos respetan "reducir movimiento" del sistema y se desactivan o suavizan en pantallas táctiles.

## Contenido pendiente → dónde va

| Pendiente | Archivo |
|---|---|
| Preguntas y opciones | `js/data/quiz.questions.js` |
| Tabla respuesta → resultado + textos | `js/data/quiz.results.js` |
| Tarjeta de colores | `css/tokens.css` |
| Textos de marca | `js/data/site.js` |
| Textos/imágenes de las 3 cards | `js/data/services.js` |
