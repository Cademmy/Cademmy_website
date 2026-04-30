# Diagnóstico RH — Herramienta de Diagnóstico de Recursos Humanos

## Descripción General

Herramienta interactiva que permite a empresas y áreas de RH evaluar sus brechas de capacitación y madurez formativa. Genera un reporte de diagnóstico basado en las respuestas del usuario, con recomendaciones personalizadas de soluciones Cademmy. Funciona como lead magnet de alta intención para el segmento B2B.

**Ruta:** `/diagnostico-rh`
**Componente:** `src/pages/DiagnosticoRH.tsx`
**Layout:** `PublicLayout`

---

## Funcionalidades — User Stories

### Ejecución del diagnóstico
- Como **responsable de RH**, quiero responder un cuestionario de diagnóstico para obtener una evaluación objetiva de las brechas de capacitación de mi organización.
- Como **gerente de capacitación**, quiero que el diagnóstico cubra áreas clave (competencias técnicas, liderazgo, cultura) para tener una visión integral.
- Como **usuario**, quiero ver una barra de progreso durante el diagnóstico para saber cuántas preguntas me faltan.

### Resultados y recomendaciones
- Como **responsable de RH**, quiero recibir un reporte con los resultados de mi diagnóstico para presentarlo a mi equipo directivo.
- Como **empresa**, quiero ver recomendaciones personalizadas de programas y servicios Cademmy basadas en mis resultados para tomar acción inmediata.
- Como **usuario**, quiero poder descargar o compartir el reporte de diagnóstico para distribuirlo internamente.

### Captación de leads
- Como **usuario**, quiero ingresar mis datos de contacto al finalizar el diagnóstico para recibir el reporte completo y ser contactado por un consultor.
- Como **equipo comercial**, quiero recibir el diagnóstico completo del lead como contexto previo a la llamada de seguimiento para personalizar la propuesta.

### Integración con CRM
- Como **equipo de ventas**, quiero que los resultados del diagnóstico se envíen automáticamente a HubSpot con el perfil del contacto para acelerar el proceso de venta.
