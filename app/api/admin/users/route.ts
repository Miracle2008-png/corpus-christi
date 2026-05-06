import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
}

export async function GET(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;
  const query = search ? { $or: [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }] } : {};
  const [users, total] = await Promise.all([
    User.find(query).select("-password_hash").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(query),
  ]);
  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) });
}

export async function PUT(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { userId, action } = await req.json();
  if (action === "ban") await User.findByIdAndUpdate(userId, { isBanned: true });
  if (action === "unban") await User.findByIdAndUpdate(userId, { isBanned: false });
  if (action === "makeAdmin") await User.findByIdAndUpdate(userId, { role: "admin" });
  if (action === "removeAdmin") await User.findByIdAndUpdate(userId, { role: "user" });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { userId } = await req.json();
  await User.findByIdAndDelete(userId);
  return NextResponse.json({ success: true });
}
