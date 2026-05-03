import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Saint from "@/models/Saint";
import saintsData from "@/data/saints.json";

// GET /api/saints/[id] — single saint by slug or ID
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const saint = await Saint.findOne({
      $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    }).lean();
    if (!saint) return NextResponse.json({ error: "Saint not found" }, { status: 404 });
    return NextResponse.json(saint);
  } catch {
    // Offline fallback
    const saint = saintsData.find((s) => s.slug === id);
    if (!saint) return NextResponse.json({ error: "Saint not found" }, { status: 404 });
    return NextResponse.json({ ...saint, offline: true });
  }
}

// PUT /api/saints/[id] — update (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const saint = await Saint.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!saint) return NextResponse.json({ error: "Saint not found" }, { status: 404 });
    return NextResponse.json(saint);
  } catch (err) {
    return NextResponse.json({ error: "Update failed", details: String(err) }, { status: 500 });
  }
}

// DELETE /api/saints/[id] — delete (admin only)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    await Saint.findByIdAndDelete(id);
    return NextResponse.json({ message: "Saint deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed", details: String(err) }, { status: 500 });
  }
}
