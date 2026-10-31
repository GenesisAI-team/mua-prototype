# Arquitectura — MUA Estética

## Resumen

Landing estática de una sola página construida con Astro 7 (`output: 'static'`), TypeScript `strictest` y Tailwind CSS 4 mediante `@tailwindcss/vite`. No hay React, CMS, backend, formularios ni reservas.

La base es GEN-9: composición, responsive, navegación, motion y SEO prudente. GEN-12 incorpora el lote de imágenes aprobado como recreaciones visuales ilustrativas. Los slots de imagen son parte del layout, no un añadido posterior.

## Capas

- `src/data/site.ts`: datos de contacto y estado provisional. Es la única fuente para teléfono, dirección, horario e Instagram.
- `src/data/content.ts`: navegación, servicios principales y adicionales, galería, principios y pasos de visita.
- `src/data/images.ts`: inventario tipado de imágenes. Incluye id, sección, ratio, dimensiones reales, alt, tono, nota, `src` y `objectPosition`.
- `src/components/Media.astro`: renderiza la imagen si `src` existe; si no, un placeholder editorial con `role="img"`, `aria-label`, esquinas y etiqueta de desarrollo.
- `src/layouts/BaseLayout.astro`: metadatos, aviso de preview, JSON-LD mínimo, header/footer y arranque de scripts.
- `src/styles/global.css`: tokens `@theme`, tipografías Fontsource, componentes editoriales y estados de motion. No hay `tailwind.config`.
- `src/scripts/ui/header.ts`: header sticky, menú móvil con `<dialog>` y bloqueo de scroll.
- `src/scripts/motion/index.ts`: Lenis, GSAP, ScrollTrigger, reveals y pin.

## Decisiones

### Contenido prudente

La sección de servicios destaca dos tarjetas principales —manicura/esmaltado semipermanente y uñas acrílicas/extensiones— y una línea con pedicura, diseño de cejas y tratamiento facial, confirmados por el usuario. No se publican precios, profesionales, historia, testimonios ni reservas. Los datos sensibles se muestran como provisionales y no se incluye schema `LocalBusiness` con teléfono, dirección ni reseñas sin verificar. El JSON-LD se limita a `WebSite` con nombre, idioma y descripción.

### Imágenes

Los 11 WebP integrados son recreaciones visuales con IA autorizadas, no fotografías reales del local. La UI los presenta como **“Imágenes ilustrativas”** y la documentación registra procedencia, destino, recortes y descartes. No se usan fotos de Instagram ni stock externo. El mapa sigue pendiente para no inventar una ubicación.

Cada slot declara ratio, dimensiones reales y, cuando hace falta, `objectPosition`; así el recorte no genera saltos de layout. El hero tiene dos slots (`hero-desktop` y `hero-mobile`) con dirección de arte distinta y carga prioritaria. El resto de imágenes usa lazy loading. `gallery-05` reutiliza el WebP de acrílicas con otro recorte para no duplicar archivos.

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
- Imágenes y placeholders con `role="img"` y `aria-label` descriptivo; el `<img>` lleva `alt=""` para no duplicar la etiqueta accesible. El texto visible de desarrollo queda oculto a lectores.
- Sin dependencia de hover para acceder al contenido.
- Tamaños táctiles de al menos 44 px en controles principales.

## SEO

- `title`, `meta description`, canonical y OG solo cuando existe `PUBLIC_SITE_URL`.
- `noindex, nofollow` por defecto y `robots.txt` bloqueante.
- Sin imagen OG configurada todavía; el lote ilustrativo está autorizado, pero falta definir el recurso de compartición.
- Sin datos estructurados de dirección, teléfono, horarios o reseñas no verificados.

## Pendiente en la siguiente iteración

- Incorporar el mapa estático cuando la ubicación esté verificada.
- Sustituir las recreaciones ilustrativas por fotografías reales autorizadas cuando existan.
- Validar teléfono, dirección, horario y reseñas.
- Añadir imagen OG y canonical de producción.
- Retirar el aviso de propuesta y el `noindex` solo con autorización.
