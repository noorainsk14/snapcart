import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    mobile?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      mobile?: string | null;
      createdAt?: Date | string;
      updatedAt?: Date | string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    name?: string | null;
    email?: string | null;
    mobile?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }
}

export {};
