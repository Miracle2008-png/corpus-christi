import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Station from "@/models/Station";
import stationsData from "@/data/stations.json";

export async function GET() {
  try {
    await connectDB();
    const stations = await Station.find().sort({ station_number: 1 }).lean();
    return NextResponse.json({ stations });
  } catch {
    return NextResponse.json({ stations: stationsData, offline: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const station = await Station.create(body);
    return NextResponse.json(station, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
