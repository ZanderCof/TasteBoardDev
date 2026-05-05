"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// Importiamo i tipi dallo store
import { Category, Dish } from "./useMenuStore"; 

export async function createMenuAction(data: {
  name: string;
  categories: Category[]; // Sostituito any[] con Category[]
}) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.menu.create({
        data: {
          name: data.name,
          restaurantId: 'cmosq6ouj0000pkj0hzu85f3m',
          isPublished: true,
          categories: {
            create: data.categories.map((cat) => ({
              name: cat.name,
              dishes: {
                create: cat.dishes.map((dish: Dish) => ({ // Sostituito any con Dish
                  name: dish.name,
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
