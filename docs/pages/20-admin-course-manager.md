# Course Manager — Gestión de Cursos (Admin)

## Descripción General

Módulo de administración para crear, editar, organizar y publicar cursos en la plataforma. Permite al equipo de Cademmy gestionar el contenido de cada curso: módulos, lecciones, tipos de actividad, materiales adjuntos y configuraciones de acceso, sin necesidad de intervención en el código.

**Rutas:** `/admin/cursos` (listado) · `/admin/cursos/:courseId/edit` (editor)
**Componentes:** `src/pages/admin/CourseManager.tsx` · `src/pages/admin/CourseEditor.tsx`
**Layout:** `AppLayout` (requiere rol admin)

---

## Funcionalidades — User Stories

### Listado y gestión
- Como **administrador**, quiero ver todos los cursos existentes en un listado con estado (publicado/borrador) para gestionar el catálogo completo.
- Como **administrador**, quiero crear un nuevo curso desde el listado con un formulario inicial (nombre, descripción, categoría) para empezar a construir el contenido.
- Como **administrador**, quiero duplicar un curso existente para usar su estructura como base de un nuevo contenido.
- Como **administrador**, quiero eliminar un curso que ya no sea relevante para mantener el catálogo limpio.

### Editor de curso
- Como **administrador**, quiero agregar, reordenar y eliminar módulos dentro de un curso para estructurar el contenido didácticamente.
- Como **administrador**, quiero agregar lecciones a cada módulo con soporte para múltiples tipos (video, quiz, lectura, simulador, portfolio, AR/VR) para crear experiencias de aprendizaje variadas.
- Como **administrador**, quiero subir archivos (PDF, video, DOCX) como contenido de cada lección para centralizar los materiales del curso.
- Como **administrador**, quiero configurar el precio del curso en MXN para que se integre con el proceso de pago de Stripe.

### Revisión con IA
- Como **administrador**, quiero usar la herramienta de revisión de borradores con IA (CourseDraftReview) para obtener sugerencias de mejora pedagógica antes de publicar.

### Publicación
- Como **administrador**, quiero cambiar el estado de un curso de borrador a publicado para que esté disponible en el catálogo público.
- Como **administrador**, quiero previsualizar cómo se verá el curso en la landing page antes de publicarlo para asegurarme de que todo se ve correctamente.
