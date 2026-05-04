import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      hasBusiness: boolean
      businessName?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    hasBusiness?: boolean
    businessName?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    hasBusiness: boolean
    businessName?: string | null
  }
}
