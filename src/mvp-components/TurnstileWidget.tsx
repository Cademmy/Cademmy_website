"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string | number;
      reset: (widgetId?: string | number) => void;
    };
  }
}

type Props = {
  onTokenChange: (token: string) => void;
  resetSignal?: number;
};

export function TurnstileWidget({ onTokenChange, resetSignal = 0 }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | number | null>(null);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current !== null) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token) => onTokenChange(token),
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange("")
    });
  }, [onTokenChange, siteKey]);

  useEffect(() => {
    renderWidget();
    const intervalId = window.setInterval(renderWidget, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [renderWidget]);

  useEffect(() => {
    if (!resetSignal || widgetIdRef.current === null || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChange("");
  }, [onTokenChange, resetSignal]);

  if (!siteKey) return null;

  return (
    <div className="stack-sm">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="captcha-slot" />
    </div>
  );
}
