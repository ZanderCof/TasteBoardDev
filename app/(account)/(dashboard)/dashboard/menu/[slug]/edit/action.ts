"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Prende il menu completo (Categorie + Piatti)
export async function getFullMenu(menuId: string) {
  // Controllo preventivo di sicurezza per evitare errori PrismaClientValidationError
  if (!menuId || typeof menuId !== "string") {
    return null;
  }

  return await prisma.menu.findUnique({
    where: { id: menuId },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: {
          dishes: {
            orderBy: { id: "asc" },
          },
        },
      },
    },
  });
}

// 2. Aggiorna il nome del Menu
export async function updateMenuName(menuId: string, name: string) {
  if (!menuId || !name.trim()) {
    throw new Error("ID menu o nome non validi");
  }

  await prisma.menu.update({
    where: { id: menuId },
    data: { name: name.trim() },
  });
  
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

// 3. Elimina il Menu
export async function deleteMenu(menuId: string) {
  if (!menuId) {
    throw new Error("ID menu non valido");
  }

  await prisma.menu.delete({
    where: { id: menuId },
  });
  
  revalidatePath("/dashboard/menu");
}
