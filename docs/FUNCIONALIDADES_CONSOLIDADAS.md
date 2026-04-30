# Cademmy Website — Listado Consolidado de Funcionalidades

> Documento generado por análisis automático del repositorio `cademmy-web`.
> Última actualización: 2026-04-30

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 |
| Backend | Firebase (Auth, Firestore, Storage, Functions) |
| IA | Google Gemini API |
| Pagos | Stripe (MXN) |
| CRM | HubSpot |
| Analítica | Google Analytics 4 |
| Calendario | Microsoft Bookings |
| CAPTCHA | Cloudflare Turnstile |

---

## Índice de Páginas

| # | Página | Ruta | Descripción breve |
|---|--------|------|------------------|
| 01 | [Home](pages/01-home.md) | `/` | Página principal |
| 02 | [Landing Profesionales](pages/02-landing-profesionales.md) | `/certificacion` | B2C — Profesionales individuales |
| 03 | [Landing Empresas](pages/03-landing-empresas.md) | `/empresas` | B2B — Soluciones corporativas |
| 04 | [Landing Formador 4.0](pages/04-landing-instructor-40.md) | `/formador-4-0` | Programa para instructores |
| 05 | [Cursos en Línea](pages/05-cursos-en-linea.md) | `/aprendizaje` | Catálogo de cursos |
| 06 | [Course Landing Page](pages/06-course-landing-page.md) | `/curso/:courseId` | Detalle de curso |
| 07 | [Aula Virtual](pages/07-aula-virtual.md) | `/aula/:courseId` | LMS / Entorno de aprendizaje |
| 08 | [Consultoría](pages/08-consultoria.md) | `/consultoria` | Servicios de consultoría |
| 09 | [Diagnóstico RH](pages/09-diagnostico-rh.md) | `/diagnostico-rh` | Herramienta de diagnóstico B2B |
| 10 | [IA Music Lab](pages/10-ia-music-lab.md) | `/ia-lab` | Generación de música con IA |
| 11 | [Planeador Didáctico IA](pages/11-planeador-didactico-ia.md) | `/creador-objetivos` | Planeaciones con IA |
| 12 | [Blog](pages/12-blog.md) | `/blog` | Contenido editorial |
| 13 | [Podcast](pages/13-podcast.md) | `/podcast` | Canal de audio |
| 14 | [CademmyTV](pages/14-cademmy-tv.md) | `/cademmy-tv` | Canal de video |
| 15 | [Kits de Dinámicas](pages/15-kits-dinamicas.md) | `/recursos` | Recursos para instructores |
| 16 | [Webinars](pages/16-webinars.md) | `/webinars` | Eventos en línea |
| 17 | [Certificaciones](pages/17-certificaciones.md) | `/certificacion` | Programas de certificación |
| 18 | [Cursos Presenciales](pages/18-cursos-presenciales.md) | — | Capacitación cara a cara |
| 19 | [Admin Dashboard](pages/19-admin-dashboard.md) | `/admin` | Panel de administración |
| 20 | [Course Manager](pages/20-admin-course-manager.md) | `/admin/cursos` | Gestión de cursos |
| 21 | [Lead Manager](pages/21-admin-lead-manager.md) | `/admin/leads` | Gestión de leads |
| 22 | [Blog/Podcast/Material Manager](pages/22-admin-blog-podcast-materiales.md) | `/admin/blog` · `/admin/podcast` · `/admin/materiales` | Gestión de contenido |
| 23 | [Páginas Legales y Gracias](pages/23-paginas-legales-gracias.md) | `/aviso-privacidad` · `/app/gracias/*` | Legal y confirmaciones |

---

## Listado Consolidado de Funcionalidades por Dominio

### 1. Autenticación y Gestión de Usuarios

- Como **visitante**, quiero registrarme con email y contraseña para acceder a los cursos y herramientas de la plataforma.
- Como **usuario registrado**, quiero iniciar sesión con mis credenciales para acceder a mi contenido y progreso.
- Como **usuario**, quiero cerrar sesión de forma segura para proteger mi cuenta en dispositivos compartidos.
- Como **administrador**, quiero que el acceso al panel de administración esté protegido por verificación de rol para evitar accesos no autorizados.
- Como **sistema**, quiero mantener la sesión del usuario activa entre visitas para no obligarlo a iniciar sesión en cada acceso.

---

### 2. Captación de Leads y CRM

- Como **visitante interesado**, quiero llenar un formulario de contacto con CAPTCHA para enviar mi solicitud sin ser bloqueado por spam.
- Como **usuario**, quiero que mis datos de formulario sean validados en tiempo real para corregir errores antes de enviar.
- Como **sistema**, quiero capturar parámetros UTM automáticamente al registrar un lead para atribuir el origen de cada contacto a la campaña correcta.
- Como **equipo de ventas**, quiero que cada lead nuevo se sincronice automáticamente con HubSpot CRM para gestionar el seguimiento sin duplicar trabajo.
- Como **equipo de marketing**, quiero recibir notificaciones de nuevos leads en tiempo real para hacer seguimiento oportuno.
- Como **empresa interesada**, quiero llenar un formulario B2B con información de mi organización (industria, tamaño, necesidad) para recibir una propuesta personalizada.
- Como **administrador**, quiero exportar el listado de leads a CSV para análisis externo.
- Como **administrador**, quiero filtrar leads por estado del pipeline (nuevo, calificado, agendado, pagado, perdido) para priorizar el seguimiento comercial.

