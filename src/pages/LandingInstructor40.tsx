import React, { useState } from 'react';
import { CheckCircle2, Play, Users, Award, Star, ArrowRight, ShieldCheck, Zap, X } from 'lucide-react';

const LandingInstructor40 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 ring-1 ring-indigo-500/50">
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              <span className="text-sm font-semibold text-indigo-200">Nueva Certificación 2026</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Instructor <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">4.0</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
              La primera certificación en México que integra <strong>Inteligencia Artificial</strong> y <strong>Simuladores de Realidad</strong> al estándar EC0217.01.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                Inscribirme Ahora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <Play className="h-5 w-5 fill-current" />
                Ver Trailer
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400">Próxima fecha: <strong>23 de Mayo</strong> • Cupo limitado a 20 instructores</p>
          </div>
        </div>
      </div>

      {/* --- EL PROBLEMA (Dolor) --- */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900">El modelo tradicional está muerto</h2>
            <p className="mt-4 text-lg text-slate-600">Ser "bueno hablando" ya no es suficiente. El mercado corporativo exige más.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Diapositivas Aburridas", desc: "El 80% de los alumnos olvida el contenido en 24 horas si solo usas PowerPoint.", icon: Users },
              { title: "Teoría sin Práctica", desc: "Saber la teoría no garantiza que sepas manejar un grupo difícil en la vida real.", icon: Award },
              { title: "Cursos Genéricos", desc: "La IA ya puede crear temarios. Tu valor está en la experiencia humana y tecnológica.", icon: Zap }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-shadow hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LA SOLUCIÓN (Metodología) --- */}
      <div className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-indigo-600 px-3 py-1 text-sm font-semibold uppercase tracking-wider">Metodología Híbrida</div>
              <h2 className="mt-6 text-4xl font-bold">No es un curso.<br/>Es una transformación.</h2>
              <p className="mt-6 text-lg text-slate-300">Combinamos la certificación oficial SEP-CONOCER con las herramientas más avanzadas de Silicon Valley.</p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Certificación Oficial EC0217.01 (SEP-CONOCER)",
                  "Taller de Diseño Instruccional con ChatGPT",
                  "Simulador de Realidad Virtual para hablar en público",
                  "Acceso a la plataforma LMS de Cademmy por 1 año"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
              <div className="relative h-full overflow-hidden rounded-xl bg-slate-800">
                 {/* Placeholder de imagen o video */}
                 <div className="aspect-video bg-slate-700 flex items-center justify-center">
                    <span className="text-slate-500 font-medium">Imagen del Simulador VR</span>
                 </div>
                 <div className="p-8">
                    <h3 className="text-xl font-bold">Entrena sin riesgos</h3>
                    <p className="mt-2 text-slate-400">Nuestro simulador te permite practicar frente a audiencias virtuales difíciles antes de salir al escenario real.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRECIOS (Oferta Irresistible) --- */}
      <div className="py-24 bg-slate-50" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Elige tu camino</h2>
            <p className="mt-4 text-xl text-slate-600">Inversión estratégica para tu carrera profesional</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* OPCIÓN B2C - Para ti */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-100 hover:border-orange-500 transition-colors">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">MÁS POPULAR</div>
              <h3 className="text-2xl font-bold text-slate-900">Instructor Independiente</h3>
              <p className="text-slate-500 mt-2">Para freelance y consultores</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-bold text-slate-900">$4,500</span>
                <span className="text-slate-500 ml-2">MXN</span>
              </div>
              <p className="text-sm text-orange-600 font-medium mt-2">¡Ahorras $2,000 si pagas hoy!</p>
              
              <ul className="mt-8 space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-orange-500"/> Certificado EC0217.01</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-orange-500"/> Manuales Digitales</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-orange-500"/> 1 Mes de Simulador VR</li>
              </ul>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors"
              >
                Apartar lugar con $500
              </button>
            </div>

            {/* OPCIÓN B2B - Empresas */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white border border-slate-700">
              <h3 className="text-2xl font-bold">Pack Empresarial</h3>
              <p className="text-slate-400 mt-2">Para equipos de capacitación</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-bold">$18,000</span>
                <span className="text-slate-400 ml-2">MXN</span>
              </div>
              <p className="text-sm text-indigo-400 font-medium mt-2">Hasta 5 instructores ($3,600 c/u)</p>
              
              <ul className="mt-8 space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="h-5 w-5 text-indigo-400"/> Todo lo del plan individual</li>
                <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="h-5 w-5 text-indigo-400"/> Reporte de desempeño RH</li>
                <li className="flex items-center gap-3 text-slate-300"><ShieldCheck className="h-5 w-5 text-indigo-400"/> Factura + DC3 Empresarial</li>
              </ul>
              
              <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER SIMPLE --- */}
      <div className="bg-slate-950 py-12 text-center text-slate-600 text-sm">
        <p>© 2026 Cademmy. Todos los derechos reservados.</p>
      </div>

      {/* --- MODAL DE REGISTRO (Simple) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-8 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Excelente decisión!</h3>
            <p className="text-slate-600 mb-6">Déjanos tus datos para enviarte el temario completo y los datos de pago.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                <input type="text" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                <input type="tel" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" placeholder="Ej. 55 1234 5678" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                <input type="email" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" placeholder="juan@empresa.com" />
              </div>
              <button className="w-full rounded-xl bg-orange-600 py-3 font-bold text-white hover:bg-orange-700">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingInstructor40;