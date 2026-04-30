# Páginas Legales y de Confirmación

## Descripción General

Conjunto de páginas de soporte legal y confirmación de acciones del usuario. Incluye el aviso de privacidad, términos y condiciones, política de reembolsos, y páginas de agradecimiento post-acción (lead enviado, cita agendada, pago completado).

**Rutas y componentes:**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/aviso-privacidad` | `AvisoPrivacidad.tsx` | Aviso de privacidad (LFPDPPP) |
| `/app/legal/privacidad` | Next.js page | Privacidad (variante Next.js) |
| `/app/legal/terminos` | Next.js page | Términos y condiciones |
| `/app/legal/reembolsos-cancelaciones` | Next.js page | Política de reembolsos |
| `/app/gracias/lead` | Next.js page | Confirmación de formulario enviado |
| `/app/gracias/cita` | Next.js page | Confirmación de cita agendada |
| `/app/gracias/pago` | Next.js page | Confirmación de pago exitoso |

**Layout:** `PublicLayout`

---

## Funcionalidades — User Stories

### Páginas Legales
- Como **usuario**, quiero acceder al aviso de privacidad para conocer cómo Cademmy maneja mis datos personales y ejercer mis derechos ARCO.
- Como **usuario**, quiero leer los términos y condiciones del servicio para entender las reglas de uso de la plataforma antes de registrarme.
- Como **usuario**, quiero conocer la política de reembolsos y cancelaciones antes de realizar un pago para saber mis derechos como consumidor.
- Como **empresa**, quiero descargar o imprimir los términos legales para incluirlos en mis procesos de aprobación de proveedores.

### Páginas de Confirmación
- Como **usuario que envió un formulario**, quiero ver una página de confirmación clara que me indique que mi solicitud fue recibida para no quedarme con la duda.
- Como **usuario que agendó una cita**, quiero ver una página de confirmación con los detalles de la cita (fecha, hora, enlace) para registrarla en mi calendario.
- Como **usuario que completó un pago**, quiero ver una página de confirmación con el resumen de mi compra y próximos pasos para saber cómo acceder a mi contenido.

### Seguimiento de conversiones
- Como **equipo de marketing**, quiero que las páginas de confirmación disparen eventos de conversión en Google Analytics para medir el rendimiento de las campañas de adquisición.
