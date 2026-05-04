"use server";

import prisma from "@/lib/prisma"; // Il prisma locale di TasteBoard

export async function saveBusinessAction(userId: string, formData: any) {
  try {
    // 1. SALVATAGGIO SU TASTEBOARD (Database locale/Prisma Postgres)
    // Creiamo il ristorante collegandolo all'ID dell'utente
    await prisma.restaurant.create({
      data: {
        userId: userId,
        name: formData.businessName, // Assicurati che non ci sia una { dopo la virgola
        address: formData.address,
        type: formData.type,
        categories: {
          create: { name: "Menu Principale" },
        },
      },
    });

    // 2. SALVATAGGIO SU STARTINGLINE (Hub centrale)
    const res = await fetch(
      "http://localhost:3001/api/external/update-business",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          businessName: formData.businessName,
          secret: process.env.INTERNAL_API_SECRET,
        }),
      },
    );

    if (!res.ok) return { success: false, error: "Errore Hub" };

    return { success: true };
  } catch (error) {
    console.error("Errore salvataggio Onboarding:", error);
    return { success: false, error: "Errore durante il salvataggio dei dati" };
  }
}
