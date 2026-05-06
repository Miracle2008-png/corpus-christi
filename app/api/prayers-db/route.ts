import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Public endpoint — returns admin-added prayers for the prayers page
const PrayerSchema = new mongoose.Schema({ title: String, latin: String, category: String, text: String, source: String, note: String }, { timestamps: true });
const Prayer = mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);

export async function GET() {
  try {
    await connectDB();
    const prayers = await Prayer.find({}).sort({ category: 1, title: 1 }).lean();
    return NextResponse.json({ prayers });
  } catch {
    return NextResponse.json({ prayers: [] });
  }
}
