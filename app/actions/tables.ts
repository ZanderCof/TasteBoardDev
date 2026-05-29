// app/actions/tables.ts
"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createTable(formData: {
  name: string;
  minCapacity: number;
  maxCapacity: number;
  restaurantId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  // Controllo di sicurezza: il ristorante appartiene davvero a questo utente?
  const restaurant = await prisma.restaurant.findFirst({
    where: { id: formData.restaurantId, userId: session.user.id },
  });

  if (!restaurant) throw new Error("Ristorante non trovato o non autorizzato");

  await prisma.table.create({
    data: {
      name: formData.name,
      minCapacity: formData.minCapacity,
      maxCapacity: formData.maxCapacity,
      restaurantId: formData.restaurantId,
    },
  });

  revalidatePath("/dashboard/tables");
}

export async function deleteTable(tableId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  // Elimina solo se il tavolo appartiene a un ristorante dell'utente loggato
  await prisma.table.deleteMany({
    where: {
      id: tableId,
      restaurant: { userId: session.user.id },
    },
  });

  revalidatePath("/dashboard/tables");
}