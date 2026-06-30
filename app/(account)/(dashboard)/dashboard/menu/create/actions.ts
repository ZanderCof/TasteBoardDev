"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // Assicurati di avere l'auth importato
import { Category, Dish } from "./useMenuStore";
import { logActivity } from "@/lib/activity-log";
import { logError } from "@/lib/logger";

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

    const menuCount = await prisma.menu.count({ where: { restaurantId: restaurant.id } });
    if (menuCount >= 3) {
      return { success: false, error: "Hai raggiunto il limite di 3 menu per il piano attuale." };
    }

    // 3. Creiamo il menu usando l'ID reale
    const menu = await prisma.$transaction(async (tx) => {
      return await tx.menu.create({
        data: {
          name: data.name,
          restaurantId: restaurant.id,
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

    await logActivity({
      action: "menu.create",
      userId: session.user.id,
      userEmail: session.user.email,
      restaurantId: restaurant.id,
      entityId: menu.id,
      metadata: { name: menu.name, categoriesCount: data.categories.length },
    });

    return { success: true };
  } catch (error) {
    await logError("tasteboard-menu", "Errore creazione menu", error);
    return { success: false, error: "Errore durante il salvataggio" };
  }
}
