# Inventario de imágenes

**Estado (2 de noviembre de 2026):** 19 archivos WebP integrados en 20 slots. El slot `map` sigue pendiente. Todas las imágenes son **recreaciones visuales con IA** autorizadas por el usuario; no son fotografías reales del local ni trabajos verificados. La UI las presenta como **“Imágenes ilustrativas”**.

**Origen:** `C:\Users\jeffe\Pictures\MUA-ESTETICA` (`webp/`, `jpg/` y `_manifest.csv`). Se copiaron solo los WebP a `public/images/`; los JPG quedan como respaldo local. El lote completo tiene 23 WebP y 23 JPG equivalentes, todos verificados con `ffprobe` y `estado: ok` en el manifiesto.

Los 19 WebP integrados suman aproximadamente **1,82 MB**. La imagen principal del hero carga de forma prioritaria; el resto del mosaico y de la página usa lazy loading.

## Slots de la landing

| ID | Sección | Ratio | Dimensiones fuente | Archivo en `public/images/` | Encuadre | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| `hero-desktop` | Hero desktop | 8 / 9 | 1200 × 1350 | `mua-hero-desktop.webp` | `50% 50%` | Interior principal del mosaico, recorte editorial. |
| `hero-mobile` | Hero móvil | 4 / 5 | 900 × 1125 | `mua-hero-mobile.webp` | `50% 50%` | Recorte vertical del interior principal. |
| `hero-fachada` | Hero | 4 / 3 | 1200 × 900 | `mua-hero-fachada.webp` | `50% 50%` | Fachada con rótulo, escaparate y entrada. |
| `hero-detalle` | Hero | 4 / 3 | 900 × 675 | `mua-hero-detalle.webp` | `50% 50%` | Detalle de mesa de trabajo y herramientas. |
| `hero-interior-01` | Hero | 2 / 3 | 800 × 1200 | `mua-hero-interior-01.webp` | `50% 45%` | Sillones verde oliva en primer plano. |
| `hero-interior-02` | Hero | 4 / 3 | 900 × 675 | `mua-hero-interior-02.webp` | `50% 50%` | Puestos de manicura con luz natural. |
| `hero-interior-03` | Hero | 4 / 3 | 900 × 675 | `mua-hero-interior-03.webp` | `50% 50%` | Vista simétrica con estanterías. |
| `service-semi` | Servicios | 4 / 3 | 1200 × 1200 | `mua-semipermanente.webp` | `50% 45%` | Manicura francesa con flores y burdeos. |
| `service-acrylic` | Servicios | 4 / 5 | 1200 × 1200 | `mua-acrilicas.webp` | `50% 42%` | Acrílicas almendra con diseño floral. |
| `gallery-01` | Galería | 4 / 5 | 1200 × 800 | `mua-galeria-01.webp` | `55% 50%` | Manicurista trabajando con una clienta. |
| `gallery-02` | Galería | 3 / 4 | 1200 × 800 | `mua-galeria-02.webp` | `50% 50%` | Pedicura spa con toallas y vela. |
| `gallery-03` | Galería | 1 / 1 | 1200 × 800 | `mua-galeria-03.webp` | `50% 50%` | Herramientas y detalle de marca. |
| `gallery-04` | Galería | 3 / 2 | 1448 × 1086 | `mua-galeria-04.webp` | `50% 50%` | Fachada con rótulo Muā. |
| `gallery-05` | Galería | 4 / 5 | 941 × 1672 | `mua-manicura-francesa.webp` | `50% 50%` | Antiguo hero móvil reubicado como manicura francesa. |
| `gallery-06` | Galería | 3 / 4 | 1200 × 900 | `mua-galeria-06.webp` | `50% 45%` | Tratamiento facial con mascarilla. |
| `gallery-07` | Galería | 3 / 2 | 1200 × 800 | `mua-diseno-cejas.webp` | `42% 50%` | Diseño de cejas; capa superior izquierda del cluster. |
| `gallery-08` | Galería | 1 / 1 | 1600 × 900 | `mua-galeria-08.webp` | `50% 50%` | Vista del salón; capa inferior izquierda del cluster. |
| `studio-salon` | El espacio | 3 / 2 | 1600 × 900 | `mua-estudio-salon.webp` | `50% 50%` | Interior general con sillones verde oliva. |
| `studio-detail` | El espacio | 1 / 1 | 1536 × 1024 | `mua-estudio-detalle.webp` | `50% 50%` | Recepción y materiales. |
| `map` | Contacto | 16 / 9 | 1200 × 675 | `mua-mapa.webp` | — | **Pendiente**. No hay asset verificable. |

