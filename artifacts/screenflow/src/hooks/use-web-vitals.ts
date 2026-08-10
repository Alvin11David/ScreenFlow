import { useEffect } from "react";
import { reportWebVital } from "@workspace/api-client-react";
import type { RumRequest } from "@workspace/api-client-react";

type VitalType = RumRequest["type"];
type Rating = RumRequest["rating"];

function ratingFor(value: number, good: number, poor: number): Rating {
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function sendWebVital(type: VitalType, value: number, rating: Rating) {
  try {
    void reportWebVital({
      type,
      value: Number(value.toFixed(3)),
      rating,
      path: window.location.pathname,
    }).catch(() => undefined);
  } catch {
    // Fire-and-forget beacon: ignore network/API failures.
  }
}

function reportNavigationTiming() {
  const nav = performance
    .getEntriesByType("navigation")
    .find(
      (entry): entry is PerformanceNavigationTiming =>
        entry instanceof PerformanceNavigationTiming,
    );
  if (nav) {
    sendWebVital("ttfb", nav.responseStart, ratingFor(nav.responseStart, 800, 1800));
  }
}

type LayoutShiftLike = PerformanceEntry & {
  hadRecentInput?: boolean;
  value?: number;
};
type InteractionLike = PerformanceEntry & {
  interactionId?: number;
  duration?: number;
};
type LcpLike = PerformanceEntry & { startTime: number };

export function useWebVitals() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof performance === "undefined") return;

    reportNavigationTiming();

    if (!("PerformanceObserver" in window)) return;

    const observers: PerformanceObserver[] = [];
    let clsValue = 0;
    let hasCls = false;

    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as LayoutShiftLike;
          if (!shift.hadRecentInput) {
            clsValue += shift.value ?? 0;
            hasCls = true;
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObserver);
    } catch {
      // layout-shift not supported
    }

    let inp = 0;
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const timing = entry as InteractionLike;
          if ((timing.interactionId ?? 0) > 0 && (timing.duration ?? 0) > inp) {
            inp = timing.duration ?? 0;
          }
        }
      });
      inpObserver.observe({
        type: "event",
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit);
      observers.push(inpObserver);
    } catch {
      // event timing not supported
    }

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LcpLike[];
        const last = entries[entries.length - 1];
        if (last) {
          sendWebVital("lcp", last.startTime, ratingFor(last.startTime, 2500, 4000));
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObserver);
    } catch {
      // largest-contentful-paint not supported
    }

    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const first = list.getEntries()[0];
        if (first) {
          sendWebVital(
            "fcp",
            first.startTime,
            ratingFor(first.startTime, 1800, 3000),
          );
        }
      });
      fcpObserver.observe({ type: "first-contentful-paint", buffered: true });
      observers.push(fcpObserver);
    } catch {
      // first-contentful-paint not supported
    }

    const flush = () => {
      if (hasCls) sendWebVital("cls", clsValue, ratingFor(clsValue, 0.1, 0.25));
      if (inp > 0) sendWebVital("inp", inp, ratingFor(inp, 200, 500));
    };

    window.addEventListener("pagehide", flush, { once: true });
    document.addEventListener("visibilitychange", flush, { once: true });

    return () => {
      flush();
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
    };
  }, []);
}
