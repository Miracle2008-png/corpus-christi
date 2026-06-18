import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Public endpoint — returns admin-added prayers for the prayers page
const PrayerSchema = new mongoose.Schema({ title: String, latin_text: String, category: String, english_text: String, occasion: String, explanation: String }, { timestamps: true, strict: false });
const Prayer = mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);

export async function GET() {
  try {
    await connectDB();
    const dbPrayers = await Prayer.find({}).sort({ category: 1, title: 1 }).lean();
    
    // Map db schema to client schema
    const prayers = dbPrayers.map((p: any) => ({
      title: p.title,
      latin: p.latin_text,
      category: p.category || "Catholic Treasury",
      text: p.english_text || p.text,
      note: p.explanation || p.note,
      source: p.occasion || p.source,
    }));

    return NextResponse.json({ prayers });
  } catch {
    return NextResponse.json({ prayers: [] });
  }
}
