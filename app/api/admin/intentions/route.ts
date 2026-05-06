import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Intention from "@/models/Intention";

async function checkAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "admin") return null;
  return session;
}

// GET — fetch all intentions with pagination
export async function GET(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const total = await Intention.countDocuments();
  const intentions = await Intention.find()
    .sort({ created_at: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ intentions, total, page, totalPages: Math.ceil(total / limit) });
}

// DELETE — delete an intention
export async function DELETE(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await Intention.findByIdAndDelete(id);
  return NextResponse.json({ message: "Intention deleted" });
}
