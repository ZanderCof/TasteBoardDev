export type NuviioNotification = {
  id: string;
  title: string;
  message: string;
  type: "UPDATE" | "MAINTENANCE" | "INFO";
  createdAt: string;
  isRead: boolean;
};

const BASE_URL =
  process.env.NUVIIO_HUB_URL ?? "https://nuviio-liard.vercel.app";
const SECRET = process.env.INTERNAL_API_SECRET ?? "";

export async function fetchNuviioNotifications(
  email: string
): Promise<NuviioNotification[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/external/tasteboard/notifications?email=${encodeURIComponent(email)}`,
      {
        headers: { "x-internal-secret": SECRET },
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? (data.notifications as NuviioNotification[]) : [];
  } catch {
    return [];
  }
}

export async function markNuviioNotificationRead(
  email: string,
  notificationId: string
): Promise<void> {
  try {
    await fetch(`${BASE_URL}/api/external/tasteboard/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET, email, notificationId }),
    });
  } catch {
    // fail silently — l'UI è già aggiornata optimistically
  }
}
