"use server";
// Aggiungilo nel tuo file action.ts delle prenotazioni
// app/(account)/(dashboard)/dashboard/bookings/action.ts

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const SLOT_WINDOW_MS = 2 * 60 * 60 * 1000; // finestra di 2 ore

/**
 * Restituisce gli ID dei tavoli occupati per uno specifico slot orario.
 * Un tavolo è considerato occupato se esiste una prenotazione attiva
 * (non CANCELLED né DECLINED) entro ±2 ore dall'orario richiesto.
 *
 * Questo corregge il bug in cui un tavolo prenotato alle 20:00
 * risultava occupato anche per prenotazioni alle 23:00.
 */
export async function getOccupiedTablesForSlot(
  restaurantId: string,
  date: string, // "yyyy-MM-dd"
  time: string  // "HH:mm"
): Promise<string[]> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  // Sicurezza: il locale deve appartenere all'utente loggato
  const restaurant = await prisma.restaurant.findFirst({
    where: { id: restaurantId, userId: session.user.id },
    select: { id: true },
  });
  if (!restaurant) throw new Error("Non autorizzato");

  // Costruisce il DateTime dell'orario richiesto
  // Usa il fuso orario locale del server (stesso approccio usato per le chiavi)
  const requestedDateTime = new Date(`${date}T${time}:00`);

  const windowStart = new Date(requestedDateTime.getTime() - SLOT_WINDOW_MS);
  const windowEnd   = new Date(requestedDateTime.getTime() + SLOT_WINDOW_MS);

  const reservations = await prisma.reservation.findMany({
    where: {
      restaurantId,
      status: { notIn: ["CANCELLED", "DECLINED"] },
      date: { gte: windowStart, lte: windowEnd },
      tableId: { not: null }, // solo le prenotazioni con tavolo assegnato
    },
    select: { tableId: true },
  });

  return reservations
    .map((r) => r.tableId)
    .filter((id): id is string => id !== null);
}

/**
 * Restituisce i tavoli disponibili per uno slot, filtrati per capienza.
 * Usata dal TableAvailabilityChecker del dashboard.
 */
export async function getAvailableTablesForSlot(
  restaurantId: string,
  date: string,
  time: string,
  guests: number
) {
  const [allTables, occupiedIds] = await Promise.all([
    prisma.table.findMany({
      where: { restaurantId },
      orderBy: { name: "asc" },
      select: { id: true, name: true, minCapacity: true, maxCapacity: true },
    }),
    getOccupiedTablesForSlot(restaurantId, date, time),
  ]);

  return allTables.map((table) => ({
    ...table,
    occupied: occupiedIds.includes(table.id),
    fits: guests >= table.minCapacity && guests <= table.maxCapacity,
  }));
}