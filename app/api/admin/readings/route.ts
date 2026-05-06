import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reading from "@/models/Reading";

async function checkAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "admin") {
    return null;
  }
  return session;
}

// GET — fetch all readings (paginated) or a single reading by ID
export async function GET(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const reading = await Reading.findById(id);
    if (!reading) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(reading);
  }

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  const filter: any = {};
  if (search) {
    filter.$or = [
      { date: { $regex: search, $options: "i" } },
      { liturgical_season: { $regex: search, $options: "i" } },
      { "gospel.reference": { $regex: search, $options: "i" } },
    ];
  }

  const total = await Reading.countDocuments(filter);
  const readings = await Reading.find(filter)
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ readings, total, page, totalPages: Math.ceil(total / limit) });
}

// POST — create a new reading
export async function POST(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  try {
    const reading = await Reading.create(body);
    return NextResponse.json({ message: "Reading created", reading }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// PUT — update an existing reading
export async function PUT(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const reading = await Reading.findByIdAndUpdate(id, updates, { new: true });
  if (!reading) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ message: "Reading updated", reading });
}

// DELETE — delete a reading
export async function DELETE(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await Reading.findByIdAndDelete(id);
  return NextResponse.json({ message: "Reading deleted" });
}
