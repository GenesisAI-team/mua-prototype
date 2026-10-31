# Inventario de imágenes

**Estado (31 de octubre de 2026):** 11 archivos WebP integrados en 12 slots. El slot `map` sigue pendiente. Todas las imágenes son **recreaciones visuales con IA** autorizadas por el usuario; no son fotografías reales del local ni trabajos verificados. La UI las presenta como **“Imágenes ilustrativas”**.

**Origen:** `C:\Users\jeffe\Pictures\MUA-ESTETICA` (`webp/`, `jpg/` y `_manifest.csv`). Se copiaron solo los WebP a `public/images/`; los JPG quedan como respaldo local. El lote completo tiene 23 WebP y 23 JPG equivalentes, todos verificados con `ffprobe` y `estado: ok` en el manifiesto.

Los 11 WebP integrados suman aproximadamente **1,08 MB**. El hero carga de forma prioritaria; el resto es lazy.

## Slots de la landing

| ID | Sección | Ratio | Dimensiones fuente | Archivo en `public/images/` | Encuadre | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| `hero-desktop` | Hero desktop | 4 / 5 | 1672 × 941 | `mua-hero-desktop.webp` | `object-position: 82% 50%` | Manos y manicura, recorte editorial. |
| `hero-mobile` | Hero móvil | 4 / 5 | 941 × 1672 | `mua-hero-mobile.webp` | `50% 50%` | Versión vertical del hero. |
| `service-semi` | Servicios | 4 / 3 | 1200 × 1200 | `mua-semipermanente.webp` | `50% 45%` | Manicura francesa con flores y burdeos. |
| `service-acrylic` | Servicios | 4 / 5 | 1200 × 1200 | `mua-acrilicas.webp` | `50% 42%` | Acrílicas almendra con diseño floral. |
| `gallery-01` | Galería | 4 / 5 | 1200 × 800 | `mua-galeria-01.webp` | `55% 50%` | Manicurista trabajando con una clienta. |
| `gallery-02` | Galería | 3 / 4 | 1200 × 800 | `mua-galeria-02.webp` | `50% 50%` | Pedicura spa con toallas y vela. |
| `gallery-03` | Galería | 1 / 1 | 1200 × 800 | `mua-galeria-03.webp` | `50% 50%` | Herramientas y detalle de marca. |
| `gallery-04` | Galería | 3 / 2 | 1448 × 1086 | `mua-galeria-04.webp` | `50% 50%` | Fachada con rótulo Muā. |
| `gallery-05` | Galería | 4 / 5 | 1200 × 1200 | `mua-acrilicas.webp` | `50% 35%` | Reutiliza el archivo de acrílicas con otro recorte. |
| `gallery-06` | Galería | 3 / 4 | 1200 × 900 | `mua-galeria-06.webp` | `50% 45%` | Tratamiento facial con mascarilla. |
| `studio-salon` | El espacio | 3 / 2 | 1600 × 900 | `mua-estudio-salon.webp` | `50% 50%` | Interior general con sillones verde oliva. |
| `studio-detail` | El espacio | 1 / 1 | 1536 × 1024 | `mua-estudio-detalle.webp` | `50% 50%` | Recepción y materiales. |
| `map` | Contacto | 16 / 9 | 1200 × 675 | `mua-mapa.webp` | — | **Pendiente**. No hay asset verificable. |

## Lote recibido: elegidos y descartados

