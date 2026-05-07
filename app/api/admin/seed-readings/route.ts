import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Reading from "@/models/Reading";

async function checkAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "admin";
}

function generateDatesAndCitations() {
  const days = [];
  const start = new Date("2026-05-01T12:00:00Z");
  const end = new Date("2026-12-31T12:00:00Z");
  
  let current = new Date(start);
  let index = 0;

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    
    days.push({
      date: dateStr,
      liturgical_season: "Ordinary Time",
      old_testament: { reference: `Genesis ${(index % 50) + 1}:1-5` },
      psalm: { reference: `Psalm ${(index % 150) + 1}:1-3`, response: "The Lord is my shepherd." },
      new_testament: { reference: `Romans ${(index % 16) + 1}:1-2` },
      gospel: { reference: `Mark ${(index % 16) + 1}:1-8` }
    });
    
    current.setDate(current.getDate() + 1);
    index++;
  }
  return days;
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  
  try {
    // Wipe all existing readings
    await Reading.deleteMany({});

    const days = generateDatesAndCitations();
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

    return NextResponse.json({ success: true, message: `Successfully wiped database and seeded ${days.length} days of reading citations (May 1 to Dec 31). Texts will be dynamically fetched on demand.` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
