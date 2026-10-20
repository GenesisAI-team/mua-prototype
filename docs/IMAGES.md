# Inventario de imágenes

Todos los huecos viven en `src/data/images.ts`. La V1 usa placeholders CSS con el texto **FOTO AQUÍ** o **MAPA PENDIENTE**, el ratio y el nombre del archivo futuro. No son fotografías reales.

| ID | Sección | Ratio | Dimensiones | Archivo futuro | Composición prevista |
| --- | --- | --- | --- | --- | --- |
| `hero-desktop` | Hero desktop | 4 / 5 | 1200 × 1500 | `mua-hero-desktop.webp` | Manos y manicura, editorial, espacio negativo. |
| `hero-mobile` | Hero móvil | 4 / 5 | 900 × 1125 | `mua-hero-mobile.webp` | Versión vertical de la dirección del hero. |
| `service-semi` | Servicios | 4 / 3 | 1200 × 900 | `mua-semipermanente.webp` | Detalle de uñas naturales con acabado limpio. |
| `service-acrylic` | Servicios | 4 / 5 | 1000 × 1250 | `mua-acrilicas.webp` | Forma y longitud trabajadas. |
| `gallery-01` | Galería | 4 / 5 | 900 × 1125 | `mua-galeria-01.webp` | Detalle de manicura, plano corto. |
| `gallery-02` | Galería | 3 / 4 | 900 × 1200 | `mua-galeria-02.webp` | Acabado natural y textura. |
| `gallery-03` | Galería | 1 / 1 | 1000 × 1000 | `mua-galeria-03.webp` | Composición cuadrada de textura y color. |
| `gallery-04` | Galería | 3 / 2 | 1200 × 800 | `mua-galeria-04.webp` | Ambiente luminoso, plano general. |
| `gallery-05` | Galería | 4 / 5 | 900 × 1125 | `mua-galeria-05.webp` | Detalle editorial con acento burdeos. |
| `gallery-06` | Galería | 3 / 4 | 900 × 1200 | `mua-galeria-06.webp` | Inspiración de estilo, sin personas identificables. |
| `studio-salon` | El espacio | 3 / 2 | 1200 × 800 | `mua-estudio-salon.webp` | Interior, luz natural y mobiliario. |
| `studio-detail` | El espacio | 1 / 1 | 900 × 900 | `mua-estudio-detalle.webp` | Materiales, madera y objetos. |
| `map` | Contacto | 16 / 9 | 1200 × 675 | `mua-mapa.webp` | Mapa estático, sin iframe de terceros. |

## Sustitución

1. Optimiza la imagen a WebP con el ratio indicado.
2. Guárdala en `public/images/` con el nombre de la tabla.
3. En `src/data/images.ts`, cambia `src: null` por `src: '/images/mua-....webp'`.
4. Revisa el `alt` para que describa la imagen real y no el placeholder.
5. Ejecuta `npm run build` y revisa desktop/móvil.

El componente `Media.astro` detecta `src` y cambia el placeholder por `<img>` con `width`, `height`, `loading` y `decoding` correctos. El layout no cambia.

## Reglas

- No usar imágenes de Instagram sin autorización.
- No presentar imágenes ficticias o de stock como trabajos, personal o instalaciones de MUA.
- No añadir texto quemado en las imágenes.
- Mantener el ratio para evitar saltos de layout.
- Validar que las personas que aparezcan hayan autorizado el uso.
