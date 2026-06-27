"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";
import { logError } from "@/lib/logger";

// 1. Aggiorniamo l'interfaccia con TUTTI i campi che gestisci nel form
interface UpdateStoreInput {
  name: string;
  address?: string | null;
  type?: string | null;   // <--- Aggiunto
  piva?: string | null;   // <--- Aggiunto
  phone?: string | null;  // <--- Aggiunto
  isLive?: boolean;       // <--- Aggiunto
}

// Aggiorna il locale
export async function updateStore(id: string, data: UpdateStoreInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Devi essere loggato." };
    }

    const updated = await prisma.restaurant.update({
      // Sicurezza: aggiorna solo se il locale appartiene all'utente loggato
      where: { id, userId: session.user.id },
      data: {
        name: data.name,
        address: data.address,
        type: data.type,     // <--- Ora Prisma lo salva!
        // Se hai aggiunto questi campi al tuo schema Prisma, decommentali:
        // piva: data.piva,
        // phone: data.phone,
        // isLive: data.isLive,
      },
    });

    // Revalida le cache per vedere i cambiamenti subito
    revalidatePath(`/dashboard/store/${id}`);
    revalidatePath("/dashboard");

    await logActivity({
      action: "restaurant.update",
      userId: session.user.id,
      userEmail: session.user.email,
      restaurantId: id,
      metadata: { name: data.name },
    });

    return { success: true, data: updated };
  } catch (error) {
    await logError("tasteboard-store", "Errore aggiornamento locale", error, { restaurantId: id });
    return { success: false, error: "Errore durante l'aggiornamento" };
  }
}

// Elimina il locale
export async function deleteStore(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Devi essere loggato." };
    }

    // Recuperiamo il nome prima di eliminare, utile per il log attività
    const existing = await prisma.restaurant.findFirst({
      where: { id, userId: session.user.id },
      select: { name: true },
    });

    // Sicurezza: elimina solo se il locale appartiene all'utente loggato
    const result = await prisma.restaurant.deleteMany({
      where: { id, userId: session.user.id },
    });
    if (result.count === 0) {
      return { success: false, error: "Locale non trovato o non autorizzato." };
    }

    revalidatePath("/dashboard");

    await logActivity({
      action: "restaurant.delete",
      userId: session.user.id,
      userEmail: session.user.email,
      restaurantId: id,
      metadata: { name: existing?.name },
    });

    return { success: true };
  } catch (error) {
    await logError("tasteboard-store", "Errore eliminazione locale", error, { restaurantId: id });
    return { success: false, error: "Errore durante l'eliminazione" };
  }
}

// Recupera il locale
export async function getStoreById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    const store = await prisma.restaurant.findFirst({
      where: { id, userId: session.user.id },
    });
    return store;
  } catch (error) {
    await logError("tasteboard-store", "Errore lettura locale", error, { restaurantId: id });
    return null;
  }
}
