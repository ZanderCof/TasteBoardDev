"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // Assicurati di avere l'auth importato
import { Category, Dish } from "./useMenuStore"; 

export async function createMenuAction(data: {
  name: string;
  categories: Category[];
}) {
  try {
    // 1. Recuperiamo l'utente loggato
    const session = await auth();
    if (!session?.user?.id) throw new Error("Non autorizzato");

    // 2. Troviamo il ristorante reale di questo utente
    const restaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id }
    });

    if (!restaurant) throw new Error("Ristorante non trovato. Completa l'onboarding.");

    // 3. Creiamo il menu usando l'ID reale
    await prisma.$transaction(async (tx) => {
      await tx.menu.create({
        data: {
          name: data.name,
          restaurantId: restaurant.id, // <--- ORA È DINAMICO!
          isPublished: true,
          categories: {
            create: data.categories.map((cat) => ({
              name: cat.name,
              dishes: {
                create: cat.dishes.map((dish: Dish) => ({
                  name: dish.name,
                  // Gestione sicura del prezzo
                  price: parseFloat(dish.price.toString().replace(',', '.')),
                })),
              },
            })),
          },
        },
      });
    });

    revalidatePath("/dashboard/menu");
    return { success: true };
  } catch (error) {
    console.error("Errore Action:", error);
    return { success: false, error: "Errore durante il salvataggio" };
  }
}
