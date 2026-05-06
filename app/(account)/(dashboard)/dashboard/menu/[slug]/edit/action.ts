"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* --- MENU --- */
export async function getFullMenu(menuId: string) {
  if (!menuId) return null;
  return await prisma.menu.findUnique({
    where: { id: menuId },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: { dishes: { orderBy: { id: "asc" } } },
      },
    },
  });
}

export async function updateMenuName(menuId: string, name: string) {
  await prisma.menu.update({ where: { id: menuId }, data: { name } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function deleteMenu(menuId: string) {
  await prisma.menu.delete({ where: { id: menuId } });
  revalidatePath("/dashboard/menu");
  redirect("/dashboard/menu");
}

/* --- CATEGORIE --- */
export async function addCategory(menuId: string, name: string) {
  await prisma.category.create({
    data: { name, menuId, order: 99 }
  });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function deleteCategory(id: string, menuId: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

/* --- PIATTI --- */
export async function addDish(
  categoryId: string, 
  menuId: string, 
  data: { 
    name: string; 
    price: string | number; // Sostituito 'any' con tipi specifici
    description?: string 
  }
) {
  // Conversione sicura: se è stringa puliamo virgole, altrimenti convertiamo in numero
  const cleanPrice = typeof data.price === "string" 
    ? parseFloat(data.price.replace(",", ".")) 
    : Number(data.price);

  // Se il valore ottenuto non è un numero valido (NaN), salviamo 0
  const finalPrice = isNaN(cleanPrice) ? 0 : cleanPrice;

  await prisma.dish.create({
    data: {
      name: data.name,
      price: finalPrice,
      description: data.description || null,
      category: {
        connect: { id: categoryId }
      }
    }
  });

  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function updateDish(id: string, menuId: string, data: { name?: string, price?: number, description?: string }) {
  await prisma.dish.update({
    where: { id },
    data
  });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function deleteDish(id: string, menuId: string) {
  await prisma.dish.delete({ where: { id } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}
