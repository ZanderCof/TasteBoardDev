"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Definiamo il tipo dell'oggetto che arriva dal client
interface OnboardingData {
  businessName: string;
  address: string;
  type: string;
  logo: string;
}

export async function saveBusinessAction(userId: string, data: OnboardingData) {
  const session = await auth();
  
  if (!session?.user?.id || session.user.id !== userId) {
    return { success: false, error: "Non autorizzato" };
  }

  if (!data.businessName) {
    return { success: false, error: "Il nome del locale è obbligatorio." };
  }

  try {
    // 1. SALVATAGGIO SU TASTEBOARD
    const newRestaurant = await prisma.restaurant.create({
      data: {
        userId: userId,
        name: data.businessName,
        address: data.address || null,
        type: data.type || null,
        logo: data.logo || null, // Se vuoi salvare il base64
        menus: {
          create: {
            name: "Menu Principale",
            isPublished: true,
            categories: {
              create: { 
                name: "Antipasti",
                order: 0
              }
            }
          }
        }
      },
    });

    // 2. Sincronizzazione Hub (StartingLine)
    try {
      await fetch("http://localhost:3001/api/external/update-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          businessName: data.businessName,
          secret: process.env.INTERNAL_API_SECRET,
        }),
      });
    } catch (e) {
      console.error("Hub non raggiungibile");
    }

    revalidatePath("/dashboard");
    return { success: true };
    
  } catch (error) {
    console.error("Errore Prisma:", error);
    return { success: false, error: "Errore durante la creazione." };
  }
}
