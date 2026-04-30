# Blog Manager / Podcast Manager / Material Manager — Gestión de Contenido (Admin)

## Descripción General

Módulos de administración de contenido editorial: artículos de blog, episodios de podcast y materiales descargables. Permiten al equipo de Cademmy publicar y gestionar el contenido de la plataforma de forma autónoma, sin acceso al código fuente.

**Rutas:**
- `/admin/blog` → `src/pages/admin/BlogManager.tsx`
- `/admin/podcast` → `src/pages/admin/PodcastManager.tsx`
- `/admin/materiales` → `src/pages/admin/MaterialManager.tsx`

**Layout:** `AppLayout` (requiere rol admin)

---

## Funcionalidades — User Stories

### Blog Manager
- Como **administrador**, quiero crear nuevos artículos de blog con editor de texto enriquecido para publicar contenido de calidad sin herramientas externas.
- Como **administrador**, quiero subir una imagen de portada a cada artículo para mejorar su presentación visual en el listado.
- Como **administrador**, quiero definir categorías y etiquetas en cada artículo para facilitar la navegación y el SEO.
- Como **administrador**, quiero guardar artículos como borrador antes de publicarlos para revisarlos con mi equipo.
- Como **administrador**, quiero editar o eliminar artículos publicados para mantener el contenido actualizado y relevante.

### Podcast Manager
- Como **administrador**, quiero subir nuevos episodios de podcast con archivo de audio, portada y descripción para publicarlos en la sección de podcast del sitio.
- Como **administrador**, quiero organizar los episodios por temporada y número para mantener una estructura cronológica clara.
- Como **administrador**, quiero editar los metadatos de episodios existentes (título, descripción, duración) para corregir errores o actualizar información.

### Material Manager
- Como **administrador**, quiero subir nuevos kits, plantillas y recursos descargables para ampliar el catálogo disponible para los instructores.
- Como **administrador**, quiero categorizar los materiales por tipo y área temática para facilitar su búsqueda y filtrado desde el frontend.
- Como **administrador**, quiero marcar un material como gratuito o de pago/premium para controlar el acceso a los recursos.
- Como **administrador**, quiero eliminar o reemplazar materiales obsoletos para mantener la calidad del catálogo.
