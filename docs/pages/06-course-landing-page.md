# Course Landing Page — Detalle de Curso

## Descripción General

Página dinámica de detalle para cada curso individual del catálogo. Muestra el temario completo, descripción, instructor, precio, modalidad y un botón de inscripción o compra. Generada dinámicamente según el `courseId` de la URL.

**Ruta:** `/curso/:courseId`
**Componente:** `src/pages/CourseLandingPage.tsx`
**Layout:** `PublicLayout`

---

## Funcionalidades — User Stories

### Información del curso
- Como **usuario interesado**, quiero ver el temario completo del curso para saber exactamente qué aprenderé.
- Como **usuario**, quiero ver la duración total, número de módulos y tipo de contenido (video, quiz, lectura) para planificar mi tiempo.
- Como **usuario**, quiero conocer el perfil del instructor del curso para valorar su experiencia y credibilidad.
- Como **usuario**, quiero leer los objetivos de aprendizaje del curso para confirmar que cubre mis necesidades.

### Compra e inscripción
- Como **usuario no registrado**, quiero hacer clic en "Inscribirse" y ser llevado al flujo de registro/compra para acceder al curso.
- Como **usuario registrado con pago completado**, quiero ver un botón "Continuar aprendizaje" que me lleve directamente al aula virtual.
- Como **usuario**, quiero ver el precio del curso claramente (MXN) y si tiene descuento activo para decidir mi compra.

### Previsualización
- Como **usuario**, quiero ver una imagen o video de presentación del curso para tener una idea del estilo y calidad del contenido.

### Compartir y guardar
- Como **usuario**, quiero poder compartir el link del curso con un colega para recomendarlo fácilmente.

### SEO y metadatos
- Como **motor de búsqueda**, quiero encontrar metaetiquetas dinámicas por curso (título, descripción, imagen) para indexar cada curso individualmente.
