import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
}

// Minimal Reading schema if model doesn't exist
const ReadingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  season: String,
  firstReading: { title: String, reference: String, text: String },
  psalm: { reference: String, text: String },
  secondReading: { title: String, reference: String, text: String },
  gospel: { title: String, reference: String, text: String },
}, { timestamps: true });

const Reading = mongoose.models.Reading || mongoose.model("Reading", ReadingSchema);

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const limit = 20;
  const query = search ? { $or: [{ date: new RegExp(search, "i") }, { season: new RegExp(search, "i") }] } : {};
  const [items, total] = await Promise.all([
    Reading.find(query).sort({ date: -1 }).skip((page - 1) * limit).limit(limit),
    Reading.countDocuments(query),
  ]);
  return NextResponse.json({ items, total, pages: Math.ceil(total / limit) });
}

export async function POST(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const item = await Reading.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { _id, ...data } = await req.json();
  const item = await Reading.findByIdAndUpdate(_id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { _id } = await req.json();
  await Reading.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
}
