"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { syncTicketToHub, fetchTicketsFromHub, replyToTicketOnHub } from "@/lib/hub-sync";
import { logWarning, logError } from "@/lib/logger";
import type { TicketCategory, TicketPriority } from "@prisma/client";

export async function createTicket(data: {
  restaurantId: string;
  subject: string;
  content: string;
  category?: TicketCategory;
  priority?: TicketPriority;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Devi essere autenticato." };
  }

  if (!data.subject.trim() || !data.content.trim()) {
    return { success: false, error: "Oggetto e descrizione sono obbligatori." };
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { id: data.restaurantId, userId: session.user.id },
    select: { id: true },
  });
  if (!restaurant) {
    return { success: false, error: "Locale non trovato." };
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        userEmail: session.user.email ?? null,
        restaurantId: restaurant.id,
        subject: data.subject.trim(),
        content: data.content.trim(),
        category: data.category ?? "ALTRO",
        priority: data.priority ?? "MEDIUM",
      },
    });

    if (session.user.email) {
      const hubResult = await syncTicketToHub({
        email: session.user.email,
        subject: ticket.subject,
        content: ticket.content,
        category: ticket.category,
        priority: ticket.priority,
      });
      if (hubResult?.ticketId) {
        await prisma.ticket.update({
          where: { id: ticket.id },
          data: { hubTicketId: hubResult.ticketId },
        });
      }
    } else {
      await logWarning("tasteboard-support", "Ticket creato senza email utente: sync hub saltata", { ticketId: ticket.id });
    }

    return { success: true };
  } catch (error) {
    await logError("tasteboard-support", "Errore creazione ticket", error, { restaurantId: data.restaurantId });
    return { success: false, error: "Errore durante l'invio del ticket." };
  }
}

export async function getMyTickets() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Devi essere autenticato." };
  }
  if (!session.user.email) {
    return { success: false as const, error: "Il tuo account non ha un'email associata." };
  }

  const result = await fetchTicketsFromHub(session.user.email);
  if (!result.success) {
    await logWarning("tasteboard-support", "Impossibile recuperare i ticket dall'hub", { error: result.error });
  }
  return result;
}

export async function replyToTicket(ticketId: string, message: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Devi essere autenticato." };
  }
  if (!session.user.email) {
    return { success: false as const, error: "Il tuo account non ha un'email associata." };
  }
  if (!message.trim()) {
    return { success: false as const, error: "Scrivi un messaggio prima di inviare." };
  }

  const result = await replyToTicketOnHub({ ticketId, email: session.user.email, message: message.trim() });
  if (!result.success) {
    await logWarning("tasteboard-support", "Impossibile inviare la risposta al ticket", { ticketId, error: result.error });
  }
  return result;
}