## Lote recibido: elegidos y descartados

Las rutas de la tabla son relativas a `C:\Users\jeffe\Pictures\MUA-ESTETICA\webp\`.

| Archivo | Carpeta | Destino / uso | Estado | Criterio |
| --- | --- | --- | --- | --- |
| `hero/hero_francesa-manos_salon-luminoso.webp` | `hero/` | — | Retirada | El hero pasa a un mosaico de interior; el archivo anterior no se publica. |
| `hero-movil/hero-movil_francesa-manos_vertical.webp` | `hero-movil/` | `gallery-05` | Integrada (reubicada) | Antiguo hero móvil; pasa a la galería como manicura francesa. |
| `servicios/servicios_manicurista-cliente_puesto-trabajo.webp` | `servicios/` | `gallery-01` | Integrada | Escena de proceso con contexto humano y de espacio. |
| `servicios/servicios_manicura-proceso_tecnica.webp` | `servicios/` | — | Descartada | Plano de proceso menos claro y más repetitivo que la escena elegida. |
| `manicura/manicura_francesa-floral_nude.webp` | `manicura/` | `service-semi` | Integrada | Detalle limpio de francesa con flores; buena lectura en tarjeta. |
| `acrilicas/acrilicas_almendra-borgona_diseno-largo.webp` | `acrilicas/` | `service-acrylic` | Integrada | Forma y diseño más reconocibles para la tarjeta de servicio. |
| `pedicura/pedicura_spa-pies_toallas-vela.webp` | `pedicura/` | `gallery-02` | Integrada | Comunica mejor el cuidado spa que el plano de proceso. |
| `pedicura/pedicura_pies-esmalte_proceso.webp` | `pedicura/` | — | Descartada | Menos atmosférica y más próxima a un detalle técnico. |
| `cejas-facial/cejas-facial_tratamiento-facial_mascarilla.webp` | `cejas-facial/` | `gallery-06` | Integrada | Aporta el servicio facial confirmado y una textura distinta a la galería. |
| `cejas-facial/cejas-facial_diseno-cejas_pinzas.webp` | `cejas-facial/` | `gallery-07` | Integrada | Añade el servicio de cejas como capa superior del cluster, sin recorte vertical forzado. |
| `cta/cta_mua-detalle-marca_herramientas.webp` | `cta/` | `gallery-03` | Integrada | Más contraste y detalle de marca que la variante de toalla. |
| `cta/cta_mua-toalla-logo_ambiente.webp` | `cta/` | — | Descartada | Menos definición de marca y encaje visual más blando. |
| `interior/interior_salon-verde-oliva_vista-general.webp` | `interior/` | `studio-salon` | Integrada | Vista general más completa del ambiente. |
| `interior/interior_recepcion_ambiente-calido.webp` | `interior/` | `studio-detail` | Integrada | Detalle de recepción que complementa la vista general. |
| `interior/interior_salon-simetrico_estanterias.webp` | `interior/` | `hero-interior-03` | Integrada | Tile secundario del mosaico; aporta simetría y estanterías. |
| `interior/interior_salon-luz-natural_escaparate.webp` | `interior/` | `hero-desktop` y `hero-mobile` | Integrada | Interior principal del hero, recortado en 8:9 y 4:5. |
| `interior/interior_puestos-manicura_sillas-verdes.webp` | `interior/` | `hero-interior-02` | Integrada | Perspectiva de los puestos de manicura para el mosaico. |
| `interior/interior_salon-ventanal_ambiente.webp` | `interior/` | `gallery-08` | Integrada | Capa inferior del cluster; aporta amplitud y luz natural. |
| `interior/interior_sillas-verdes_primer-plano.webp` | `interior/` | `hero-interior-01` | Integrada | Detalle textil vertical para una de las secundarias. |
| `interior/interior_mesa-trabajo_bokeh.webp` | `interior/` | `hero-detalle` | Integrada | Detalle de mesa y herramientas para el mosaico. |
| `interior/interior_suelo-madera_perspectiva.webp` | `interior/` | — | Descartada | Ángulo de suelo menos útil para presentar el local. |
| `fachada/fachada_mua-escaparate_entrada.webp` | `fachada/` | `gallery-04` | Integrada | Fachada con escaparate y rótulo Muā, la más reconocible. |
| `fachada/fachada_mua-entrada_escalera.webp` | `fachada/` | `hero-fachada` | Integrada | Entrada con escalera como secundaria del mosaico del hero. |

## Procedencia y permisos

- **Procedencia:** recreaciones generadas con IA a partir de referencias y edición visual. No son fotografías auténticas del negocio.
- **Aprobación:** el usuario confirmó el lote como entrega definitiva y autorizó su uso como imágenes ilustrativas.
- **Fachada:** el usuario autorizó expresamente la variante con el rótulo **“Muā”**.
- **Personas:** las escenas son recreaciones; no se presentan como clientas, profesionales ni tratamientos reales. No se atribuyen identidades.
- **Servicios:** el usuario confirmó manicura/semipermanente, acrílicas, pedicura, diseño de cejas y tratamiento facial.
- **Uso:** no se usan fotos de Instagram, stock externo ni nuevas generaciones aleatorias en esta issue.

Documentación relacionada: [10 prompts base](ASSET_PROMPTS.md) y [auditoría retrospectiva](ASSET_GENERATION_AUDIT.md).

## Ajustes técnicos

- Solo se copiaron los WebP; no se duplicaron los JPG en `public/`.
- Cada slot conserva su ratio de layout y declara `width`/`height` reales para evitar saltos.
- `Media.astro` aplica `object-position` por slot y usa `object-fit: cover`.
- `hero-desktop` y `hero-mobile` cargan con `eager`/`fetchpriority="high"`; las cinco secundarias del mosaico y el resto de la página usan `lazy` con `decoding="async"`. Excepción: los ítems de la franja móvil `.hero-rail-h` (GEN-27) y los clones duplicados del rail vertical (GEN-26) usan `eager` porque con `lazy` no cargarían mientras estén recortados por `overflow: hidden`; al compartir `src` con los originales no suponen descargas adicionales.
- El mosaico del hero usa siete WebP: un interior principal con recortes desktop/móvil y cinco secundarias. `Media.astro` acepta `fluid` para omitir el ratio inline y dejar que el grid CSS decida el encuadre por breakpoint.
- `gallery-05` usa `mua-manicura-francesa.webp`, el antiguo hero móvil reubicado. El antiguo `mua-hero-desktop.webp` se retiró.
- Las últimas cuatro piezas forman un cluster superpuesto en desktop: `gallery-07` (cejas, 3:2), `gallery-05` (francesa, 4:5), `gallery-08` (salón, 1:1) y `gallery-06` (facial, 3:4). Los solapes y las sombras crean profundidad; en tablet pasan a una rejilla 2×2 con filas igualadas y en móvil se apilan con sus ratios naturales.
- El mapa no se sustituye por una captura inventada: mantiene el placeholder hasta tener una ubicación verificable.

## Sustitución futura por fotografías reales

1. Optimiza la fotografía a WebP con el ratio del slot.
2. Guárdala en `public/images/` con un nombre semántico.
3. Actualiza `src`, `alt`, `width`, `height` y, si hace falta, `objectPosition` en `src/data/images.ts`.
4. Retira la etiqueta de recreación solo cuando la imagen sea una fotografía real autorizada.
5. Ejecuta `npm run build` y revisa desktop/móvil, sin tocar el layout ni el motion.

## Reglas

- No usar imágenes de Instagram sin autorización.
- No presentar recreaciones IA como trabajos, personal o instalaciones reales.
- No añadir texto quemado en las imágenes.
- Mantener el ratio para evitar saltos de layout.
- Validar derechos y consentimiento cuando se incorporen personas reales.
