"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity-log";

export async function toggleMenuStatus(menuId: string, currentStatus: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const menu = await prisma.menu.update({
    where: {
      id: menuId,
      // Sicurezza: aggiorna solo se il ristorante del menu appartiene all'utente
      restaurant: { userId: session.user.id }
    },
    data: { isPublished: !currentStatus },
  });

  revalidatePath("/dashboard/menu");

  await logActivity({
    action: "menu.publish_toggle",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: menu.restaurantId,
    entityId: menuId,
    metadata: { isPublished: menu.isPublished },
  });
}

export async function toggleDishAvailability(dishId: string, available: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const dish = await prisma.dish.findFirst({
    where: {
      id: dishId,
      category: { menu: { restaurant: { userId: session.user.id } } },
    },
    select: { id: true, name: true, category: { select: { menu: { select: { restaurantId: true } } } } },
  });
  if (!dish) throw new Error("Non autorizzato");

  await prisma.dish.update({ where: { id: dishId }, data: { available } });

  // Revalida sia la pagina di disponibilità che l'editor del menu
  revalidatePath(`/dashboard/menu`, "layout");

  await logActivity({
    action: "dish.availability_toggle",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: dish.category.menu.restaurantId,
    entityId: dishId,
    metadata: { name: dish.name, available },
  });
}

/**
 * Rende tutti i piatti di un menu disponibili in un colpo solo.
 * Utile a inizio servizio / giorno successivo.
 */
export async function resetAllDishAvailability(menuId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const menu = await prisma.menu.findFirst({
    where: { id: menuId, restaurant: { userId: session.user.id } },
    select: { id: true },
  });
  if (!menu) throw new Error("Non autorizzato");

  await prisma.dish.updateMany({
    where: { category: { menuId } },
    data: { available: true },
  });
  revalidatePath(`/dashboard/menu`, "layout");
}
