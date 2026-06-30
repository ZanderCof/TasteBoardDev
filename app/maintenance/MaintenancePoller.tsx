"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Controlla ogni 60 secondi se la manutenzione è terminata e redirige
export function MaintenancePoller() {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/nuviio/status");
        const data = await res.json();
        if (!data.maintenance) {
          router.push("/");
        }
      } catch {
        // fail silenzioso
      }
    }, 60_000);

    return () => clearInterval(id);
  }, [router]);

  return null;
}
