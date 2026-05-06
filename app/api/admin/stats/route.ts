import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Intention from "@/models/Intention";
import Donation from "@/models/Donation";

export async function GET() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const totalUsers = await User.countDocuments();
  const totalIntentions = await Intention.countDocuments();
  const donations = await Donation.find({ status: "success" });
  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDonations = donations.length;

  const recentDonations = await Donation.find({ status: "success" }).sort({ createdAt: -1 }).limit(5).lean();
  const recentIntentions = await Intention.find().sort({ created_at: -1 }).limit(5).lean();

  return NextResponse.json({
    totalUsers,
    totalIntentions,
    totalDonationAmount,
    totalDonations,
    recentDonations,
    recentIntentions,
  });
}
