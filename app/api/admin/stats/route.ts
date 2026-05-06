import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const [totalUsers, newUsersThisWeek] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: weekAgo } }),
    ]);
    return NextResponse.json({
      totalUsers,
      newUsersThisWeek,
      totalDonations: 0,
      totalRevenue: 0,
      totalReadings: 0,
      totalIntentions: 0,
      pendingIntentions: 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
