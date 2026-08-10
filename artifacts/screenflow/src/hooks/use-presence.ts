import { useEffect } from "react";
import { reportPresence } from "@workspace/api-client-react";

const HEARTBEAT_MS = 60_000;

export function usePresence() {
  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      if (cancelled) return;
      try {
        await reportPresence();
      } catch {
        // Fire-and-forget beacon: ignore network/API failures.
      }
    };

    void ping();
    const timer = setInterval(() => void ping(), HEARTBEAT_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);
}
