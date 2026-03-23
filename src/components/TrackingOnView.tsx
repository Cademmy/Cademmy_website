"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

type Props = {
  eventName: string;
  params?: Record<string, unknown>;
};

export function TrackingOnView({ eventName, params }: Props) {
  useEffect(() => {
    trackEvent(eventName, params);
  }, [eventName, params]);

  return null;
}
