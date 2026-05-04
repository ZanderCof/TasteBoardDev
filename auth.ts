import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const res = await fetch("http://localhost:3001/api/external/validate-tasteboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            secret: process.env.INTERNAL_API_SECRET,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Accesso negato");
        }
        return data.user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch("http://localhost:3001/api/external/validate-tasteboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              secret: process.env.INTERNAL_API_SECRET,
              isOAuth: true,
            }),
          });

          const data = await res.json();
          
          if (data.success) {
            user.hasBusiness = data.user.hasBusiness;
            user.businessName = data.user.businessName;
          }
          
          return data.success; 
        } catch (error) {
          console.error("Errore verifica Google su StartingLine", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // Al login iniziale
      if (user) {
        token.id = user.id as string;
        token.hasBusiness = (user as any).hasBusiness ?? false;
        token.businessName = (user as any).businessName;
      }

      // GESTIONE UPDATE: Questo aggiorna il cookie quando l'onboarding finisce
      if (trigger === "update" && session?.user) {
        token.hasBusiness = session.user.hasBusiness;
        token.businessName = session.user.businessName;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.hasBusiness = token.hasBusiness;
        session.user.businessName = token.businessName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
