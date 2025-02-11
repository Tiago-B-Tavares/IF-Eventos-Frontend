// @types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      role?: string; 
      googleId?: string
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }

  interface Token {
    id: string;
    role?: string;
  }
}
