import Image from "next/image";
import Link from "next/link";

import { SITE_NAV } from "@/lib/constants";
import { AuthActions } from "@/mvp-components/AuthActions";
import { Container } from "@/mvp-components/Container";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href="/" className="brand-logo" aria-label="Cademmy inicio">
          <Image src="/assets/logo-color-horizontal.png" alt="Cademmy" width={178} height={71} priority />
        </Link>
        <nav aria-label="Principal">
          <ul className="nav-list">
            {SITE_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <AuthActions />
          <Link className="btn btn-primary" href="/agendar">
            Agendar diagnóstico
          </Link>
        </div>
      </Container>
    </header>
  );
}
