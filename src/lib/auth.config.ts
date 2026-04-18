import type { NextAuthConfig } from "next-auth";

/** Edge-safe auth config — NO Prisma, NO bcrypt */
const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role as string | undefined;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl));
        if (role !== "ADMIN" && role !== "SUPER_ADMIN")
          return Response.redirect(new URL("/", nextUrl));
      }

      if (pathname.startsWith("/portal")) {
        if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
  },
};

export default authConfig;
