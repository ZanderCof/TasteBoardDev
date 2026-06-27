"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { logError } from "@/lib/logger";

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

  const MAX_LOGO_BASE64_SIZE = 4 * 1024 * 1024; // ~3MB di file originale
  if (data.logo && data.logo.length > MAX_LOGO_BASE64_SIZE) {
    return { success: false, error: "Il logo è troppo grande (max 3MB)." };
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
      await fetch(`${process.env.STARTINGLINE_HUB_URL}/api/external/update-business`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          businessName: data.businessName,
          secret: process.env.INTERNAL_API_SECRET,
        }),
      });
    } catch (e) {
      await logError("tasteboard-onboarding", "Hub non raggiungibile durante la sincronizzazione del locale", e, { userId });
    }

    revalidatePath("/dashboard");
    return { success: true };

  } catch (error) {
    await logError("tasteboard-onboarding", "Errore creazione locale in onboarding", error, { userId });
    return { success: false, error: "Errore durante la creazione." };
  }
}
