'use client';

import { useEffect } from 'react';

const ATTRIBUTION_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'ttclid',
  'li_fat_id',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
] as const;

const STORAGE_KEY = 'kr_attribution';
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
const APP_HOST = 'app.kineticrecruiter.com';

type Attribution = { params: Record<string, string>; expires: number };

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed?.expires || parsed.expires <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(value: Attribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota) — silently no-op
  }
}

export function ClickIdCapture() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const captured: Record<string, string> = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = url.searchParams.get(key);
      if (value) captured[key] = value;
    }

    if (Object.keys(captured).length > 0) {
      const stored = readStored();
      writeStored({
        params: { ...(stored?.params ?? {}), ...captured },
        expires: Date.now() + TTL_MS,
      });
    }

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || !anchor.href) return;

      let parsed: URL;
      try {
        parsed = new URL(anchor.href);
      } catch {
        return;
      }
      if (parsed.host !== APP_HOST) return;

      const attribution = readStored();
      if (!attribution) return;

      let mutated = false;
      for (const [key, value] of Object.entries(attribution.params)) {
        if (!parsed.searchParams.has(key)) {
          parsed.searchParams.set(key, value);
          mutated = true;
        }
      }
      if (mutated) anchor.href = parsed.toString();
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}
