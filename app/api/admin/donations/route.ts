import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];
async function checkAdmin() { const s = await auth(); return s?.user?.email && ADMIN_EMAILS.includes(s.user.email); }

const DonationSchema = new mongoose.Schema({
  email: String, name: String, amount: Number, currency: { type: String, default: "NGN" },
  reference: String, status: { type: String, default: "success" }, channel: String,
}, { timestamps: true });
const Donation = mongoose.models.Donation || mongoose.model("Donation", DonationSchema);

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1"); const limit = 20;
  const [items, total, aggregate] = await Promise.all([
    Donation.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Donation.countDocuments(),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
  ]);
  return NextResponse.json({ items, total, pages: Math.ceil(total / limit), totalRevenue: aggregate[0]?.total ?? 0 });
}
