"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/activity-log";

async function requireMenuOwnership(menuId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const menu = await prisma.menu.findFirst({
    where: { id: menuId, restaurant: { userId: session.user.id } },
    select: { id: true, restaurantId: true },
  });
  if (!menu) throw new Error("Non autorizzato");

  return { userId: session.user.id, userEmail: session.user.email, restaurantId: menu.restaurantId };
}

/* --- MENU --- */
export async function getFullMenu(menuId: string) {
  if (!menuId) return null;

  const session = await auth();
  if (!session?.user?.id) return null;

  return await prisma.menu.findFirst({
    where: { id: menuId, restaurant: { userId: session.user.id } },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: { dishes: { orderBy: { id: "asc" } } },
      },
    },
  });
}

export async function updateMenuName(menuId: string, name: string) {
  await requireMenuOwnership(menuId);
  await prisma.menu.update({ where: { id: menuId }, data: { name } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function deleteMenu(menuId: string) {
  const { userId, userEmail, restaurantId } = await requireMenuOwnership(menuId);
  const menu = await prisma.menu.delete({ where: { id: menuId } });
  revalidatePath("/dashboard/menu");
  await logActivity({
    action: "menu.delete",
    userId,
    userEmail,
    restaurantId,
    entityId: menuId,
    metadata: { name: menu.name },
  });
  redirect("/dashboard/menu");
}

/* --- CATEGORIE --- */
export async function addCategory(menuId: string, name: string) {
  await requireMenuOwnership(menuId);

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
  await requireMenuOwnership(menuId);
  await prisma.category.update({
    where: { id, menuId },
    data: { name }
  });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

export async function deleteCategory(id: string, menuId: string) {
  await requireMenuOwnership(menuId);
  await prisma.category.delete({ where: { id, menuId } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
}

/* --- PIATTI --- */
export async function addDish(
  categoryId: string,
  menuId: string,
  data: {
    name: string;
    price: string | number;
    description?: string;
    allergens?: string[];
  }
) {
  const { userId, userEmail, restaurantId } = await requireMenuOwnership(menuId);

  const category = await prisma.category.findFirst({ where: { id: categoryId, menuId } });
  if (!category) throw new Error("Categoria non valida");

  const cleanPrice = typeof data.price === "string"
    ? parseFloat(data.price.replace(",", "."))
    : Number(data.price);

  const finalPrice = isNaN(cleanPrice) ? 0 : cleanPrice;

  const dish = await prisma.dish.create({
    data: {
      name: data.name,
      price: finalPrice,
      description: data.description || null,
      allergens: data.allergens ?? [],
      categoryId: categoryId,
    }
  });

  revalidatePath(`/dashboard/menu/${menuId}/edit`);
  await logActivity({
    action: "dish.create",
    userId,
    userEmail,
    restaurantId,
    entityId: dish.id,
    metadata: { name: dish.name, price: finalPrice },
  });
}

export async function updateDish(id: string, menuId: string, data: { name?: string; price?: number; description?: string; allergens?: string[] }) {
  const { userId, userEmail, restaurantId } = await requireMenuOwnership(menuId);
  await prisma.dish.update({
    where: { id, category: { menuId } },
    data
  });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
  await logActivity({
    action: "dish.update",
    userId,
    userEmail,
    restaurantId,
    entityId: id,
    metadata: data,
  });
}

export async function deleteDish(id: string, menuId: string) {
  const { userId, userEmail, restaurantId } = await requireMenuOwnership(menuId);
  const dish = await prisma.dish.delete({ where: { id, category: { menuId } } });
  revalidatePath(`/dashboard/menu/${menuId}/edit`);
  await logActivity({
    action: "dish.delete",
    userId,
    userEmail,
    restaurantId,
    entityId: id,
    metadata: { name: dish.name },
  });
}
