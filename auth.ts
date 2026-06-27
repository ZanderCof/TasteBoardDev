// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/activity-log";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
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
