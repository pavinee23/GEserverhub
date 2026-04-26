import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  useSecureCookies: false,
  debug: process.env.NODE_ENV === "development",
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: false },
    },
    csrfToken: {
      name: "authjs.csrf-token",
      options: { httpOnly: false, sameSite: "lax", path: "/", secure: false },
    },
    callbackUrl: {
      name: "authjs.callback-url",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: false },
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const identifier = credentials.email.trim();
        console.log("[auth] authorize attempt:", identifier);

        try {
          // Search by email, username, or name
          const user =
            (await prisma.user.findUnique({ where: { email: identifier } })) ??
            (await prisma.user.findUnique({ where: { username: identifier } })) ??
            (await prisma.user.findFirst({ where: { name: identifier } }));

          console.log("[auth] user found:", user ? `${user.email} role=${user.role}` : "null");

          if (!user || !user.password) return null;

          const valid = await bcrypt.compare(credentials.password, user.password);
          console.log("[auth] password valid:", valid);
          if (!valid) return null;

          return { id: user.id, email: user.email, name: user.name, role: user.role };
        } catch (err) {
          console.error("[auth] authorize error:", err.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
