# Cademmy Website (MVP)

Sitio Next.js (es-MX) orientado a conversión con:

- Lead generation con formularios y UTM capture.
- Agendamiento con Microsoft Bookings.
- Cobros con Stripe Checkout en MXN.
- Integración HubSpot para sincronizar leads.

## 1) Requisitos

- Node.js 20+
- PostgreSQL (opcional, fallback en memoria para desarrollo)

## 2) Configuración

1. Copia variables:

```bash
cp .env.example .env.local
```

2. Configura al menos:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_MS_BOOKINGS_EMBED_URL` o `NEXT_PUBLIC_MS_BOOKINGS_REDIRECT_URL`
- Stripe (`STRIPE_SECRET_KEY` + `STRIPE_PRICE_*`), o `STRIPE_PAYMENT_LINK_*`
- `HUBSPOT_ACCESS_TOKEN` (opcional pero recomendado)
- `DATABASE_URL` (opcional)

## 3) Desarrollo

```bash
npm install
npm run dev
```

## 4) Eventos congelados

- `LeadSubmitted`
- `BookingCompleted`
- `PaymentCompleted`

## 5) Estados congelados

- Lead: `new | qualified | booked | paid | lost`
- Pago: `pending | paid | failed | refunded`
- Booking: `requested | booked | completed | canceled | no_show`
