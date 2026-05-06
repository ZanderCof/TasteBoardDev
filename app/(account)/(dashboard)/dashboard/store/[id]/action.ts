"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    const updated = await prisma.restaurant.update({
      where: { id },
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
    
    return { success: true, data: updated };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Errore durante l'aggiornamento" };
  }
}

// Elimina il locale
export async function deleteStore(id: string) {
  try {
    await prisma.restaurant.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Errore durante l'eliminazione" };
  }
}

// Recupera il locale
export async function getStoreById(id: string) {
  try {
    const store = await prisma.restaurant.findUnique({
      where: { id },
    });
    return store;
  } catch (error) {
    console.error("Errore Prisma:", error);
    return null;
  }
}