---

### 3. Pagos y Comercio

- Como **usuario**, quiero pagar un curso en línea con tarjeta de crédito/débito a través de Stripe en pesos mexicanos (MXN) para completar mi inscripción de forma segura.
- Como **usuario**, quiero recibir una confirmación de pago por correo electrónico para tener un comprobante de mi compra.
- Como **usuario**, quiero ver la página de confirmación de pago con los detalles de mi compra y cómo acceder al contenido.
- Como **administrador**, quiero recibir webhooks de Stripe para actualizar automáticamente el estado de inscripción del usuario al completarse el pago.
- Como **usuario**, quiero solicitar un reembolso conforme a la política publicada para ejercer mis derechos como consumidor.
- Como **sistema**, quiero manejar reintentos de pago fallido de forma transparente para reducir la pérdida de ventas por errores técnicos transitorios.

---

### 4. Aprendizaje — LMS (Sistema de Gestión del Aprendizaje)

- Como **estudiante**, quiero reproducir lecciones en video con controles de reproducción (pausa, avance, velocidad) para aprender a mi ritmo.
- Como **estudiante**, quiero leer documentos PDF y DOCX directamente en el aula para estudiar sin descargar archivos.
- Como **estudiante**, quiero completar quizzes interactivos al final de cada módulo para evaluar mi comprensión.
- Como **estudiante**, quiero realizar actividades de emparejamiento interactivo (InteractiveMatch) para practicar conceptos de forma lúdica.
- Como **estudiante**, quiero interactuar con simuladores de IA dentro del aula para practicar escenarios y toma de decisiones.
- Como **estudiante**, quiero explorar contenido de realidad aumentada y virtual (AR/VR) dentro del aula para experiencias de aprendizaje inmersivas.
- Como **estudiante**, quiero construir un portafolio de evidencias (EvidenceBuilder) para documentar mis competencias adquiridas.
- Como **estudiante**, quiero que el sistema registre mi progreso por lección automáticamente para no tener que marcarlo manualmente.
- Como **estudiante**, quiero ver mi porcentaje de avance en el curso para saber cuánto me falta por completar.
- Como **estudiante**, quiero reanudar el curso desde la última lección vista para no tener que buscar mi lugar cada vez.
- Como **estudiante**, quiero navegar entre lecciones y módulos fácilmente usando el índice del curso.
- Como **estudiante**, quiero descargar mi certificado de finalización al completar el 100% del curso.

---

### 5. Gamificación y Motivación

- Como **estudiante**, quiero ganar CAD-Coins al completar lecciones y actividades para sentirme motivado a continuar.
- Como **estudiante**, quiero ver notificaciones visuales (RewardToast) cuando gano puntos para celebrar mi progreso.
- Como **sistema**, quiero gestionar el saldo de CAD-Coins del usuario en Firestore para mantener la consistencia del sistema de recompensas.
- Como **estudiante**, quiero ver mi saldo acumulado de CAD-Coins en mi perfil para saber cuántos puntos he ganado.

---

### 6. Inteligencia Artificial

- Como **instructor**, quiero generar una planeación didáctica completa usando IA (Gemini) ingresando el tema, nivel y duración de mi sesión.
- Como **instructor**, quiero crear música de fondo personalizada con IA para enriquecer mis sesiones de capacitación.
- Como **instructor**, quiero generar canciones con letras educativas usando IA para crear recursos mnemotécnicos.
- Como **estudiante**, quiero interactuar con el chat de IA (AIChat) para hacer preguntas sobre el contenido del curso sin salir del aula.
- Como **usuario**, quiero recibir orientación personalizada del NeuroCoach IA sobre mi avance y próximos pasos de aprendizaje.
- Como **administrador**, quiero usar la herramienta de revisión de borradores con IA (CourseDraftReview) para obtener sugerencias pedagógicas antes de publicar un curso.
- Como **empresa**, quiero escanear y analizar mis materiales de capacitación existentes con IA (courseScannerService) para identificar oportunidades de mejora.
- Como **administrador**, quiero que la IA genere materiales de aprendizaje (materialAIService) a partir de un tema o documento base para acelerar la producción de contenido.

---

### 7. Diagnóstico Organizacional

- Como **empresa**, quiero responder un cuestionario de diagnóstico de RH para obtener una evaluación de las brechas de capacitación de mi organización.
- Como **empresa**, quiero recibir un reporte personalizado con los resultados del diagnóstico y recomendaciones de Cademmy.
- Como **empresa**, quiero descargar el reporte de diagnóstico para compartirlo con mi equipo directivo.
- Como **equipo comercial**, quiero recibir los resultados del diagnóstico junto con los datos de contacto del lead para personalizar la propuesta de venta.

