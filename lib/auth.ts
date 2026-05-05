import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email }).select("+password_hash");
          if (!user) return null;
          const isValid = await user.comparePassword(credentials.password as string);
          if (!isValid) return null;
          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "apple") {
        try {
          await connectDB();
          const userEmail = user.email ?? "";
          if (!userEmail) return false;
          let dbUser = await User.findOne({ email: userEmail });
          if (!dbUser) {
            // Create a new user for OAuth
            dbUser = await User.create({
              name: user.name || "User",
              email: userEmail,
              role: "user",
              authProvider: account.provider,
            });
          } else {
            await User.findByIdAndUpdate(dbUser._id, { lastLogin: new Date() });
          }
          user.id = dbUser._id.toString();
          (user as any).role = dbUser.role;
          return true;
        } catch (error) {
          console.error("OAuth SignIn Error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" as const },
});
