"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { syncFeedbackToHub } from "@/lib/hub-sync";
import { logError } from "@/lib/logger";

export async function submitFeedback(data: {
  rating: number;
  bug?: string;
  suggestion?: string;
}) {
  const session = await auth();

  if (data.rating < 1 || data.rating > 5) {
    return { success: false, error: "Valutazione non valida." };
  }

  try {
    await prisma.feedback.create({
      data: {
        userId: session?.user?.id ?? null,
        rating: data.rating,
        bug: data.bug || null,
        suggestion: data.suggestion || null,
      },
    });

    const comment = [data.bug, data.suggestion].filter(Boolean).join("\n\n");
    if (comment) {
      await syncFeedbackToHub({
        email: session?.user?.email,
        authorName: session?.user?.name,
        rating: data.rating,
        comment,
      });
    }

    return { success: true };
  } catch (error) {
    await logError("tasteboard-feedback", "Errore salvataggio feedback", error);
    return { success: false, error: "Errore durante l'invio del feedback." };
  }
}
