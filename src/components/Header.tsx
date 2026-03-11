import Link from "next/link";

import { SITE_NAV } from "@/lib/constants";

import { Container } from "@/components/Container";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href="/" className="brand" aria-label="Cademmy Inicio">
          <span className="brand-mark" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span>
            cademmy
            <small>Learn · Improve · Achieve</small>
          </span>
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
        <Link className="btn btn-primary" href="/agendar">
          Agendar llamada
        </Link>
      </Container>
    </header>
  );
}
