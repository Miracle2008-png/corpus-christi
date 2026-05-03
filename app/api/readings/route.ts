import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reading from "@/models/Reading";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    await connectDB();
    const reading = await Reading.findOne({ date }).lean();
    if (!reading) {
      // Return a placeholder for today
      return NextResponse.json({
        date,
        old_testament: { reference: "Genesis 1:1", text: "In the beginning God created the heavens and the earth." },
        psalm: { reference: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want.", response: "The Lord is my shepherd." },
        new_testament: { reference: "John 1:1", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        gospel: { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
        gospel_reflection: "God's love for humanity is the foundation of our faith. Today, reflect on the gift of eternal life offered freely through Christ.",
        placeholder: true,
      });
    }
    return NextResponse.json(reading);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const reading = await Reading.create(body);
    return NextResponse.json(reading, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
