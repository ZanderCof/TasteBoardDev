"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function markNotificationRead(notificationId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.notificationRead.upsert({
    where: {
      userId_notificationId: {
        userId: session.user.id,
        notificationId,
      },
    },
    create: { userId: session.user.id, notificationId },
    update: {},
  });
}

export async function markAllNotificationsRead(notificationIds: string[]) {
  const session = await auth();
  if (!session?.user?.id || notificationIds.length === 0) return;

  await prisma.notificationRead.createMany({
    data: notificationIds.map((notificationId) => ({
      userId: session.user.id!,
      notificationId,
    })),
    skipDuplicates: true,
  });
}
