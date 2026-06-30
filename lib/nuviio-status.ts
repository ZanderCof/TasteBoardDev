export type MaintenanceStatus = {
  maintenance: boolean;
  message: string | null;
};

const BASE_URL =
  process.env.NUVIIO_HUB_URL ?? "https://nuviio-liard.vercel.app";
const SECRET = process.env.INTERNAL_API_SECRET ?? "";

export async function fetchMaintenanceStatus(): Promise<MaintenanceStatus> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${BASE_URL}/api/external/tasteboard/status`, {
      headers: { "x-internal-secret": SECRET },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(id);
    if (!res.ok) return { maintenance: false, message: null };

    const data = await res.json();
    return {
      maintenance: Boolean(data.maintenance),
      message: typeof data.message === "string" ? data.message : null,
    };
  } catch {
    // network error o timeout → non bloccare l'app
    return { maintenance: false, message: null };
  }
}
