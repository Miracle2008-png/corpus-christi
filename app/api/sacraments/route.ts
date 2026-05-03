import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Sacrament from "@/models/Sacrament";
import sacramentsData from "@/data/sacraments.json";

export async function GET() {
  try {
    await connectDB();
    const sacraments = await Sacrament.find().sort({ number: 1 }).lean();
    return NextResponse.json({ sacraments });
  } catch {
    return NextResponse.json({ sacraments: sacramentsData, offline: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const sacrament = await Sacrament.create(body);
    return NextResponse.json(sacrament, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
