'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const IDLE_TITLES = [
  "🔥 Don't miss out!",
  '👀 We miss you...',
  '🛍️ Come back!',
  '🔥 Hot deals inside',
  '🏷️ Use code MISHKA10',
  '✨ New drops waiting for you',
  '👋 Still shopping?',
] as const;

const ROTATION_MS = 2200;

function isIdleTitle(title: string) {
  return IDLE_TITLES.includes(title as (typeof IDLE_TITLES)[number]);
}

export function useDynamicTabTitle() {
  const pathname = usePathname();
  const activeTitleRef = useRef('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const syncActiveTitle = () => {
      if (!document.hidden && !isIdleTitle(document.title)) {
        activeTitleRef.current = document.title;
      }
    };

    syncActiveTitle();

    const clearRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startRotation = () => {
      clearRotation();
      indexRef.current = 0;
      document.title = IDLE_TITLES[0];

      intervalRef.current = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % IDLE_TITLES.length;
        document.title = IDLE_TITLES[indexRef.current];
      }, ROTATION_MS);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (!isIdleTitle(document.title)) {
          activeTitleRef.current = document.title;
        }
        startRotation();
        return;
      }

      clearRotation();
      if (activeTitleRef.current) {
        document.title = activeTitleRef.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearRotation();
      if (activeTitleRef.current) {
        document.title = activeTitleRef.current;
      }
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!document.hidden) {
        activeTitleRef.current = document.title;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);
}
