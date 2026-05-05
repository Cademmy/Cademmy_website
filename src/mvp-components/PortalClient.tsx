"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { UNIT_META } from "@/lib/solution-catalog";
import { EntitlementRecord, PaymentRecord, SolutionUnit } from "@/lib/types";
import { useAuth } from "@/mvp-components/AuthProvider";

type AccountPayload = {
  entitlements: EntitlementRecord[];
  payments: PaymentRecord[];
};

const tabs: Array<{ id: "overview" | SolutionUnit | "billing" | "support"; label: string }> = [
  { id: "overview", label: "Resumen" },
  { id: "learning", label: "Learning" },
  { id: "certification", label: "Certification" },
  { id: "consulting", label: "Consulting" },
  { id: "billing", label: "Pagos" },
  { id: "support", label: "Soporte" }
];

export function PortalClient() {
  const { authReady, getAccessToken, loading, signIn, signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const [account, setAccount] = useState<AccountPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && tabs.some((item) => item.id === tab)) {
      setActiveTab(tab as (typeof tabs)[number]["id"]);
    }
  }, []);

  useEffect(() => {
    async function loadAccount() {
      if (!user) return;
      setRefreshing(true);
      setError(null);
      try {
        const token = await getAccessToken();
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const payload = (await response.json()) as AccountPayload & { error?: string };
        if (!response.ok) throw new Error(payload.error || "No pudimos cargar tu cuenta.");
        setAccount({
          entitlements: payload.entitlements,
          payments: payload.payments
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Error inesperado.");
      } finally {
        setRefreshing(false);
      }
    }

    loadAccount();
  }, [getAccessToken, user]);

  const activeEntitlements = useMemo(
    () => account?.entitlements.filter((item) => item.status === "active") ?? [],
    [account?.entitlements]
  );
  const pendingEntitlements = useMemo(
    () => account?.entitlements.filter((item) => item.status === "pending_claim") ?? [],
    [account?.entitlements]
  );

  if (!authReady) {
    return (
      <section className="glass-panel portal-empty">
        <h1>Tu cuenta Cademmy</h1>
        <p>
          La autenticacion todavia no esta configurada en este entorno. Cuando Supabase este listo,
          este portal mostrara tus soluciones, pagos, accesos y soporte.
        </p>
        <Link className="btn btn-primary" href="/contacto?service=Cuenta%20Cademmy">
          Solicitar ayuda
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="glass-panel portal-empty">
        <p className="micro-label">Cuenta Cademmy</p>
        <h1>Verificando tu sesion...</h1>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="glass-panel portal-empty">
        <p className="micro-label">Cuenta unica</p>
        <h1>Ingresa para ver tus soluciones compradas o contratadas.</h1>
        <p>
          Si compraste como invitado, usa el mismo correo del pago. El portal reclamara tus accesos
          pendientes de forma automatica.
        </p>
        <div className="actions">
          <button className="btn btn-primary" type="button" onClick={() => signIn("google")}>
            Continuar con Google
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => signIn("microsoft")}>
            Continuar con Microsoft
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="portal-shell">
      <div className="portal-hero glass-panel">
        <div>
          <p className="micro-label">Cuenta Cademmy</p>
          <h1>
            Hola{user.user_metadata?.full_name ? `, ${String(user.user_metadata.full_name).split(" ")[0]}` : ""}.
            Tus soluciones viven aqui.
          </h1>
          <p>
            Consulta los servicios disponibles, pagos recientes, entregables y proximos pasos desde
            una sola cuenta.
          </p>
        </div>
        <div className="portal-profile">
          <span>{user.email}</span>
          <button className="icon-text-button" type="button" onClick={() => signOut()}>
            Cerrar sesion
          </button>
        </div>
      </div>

      <div className="portal-tabs" role="tablist" aria-label="Secciones de cuenta">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}

      {activeTab === "overview" && (
        <div className="portal-grid">
          <article className="glass-panel portal-stat">
            <span>Accesos activos</span>
            <strong>{activeEntitlements.length}</strong>
            <p>Servicios listos para consultar desde tu cuenta.</p>
          </article>
          <article className="glass-panel portal-stat">
            <span>Pendientes por reclamar</span>
            <strong>{pendingEntitlements.length}</strong>
            <p>Compras invitadas que se vinculan al iniciar sesion con el mismo correo.</p>
          </article>
          <article className="glass-panel portal-stat">
            <span>Pagos registrados</span>
            <strong>{account?.payments.length ?? 0}</strong>
            <p>Historial comercial asociado a tu usuario o correo.</p>
          </article>
        </div>
      )}

      {(["learning", "certification", "consulting"] as SolutionUnit[]).includes(activeTab as SolutionUnit) && (
        <UnitAccessList
          unit={activeTab as SolutionUnit}
          entitlements={account?.entitlements ?? []}
          refreshing={refreshing}
        />
      )}

      {activeTab === "billing" && <BillingList payments={account?.payments ?? []} />}
      {activeTab === "support" && <SupportPanel />}
    </section>
  );
}

