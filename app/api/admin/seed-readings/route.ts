import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Reading from "@/models/Reading";
import lectionaryData from "@/data/lectionary-2026.json";

// Allow this route to run for up to 60 seconds (Vercel hobby tier maximum)
export const maxDuration = 60; 

async function checkAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "admin";
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  
  try {
    // Wipe all existing readings
    await Reading.deleteMany({});

    // Map all 365 days into Mongoose documents
    const documents = lectionaryData.map(day => ({
      date: day.date,
      liturgical_season: day.liturgical_season,
      old_testament: { reference: day.old_testament.reference, text: " " }, // Single space to pass validation
      psalm: { reference: day.psalm.reference, response: day.psalm.response, text: " " },
      new_testament: { reference: day.new_testament.reference, text: " " },
      gospel: { reference: day.gospel.reference, text: " " },
      gospel_reflection: "Take a moment to reflect on how today's Gospel applies to your life and journey of faith."
    }));

    // Insert all 365 documents in a single fast network batch to prevent timeouts
    await Reading.insertMany(documents);

    return NextResponse.json({ success: true, message: `Successfully wiped database and seeded ${documents.length} days of reading citations (Jan 1 to Dec 31). Texts will be dynamically fetched on demand.` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
