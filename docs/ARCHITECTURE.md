# Arquitectura — GEN-9

## Resumen

Landing estática de una sola página construida con Astro 7 (`output: 'static'`), TypeScript `strictest` y Tailwind CSS 4 mediante `@tailwindcss/vite`. No hay React, CMS, backend, formularios ni reservas.

La prioridad es que la composición y el motion estén resueltos antes de incorporar las fotografías definitivas. Los slots de imagen son parte del layout, no un añadido posterior.

## Capas

- `src/data/site.ts`: datos de contacto y estado provisional. Es la única fuente para teléfono, dirección, horario e Instagram.
- `src/data/content.ts`: navegación, servicios confirmados, galería, principios y pasos de visita.
- `src/data/images.ts`: inventario tipado de huecos de imagen. Incluye id, sección, ratio, dimensiones, alt, tono, nota de dirección y archivo futuro.
- `src/components/Media.astro`: renderiza una imagen real si `src` existe; si no, un placeholder editorial con `role="img"`, `aria-label`, esquinas y etiqueta de desarrollo.
- `src/layouts/BaseLayout.astro`: metadatos, aviso de preview, JSON-LD mínimo, header/footer y arranque de scripts.
- `src/styles/global.css`: tokens `@theme`, tipografías Fontsource, componentes editoriales y estados de motion. No hay `tailwind.config`.
- `src/scripts/ui/header.ts`: header sticky, menú móvil con `<dialog>` y bloqueo de scroll.
- `src/scripts/motion/index.ts`: Lenis, GSAP, ScrollTrigger, reveals y pin.

## Decisiones

### Contenido prudente

Solo se publican los dos servicios con evidencia pública. Los datos sensibles se muestran como provisionales y no se incluye schema `LocalBusiness` con teléfono, dirección ni reseñas sin verificar. El JSON-LD se limita a `WebSite` con nombre, idioma y descripción.

### Imágenes

No se usan fotos de Instagram, imágenes generadas ni recursos externos. Los placeholders son CSS, tienen ratio y dimensiones explícitas y no generan saltos de layout. La sustitución se hace cambiando `src` y el archivo en `public/images/`.

El hero tiene dos slots (`hero-desktop` y `hero-mobile`) para permitir dirección de arte distinta sin rehacer el componente. En la V1 se alternan por breakpoint.

### Motion

- Un único pin: la introducción de servicios en desktop (`min-width: 1024px`). En móvil no se pinea.
- Lenis solo con `prefers-reduced-motion: no-preference`; se sincroniza con `lenis.on('scroll', ScrollTrigger.update)` y el ticker de GSAP.
- Las anclas se interceptan solo cuando Lenis está activo. Sin Lenis, el navegador usa el scroll nativo y `scroll-margin-top`.
- Las animaciones se limitan a `transform`, `opacity` y `clip-path`.
- `ScrollTrigger.batch` agrupa los reveals para evitar decenas de triggers simultáneos.
- El menú móvil detiene y reanuda Lenis mediante el evento `mua:menu`.
- Si el módulo de motion falla, un timeout inline añade `motion-failed` y muestra todo el contenido.
- Con `prefers-reduced-motion` no se crea Lenis ni se registran reveals; el CSS fuerza el estado visible.

### Navegación

No hay router ni navegación entre páginas. La página es estática y las anclas resuelven el recorrido. Por eso no se destruyen triggers al navegar; no existe una transición SPA que deje listeners huérfanos.

## Accesibilidad

- Un solo `h1` y jerarquía de encabezados por sección.
- Skip link, foco visible y menú móvil con `<dialog>` y cierre por `Esc`.
- Placeholders con `role="img"` y `aria-label`; el texto visible de desarrollo queda oculto a lectores.
- Sin dependencia de hover para acceder al contenido.
- Tamaños táctiles de al menos 44 px en controles principales.

## SEO

- `title`, `meta description`, canonical y OG solo cuando existe `PUBLIC_SITE_URL`.
- `noindex, nofollow` por defecto y `robots.txt` bloqueante.
- Sin imágenes OG hasta disponer de un recurso autorizado.
- Sin datos estructurados de dirección, teléfono, horarios o reseñas no verificados.

## Pendiente en la siguiente iteración

- Sustituir los 13 slots por imágenes autorizadas y optimizadas.
- Validar teléfono, dirección, horario y reseñas.
- Añadir imagen OG y canonical de producción.
- Retirar el aviso de propuesta y el `noindex` solo con autorización.
