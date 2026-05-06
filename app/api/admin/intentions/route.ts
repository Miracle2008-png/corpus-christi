import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];
async function checkAdmin() { const s = await auth(); return s?.user?.email && ADMIN_EMAILS.includes(s.user.email); }

const IntentionSchema = new mongoose.Schema({ name: String, email: String, intention: String, isPublic: Boolean, isFeatured: Boolean, isAnswered: Boolean, prayCount: { type: Number, default: 0 } }, { timestamps: true });
const Intention = mongoose.models.Intention || mongoose.model("Intention", IntentionSchema);

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1"); const filter = searchParams.get("filter") ?? ""; const limit = 20;
  const query: Record<string, unknown> = {};
  if (filter === "featured") query.isFeatured = true;
  if (filter === "answered") query.isAnswered = true;
  const [items, total] = await Promise.all([Intention.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Intention.countDocuments(query)]);
  return NextResponse.json({ items, total, pages: Math.ceil(total / limit) });
}
export async function PUT(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id, action } = await req.json();
  const updates: Record<string, unknown> = {};
  if (action === "feature") updates.isFeatured = true;
  if (action === "unfeature") updates.isFeatured = false;
  if (action === "markAnswered") updates.isAnswered = true;
  await Intention.findByIdAndUpdate(_id, updates);
  return NextResponse.json({ success: true });
}
export async function DELETE(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id } = await req.json(); await Intention.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
}
