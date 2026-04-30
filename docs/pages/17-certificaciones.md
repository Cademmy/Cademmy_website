# Certificaciones — Programas de Certificación

## Descripción General

Sección central de certificaciones de Cademmy que presenta el ecosistema de programas de certificación disponibles, tanto para profesionales individuales como para empresas. Incluye las certificaciones avaladas por CONOCER y los programas propios de Cademmy. Actúa como hub de navegación hacia las secciones de certificaciones individuales y corporativas.

**Rutas relacionadas:**
- `/certificacion` → Vista general (LandingProfesionales como hub)
- `src/pages/Certificaciones.tsx` → Vista general de portafolio
- `src/pages/CertificacionesIndiv.tsx` → Certificaciones individuales
- `src/pages/CertificacionesEmpresas.tsx` → Certificaciones para empresas

**Layout:** `PublicLayout`

---

## Funcionalidades — User Stories

### Vista general
- Como **visitante**, quiero ver todos los tipos de certificación disponibles (CONOCER, Cademmy, empresarial) para elegir la más adecuada a mi perfil.
- Como **profesional**, quiero entender la diferencia entre una certificación individual y una corporativa para tomar la decisión correcta.

### Certificaciones Individuales
- Como **profesional**, quiero ver el listado de certificaciones individuales con sus competencias, duración y costo para seleccionar la que más me conviene.
- Como **profesional**, quiero usar el filtro de certificaciones (CertFilterWidget) por área o nivel para acotar las opciones.
- Como **profesional**, quiero iniciar el proceso de inscripción a una certificación individual desde esta sección.

### Certificaciones para Empresas
- Como **empresa**, quiero ver los programas de certificación grupal para evaluar la certificación de mis equipos de trabajo.
- Como **responsable de RH**, quiero saber cuántos colaboradores puedo inscribir y qué descuentos aplican por volumen.
- Como **empresa**, quiero contactar a un consultor directamente desde la sección de certificaciones corporativas para obtener una propuesta personalizada.

### Credibilidad y reconocimiento
- Como **profesional**, quiero ver el valor de mercado y reconocimiento de las certificaciones para justificar mi inversión ante mi empleador.
- Como **empresa**, quiero saber que las certificaciones están avaladas por organismos oficiales (CONOCER) para comunicarlo con credibilidad a mis stakeholders.
