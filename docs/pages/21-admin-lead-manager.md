# Lead Manager — Gestión de Leads (Admin)

## Descripción General

Módulo de administración para visualizar, calificar y gestionar todos los leads captados a través del sitio web. Registra el origen del lead (UTM), su estado en el pipeline de ventas y la información de contacto. Se sincroniza con HubSpot CRM para gestión comercial centralizada.

**Ruta:** `/admin/leads`
**Componente:** `src/pages/admin/LeadManager.tsx`
**Layout:** `AppLayout` (requiere rol admin)

---

## Funcionalidades — User Stories

### Visualización y filtrado
- Como **administrador**, quiero ver todos los leads en una tabla con nombre, email, estado y fecha de captación para tener una visión completa del pipeline.
- Como **administrador**, quiero filtrar leads por estado (nuevo, calificado, agendado, pagado, perdido) para enfocarme en los más prioritarios.
- Como **administrador**, quiero buscar leads por nombre o email para encontrar un contacto específico rápidamente.
- Como **administrador**, quiero ver el origen de cada lead (UTM source/medium/campaign) para entender qué canales de marketing son más efectivos.

### Gestión del ciclo de vida
- Como **administrador**, quiero cambiar el estado de un lead en el pipeline para reflejar el avance en el proceso de venta.
- Como **administrador**, quiero agregar notas a un lead para registrar el contexto de las conversaciones y próximos pasos.
- Como **administrador**, quiero ver el historial de cambios de estado de cada lead para entender su trayectoria en el pipeline.

### Exportación y reportes
- Como **administrador**, quiero exportar los leads a un archivo CSV para analizarlos en hojas de cálculo o herramientas de BI.
- Como **administrador**, quiero ver métricas básicas del pipeline (total por estado, leads esta semana) para monitorear el desempeño comercial.

### Integración
- Como **administrador**, quiero que los leads se sincronicen automáticamente con HubSpot para no tener que ingresar la información dos veces.
