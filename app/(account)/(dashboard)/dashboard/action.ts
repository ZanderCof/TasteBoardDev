"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getUserRestaurants() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.restaurant.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      type: true,
    }
  });
}
