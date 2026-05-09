import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reading from "@/models/Reading";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    await connectDB();
    const reading = await Reading.findOne({ date }).lean();

    if (reading) {
      return NextResponse.json(reading);
    }

    // Hardcoded fallback if DB has no entry for this date
    return NextResponse.json({
      date,
      liturgical_season: "Ordinary Time",
      old_testament: {
        reference: "Genesis 1:1-5",
        text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. And God said, \"Let there be light,\" and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day.",
      },
      psalm: {
        reference: "Psalm 23:1-3",
        response: "The Lord is my shepherd.",
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake.",
      },
      gospel: {
        reference: "John 3:16-17",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. For God did not send his Son into the world to condemn the world, but to save the world through him.",
      },
      gospel_reflection: "God's love is the foundation of our faith. Today, let the gift of eternal life offered through Christ be the anchor of your heart.",
    });
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
