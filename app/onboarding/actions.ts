"use server";

import prisma from "@/lib/prisma";

export async function saveBusinessAction(userId: string, formData: any) {
  try {
    // 1. SALVATAGGIO SU TASTEBOARD (Nuova Gerarchia)
    await prisma.restaurant.create({
      data: {
        userId: userId,
        name: formData.businessName,
        address: formData.address,
        type: formData.type,
        // Invece di 'categories', usiamo 'menus'
        menus: {
          create: {
            name: "Menu di test",
            isPublished: true,
            // Creiamo la categoria dentro il menu
            categories: {
              create: { 
                name: "Categoria di test",
                order: 0
              }
            }
          }
        }
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

    if (!res.ok) {
      console.warn("Avviso: Hub centrale non aggiornato, ma locale OK.");
      // Puoi decidere se ritornare comunque true o gestire l'errore
    }

    return { success: true };
  } catch (error) {
    console.error("Errore salvataggio Onboarding:", error);
    return { success: false, error: "Errore durante la creazione del locale." };
  }
}
