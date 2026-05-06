"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function toggleMenuStatus(menuId: string, currentStatus: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorizzato");

  await prisma.menu.update({
    where: { 
      id: menuId,
      // Sicurezza: aggiorna solo se il ristorante del menu appartiene all'utente
      restaurant: { userId: session.user.id } 
    },
    data: { isPublished: !currentStatus },
  });

  revalidatePath("/dashboard/menu");
}
