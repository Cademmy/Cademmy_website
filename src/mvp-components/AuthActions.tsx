"use client";

import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/mvp-components/AuthProvider";

export function AuthActions() {
  const { authReady, loading, signIn, signOut, user } = useAuth();
  const [busy, setBusy] = useState(false);

  if (!authReady) {
    return null;
  }

  if (loading) {
    return <span className="nav-status">Verificando</span>;
  }

  if (user) {
    return (
      <div className="account-actions">
        <Link className="btn btn-ghost" href="/cuenta">
          Mi cuenta
        </Link>
        <button
          type="button"
          className="icon-text-button"
          onClick={async () => {
            setBusy(true);
            try {
              await signOut();
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy}
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        setBusy(true);
        try {
          await signIn("google");
        } finally {
          setBusy(false);
        }
      }}
      disabled={busy}
    >
      {busy ? "Abriendo..." : "Ingresar"}
    </button>
  );
}
