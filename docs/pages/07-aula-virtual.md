# Aula Virtual — Entorno de Aprendizaje

## Descripción General

Interfaz principal de aprendizaje donde el usuario consume el contenido de un curso específico. Soporta múltiples tipos de actividades: video, quiz interactivo, lectura de documentos (PDF/DOCX), simuladores IA, portfolios de evidencias y placeholders para AR/VR. Registra el progreso por lección y otorga recompensas gamificadas (CAD-Coins).

**Rutas:** `/aula` (panel general) · `/aula/:courseId` (curso específico)
**Componente:** `src/pages/Aula.tsx`
**Layout:** `AppLayout` (requiere autenticación)

---

## Funcionalidades — User Stories

### Consumo de contenido
- Como **estudiante**, quiero reproducir las lecciones en video del curso con controles de pausa, avance y velocidad para aprender a mi ritmo.
- Como **estudiante**, quiero leer documentos PDF y DOCX directamente en el aula sin necesidad de descargarlos para estudiar cómodamente.
- Como **estudiante**, quiero completar quizzes interactivos al final de cada módulo para verificar mi comprensión.
- Como **estudiante**, quiero interactuar con simuladores de IA dentro del aula para practicar escenarios reales.
- Como **estudiante**, quiero subir evidencias o artefactos a mi portafolio de aprendizaje para documentar mis competencias.

### Progreso y navegación
- Como **estudiante**, quiero ver mi porcentaje de avance en el curso para saber cuánto me falta por completar.
- Como **estudiante**, quiero navegar entre lecciones y módulos fácilmente usando el índice del curso para no perder mi lugar.
- Como **estudiante**, quiero que el sistema recuerde la última lección que vi para reanudar donde lo dejé.

### Gamificación
- Como **estudiante**, quiero recibir CAD-Coins al completar lecciones y actividades para sentirme motivado a continuar.
- Como **estudiante**, quiero ver notificaciones de recompensa (RewardToast) al ganar puntos para celebrar mi progreso.

### Asistencia IA
- Como **estudiante**, quiero acceder al chat de IA (AIChat) dentro del aula para hacer preguntas sobre el contenido del curso sin salir del contexto de aprendizaje.
- Como **estudiante**, quiero interactuar con el NeuroCoach para recibir orientación personalizada sobre mi avance y próximos pasos.

### Certificación
- Como **estudiante**, quiero ver el botón de descarga de certificado una vez que completo el 100% del curso para obtener mi reconocimiento.
