# Skills del proyecto

Las cuatro skills están copiadas dentro del repositorio en `.agents/skills/`. Codex y OpenCode comparten esa ruta. No hay symlinks ni scripts opacos.

| Skill | Origen | Uso en GEN-9 |
| --- | --- | --- |
| `gsap-scrolltrigger` | greensock/gsap-skills | Registro de ScrollTrigger, batch, pin único, scrub y refresh tras fuentes/carga. |
| `cinematic-scroll-storytelling` | MengTo/Skills | Ritmo editorial, Lenis sincronizado con GSAP, reveals y fallback móvil. |
| `frontend-design` | anthropics/skills | Dirección visual, tipografía serif + sans, asimetría y paleta. |
| `web-design-guidelines` | vercel-labs/agent-skills | Foco, contraste, menú móvil, reduced motion y overflow. |

## Reglas

- Leer la skill correspondiente antes de cambiar motion o dirección visual.
- No ejecutar instaladores ni scripts de skills externas durante el desarrollo.
- Las skills se actualizan con `npx skills add ... --copy` y se revisan antes de confiar en ellas.
- Si una recomendación de skill choca con la issue o con `AGENTS.md`, manda la issue.

## Instalación reproducible

```bash
npx skills add greensock/gsap-skills --skill gsap-scrolltrigger -a opencode -a codex --copy -y
npx skills add MengTo/Skills --skill cinematic-scroll-storytelling -a opencode -a codex --copy -y
npx skills add anthropics/skills --skill frontend-design -a opencode -a codex --copy -y
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a opencode -a codex --copy -y
```
