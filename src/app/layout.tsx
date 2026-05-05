import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";

import "@/app/globals.css";
import { AuthProvider } from "@/mvp-components/AuthProvider";
import { Footer } from "@/mvp-components/Footer";
import { Header } from "@/mvp-components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cademmy | Soluciones de aprendizaje, certificacion y consultoria",
    template: "%s | Cademmy"
  },
  description:
    "Cademmy integra cursos, certificaciones y consultoria profesional en una cuenta unica para transformar capacidades en resultados medibles.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <AuthProvider>
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
