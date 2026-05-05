"use client";

import { FormEvent, useState } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics";
import { BOOKING_SERVICE_OPTIONS } from "@/lib/constants";

export function BookingWidget() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [serviceType, setServiceType] = useState<string>(BOOKING_SERVICE_OPTIONS[0]);
  const embedUrl = process.env.NEXT_PUBLIC_MS_BOOKINGS_EMBED_URL;
  const redirectUrl = process.env.NEXT_PUBLIC_MS_BOOKINGS_REDIRECT_URL;

  const onPrequalify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowCalendar(true);
  };

  return (
    <section className="stack-lg">
      <div className="glass-panel">
        <h2>Paso 1: Cuentanos brevemente tu objetivo</h2>
        <p className="form-intro">
          Este paso nos ayuda a entender si la conversacion corresponde a Learning, Certification,
          Consulting, diagnostico o soporte de cuenta.
        </p>
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
            Tipo de conversacion
            <select required value={serviceType} onChange={(event) => setServiceType(event.target.value)}>
              {BOOKING_SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Empresa
            <input required />
          </label>
          <label>
            Contexto
            <textarea rows={4} placeholder="Describe brevemente que quieres resolver." required />
          </label>
          <button type="submit" className="btn btn-primary">
            Continuar a disponibilidad
          </button>
        </form>
      </div>

      {showCalendar && (
        <div className="glass-panel">
          <div className="stack-sm">
            <p className="chip">Paso 2</p>
            <h2>Selecciona fecha y hora</h2>
            <p>
              Abrimos disponibilidad para <strong>{serviceType}</strong>. Si prefieres, tambien
              puedes usar el enlace externo.
            </p>
          </div>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Microsoft Bookings Cademmy"
              width="100%"
              height={720}
              style={{ border: 0 }}
              loading="lazy"
            />
          ) : (
            <div className="booking-fallback">
              <p>
                Configura <code>NEXT_PUBLIC_MS_BOOKINGS_EMBED_URL</code> para incrustar el
                calendario directamente en esta pagina.
              </p>
              {redirectUrl && (
                <a className="btn btn-secondary" href={redirectUrl} target="_blank" rel="noreferrer">
                  Abrir agenda en nueva pestana
                </a>
              )}
            </div>
          )}

          <a
            className="btn btn-primary"
            href="/gracias/cita"
            onClick={() =>
              trackEvent(EVENTS.BookingCompleted, {
                source: "microsoft_bookings",
                service_type: serviceType
              })
            }
          >
            Ya reserve mi cita
          </a>
        </div>
      )}
    </section>
  );
}
