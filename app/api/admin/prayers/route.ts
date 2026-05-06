import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];
async function checkAdmin() { const s = await auth(); return s?.user?.email && ADMIN_EMAILS.includes(s.user.email); }

const PrayerSchema = new mongoose.Schema({ title: String, category: String, text: String, origin: String, tags: [String] }, { timestamps: true });
const Prayer = mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1"); const search = searchParams.get("search") ?? ""; const limit = 20;
  const query = search ? { $or: [{ title: new RegExp(search, "i") }, { category: new RegExp(search, "i") }] } : {};
  const [items, total] = await Promise.all([Prayer.find(query).sort({ title: 1 }).skip((page - 1) * limit).limit(limit), Prayer.countDocuments(query)]);
  return NextResponse.json({ items, total, pages: Math.ceil(total / limit) });
}
export async function POST(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); return NextResponse.json(await Prayer.create(await req.json()), { status: 201 });
}
export async function PUT(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id, ...data } = await req.json();
  return NextResponse.json(await Prayer.findByIdAndUpdate(_id, data, { new: true }));
}
export async function DELETE(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id } = await req.json(); await Prayer.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
}
