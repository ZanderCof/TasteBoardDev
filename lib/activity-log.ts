import prisma from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import { syncActivityLogToHub } from "@/lib/hub-sync"

export type ActivityAction =
  | "auth.login"
  | "restaurant.create"
  | "restaurant.update"
  | "restaurant.delete"
  | "menu.create"
  | "menu.delete"
  | "menu.publish_toggle"
  | "dish.create"
  | "dish.update"
  | "dish.delete"
  | "dish.availability_toggle"
  | "table.create"
  | "table.bulk_create"
  | "table.delete"
  | "reservation.create"
  | "reservation.update"
  | "reservation.delete"
  | "reservation.confirm_arrival"

/**
 * Registra un evento per il monitoraggio della fase di beta-test.
 * Non deve mai far fallire l'azione chiamante: eventuali errori vengono
 * solo loggati in console.
 */
export async function logActivity(params: {
  action: ActivityAction
  userId?: string | null
  userEmail?: string | null
  restaurantId?: string | null
  entityId?: string | null
  metadata?: Record<string, unknown>
}) {
  try {
    const log = await prisma.activityLog.create({
      data: {
        action: params.action,
        userId: params.userId ?? null,
        userEmail: params.userEmail ?? null,
        restaurantId: params.restaurantId ?? null,
        entityId: params.entityId ?? null,
        metadata: (params.metadata as Prisma.InputJsonValue) ?? undefined,
      },
    })

    await syncActivityLogToHub({
      action: log.action,
      userId: log.userId,
      userEmail: log.userEmail,
      restaurantId: log.restaurantId,
      entityId: log.entityId,
      metadata: params.metadata,
      createdAt: log.createdAt.toISOString(),
    })
  } catch (error) {
    console.error("Errore registrazione activity log:", error)
  }
}
