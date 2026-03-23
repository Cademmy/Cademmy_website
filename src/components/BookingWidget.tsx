"use client";

import { FormEvent, useState } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics";

export function BookingWidget() {
  const [showCalendar, setShowCalendar] = useState(false);
  const embedUrl = process.env.NEXT_PUBLIC_MS_BOOKINGS_EMBED_URL;
  const redirectUrl = process.env.NEXT_PUBLIC_MS_BOOKINGS_REDIRECT_URL;

  const onPrequalify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowCalendar(true);
  };

  return (
    <section className="stack-lg">
      <div className="card">
        <h2>Paso 1: Cuéntanos brevemente tu objetivo</h2>
        <form onSubmit={onPrequalify} className="stack-sm">
          <label>
            Nombre completo
            <input required />
          </label>
          <label>
            Correo
            <input type="email" required />
          </label>
          <label>
            Tipo de servicio
            <select required>
              <option>Consultoría</option>
              <option>Capacitación y Coaching</option>
              <option>Cursos en Línea</option>
              <option>Certificación</option>
              <option>Talento y Capital Humano</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            Continuar a disponibilidad
          </button>
        </form>
      </div>

      {showCalendar && (
        <div className="card">
          <h2>Paso 2: Selecciona fecha y hora</h2>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Microsoft Bookings Cademmy"
              width="100%"
              height={700}
              style={{ border: 0 }}
              loading="lazy"
            />
          ) : (
            <>
              <p>
                Configura <code>NEXT_PUBLIC_MS_BOOKINGS_EMBED_URL</code> para incrustar calendario.
              </p>
              {redirectUrl && (
                <a className="btn btn-secondary" href={redirectUrl} target="_blank" rel="noreferrer">
                  Abrir agenda en nueva pestaña
                </a>
              )}
            </>
          )}

          <a
            className="btn btn-primary"
            href="/gracias/cita"
            onClick={() => trackEvent(EVENTS.BookingCompleted, { source: "microsoft_bookings" })}
          >
            Ya reservé mi cita
          </a>
        </div>
      )}
    </section>
  );
}
