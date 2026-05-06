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
  // Recuperiamo l'ultimo ordine per mettere la nuova categoria in fondo
  const lastCategory = await prisma.category.findFirst({
    where: { menuId },
    orderBy: { order: "desc" },
  });
  const newOrder = lastCategory ? lastCategory.order + 1 : 0;

  await prisma.category.create({
    data: { name, menuId, order: newOrder }
  });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

// AGGIUNTA: Necessaria per l'editing inline della categoria
export async function updateCategoryName(id: string, name: string, menuId: string) {
  await prisma.category.update({
    where: { id },
    data: { name }
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
    price: string | number; 
    description?: string 
  }
) {
  const cleanPrice = typeof data.price === "string" 
    ? parseFloat(data.price.replace(",", ".")) 
    : Number(data.price);

  const finalPrice = isNaN(cleanPrice) ? 0 : cleanPrice;

  await prisma.dish.create({
    data: {
      name: data.name,
      price: finalPrice,
      description: data.description || null,
      categoryId: categoryId // Più diretto dell'uso di connect
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
