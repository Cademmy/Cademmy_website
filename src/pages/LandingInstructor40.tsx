import React, { useState, useEffect } from 'react';
import './LandingInstructor40.css';

const LandingInstructor40 = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tel: '',
    perfil: 'Docente',
    preferencia: 'Correo Electrónico',
    mensaje: ''
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    alert('Información enviada con éxito. Nos pondremos en contacto contigo pronto.');
  };

  const moonPath = <path d="M21 12.79A9 9 0 1 1 11.21 3c.06 0 .12 0 .18 0A7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
  const sunPath = (
    <>
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );

  return (
    <div className="instructor-landing-body">
      {/* Topbar */}
      <div className="topbar">
        <div className="landing-container topbar-inner">
          <div className="brand">
            <div className="landing-logo" aria-hidden="true"></div>
            <div>
              <b>Cademmy Business</b>
              <small>Estandarización y Formación Corporativa 5.0</small>
            </div>
          </div>

          <nav className="nav" aria-label="Navegación principal">
            <a href="#beneficios">Beneficios</a>
            <a href="#temario">Temario</a>
            <a href="#resultados">Resultados</a>
            <a href="#inversion">Inversión</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="right-actions">
            <button onClick={toggleTheme} className="theme-btn" type="button" aria-label={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"} title="Cambiar tema">
              <svg className="theme-ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {theme === 'dark' ? sunPath : moonPath}
              </svg>
            </button>

            <a className="cta-btn" href="#registro">
              <span className="dot" aria-hidden="true"></span>
              Quiero mi lugar
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="hero-section">
        <div className="landing-container">
          <div className="hero-grid">
            <div>
              <div className="status-badge">
                <span className="pill">B2B / L&D Solution</span>
                <span>Estandariza la capacitación de tus equipos con IA + Certificación</span>
              </div>

              <div className="hr-hook-main big-hook">
                <span className="hook-text">¿Has sentido que capacitas y capacitas y no ves resultados tangibles?</span>
              </div>

              <h1 className="hero-h1 solution-text">De impartir por intuición a <br /><span className="gradient-text">resultados medibles, auditables y profesionales</span>.</h1>

              <p className="hero-sub">
                Impulsa el ROI de tu presupuesto de capacitación. Alinea a tus instructores internos al <b>EC0217.01</b> y
                potencia su productividad con <b>IA aplicada</b> para que planeen, enseñen y evalúen con evidencia real.
              </p>

              <div className="hero-actions">
                <a className="cta-btn" href="#registro"><span className="dot" aria-hidden="true"></span>Inscribirme / Pedir información</a>
                <a className="cta-btn secondary-cta" href="#temario">Ver temario y entregables</a>
              </div>

              <div className="trust-row" role="list" aria-label="Pruebas de confianza">
                <span className="trust-chip" role="listitem"><i></i> Enfoque práctico + evidencias</span>
                <span className="trust-chip" role="listitem"><i></i> IA como apoyo (no reemplazo)</span>
                <span className="trust-chip" role="listitem"><i></i> Ideal para docentes, instructores y L&D</span>
              </div>
            </div>

            <aside className="hero-card" aria-label="Resumen rápido del curso">
              <div className="kpi-grid">
                <div className="box">
                  <b>Presencial grupal</b>
                  <span>Entrena habilidades reales</span>
                </div>
                <div className="box">
                  <b>Ruta EC0217.01</b>
                  <span>Marco formal defendible</span>
                </div>
                <div className="box">
                  <b>IA aplicada</b>
                  <span>Planeación + evaluación</span>
                </div>
                <div className="box">
                  <b>Entregables</b>
                  <span>Listas, planeación, instrumentos</span>
                </div>
              </div>

              <div className="mini-panel">
                <h3>Lo que te llevas (desde la 1ª sesión)</h3>
                <ul>
                  <li>Plantillas para <b>planeación didáctica</b> y lista de verificación.</li>
                  <li>Prompts y flujos de IA para <b>objetivos, actividades y rúbricas</b>.</li>
                  <li>Guía de evidencias para tu ruta de certificación.</li>
                </ul>

                <p className="legal-note">
                  Nota: El <b>curso</b> te prepara para la certificación. Los <b>costos de evaluación/certificado</b> se tramitan por separado conforme lineamientos aplicables.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Beneficios */}
      <section className="landing-section" id="beneficios">
        <div className="landing-container">
          <div className="section-title">
            <div>
              <h2>¿Por qué Formador 4.0 funciona (y se siente diferente)?</h2>
              <p>Porque ataca lo que más duele: inconsistencia, poco impacto y falta de evidencia… sin complicarte la vida.</p>
            </div>
          </div>

          <div className="grid-3">
            <article className="card-item">
              <div className="feature-icon" aria-hidden="true">🎯</div>
              <h3>Claridad total</h3>
              <p>Pasas de “dar clase” a <b>conducir una sesión</b> con encuadre, objetivos, actividades y cierre que generan aprendizaje observable.</p>
            </article>

            <article className="card-item">
              <div className="feature-icon" aria-hidden="true">⚡</div>
              <h3>Velocidad con IA</h3>
              <p>La IA te ayuda a <b>planear más rápido</b> (objetivos, materiales, actividades y evaluaciones) manteniendo calidad y coherencia.</p>
            </article>

            <article className="card-item">
              <div className="feature-icon" aria-hidden="true">📌</div>
              <h3>Evidencia defendible</h3>
              <p>Aprendes a generar <b>instrumentos y productos</b> (listas, planeación, evaluaciones) que respaldan tu desempeño y facilitan auditoría.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="landing-section" id="resultados">
        <div className="landing-container">
          <div className="hr-hook-inline">
            <p>¿No sabes cómo medir la eficiencia y eficacia de tus capacitaciones? Es momento de cambiar el enfoque.</p>
          </div>
          <div className="section-title">
            <div>
              <h2>Resultados que puedes esperar</h2>
              <p>Transformación concreta (lo que harás distinto al terminar).</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card-item">
              <h3>Antes</h3>
              <p>
                • Planeación “en la cabeza” o por intuición<br />
                • Evaluaciones poco claras o solo asistencia<br />
                • Dinámica de grupo difícil de manejar<br />
                • Materiales dispersos y sin estructura
              </p>
            </div>
            <div className="card-item">
              <h3>Después</h3>
              <p>
                • Documento de planeación con objetivos claros y medibles<br />
                • Técnicas instruccionales aplicadas (expositiva, demostrativa, discusión)<br />
                • Evaluación diagnóstica, formativa y final con instrumentos<br />
                • Evidencias organizadas para tu proceso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temario */}
      <section className="landing-section" id="temario">
        <div className="landing-container">
          <div className="section-title">
            <div>
              <h2>Temario (en lenguaje de vida real)</h2>
              <p>Módulos diseñados para que avances rápido y con entregables, no con teoría suelta.</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="curriculum-module">
              <b>M1. EC0217.01 + IA en la educación</b>
              <small>Marco, proceso y cómo usar IA con criterio.</small>
              <ul>
                <li>Qué es CONOCER y cómo funciona la certificación.</li>
                <li>Impacto y aplicaciones prácticas de IA en capacitación.</li>
              </ul>
            </div>

            <div className="curriculum-module">
              <b>M2. Planeación didáctica con IA</b>
              <small>Objetivos (Bloom), estructura y checklist.</small>
              <ul>
                <li>Redacción de objetivos y dominios de aprendizaje.</li>
                <li>IA para estructurar sesiones, actividades y recursos.</li>
              </ul>
            </div>

            <div className="curriculum-module">
              <b>M3. Técnicas instruccionales modernas</b>
              <small>Cómo mantener atención + aprendizaje.</small>
              <ul>
                <li>Técnicas grupales (rompehielos, energizantes, cierres).</li>
                <li>Generación de materiales didácticos con IA.</li>
              </ul>
            </div>

            <div className="curriculum-module">
              <b>M4. Conducción de la sesión</b>
              <small>Encuadre, desarrollo, manejo de grupo.</small>
              <ul>
                <li>Contrato de aprendizaje y manejo de expectativas.</li>
                <li>Estrategias para participación y ritmo.</li>
              </ul>
            </div>

            <div className="curriculum-module">
              <b>M5. Evaluación del aprendizaje con IA</b>
              <small>Diagnóstica, formativa y final.</small>
              <ul>
                <li>Instrumentos, rúbricas y listas de cotejo.</li>
                <li>IA para retroalimentación y automatización responsable.</li>
              </ul>
            </div>

            <div className="curriculum-module">
              <b>M6. Portafolio de evidencias (ruta)</b>
              <small>Ordena evidencias y acelera tu proceso.</small>
              <ul>
                <li>Estructura de productos y evidencias.</li>
                <li>Checklist para no “atorarte” al final.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prueba social */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="section-title">
            <div>
              <h2>Lo que dicen quienes buscan profesionalizarse</h2>
              <p>Casos reales de transformación.</p>
            </div>
          </div>

          <div className="grid-3">
            <div className="quote-item">
              <p>“Por fin entendí cómo evaluar de verdad. Ya no ‘paso lista’: ahora tengo instrumentos claros y evidencia.”</p>
              <div className="who">— Instructor interno</div>
            </div>
            <div className="quote-item">
              <p>“La IA me ahorró horas en planeación, pero lo mejor fue que todo quedó alineado y defendible.”</p>
              <div className="who">— Docente</div>
            </div>
            <div className="quote-item">
              <p>“Entré por la certificación, me quedé por el sistema completo: encuadre, conducción, cierre y evaluación.”</p>
              <div className="who">— Facilitador</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inversión */}
      <section className="landing-section" id="inversion">
        <div className="landing-container">
          <div className="hr-hook-inline highlight">
            <p>¿Te preocupa que tu presupuesto de capacitación se diluya sin dejar rastro? Invierte en una ruta formal y medible.</p>
          </div>
          <div className="section-title">
            <div>
              <h2>Elige la ruta que más te conviene</h2>
              <p>Diseñado para personas que quieren impacto real y respaldo formal.</p>
            </div>
          </div>

          <div className="pricing-grid b2b-only">
            <div className="price-box recommend-box">
              <div className="price-header">
                <h3 style={{ margin: 0 }}>Ruta Corporativa / Becas</h3>
                <span className="price-tag">Equipos de Alto Impacto</span>
              </div>
              <p style={{ margin: '20px 0 0', color: 'var(--muted)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                Ideal para departamentos de <b>RH, L&D y Desarrollo Organizacional</b> que necesitan estandarizar la capacitación interna, generar evidencias auditables y demostrar retorno de inversión.
              </p>

              <div className="divider-line" style={{ margin: '24px 0' }}></div>

              <ul style={{ fontSize: '1.05rem' }}>
                <li><b>Planeación por cohorte:</b> Adaptada al contexto y retos de su industria.</li>
                <li><b>Entregables Auditables:</b> Planeaciones e instrumentos de evaluación listos.</li>
                <li><b>IA para Instructores:</b> Multiplique la eficiencia de su equipo docente.</li>
                <li><b>Acompañamiento en Certificación:</b> Ruta clara hacia el estándar EC0217.01.</li>
                <li><b>Opciones de Beca Corporativa:</b> Consulte disponibilidad según convenio.</li>
              </ul>

              <div style={{ marginTop: '32px' }}>
                <a className="cta-btn" href="#registro"><span className="dot" aria-hidden="true"></span>Solicitar Propuesta Corporativa</a>
              </div>

              <p className="fineprint-text" style={{ marginTop: '20px' }}>
                Nota: Adaptamos los calendarios y la logística a las necesidades de operación de su empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registro */}
      <section className="landing-section" id="registro">
        <div className="landing-container">
          <div className="section-title">
            <div>
              <h2>Reserva tu lugar (en 60 segundos)</h2>
              <p>Recibe el temario completo, próximas fechas y la ruta recomendada según tu perfil.</p>
            </div>
          </div>

          <div className="form-wrapper">
            <form className="landing-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label className="input-label" htmlFor="nombre">Nombre</label>
                  <input className="input-field" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="input-label" htmlFor="correo">Email</label>
                  <input className="input-field" id="correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} placeholder="tucorreo@..." required />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label className="input-label" htmlFor="tel">Teléfono</label>
                  <input className="input-field" id="tel" name="tel" value={formData.tel} onChange={handleInputChange} placeholder="55..." />
                </div>
                <div>
                  <label className="input-label" htmlFor="preferencia">Medio de comunicación preferido</label>
                  <select className="select-field" id="preferencia" name="preferencia" value={formData.preferencia} onChange={handleInputChange}>
                    <option value="WattsAPP">WattsAPP</option>
                    <option value="Correo Electrónico">Correo Electrónico</option>
                    <option value="ChatBot">ChatBot</option>
                    <option value="Llamada de un ejecutivo">Llamada de un ejecutivo</option>
                  </select>
                </div>
              </div>

              <label className="input-label" htmlFor="perfil">Perfil</label>
              <select className="select-field" id="perfil" name="perfil" value={formData.perfil} onChange={handleInputChange}>
                <option>Docente</option>
                <option>Instructor/Capacitador</option>
                <option>RH / L&D / DO</option>
                <option>Coach / Facilitador</option>
                <option>Otro</option>
              </select>

              <label className="input-label" htmlFor="mensaje">¿Qué quieres lograr con este curso?</label>
              <textarea className="textarea-field" id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} placeholder="Ej. Certificarme, mejorar evaluaciones, estandarizar cursos internos..."></textarea>

              <button className="submit-btn" type="submit">Enviar y recibir información</button>

              <p className="privacy-notice">
                Al enviar aceptas ser contactado para información del programa. Correo de contacto: contacto@cademmy.com.
              </p>
            </form>

            <aside className="card-item">
              <h3 style={{ marginTop: 0 }}>Citas y Reservas</h3>
              <p>
                Si el calendario no carga o prefieres agendar directamente, usa el siguiente vínculo:
                <br />
                <a
                  href="https://outlook.office.com/book/Capacitacin@cademmy.com/?ismsaljsauthenabled"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--c-3)', fontWeight: 'bold' }}
                >
                  Programación en línea (Abrir en nueva pestaña)
                </a>
              </p>

              <div className="booking-container">
                <iframe
                  src='https://outlook.office.com/book/Capacitacin@cademmy.com/?ismsaljsauthenabled'
                  width='100%'
                  height='100%'
                  scrolling='yes'
                  style={{ border: 0 }}
                  title="Booking Calendar"
                ></iframe>
              </div>

              <div className="divider-line"></div>

              <p style={{ margin: 0, color: 'rgba(0,0,0,.70)', lineHeight: 1.6 }}>
                <b>Importante:</b> Al completar el formulario también recibirás nuestro checklist de preparación y ejemplos de planeación didáctica.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section" id="faq">
        <div className="landing-container">
          <div className="section-title">
            <div>
              <h2>Preguntas frecuentes</h2>
              <p>Resolvemos objeciones antes de que te frenen.</p>
            </div>
          </div>

          <details className="faq-details">
            <summary className="faq-summary">¿Necesito título profesional para certificarme?</summary>
            <p>No necesariamente: el estándar indica que para certificarse no debe ser requisito o impedimento contar con un título académico. (Puede haber documentación y evidencias requeridas.)</p>
          </details>

          <details className="faq-details">
            <summary className="faq-summary">¿El curso incluye el costo del certificado o la evaluación?</summary>
            <p>Este curso te prepara y alinea. Los costos del proceso de evaluación/certificación y emisión del certificado se gestionan por separado conforme lineamientos aplicables.</p>
          </details>

          <details className="faq-details">
            <summary className="faq-summary">¿Es solo para maestros?</summary>
            <p>No. Es ideal para instructores, capacitadores internos, facilitadores, coaches y perfiles de RH/L&D que buscan estandarizar formación con evidencia.</p>
          </details>

          <details className="faq-details">
            <summary className="faq-summary">¿Qué pasa si soy “malo con la tecnología”?</summary>
            <p>Perfecto: el programa está diseñado para usar IA con pasos simples y plantillas. No necesitas ser técnico; solo seguir el flujo y adaptar a tu contexto.</p>
          </details>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="divider-line"></div>
          <div className="footer-inner">
            <div>
              <b style={{ color: 'rgba(0,0,0,.78)' }}>Cademmy Business</b><br />
              <span>Estandarización y Formación Corporativa 5.0</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#registro">Contacto</a>
              <a href="#faq">FAQ</a>
              <a href="#">Aviso de privacidad</a>
            </div>
          </div>
          <div style={{ marginTop: '14px', color: 'rgba(0,0,0,.55)', fontSize: '.86rem', lineHeight: 1.45 }}>
            © {new Date().getFullYear()} Cademmy Learning. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Sticky CTA (mobile) */}
      <div className="sticky-cta" role="region" aria-label="Acción rápida">
        <div className="landing-container">
          <div className="sticky-row">
            <a className="cta-btn" href="#registro"><span className="dot" aria-hidden="true"></span>Quiero mi lugar</a>
            <a className="cta-btn secondary-cta" href="#inversion">Ver inversión</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingInstructor40;