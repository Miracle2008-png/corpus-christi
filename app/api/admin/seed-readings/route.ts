import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Reading from "@/models/Reading";
import lectionaryData from "@/data/lectionary-2026.json";

async function checkAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "admin";
}

// generation logic moved to data/lectionary-2026.json

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  
  try {
    // Wipe all existing readings
    await Reading.deleteMany({});

    const days = lectionaryData;
    const batchSize = 50;
    
    for (let i = 0; i < days.length; i += batchSize) {
      const batch = days.slice(i, i + batchSize);
      
      const documents = batch.map(day => ({
        date: day.date,
        liturgical_season: day.liturgical_season,
        old_testament: { reference: day.old_testament.reference, text: " " }, // Single space to pass validation
        psalm: { reference: day.psalm.reference, response: day.psalm.response, text: " " },
        new_testament: { reference: day.new_testament.reference, text: " " },
        gospel: { reference: day.gospel.reference, text: " " },
        gospel_reflection: "Take a moment to reflect on how today's Gospel applies to your life and journey of faith."
      }));

      await Reading.insertMany(documents);
    }

    return NextResponse.json({ success: true, message: `Successfully wiped database and seeded ${days.length} days of reading citations (Jan 1 to Dec 31). Texts will be dynamically fetched on demand.` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
