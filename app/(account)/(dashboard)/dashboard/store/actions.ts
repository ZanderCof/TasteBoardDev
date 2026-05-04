"use server"
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getMyStores() {
  const session = await auth();
  if (!session?.user?.id) return [];

  // Cerchiamo tutti i record nella tabella Restaurant legati a questo utente
  return await prisma.restaurant.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });
}
