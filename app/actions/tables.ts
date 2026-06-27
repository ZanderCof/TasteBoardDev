// app/actions/tables.ts
"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";

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

  const table = await prisma.table.create({
    data: {
      name: formData.name,
      minCapacity: formData.minCapacity,
      maxCapacity: formData.maxCapacity,
      restaurantId: formData.restaurantId,
    },
  });

  revalidatePath("/dashboard/tables");

  await logActivity({
    action: "table.create",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: formData.restaurantId,
    entityId: table.id,
    metadata: { name: table.name, minCapacity: table.minCapacity, maxCapacity: table.maxCapacity },
  });
}

type TableGroup = {
  quantity: number
  minCapacity: number
  maxCapacity: number
}

const MAX_QUANTITY_PER_GROUP = 300
const MAX_TABLES_PER_REQUEST = 500

export async function createTablesBulk(params: {
  restaurantId: string
  namePrefix: string
  startIndex: number
  groups: TableGroup[]
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Non autorizzato")

  const restaurant = await prisma.restaurant.findFirst({
    where: { id: params.restaurantId, userId: session.user.id },
  })
  if (!restaurant) throw new Error("Ristorante non trovato o non autorizzato")

  const namePrefix = params.namePrefix.trim() || "Tavolo"
  const groups = params.groups.filter((g) => g.quantity > 0)

  if (groups.length === 0) throw new Error("Aggiungi almeno un gruppo di tavoli.")

  for (const g of groups) {
    if (g.quantity > MAX_QUANTITY_PER_GROUP) {
      throw new Error(`Massimo ${MAX_QUANTITY_PER_GROUP} tavoli per gruppo.`)
    }
    if (g.minCapacity < 1 || g.maxCapacity < g.minCapacity) {
      throw new Error("Capienza minima/massima non valida.")
    }
  }

  const totalQuantity = groups.reduce((sum, g) => sum + g.quantity, 0)
  if (totalQuantity > MAX_TABLES_PER_REQUEST) {
    throw new Error(`Puoi creare al massimo ${MAX_TABLES_PER_REQUEST} tavoli per volta.`)
  }

  let counter = params.startIndex
  const data: {
    name: string
    minCapacity: number
    maxCapacity: number
    restaurantId: string
  }[] = []

  for (const g of groups) {
    for (let i = 0; i < g.quantity; i++) {
      data.push({
        name: `${namePrefix} ${counter}`,
        minCapacity: g.minCapacity,
        maxCapacity: g.maxCapacity,
        restaurantId: params.restaurantId,
      })
      counter++
    }
  }

  await prisma.table.createMany({ data })

  revalidatePath("/dashboard/tables")

  await logActivity({
    action: "table.bulk_create",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: params.restaurantId,
    metadata: { count: data.length, groups },
  })

  return { created: data.length }
}

export async function deleteTable(tableId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  // Elimina solo se il tavolo appartiene a un ristorante dell'utente loggato
  const existing = await prisma.table.findFirst({
    where: { id: tableId, restaurant: { userId: session.user.id } },
    select: { name: true, restaurantId: true },
  });

  const result = await prisma.table.deleteMany({
    where: {
      id: tableId,
      restaurant: { userId: session.user.id },
    },
  });

  revalidatePath("/dashboard/tables");

  if (result.count > 0 && existing) {
    await logActivity({
      action: "table.delete",
      userId: session.user.id,
      userEmail: session.user.email,
      restaurantId: existing.restaurantId,
      entityId: tableId,
      metadata: { name: existing.name },
    });
  }
}