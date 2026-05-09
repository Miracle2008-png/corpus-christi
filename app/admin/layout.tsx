import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminLayoutClient from "./admin-layout-client";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  // Double check admin role
  if ((session.user as any).role !== "admin") {
    redirect("/"); // Kick them out to home if not admin
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
