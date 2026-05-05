import { Metadata } from "next";

import { Container } from "@/mvp-components/Container";
import { PortalClient } from "@/mvp-components/PortalClient";

export const metadata: Metadata = {
  title: "Mi cuenta",
  description:
    "Portal Cademmy para consultar soluciones compradas o contratadas, pagos, accesos, soporte y proximos pasos."
};

export default function CuentaPage() {
  return (
    <section className="section section-hero">
      <Container>
        <PortalClient />
      </Container>
    </section>
  );
}