Las rutas de la tabla son relativas a `C:\Users\jeffe\Pictures\MUA-ESTETICA\webp\`.

| Archivo | Carpeta | Destino / uso | Estado | Criterio |
| --- | --- | --- | --- | --- |
| `hero/hero_francesa-manos_salon-luminoso.webp` | `hero/` | `hero-desktop` | Integrada | Mejor equilibrio entre manos, manicura y contexto del salón. |
| `hero-movil/hero-movil_francesa-manos_vertical.webp` | `hero-movil/` | `hero-mobile` | Integrada | Vertical real, sin recorte artificial del hero. |
| `servicios/servicios_manicurista-cliente_puesto-trabajo.webp` | `servicios/` | `gallery-01` | Integrada | Escena de proceso con contexto humano y de espacio. |
| `servicios/servicios_manicura-proceso_tecnica.webp` | `servicios/` | — | Descartada | Plano de proceso menos claro y más repetitivo que la escena elegida. |
| `manicura/manicura_francesa-floral_nude.webp` | `manicura/` | `service-semi` | Integrada | Detalle limpio de francesa con flores; buena lectura en tarjeta. |
| `acrilicas/acrilicas_almendra-borgona_diseno-largo.webp` | `acrilicas/` | `service-acrylic` y `gallery-05` | Integrada | Forma y diseño más reconocibles; se reutiliza con otro recorte. |
| `pedicura/pedicura_spa-pies_toallas-vela.webp` | `pedicura/` | `gallery-02` | Integrada | Comunica mejor el cuidado spa que el plano de proceso. |
| `pedicura/pedicura_pies-esmalte_proceso.webp` | `pedicura/` | — | Descartada | Menos atmosférica y más próxima a un detalle técnico. |
| `cejas-facial/cejas-facial_tratamiento-facial_mascarilla.webp` | `cejas-facial/` | `gallery-06` | Integrada | Aporta el servicio facial confirmado y una textura distinta a la galería. |
| `cejas-facial/cejas-facial_diseno-cejas_pinzas.webp` | `cejas-facial/` | — | Descartada | El facial cubre mejor el slot; cejas queda mencionado en la línea de servicios. |
| `cta/cta_mua-detalle-marca_herramientas.webp` | `cta/` | `gallery-03` | Integrada | Más contraste y detalle de marca que la variante de toalla. |
| `cta/cta_mua-toalla-logo_ambiente.webp` | `cta/` | — | Descartada | Menos definición de marca y encaje visual más blando. |
| `interior/interior_salon-verde-oliva_vista-general.webp` | `interior/` | `studio-salon` | Integrada | Vista general más completa del ambiente. |
| `interior/interior_recepcion_ambiente-calido.webp` | `interior/` | `studio-detail` | Integrada | Detalle de recepción que complementa la vista general. |
| `interior/interior_salon-simetrico_estanterias.webp` | `interior/` | — | Descartada | Variante de interior; se evita duplicar ambientes. |
| `interior/interior_salon-luz-natural_escaparate.webp` | `interior/` | — | Descartada | Variante de interior próxima a la elegida. |
| `interior/interior_puestos-manicura_sillas-verdes.webp` | `interior/` | — | Descartada | Variante de interior; no aporta un ángulo suficientemente distinto. |
| `interior/interior_salon-ventanal_ambiente.webp` | `interior/` | — | Descartada | Variante de interior próxima a la vista general. |
| `interior/interior_sillas-verdes_primer-plano.webp` | `interior/` | — | Descartada | Demasiado primer plano para el slot de espacio. |
| `interior/interior_mesa-trabajo_bokeh.webp` | `interior/` | — | Descartada | Detalle de mesa menos informativo que la recepción. |
| `interior/interior_suelo-madera_perspectiva.webp` | `interior/` | — | Descartada | Ángulo de suelo menos útil para presentar el local. |
| `fachada/fachada_mua-escaparate_entrada.webp` | `fachada/` | `gallery-04` | Integrada | Fachada con escaparate y rótulo Muā, la más reconocible. |
| `fachada/fachada_mua-entrada_escalera.webp` | `fachada/` | — | Descartada | La entrada con escalera es menos clara como imagen de marca. |

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
- `hero-desktop` y `hero-mobile` cargan con `eager`/`fetchpriority="high"`; el resto es `lazy` con `decoding="async"`.
- `gallery-05` reutiliza `mua-acrilicas.webp`; no se creó un archivo duplicado.
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
