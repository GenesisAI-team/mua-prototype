# Arquitectura — MUA Estética

## Resumen

Landing estática de una sola página construida con Astro 7 (`output: 'static'`), TypeScript `strictest` y Tailwind CSS 4 mediante `@tailwindcss/vite`. No hay React, CMS, backend, formularios ni reservas automáticas; las CTAs de servicio abren WhatsApp directamente.

La base es GEN-9: composición, responsive, navegación, motion y SEO prudente. GEN-12 incorpora el lote de imágenes aprobado como recreaciones visuales ilustrativas. GEN-21 amplía el hero con un mosaico editorial de interior y cinco secundarias, reubica el antiguo hero en la galería y mantiene los slots de imagen como parte del layout, no como un añadido posterior. GEN-22 amplía la sección de servicios con cinco tarjetas, un tarifario agrupado y enlaces de reserva a WhatsApp. GEN-23 convierte la CTA principal del hero en enlace de llamada y GEN-24 elimina los estados de dato provisional de la UI, los datos y las reglas.

## Capas

- `src/data/site.ts`: datos de contacto. Es la única fuente para teléfono, WhatsApp, dirección, horario e Instagram.
- `src/data/content.ts`: navegación, servicios, tarifario agrupado, galería, principios y pasos de visita.
- `src/lib/whatsapp.ts`: construye enlaces `wa.me` con el mensaje de cada servicio codificado.
- `src/data/images.ts`: inventario tipado de imágenes. Incluye id, sección, ratio, dimensiones reales, alt, tono, nota, `src` y `objectPosition`.
- `src/components/Media.astro`: renderiza la imagen si `src` existe; si no, un placeholder editorial con `role="img"`, `aria-label`, esquinas y etiqueta de desarrollo.
- `src/layouts/BaseLayout.astro`: metadatos, aviso de preview, JSON-LD mínimo, header/footer y arranque de scripts.
- `src/styles/global.css`: tokens `@theme`, tipografías Fontsource, componentes editoriales y estados de motion. No hay `tailwind.config`.
- `src/scripts/ui/header.ts`: header sticky, menú móvil con `<dialog>` y bloqueo de scroll.
- `src/scripts/motion/index.ts`: Lenis, GSAP, ScrollTrigger, reveals y pin.

## Decisiones

### Contenido prudente

La sección de servicios muestra cinco tarjetas —manicura/esmaltado semipermanente, uñas acrílicas/extensiones, pedicura, diseño de cejas y tratamiento facial— y un tarifario agrupado en Manicura, Pedicura y Otros servicios. Las tarjetas no muestran precios; el tarifario usa exclusivamente las tarifas facilitadas por el negocio y no añade IVA, protocolos ni duraciones no confirmadas. Las CTAs de reserva construyen un enlace `wa.me` con el servicio prerrellenado; no hay formularios ni reservas automáticas. Los datos de contacto se muestran como valores directos y no se incluye schema `LocalBusiness`. El JSON-LD se limita a `WebSite` con nombre, idioma y descripción.

### Imágenes

Los 19 WebP integrados son recreaciones visuales con IA autorizadas, no fotografías reales del local. La UI los presenta como **“Imágenes ilustrativas”** y la documentación registra procedencia, destino, recortes y descartes. No se usan fotos de Instagram ni stock externo. El mapa sigue pendiente para no inventar una ubicación. Las tarjetas de pedicura, cejas y facial reutilizan las imágenes de galería `gallery-02`, `gallery-07` y `gallery-06`; no se añaden archivos.

Cada slot declara ratio, dimensiones reales y, cuando hace falta, `objectPosition`; así el recorte no genera saltos de layout. El hero es un mosaico de siete slots: `hero-desktop` y `hero-mobile` comparten el interior principal con recortes 8:9 y 4:5, y `hero-fachada`, `hero-detalle`, `hero-interior-01..03` aportan cinco secundarias. En desktop (≥900px) las tres fotos de la columna derecha (`hero-fachada`, `hero-detalle`, `hero-interior-01`) se sirven desde un rail `.hero-rail` con un set duplicado en loop vertical infinito y los Media estáticos quedan ocultos; en móvil es al revés, el rail está oculto y el collage es estático. El grid y las áreas se definen en `global.css`; `Media.astro` acepta `fluid` para que el ratio inline no bloquee el encuadre por breakpoint. La imagen principal carga con prioridad y el resto del mosaico usa lazy loading. `gallery-05` usa `mua-manicura-francesa.webp`, el antiguo hero móvil reubicado; el antiguo `mua-hero-desktop.webp` se retiró. Las últimas cuatro piezas (`gallery-07`, `gallery-05`, `gallery-08`, `gallery-06`) forman un cluster posicionado en absoluto dentro de `.gallery-cluster`: cejas 3:2 arriba a la izquierda, francesa 4:5 arriba a la derecha, salón 1:1 abajo a la izquierda y facial 3:4 abajo a la derecha. Los solapes y las sombras aportan profundidad; el ratio del contenedor (10:9) garantiza que no haya saltos. En tablet el cluster pasa a una rejilla 2×2 con filas igualadas y en móvil se apila con ratios naturales.

### Motion

- Un único pin: la introducción de servicios en desktop (`min-width: 1024px`). El recorrido termina con la lista de tarjetas, antes del tarifario; en móvil no se pinea.
- Lenis solo con `prefers-reduced-motion: no-preference`; se sincroniza con `lenis.on('scroll', ScrollTrigger.update)` y el ticker de GSAP.
- Las anclas se interceptan solo cuando Lenis está activo. Sin Lenis, el navegador usa el scroll nativo y `scroll-margin-top`.
- Las animaciones se limitan a `transform`, `opacity` y `clip-path`.
- El hero revela el título por líneas y enmascara las imágenes visibles del mosaico con un stagger corto (incluidas las del rail); las imágenes del hero se excluyen de `initImageReveals` para no duplicar triggers. El loop del rail es CSS puro (`@keyframes` `translateY(-50%)`, 30s) y con `prefers-reduced-motion` queda estático.
- `ScrollTrigger.batch` agrupa los reveals para evitar decenas de triggers simultáneos.
- El menú móvil detiene y reanuda Lenis mediante el evento `mua:menu`.
- Si el módulo de motion falla, un timeout inline añade `motion-failed` y muestra todo el contenido.
- Con `prefers-reduced-motion` no se crea Lenis ni se registran reveals; el CSS fuerza el estado visible.

### Navegación

No hay router ni navegación entre páginas. La página es estática y las anclas resuelven el recorrido. Por eso no se destruyen triggers al navegar; no existe una transición SPA que deje listeners huérfanos. La CTA principal del hero usa `site.phone.href` (`tel:`) para abrir el marcador; «Ver servicios» sigue siendo un ancla interna.

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
