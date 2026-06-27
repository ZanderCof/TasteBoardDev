// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const res = await fetch(`${process.env.STARTINGLINE_HUB_URL}/api/external/validate-tasteboard`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            secret: process.env.INTERNAL_API_SECRET,
          }),
        });

        const data = await res.json();
        console.log("Dati ricevuti da StartingLine:", data);
        if (res.ok && data.success) return data.user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding");

      if (isDashboard || isOnboarding) {
        if (isLoggedIn) return true;
        return false; // Redirect a login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
