import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];
async function checkAdmin() { const s = await auth(); return s?.user?.email && ADMIN_EMAILS.includes(s.user.email); }

const PopeSchema = new mongoose.Schema({ name: String, number: String, startYear: Number, endYear: Number, nationality: String, bornYear: Number, description: String, image: String, slug: String, isCurrent: Boolean }, { timestamps: true });
const Pope = mongoose.models.Pope || mongoose.model("Pope", PopeSchema);

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1"); const search = searchParams.get("search") ?? ""; const limit = 20;
  const query = search ? { name: new RegExp(search, "i") } : {};
  const [items, total] = await Promise.all([Pope.find(query).sort({ startYear: -1 }).skip((page - 1) * limit).limit(limit), Pope.countDocuments(query)]);
  return NextResponse.json({ items, total, pages: Math.ceil(total / limit) });
}
export async function POST(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const body = await req.json();
  if (!body.slug && body.name) body.slug = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return NextResponse.json(await Pope.create(body), { status: 201 });
}
export async function PUT(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id, ...data } = await req.json();
  return NextResponse.json(await Pope.findByIdAndUpdate(_id, data, { new: true }));
}
export async function DELETE(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const { _id } = await req.json(); await Pope.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
}
