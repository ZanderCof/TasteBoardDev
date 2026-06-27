// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/activity-log";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      // Il provider Credentials valida già su Nuviio dentro authorize().
      // Per Google dobbiamo farlo qui: Google prova solo l'identità,
      // ma l'autorizzazione (abbonamento TasteBoard attivo) resta su Nuviio.
      if (account?.provider !== "google") return true;
      if (!user.email) return false;

      try {
        const res = await fetch(`${process.env.NUVIIO_HUB_URL}/api/external/validate-tasteboard-google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            secret: process.env.INTERNAL_API_SECRET,
          }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) return false;

        // Sovrascriviamo l'id (altrimenti Auth.js ne genera uno random ad ogni
        // login senza adapter) con quello canonico di Nuviio, così la lookup
        // del ristorante resta coerente sia che l'utente entri con Google
        // sia che entri con email/password.
        user.id = data.user.id;
        return true;
      } catch (error) {
        console.warn("Errore di rete nella validazione Google su Nuviio:", error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        await logActivity({
          action: "auth.login",
          userId: user.id as string,
          userEmail: user.email,
        });
      }

      // Controllo database locale (Node.js runtime)
      if (token.id) {
        const restaurant = await prisma.restaurant.findFirst({
          where: { userId: token.id as string },
          select: { id: true, name: true }
        });
        token.hasBusiness = !!restaurant;
        token.businessName = restaurant?.name || null;
      }

      if (trigger === "update" && session?.user) {
        token.hasBusiness = session.user.hasBusiness;
        token.businessName = session.user.businessName;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.hasBusiness = !!token.hasBusiness;
        session.user.businessName = token.businessName as string;
      }
      return session;
    },
  },
});