---

### 8. Agendamiento de Citas

- Como **usuario**, quiero agendar una cita o llamada con un consultor de Cademmy directamente desde el sitio web (Microsoft Bookings) para resolver mis dudas antes de tomar una decisión.
- Como **usuario**, quiero ver una página de confirmación con los detalles de mi cita (fecha, hora, enlace de videollamada) al completar el agendamiento.
- Como **sistema**, quiero disparar un evento de conversión en Google Analytics cuando un usuario agenda una cita para medir la efectividad del canal de adquisición.

---

### 9. Certificaciones

- Como **profesional**, quiero ver el catálogo de certificaciones disponibles con competencias, duración y costo para seleccionar la más adecuada.
- Como **profesional**, quiero filtrar certificaciones por área o nivel usando el widget de filtros (CertFilterWidget).
- Como **profesional**, quiero iniciar el proceso de inscripción a una certificación y completar el pago en línea.
- Como **empresa**, quiero solicitar un programa de certificación grupal para mis equipos con descuentos por volumen.
- Como **profesional**, quiero saber que las certificaciones están avaladas por CONOCER para validar su reconocimiento oficial.

---

### 10. Contenido Editorial y Media

- Como **visitante**, quiero explorar artículos del blog filtrados por categoría para encontrar contenido relevante.
- Como **visitante**, quiero escuchar episodios de podcast reproducidos directamente en el sitio con controles de audio.
- Como **visitante**, quiero ver videos (masterclasses, tutoriales) en CademmyTV con el NeuroPlayer.
- Como **instructor**, quiero descargar kits de dinámicas y recursos del catálogo de materiales para usarlos en mis sesiones.
- Como **usuario**, quiero registrarme a webinars próximos y acceder a las grabaciones de sesiones pasadas.
- Como **usuario**, quiero compartir artículos, videos y episodios en redes sociales.

---

### 11. Administración de Contenido (CMS)

- Como **administrador**, quiero crear, editar y publicar artículos de blog con editor de texto enriquecido e imagen de portada.
- Como **administrador**, quiero subir episodios de podcast con audio, portada y metadatos, organizados por temporadas.
- Como **administrador**, quiero gestionar materiales descargables con categorías, tipo de acceso (gratuito/premium) y archivos.
- Como **administrador**, quiero crear y editar cursos con módulos, lecciones y distintos tipos de actividad (video, quiz, lectura, simulador, portfolio, AR/VR).
- Como **administrador**, quiero publicar y despublicar cualquier contenido para controlar qué es visible en el sitio.
- Como **administrador**, quiero previsualizar el contenido antes de publicarlo para garantizar la calidad.

---

### 12. Analytics y Seguimiento

- Como **equipo de marketing**, quiero que todos los eventos relevantes (lead enviado, pago completado, cita agendada, lección completada) se registren en Google Analytics para medir el rendimiento.
- Como **sistema**, quiero capturar y persistir los parámetros UTM de cada sesión para atribuir correctamente los leads y conversiones a sus campañas de origen.
- Como **administrador**, quiero ver métricas básicas del pipeline de ventas en el dashboard (leads por estado, conversiones recientes) para monitorear el negocio.
- Como **sistema**, quiero registrar métricas de desempeño por lección (tiempo, intentos, puntaje) para que los instructores puedan analizar el aprendizaje.

---

### 13. Legal y Cumplimiento

- Como **usuario**, quiero acceder al aviso de privacidad para conocer cómo se manejan mis datos personales (LFPDPPP).
- Como **usuario**, quiero leer los términos y condiciones del servicio antes de registrarme.
- Como **usuario**, quiero conocer la política de reembolsos y cancelaciones antes de realizar un pago.
- Como **sistema**, quiero aplicar rate limiting en los endpoints de API para prevenir abuso y ataques de fuerza bruta.
- Como **sistema**, quiero validar el token de CAPTCHA en el servidor antes de procesar cualquier formulario para prevenir el spam automatizado.

---

## Resumen de Integraciones Externas

| Integración | Propósito |
|------------|----------|
| **Firebase Auth** | Autenticación de usuarios |
| **Firebase Firestore** | Base de datos (cursos, usuarios, progreso, leads) |
| **Firebase Storage** | Almacenamiento de archivos (videos, PDFs, imágenes) |
| **Firebase Functions** | Backend serverless |
| **Stripe** | Procesamiento de pagos en MXN |
| **HubSpot** | CRM y sincronización de leads |
| **Google Analytics 4** | Analítica web y seguimiento de conversiones |
| **Google Gemini API** | Generación de contenido con IA |
| **Microsoft Bookings** | Agendamiento de citas y reuniones |
| **Cloudflare Turnstile** | CAPTCHA anti-spam en formularios |