function UnitAccessList({
  entitlements,
  refreshing,
  unit
}: {
  entitlements: EntitlementRecord[];
  refreshing: boolean;
  unit: SolutionUnit;
}) {
  const unitEntitlements = entitlements.filter((item) => item.unit === unit);
  const meta = UNIT_META[unit];

  return (
    <div className="stack-lg">
      <div className="section-heading">
        <p className="micro-label" style={{ color: meta.color }}>
          {meta.name}
        </p>
        <h2>{unit === "consulting" ? "Proyectos y acompanamiento" : "Accesos disponibles"}</h2>
        <p>{meta.description}</p>
      </div>

      {refreshing && <p className="muted-text">Actualizando accesos...</p>}
      {unitEntitlements.length === 0 ? (
        <article className="glass-panel portal-empty-inline">
          <h3>Aun no tienes servicios de {meta.label} asociados a tu cuenta.</h3>
          <p>Cuando compres o contrates una solucion, aparecera aqui con su estado y acceso.</p>
          <Link className="btn btn-secondary" href={meta.href}>
            Explorar {meta.label}
          </Link>
        </article>
      ) : (
        <div className="portal-list">
          {unitEntitlements.map((entitlement) => (
            <article className="glass-panel entitlement-card" key={entitlement.id}>
              <div>
                <p className="micro-label" style={{ color: meta.color }}>
                  {entitlement.status === "active" ? "Acceso activo" : "Pendiente"}
                </p>
                <h3>{entitlement.title}</h3>
                <p>
                  {entitlement.status === "active"
                    ? "Disponible para continuar desde este portal."
                    : "Inicia sesion con el correo del pago para reclamarlo."}
                </p>
              </div>
              <Link className="btn btn-primary" href={entitlement.access_url}>
                Abrir servicio
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function BillingList({ payments }: { payments: PaymentRecord[] }) {
  return (
    <div className="stack-lg">
      <div className="section-heading">
        <p className="micro-label">Pagos</p>
        <h2>Historial comercial</h2>
        <p>Pagos, reembolsos y registros asociados a tu cuenta o correo de compra.</p>
      </div>
      {payments.length === 0 ? (
        <article className="glass-panel portal-empty-inline">
          <h3>No hay pagos asociados todavia.</h3>
          <p>Si acabas de pagar, espera unos segundos y vuelve a cargar esta pagina.</p>
        </article>
      ) : (
        <div className="portal-list">
          {payments.map((payment) => (
            <article className="glass-panel payment-row" key={payment.id}>
              <div>
                <strong>{payment.sku}</strong>
                <span>{payment.unit}</span>
              </div>
              <div>
                <strong>{payment.amount_mxn ? `$${payment.amount_mxn.toLocaleString("es-MX")} MXN` : "Monto no disponible"}</strong>
                <span>{payment.status}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SupportPanel() {
  return (
    <article className="glass-panel support-card">
      <p className="micro-label">Soporte</p>
      <h2>Necesitas ayuda con un acceso, pago o proyecto?</h2>
      <p>
        Comparte el contexto y revisamos el caso con el equipo correcto. Si se trata de una compra
        invitada, incluye el correo usado en Stripe.
      </p>
      <div className="actions">
        <Link className="btn btn-primary" href="/contacto?service=Soporte%20de%20cuenta">
          Solicitar soporte
        </Link>
        <Link className="btn btn-secondary" href="/agendar">
          Agendar conversacion
        </Link>
      </div>
    </article>
  );
}
