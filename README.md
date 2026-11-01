# MUA Estética — prototipo

Propuesta **no oficial** de la nueva web de MUA Estética (Pamplona). Astro 7 estático, TypeScript estricto, Tailwind CSS 4 y una capa de motion con GSAP + ScrollTrigger + Lenis.

La base es GEN-9: plantilla visual, responsive, navegación, SEO prudente y experiencia de scroll. GEN-12 incorpora el lote de imágenes aprobado como recreaciones visuales ilustrativas, sin rehacer el motion.

- Issues: [GEN-9](https://linear.app/genesisnavarra/issue/GEN-9/mua-estetica-plantilla-inicial-astro-motion-gsaplenis-sin-assets) · [GEN-12](https://linear.app/genesisnavarra/issue/GEN-12/mua-estetica-integrar-imagenes-finales-y-documentar-prompts-y)
- Repo: `GenesisAI-team/mua-prototype`
- Rama: `feat/GEN-12-mua-final-assets`

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

- Servicios: **manicura / esmaltado semipermanente**, **uñas acrílicas / extensiones**, **pedicura**, **diseño de cejas** y **tratamiento facial**. La landing destaca los dos primeros y menciona el resto.
- Teléfono `747 49 66 24`, dirección en Calle de Artica, horario y reseñas están marcados como **provisionales** en la UI y en `src/data/site.ts`.
- No hay precios, profesionales, historia, testimonios, productos ni sistema de reservas.
- El sitio lleva el aviso visible de propuesta no oficial, `noindex, nofollow` y `robots.txt` con `Disallow: /`.
- Las imágenes son recreaciones visuales con IA, presentadas como **“Imágenes ilustrativas”**; no son fotografías reales ni trabajos verificados. El mapa sigue pendiente.

## Imágenes

Cada slot está registrado en `src/data/images.ts` con id, sección, ratio, dimensiones reales, alt, tono, `src` y `objectPosition`. Los 11 WebP integrados viven en `public/images/`; `gallery-05` reutiliza el archivo de acrílicas con otro recorte.

Para sustituir una recreación por una fotografía real autorizada:

1. Guarda el archivo optimizado en `public/images/`.
2. Actualiza `src`, `alt`, `width`, `height` y `objectPosition` en el slot correspondiente.
3. Revisa recorte, contraste y la etiqueta de imagen ilustrativa. No hace falta tocar el layout ni el motion.

Inventario, procedencia y descartes en [docs/IMAGES.md](docs/IMAGES.md).

## Motion

- Lenis gestiona el scroll suave y se sincroniza con el ticker de GSAP y `ScrollTrigger.update`; no se usa en táctil ni con `prefers-reduced-motion`.
- Hero: reveal tipográfico por líneas + máscara de imagen.
- Secciones: reveals una sola vez mediante `ScrollTrigger.batch`.
- Servicios: un único pin corto de la introducción en desktop, con barra de progreso scrub.
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
