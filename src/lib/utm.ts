"use client";

import { UTMData } from "@/lib/types";

const KEYS: Array<keyof UTMData> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid"
];

const STORAGE_KEY = "cademmy_utm";

export const captureUTMData = (): UTMData => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const previous = readUTMData();

  const current: UTMData = {
    ...previous,
    referrer: document.referrer || previous.referrer,
    landing_page: window.location.pathname
  };

  for (const key of KEYS) {
    const value = params.get(key);
    if (value) current[key] = value;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
};

export const readUTMData = (): UTMData => {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UTMData;
  } catch {
    return {};
  }
};
