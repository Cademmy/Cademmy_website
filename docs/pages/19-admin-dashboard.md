# Admin Dashboard — Panel de Administración

## Descripción General

Panel de control centralizado para los administradores de Cademmy. Proporciona acceso a todas las herramientas de gestión: cursos, blog, podcasts, materiales, leads y métricas. Protegido por autenticación y acceso restringido a usuarios con rol de administrador (emails autorizados hardcodeados).

**Ruta:** `/admin`
**Componente:** `src/pages/admin/AdminDashboard.tsx`
**Layout:** `AppLayout` (requiere autenticación + rol admin)
**Protección:** `ProtectedRoute`

---

## Funcionalidades — User Stories

### Vista general
- Como **administrador**, quiero ver un resumen de las métricas principales del sitio (leads nuevos, cursos activos, ventas recientes) en un dashboard para monitorear el estado del negocio de un vistazo.
- Como **administrador**, quiero acceder desde el dashboard a todas las secciones de gestión con un solo clic para navegar eficientemente.

### Gestión de contenido
- Como **administrador**, quiero acceder al gestor de cursos para crear, editar y publicar cursos sin necesidad de intervención técnica.
- Como **administrador**, quiero acceder al gestor de blog para publicar y editar artículos directamente desde el panel.
- Como **administrador**, quiero acceder al gestor de podcast para subir y organizar episodios.
- Como **administrador**, quiero acceder al gestor de materiales para administrar los recursos descargables de la plataforma.

### Gestión comercial
- Como **administrador**, quiero acceder al gestor de leads para ver, filtrar y actualizar el estado de todos los contactos captados por el sitio.
- Como **administrador**, quiero exportar los leads a CSV para trabajarlos en herramientas externas de análisis.

### Seguridad y acceso
- Como **administrador**, quiero que el acceso al panel esté protegido por autenticación y verificación de rol para evitar accesos no autorizados.
- Como **administrador**, quiero que cualquier intento de acceso sin autorización sea redirigido automáticamente al inicio para proteger la información sensible.
