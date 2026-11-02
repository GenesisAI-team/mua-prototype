# MUA Estética — prototipo

Propuesta **no oficial** de la nueva web de MUA Estética (Pamplona). Astro 7 estático, TypeScript estricto, Tailwind CSS 4 y una capa de motion con GSAP + ScrollTrigger + Lenis.

La base es GEN-9: plantilla visual, responsive, navegación, SEO prudente y experiencia de scroll. GEN-12 incorpora el lote de imágenes aprobado como recreaciones visuales ilustrativas, sin rehacer el motion. GEN-21 amplía el hero con un mosaico editorial de interior y cinco secundarias, y reubica el antiguo hero en la galería. GEN-22 completa los cinco servicios, añade el tarifario y conecta las CTAs con WhatsApp. GEN-23 cambia la CTA principal del hero para iniciar la llamada telefónica. GEN-24 elimina todas las referencias de contenido provisional. GEN-25 retira la nota de recreaciones de la sección Estudio. GEN-26 convierte la columna derecha del hero en un rail de imágenes con loop infinito vertical.

- Issues: [GEN-9](https://linear.app/genesisnavarra/issue/GEN-9/mua-estetica-plantilla-inicial-astro-motion-gsaplenis-sin-assets) · [GEN-12](https://linear.app/genesisnavarra/issue/GEN-12/mua-estetica-integrar-imagenes-finales-y-documentar-prompts-y) · [GEN-21](https://linear.app/genesisnavarra/issue/GEN-21/mua-estetica-ampliar-el-hero-con-mosaico-de-interior-y-) · [GEN-22](https://linear.app/genesisnavarra/issue/GEN-22/mua-estetica-completar-servicios-tarifario-y-reserva-por-whatsapp) · [GEN-23](https://linear.app/genesisnavarra/issue/GEN-23/mua-estetica-cta-del-hero-abre-llamada-telefonica) · [GEN-24](https://linear.app/genesisnavarra/issue/GEN-24/mua-estetica-eliminar-referencias-provisionales) · [GEN-25](https://linear.app/genesisnavarra/issue/GEN-25/mua-estetica-eliminar-nota-de-recreaciones-en-estudio) · [GEN-26](https://linear.app/genesisnavarra/issue/GEN-26/mua-estetica-franja-de-imagenes-en-flujo-infinito-en-el-hero)
- Repo: `GenesisAI-team/mua-prototype`
- Rama: `refactor/GEN-25-nota-estudio` (desde `main`)

## Requisitos

- Node **22.22.3** (ver `.node-version`).
- npm **10.9.8**.

Con `fnm`:

```bash
fnm use 22.22.3
```

## Comandos

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run test:e2e
```

`npm run preview` sirve `dist/` en `http://127.0.0.1:4321`.

## Estructura

```text
src/
  components/       Header, hero, secciones y Media reutilizable
  data/             site.ts, content.ts, images.ts
  lib/              Helpers, incluido el constructor de enlaces de WhatsApp
  layouts/          BaseLayout con SEO, aviso de preview y scripts
  pages/            index.astro
  scripts/
    motion/         GSAP, ScrollTrigger, Lenis y reveals
    ui/             Header, menú móvil y estado de scroll
  styles/           global.css (tokens Tailwind 4 + componentes)
tests/
  unit/             Inventario de imágenes y reglas de contenido
  e2e/              Smoke tests, responsive, reduced motion y no-JS
docs/
  ARCHITECTURE.md   Decisiones técnicas y de motion
  SKILLS.md         Skills instaladas y uso
  IMAGES.md         Inventario, procedencia y sustitución de imágenes
  ASSET_PROMPTS.md  Prompts base del lote visual
  ASSET_GENERATION_AUDIT.md  Auditoría del proceso de generación
```

## Estado del contenido

- Servicios: **manicura / esmaltado semipermanente**, **uñas acrílicas / extensiones**, **pedicura**, **diseño de cejas** y **tratamiento facial**, cada uno con su tarjeta foto + texto.
- La sección incluye un tarifario agrupado en Manicura, Pedicura y Otros servicios con las tarifas facilitadas por el negocio. Las tarjetas no muestran precios.
- Las CTAs de reserva abren directamente el WhatsApp `747 49 66 24` con el servicio prerrellenado. No hay formularios ni reservas automáticas.
- La CTA principal del hero, «Consultar disponibilidad», abre el marcador telefónico con `tel:+34747496624`; «Ver servicios» mantiene su ancla interna.
- Teléfono, WhatsApp y dirección en Calle de Artica se muestran como datos de contacto directos.
- No hay profesionales, historia, testimonios, productos ni promesas clínicas.
- El sitio lleva el aviso visible de propuesta no oficial, `noindex, nofollow` y `robots.txt` con `Disallow: /`.
- Las imágenes son recreaciones visuales con IA, presentadas como **“Imágenes ilustrativas”**; no son fotografías reales ni trabajos verificados. El mapa sigue pendiente.

## Imágenes

Cada slot está registrado en `src/data/images.ts` con id, sección, ratio, dimensiones reales, alt, tono, `src` y `objectPosition`. Los 19 WebP integrados viven en `public/images/`. El hero usa un mosaico de siete archivos (interior principal desktop/móvil y cinco secundarias); `gallery-05` es el antiguo hero móvil reubicado como `mua-manicura-francesa.webp`; las últimas cuatro piezas (`gallery-07`, `gallery-05`, `gallery-08`, `gallery-06`) forman un cluster superpuesto con profundidad en la galería. Las tarjetas de pedicura, cejas y facial reutilizan `gallery-02`, `gallery-07` y `gallery-06` como imágenes ilustrativas, sin archivos nuevos.

Para sustituir una recreación por una fotografía real autorizada:

1. Guarda el archivo optimizado en `public/images/`.
2. Actualiza `src`, `alt`, `width`, `height` y `objectPosition` en el slot correspondiente.
3. Revisa recorte, contraste y la etiqueta de imagen ilustrativa. No hace falta tocar el layout ni el motion.

Inventario, procedencia y descartes en [docs/IMAGES.md](docs/IMAGES.md).

## Motion

- Lenis gestiona el scroll suave y se sincroniza con el ticker de GSAP y `ScrollTrigger.update`; no se usa en táctil ni con `prefers-reduced-motion`.
- Hero: reveal tipográfico por líneas + máscara escalonada de las imágenes visibles del mosaico. En desktop la columna derecha es un rail `.hero-rail` con las tres fotos de la derecha en loop vertical infinito (CSS puro, 30s); en móvil el collage sigue estático.
- Secciones: reveals una sola vez mediante `ScrollTrigger.batch`.
- Servicios: un único pin de la introducción en desktop, con barra de progreso scrub; acompaña las cinco tarjetas y se libera antes del tarifario.
- Galería: hover/tap sutil, sin scroll horizontal forzado.
- Fallbacks: scroll nativo sin JS, contenido visible con motion reducido y timeout `motion-failed` si el módulo no arranca.

## Validación antes de PR

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run test:e2e
```

Revisar además desktop y móvil con preview real, sin overflow horizontal y con `prefers-reduced-motion`.

## Publicación

No hay merge ni despliegue sin autorización. Antes de publicar habrá que validar teléfono, dirección, horario, reseñas, imágenes y retirar el `noindex`.
