"use server";

import { auth } from "@/auth";
import { markNuviioNotificationRead } from "@/lib/nuviio-notifications";

export async function markNotificationRead(notificationId: string) {
  const session = await auth();
  if (!session?.user?.email) return;
  await markNuviioNotificationRead(session.user.email, notificationId);
}

export async function markAllNotificationsRead(notificationIds: string[]) {
  const session = await auth();
  if (!session?.user?.email || notificationIds.length === 0) return;
  await Promise.all(
    notificationIds.map((id) =>
      markNuviioNotificationRead(session.user!.email!, id)
    )
  );
}
