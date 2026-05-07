import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import MassSchedule from "@/models/MassSchedule";

async function checkAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  return role === "admin";
}

export async function GET(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const search = searchParams.get("search") || "";

  const query = search ? { parish_name: { $regex: search, $options: "i" } } : {};
  const total = await MassSchedule.countDocuments(query);
  const items = await MassSchedule.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ items, total, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const body = await req.json();
    const item = await MassSchedule.create(body);
    return NextResponse.json(item);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}

export async function PUT(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const body = await req.json();
    const { _id, ...update } = body;
    const item = await MassSchedule.findByIdAndUpdate(_id, update, { new: true });
    return NextResponse.json(item);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const { _id } = await req.json();
    await MassSchedule.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
