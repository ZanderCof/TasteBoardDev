// app/actions/bookings.ts
"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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

const finalDateTime = new Date(`${formData.date}T${formData.time}:00`);

  await prisma.reservation.create({
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

  await prisma.reservation.update({
    where: { id },
    data: {
      customerName: formData.customerName,
      phone: formData.phone,
      date: finalDateTime,
      guests: formData.guests,
      tableId: formData.tableId,
      notes: formData.notes || null,
    },
  });

  revalidatePath("/dashboard/bookings");
}

// 🗑️ ELIMINA PRENOTAZIONE
export async function deleteReservation(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  await prisma.reservation.delete({
    where: { id },
  });

  revalidatePath("/dashboard/bookings");
}

// ✅ CONFERMA ARRIVO — rimuove la prenotazione e libera il tavolo
export async function confirmArrival(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  await prisma.reservation.delete({
    where: { id },
  });

  revalidatePath("/dashboard/bookings");
}

// 🗂️ ARCHIVIA PRENOTAZIONE — usato dal cron notturno per le prenotazioni scadute
export async function archiveReservation(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  await prisma.reservation.update({
    where: { id },
    data: { status: "COMPLETED" as any },
  });

  revalidatePath("/dashboard/bookings");
}