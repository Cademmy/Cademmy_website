# Planeador Didáctico IA — Generador de Planeaciones con IA

## Descripción General

Herramienta de productividad para instructores y docentes que utiliza inteligencia artificial (Gemini) para generar planeaciones didácticas estructuradas. El usuario ingresa el tema, objetivo, nivel de los participantes y duración, y la IA produce un plan de sesión completo con actividades, recursos y criterios de evaluación.

**Ruta:** `/creador-objetivos`
**Componente:** `src/pages/PlaneadorDidacticoIA.tsx`
**Layout:** `PublicLayout`

---

## Funcionalidades — User Stories

### Generación de planeaciones
- Como **instructor**, quiero ingresar el tema de mi sesión y recibir una planeación didáctica completa generada por IA para ahorrar horas de preparación.
- Como **docente**, quiero especificar el nivel y perfil de mis estudiantes para que la planeación sea adecuada al contexto real de mi grupo.
- Como **facilitador**, quiero definir la duración de la sesión para que la IA distribuya las actividades de forma realista y equilibrada.

### Personalización y edición
- Como **instructor**, quiero editar la planeación generada por IA para ajustarla a los materiales y contexto específico de mi organización.
- Como **usuario**, quiero regenerar secciones específicas de la planeación sin perder el resto para refinar el contenido de forma eficiente.

### Exportación y uso
- Como **instructor**, quiero descargar la planeación en formato PDF o Word para compartirla con mi equipo o imprimirla.
- Como **docente**, quiero copiar la planeación al portapapeles para pegarla directamente en mi sistema institucional.

### Historial
- Como **instructor frecuente**, quiero ver mis planeaciones anteriores guardadas para reutilizarlas o adaptarlas en futuras sesiones.
