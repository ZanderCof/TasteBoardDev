// Sincronizzazione best-effort verso l'hub StartingLine.
// Non è la fonte di verità: se l'hub non risponde, l'azione locale
// in TasteBoard deve comunque andare a buon fine.

type FeedbackHubPayload = {
  email?: string | null;
  authorName?: string | null;
  rating: number;
  comment: string;
};

type TicketHubPayload = {
  email: string;
  subject: string;
  content: string;
  category?: string;
  priority?: string;
};

type ActivityLogHubPayload = {
  action: string;
  userId?: string | null;
  userEmail?: string | null;
  restaurantId?: string | null;
  entityId?: string | null;
  metadata?: unknown;
  createdAt: string;
};

type AppLogHubPayload = {
  level: "INFO" | "WARNING" | "ERROR";
  source: string;
  message: string;
  metadata?: unknown;
};

export type HubTicketReply = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

export type HubTicketDetail = {
  id: string;
  subject: string;
  content: string;
  category: string;
  priority: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  replies: HubTicketReply[];
};

async function postToHub(path: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch(`${process.env.STARTINGLINE_HUB_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.INTERNAL_API_SECRET, ...payload }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      console.warn(`Sync verso hub (${path}) fallita:`, data?.error ?? res.status);
      return null;
    }
    return data;
  } catch (error) {
    console.warn(`Errore di rete nella sync verso hub (${path}):`, error);
    return null;
  }
}

export async function syncFeedbackToHub(payload: FeedbackHubPayload) {
  return postToHub("/api/external/tasteboard/feedback", payload);
}

export async function syncTicketToHub(payload: TicketHubPayload) {
  return postToHub("/api/external/tasteboard/tickets", payload);
}

export async function syncActivityLogToHub(payload: ActivityLogHubPayload) {
  return postToHub("/api/external/tasteboard/activity-logs", payload);
}

export async function syncAppLogToHub(payload: AppLogHubPayload) {
  return postToHub("/api/external/tasteboard/logs", payload);
}

// Rispondere a un ticket riapre automaticamente quelli RESOLVED/CLOSED
// (stesso comportamento "reply-to-reopen" di molti help desk): non serve
// un endpoint separato per la riapertura. Come fetchTicketsFromHub, l'utente
// è in attesa di una conferma quindi il fallimento va segnalato, non solo loggato.
export async function replyToTicketOnHub(payload: {
  ticketId: string;
  email: string;
  message: string;
}): Promise<
  | { success: true; reply: HubTicketReply; status: HubTicketDetail["status"] }
  | { success: false; error: string }
> {
  try {
    const res = await fetch(`${process.env.STARTINGLINE_HUB_URL}/api/external/tasteboard/tickets/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.INTERNAL_API_SECRET, ...payload }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      return { success: false, error: data?.error ?? `Errore hub (${res.status})` };
    }
    return { success: true, reply: data.reply, status: data.status };
  } catch (error) {
    console.warn("Errore di rete nell'invio della risposta al ticket:", error);
    return { success: false, error: "Hub non raggiungibile." };
  }
}

// A differenza delle sync push sopra, qui l'utente è in attesa di un dato
// (i suoi ticket), quindi il fallimento va segnalato al chiamante invece
// di essere solo loggato in silenzio.
export async function fetchTicketsFromHub(
  email: string,
): Promise<{ success: true; tickets: HubTicketDetail[] } | { success: false; error: string }> {
  try {
    const res = await fetch(
      `${process.env.STARTINGLINE_HUB_URL}/api/external/tasteboard/tickets?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: { "x-internal-secret": process.env.INTERNAL_API_SECRET ?? "" },
      },
    );

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      return { success: false, error: data?.error ?? `Errore hub (${res.status})` };
    }
    return { success: true, tickets: data.tickets ?? [] };
  } catch (error) {
    console.warn("Errore di rete nel recupero ticket dall'hub:", error);
    return { success: false, error: "Hub non raggiungibile." };
  }
}
