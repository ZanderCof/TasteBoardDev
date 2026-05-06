"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Interfaccia per la creazione
interface CreateStoreInput {
  name: string;
  type: string;
  address: string;
  city?: string;
}

/**
 * Recupera tutti i locali dell'utente loggato
 */
export async function getMyStores() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.restaurant.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Crea un nuovo locale nel database
 */
export async function createStore(data: CreateStoreInput) {
  try {
    const session = await auth();
    
    // Controllo sicurezza: se non c'è sessione, non creare nulla
    if (!session?.user?.id) {
      return { success: false, error: "Devi essere loggato per creare un locale." };
    }

    const userId = session.user.id;

    // Uniamo Indirizzo e Città per il campo 'address' del DB
    const fullAddress = data.city ? `${data.address}, ${data.city}` : data.address;

    const newStore = await prisma.restaurant.create({
      data: {
        name: data.name,
        type: data.type,
        address: fullAddress,
        userId: userId, 
      },
    });

    // Aggiorna la cache delle pagine che mostrano la lista locali
    revalidatePath("/dashboard");
    
    return { success: true, data: newStore };
  } catch (error) {
    console.error("Errore creazione store:", error);
    return { success: false, error: "Non è stato possibile creare il locale. Riprova." };
  }
}
