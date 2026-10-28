# MUA Estética — Auditoría retrospectiva de generación de imágenes

> **Fecha de documentación:** 28 de octubre de 2026  
> **Origen:** relato del responsable del proyecto y referencias compartidas durante la preparación de la web. Esta auditoría es cualitativa: **no se dispone aquí de registro completo de prompts, metadatos o archivos descartados**. Las cifras son aproximaciones comunicadas por el usuario, no métricas extraídas automáticamente.  
> **Relación:** [GEN-12](https://linear.app/genesisnavarra/issue/GEN-12) · [10 prompts base](ASSET_PROMPTS.md) · [slots de imagen](IMAGES.md).

## Resumen ejecutivo

El trabajo de imagen para la propuesta de MUA Estética ha consumido **prácticamente dos semanas**. La generación con referencias visuales ha dado resultados fotográficamente atractivos, especialmente en **manicura, pedicura, tratamientos faciales y fotografía editorial del CTA**. Se ha demostrado adecuada para diseñar escenas nuevas que **no necesitan reproducir con exactitud una arquitectura identificable**, sobre todo cuando el encuadre permanece parecido a la referencia.

La mayor limitación apareció en la **recreación del interior del local y de la fachada**. Conservar los mismos elementos del negocio en un cambio de plano, altura, posición o dirección de cámara resultó mucho más difícil que generar imágenes bonitas. La calidad estética puede ser alta y, al mismo tiempo, la fidelidad espacial ser insuficiente.

**Decisión:** el lote de imágenes elegido está listo para integrarse en el siguiente paso de la web; no continuar iterando imágenes aleatorias en GEN-12. Registrar el problema y estudiar un proceso de edición más controlada para futuros proyectos, en lugar de repetir estas rondas.

## Qué funcionó

| Tipo | Resultado observado | Razón |
| --- | --- | --- |
| Manicura y nail art | Bueno para crear assets editoriales generales | Se puede variar modelo/manos, color o textura sin exigir correspondencia geométrica con un lugar real |
| Pedicura y tratamientos faciales | Bueno para contenido ilustrativo de servicios | Escenas genéricas con referencias de estilo, luz y encuadre |
| Imagen de CTA/contacto | Bueno para cierre visual editorial | Prioridad en atmósfera, espacio negativo y coherencia de campaña |
| Referencias de encuadre aproximadamente estático | Más fiables | La imagen aporta contexto visible sin exigir inventar partes ocultas de la escena |

**Matiz:** una escena generada de manos, pies o rostro no acredita que represente una clienta, un profesional ni un tratamiento realmente fotografiado en MUA. Etiquetar adecuadamente y obtener consentimientos cuando corresponda.

## Casos que más costaron: interior y fachada

### Interior real del salón

Referencias reales aportadas: paredes blancas, suelo de madera clara, mesas de manicura blancas, sillones verde oliva, nichos/arcos de esmaltes, techo con iluminación geométrica, sala de espera con sofá curvo, plantas, escalones/barandilla y elementos de circulación.

La exigencia no era solo mantener «un salón blanco premium», sino **preservar relaciones espaciales concretas**: posición de la escalera, distribución de mesas y sillas, volumen del local, accesos, luminarias y encuadre real. Cuando se pedían cámaras más altas, bajas, laterales o invertidas, algunas generaciones alteraban, desplazaban o inventaban elementos. Eran visualmente convincentes, pero ya no eran un reflejo fiable del mismo local.

### Fachada real

Se necesitaba respetar composición de escaparates, puerta de entrada, cartelería, dimensiones y relaciones entre elementos de la fachada. Cambiar el ángulo respecto de una foto frontal obliga al sistema a representar laterales, profundidad y detalles que la fotografía de origen **no muestra**, por lo que puede inventarlos o distorsionarlos. Un plano frontal generacionalmente «mejorado» era más viable que una vista de tres cuartos que conservara absolutamente todo.

### Esfuerzo aproximado

Según la estimación del usuario, se realizaron **40–50 generaciones para el interior** y **otras 40–50 para la fachada** hasta seleccionar **un par de vistas suficientemente buenas de cada categoría**. La duración global del proceso fue **casi dos semanas**. No hay una tabla verificable de todos los intentos; estas cantidades deben conservarse como **estimaciones retrospectivas**.

## Hallazgo crítico: calidad no equivale a control

La estrategia de **cuatro variantes independientes por solicitud** resultó útil para explorar propuestas estéticas; sin embargo, **cada nueva ronda de generación era parcialmente aleatoria**. Cuando una imagen ya era correcta salvo por un elemento —por ejemplo, **la escalera estaba en una posición equivocada**— el prompt «cambia solo la escalera» podía alterar también la iluminación, el mobiliario, la distribución o el resto del local.

**Necesidad futura:** pasar de «generar cuatro opciones hasta tener suerte» a «conservar el 95 % válido y corregir exactamente el 5 % defectuoso». Esa expectativa requiere herramientas distintas y criterios de aceptación más estrictos. **Una seed fija no garantiza por sí sola identidad pixel a pixel ni conservación perfecta de geometría** entre modelos/versiones o cambios fuertes de perspectiva.

## Propuesta de pipeline futuro (investigación, no alcance de GEN-12)

1. **Registrar referencia y estado:** guardar original, objetivo de plano, perspectiva, lista de elementos invariantes, prompt, negative prompt si aplica, modelo/versión, seed y parámetros disponibles; conservar historial de cada versión aceptada.
2. **Editar solo una región:** delimitar por máscara el objeto defectuoso (p. ej., escalera), aplicar inpainting o edición guiada regional y bloquear lo demás; comparar automáticamente diferencias fuera de máscara y rechazar alteraciones inesperadas.
3. **Controlar geometría:** usar controles de bordes, profundidad, puntos clave, segmentación o condicionamiento espacial cuando la herramienta lo admita. Una imagen de referencia fuerte ayuda, pero no sustituye un modelo espacial del escenario.
4. **Nuevos puntos de vista:** cuando se quiere mostrar lo que la foto original no contiene, recolectar varias fotos de la misma escena o construir una referencia espacial mediante reconstrucción 3D/fotogrametría, planos medidos o un modelo de cámara; después usar IA para iluminación/acabado.
5. **QA geométrico + QA visual:** comparar inventario y posición de puertas, escaleras, ventanas, rótulos, estaciones, luminarias, mobiliario; evaluar además anatomía, sombras, color, continuidad y artefactos. No aprobar solo porque el resultado «queda bonito».
6. **Edición manual cuando convenga:** si la corrección es precisa, puede ser más eficiente una edición tradicional por capas, composición o un retoque guiado que volver a generar la escena completa.
7. **Trazabilidad editorial:** identificar por asset «foto auténtica», «edición de foto auténtica» o «recreación IA», con licencia/permiso y límites de uso; nunca presentar como literal lo que no se puede verificar.

### Criterios de decisión propuestos

- **Composición beauty genérica, uñas, pedicura, facial o CTA:** continuar con generación basada en referencias y selección editorial; el método es rápido y suele producir buena calidad.
- **Mismo plano o parecido de una foto auténtica:** utilizar retoque y edición de imagen de referencia; preservar estructura.
- **Cambio de cámara significativo con geometría exacta:** no confiar en text-to-image sin control. Primero conseguir referencias multiángulo o representación espacial; validar elemento por elemento.
- **«Todo perfecto excepto X»:** evitar cuatro regeneraciones globales; probar máscara pequeña y regiones protegidas, aceptando que también esta técnica debe revisarse.

## Qué registrar durante la integración de GEN-12

- Imagen original y derivada final, si procede; el origen puede ser un archivo externo suministrado por el usuario.
- Sección y slot concreto de la landing; recortes desktop/móvil y composición.
- ¿Es fotografía real del negocio, edición de una foto real o imagen IA ilustrativa?
- Derechos/consentimiento de personas e indicaciones sobre atribución.
- Resolución, WebP/AVIF, peso, alt text, fecha, revisión visual, efectos de movimiento aplicados.
- Qué material se descarta, por qué y si hace falta otra toma.

## Estado de implementación

Los diez prompts base están archivados en [ASSET_PROMPTS.md](ASSET_PROMPTS.md), pero **no se considera completa la integración** hasta recibir e incorporar los archivos finales elegidos por el usuario y validar que los 13 slots existentes (o los que realmente use el diseño) tienen contenido correcto. La auditoría y sus recomendaciones no autorizan una nueva issue de tooling por sí solas.
