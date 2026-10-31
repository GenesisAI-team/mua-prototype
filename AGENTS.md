# AGENTS.md — MUA Estética prototype

Guía operativa para agentes de código (OpenCode, Codex, etc.). **La issue de Linear es la fuente de verdad de cada tarea.** No se trabaja sin issue ni se amplía el alcance sin reflejarlo en Linear.

## Jerarquía de fuentes

1. Issue Linear (GEN-ID): alcance, criterios de aceptación y validaciones.
2. `README.md`, `docs/` y este archivo, cuando la issue remita a ellos.
3. Criterio propio del agente solo para decisiones mecánicas. Las decisiones no triviales se documentan en `docs/ARCHITECTURE.md` o en un comentario de la issue.

## Repositorio

- Repo único: `GenesisAI-team/mua-prototype`.
- Proyecto: Ultimate Coding · equipo Genesis.
- Rama base: `main`.
- Una rama por issue. Convención: `feat/GEN-ID-descripcion-corta` (también `fix/`, `chore/`, `refactor/`, `docs/`, `perf/`).
- Todo el trabajo va por PR. **No merge, no despliegue y no push a `main` sin autorización expresa del usuario.**
- Flujo Linear: `Todo → In Progress → In Review → Done`. Nunca usar Backlog.

## Stack y convenciones

- Astro 7 (output estático) + TypeScript `strictest` + Tailwind CSS 4 vía `@tailwindcss/vite`.
- Sin React, CMS, backend, formularios ni sistema de reservas salvo petición explícita en una issue.
- GSAP + ScrollTrigger + Lenis para motion. Un único pin como máximo; animar solo `transform`, `opacity` y `clip-path`.
- Estructura: `src/{layouts,pages,components,data,scripts,styles,lib}`, `tests/{unit,e2e}`, `docs/`, `public/`.
- Tailwind 4 es CSS-first: los tokens viven en `@theme` dentro de `src/styles/global.css`. No crear `tailwind.config`.
- Componentes reutilizables y datos centralizados. Las imágenes se registran en `src/data/images.ts`; no hardcodear rutas en las secciones.
- Comentarios de código solo cuando expliquen algo no obvio.

## Reglas de contenido (críticas)

- **No inventar** profesionales, historia, testimonios, precios, horarios, productos, promesas clínicas ni un sistema de reservas.
- Datos sensibles (teléfono, dirección, horario, reseñas) se marcan como provisionales en `src/data/site.ts` y se señalan en la UI/documentación. Nunca presentarlos como verificados.
- Servicios confirmados por el usuario: manicura/esmaltado semipermanente, uñas acrílicas/extensiones, pedicura, diseño de cejas y tratamiento facial. Cualquier otro servicio requiere confirmación.
- No atribuir a MUA servicios de terceros del mismo local.
- Imágenes: los WebP integrados son recreaciones visuales con IA autorizadas y se presentan como **“Imágenes ilustrativas”**. No son fotografías reales ni trabajos verificados. No usar fotos de Instagram sin autorización; el mapa permanece pendiente.
- El sitio es una **propuesta no oficial**: mantener el aviso visible y `noindex` hasta autorización de publicación.

## Skills del proyecto

Las cuatro skills viven en `.agents/skills/` (OpenCode y Codex comparten esa ruta). Se instalaron con `npx skills add ... --copy`; no hay symlinks.

- `gsap-scrolltrigger` (greensock/gsap-skills): prioridad para cualquier cambio de scroll/pin/scrub.
- `cinematic-scroll-storytelling` (MengTo/Skills): narrativa, ritmo y Lenis.
- `frontend-design` (anthropics/skills): dirección visual y tipografía.
- `web-design-guidelines` (vercel-labs/agent-skills): auditoría de accesibilidad/UI.

Antes de modificar motion o diseño, leer la skill correspondiente. No ejecutar scripts opacos de skills externas. Ver `docs/SKILLS.md`.

## Validaciones mínimas antes de PR

Con Node 22.22.3 (ver `.node-version`):

```bash
npm ci
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run test:e2e
```

Todas en verde. Revisar también escritorio y móvil con preview real, sin overflow horizontal y con `prefers-reduced-motion`.

## Prohibiciones

- Tocar `main`, hacer merge o desplegar sin autorización.
- Publicar datos provisionales como verificados o schema de hechos no confirmados.
- Añadir dependencias, secciones o issues fuera del alcance de la issue activa.
- Borrar historial Git o reescribir ramas existentes.
