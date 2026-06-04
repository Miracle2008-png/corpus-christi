import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const providers: any[] = [
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
];

// Only register Google if credentials are configured
if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== "REPLACE_WITH_GOOGLE_CLIENT_ID" &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_SECRET !== "REPLACE_WITH_GOOGLE_CLIENT_SECRET"
) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "apple") {
        try {
          await connectDB();
          const userEmail = user.email ?? "";
          if (!userEmail) return true; // Allow sign-in, email check will catch it
          let dbUser = await User.findOne({ email: userEmail });
          if (!dbUser) {
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
        } catch (error) {
          // Log but NEVER block the sign-in — the session callback handles admin check
          console.error("OAuth DB sync error (non-fatal):", error);
        }
        return true; // Always allow Google sign-in
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
      
      // Hardcoded override to guarantee admin access immediately
      if (
        session?.user?.email === "miraclechimdindu2008@gmail.com" || 
        session?.user?.email === "miraclechimdindu2025@gmail.com"
      ) {
        (session.user as any).role = "admin";
      }
      
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" as const, maxAge: 24 * 60 * 60 },
});
