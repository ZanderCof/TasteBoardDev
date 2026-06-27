// app/actions/bookings.ts
"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-log";

// ➕ CREA PRENOTAZIONE
export async function createManualReservation(formData: {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  notes?: string;
  restaurantId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  // Sicurezza: il ristorante della prenotazione deve appartenere all'utente loggato
  const restaurant = await prisma.restaurant.findFirst({
    where: { id: formData.restaurantId, userId: session.user.id },
    select: { id: true },
  });
  if (!restaurant) throw new Error("Non autorizzato");

const finalDateTime = new Date(`${formData.date}T${formData.time}:00`);

  const reservation = await prisma.reservation.create({
    data: {
      customerName: formData.customerName,
      phone: formData.phone,
      date: finalDateTime,
      guests: formData.guests,
      notes: formData.notes || null,
      status: "CONFIRMED",
      isManual: true,
      restaurantId: formData.restaurantId,
      tableId: formData.tableId,
    },
  });

  revalidatePath("/dashboard/bookings");

  await logActivity({
    action: "reservation.create",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: formData.restaurantId,
    entityId: reservation.id,
    metadata: { customerName: formData.customerName, guests: formData.guests, date: finalDateTime.toISOString() },
  });
}

// ✏️ MODIFICA PRENOTAZIONE
export async function updateReservation(
  id: string,
  formData: {
    customerName: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    tableId: string;
    notes?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

const finalDateTime = new Date(`${formData.date}T${formData.time}:00`);

  const existing = await prisma.reservation.findFirst({
    where: { id, restaurant: { userId: session.user.id } },
    select: { restaurantId: true },
  });

  const result = await prisma.reservation.updateMany({
    // Sicurezza: aggiorna solo se la prenotazione appartiene a un locale dell'utente
    where: { id, restaurant: { userId: session.user.id } },
    data: {
      customerName: formData.customerName,
      phone: formData.phone,
      date: finalDateTime,
      guests: formData.guests,
      tableId: formData.tableId,
      notes: formData.notes || null,
    },
  });
  if (result.count === 0) throw new Error("Non autorizzato");

  revalidatePath("/dashboard/bookings");

  await logActivity({
    action: "reservation.update",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: existing?.restaurantId,
    entityId: id,
    metadata: { customerName: formData.customerName, guests: formData.guests },
  });
}

// 🗑️ ELIMINA PRENOTAZIONE
export async function deleteReservation(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const existing = await prisma.reservation.findFirst({
    where: { id, restaurant: { userId: session.user.id } },
    select: { restaurantId: true, customerName: true },
  });

  const result = await prisma.reservation.deleteMany({
    // Sicurezza: elimina solo se la prenotazione appartiene a un locale dell'utente
    where: { id, restaurant: { userId: session.user.id } },
  });
  if (result.count === 0) throw new Error("Non autorizzato");

  revalidatePath("/dashboard/bookings");

  await logActivity({
    action: "reservation.delete",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: existing?.restaurantId,
    entityId: id,
    metadata: { customerName: existing?.customerName },
  });
}

// ✅ CONFERMA ARRIVO — rimuove la prenotazione e libera il tavolo
export async function confirmArrival(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  const existing = await prisma.reservation.findFirst({
    where: { id, restaurant: { userId: session.user.id } },
    select: { restaurantId: true, customerName: true },
  });

  const result = await prisma.reservation.deleteMany({
    where: { id, restaurant: { userId: session.user.id } },
  });
  if (result.count === 0) throw new Error("Non autorizzato");

  revalidatePath("/dashboard/bookings");

  await logActivity({
    action: "reservation.confirm_arrival",
    userId: session.user.id,
    userEmail: session.user.email,
    restaurantId: existing?.restaurantId,
    entityId: id,
    metadata: { customerName: existing?.customerName },
  });
}
