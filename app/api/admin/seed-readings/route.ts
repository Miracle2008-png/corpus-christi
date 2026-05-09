import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Reading from "@/models/Reading";
import lectionaryData from "@/data/lectionary-2026-full.json";

export const maxDuration = 60;

async function checkAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "admin";
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  try {
    await Reading.deleteMany({});
    await Reading.insertMany(lectionaryData as any[]);
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${lectionaryData.length} days of complete liturgical readings.` 
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
