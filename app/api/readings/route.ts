import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reading from "@/models/Reading";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    await connectDB();
    const reading = await Reading.findOne({ date }).lean();
    
    if (reading && reading.gospel?.reference && (!reading.gospel?.text || reading.gospel.text.trim() === "")) {
      // Document exists but texts are empty (seeded citations)
      try {
        const fetchBible = async (ref: string) => {
          if (!ref) return "";
          const r = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
          if (!r.ok) return "Text currently unavailable.";
          const d = await r.json();
          return d.text?.trim() || "";
        };

        const [ot, ps, nt, gs] = await Promise.all([
          fetchBible(reading.old_testament?.reference || ""),
          fetchBible(reading.psalm?.reference || ""),
          fetchBible(reading.new_testament?.reference || ""),
          fetchBible(reading.gospel?.reference || ""),
        ]);

        return NextResponse.json({
          ...reading,
          old_testament: { ...reading.old_testament, text: ot },
          psalm: { ...reading.psalm, text: ps },
          new_testament: { ...reading.new_testament, text: nt },
          gospel: { ...reading.gospel, text: gs },
        });
      } catch (e) {
        // Fall through to returning the original reading if fetch fails completely
      }
    }

    if (!reading) {
      // Dynamic fallback via Bible API
      try {
        const fetchBible = async (ref: string) => {
          const r = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
          if (!r.ok) throw new Error("Failed");
          const d = await r.json();
          return d.text?.trim() || "";
        };

        const otRef = "Genesis 1:1-5";
        const psRef = "Psalm 23:1-3";
        const ntRef = "Romans 8:28";
        const gsRef = "John 3:16-17";

        const [ot, ps, nt, gs] = await Promise.all([
          fetchBible(otRef).catch(() => "In the beginning God created the heavens and the earth..."),
          fetchBible(psRef).catch(() => "The Lord is my shepherd..."),
          fetchBible(ntRef).catch(() => "And we know that in all things God works for the good..."),
          fetchBible(gsRef).catch(() => "For God so loved the world..."),
        ]);

        return NextResponse.json({
          date,
          old_testament: { reference: otRef, text: ot },
          psalm: { reference: psRef, text: ps, response: "The Lord is my shepherd." },
          new_testament: { reference: ntRef, text: nt },
          gospel: { reference: gsRef, text: gs },
          gospel_reflection: "God's love for humanity is the foundation of our faith. Today, reflect on the gift of eternal life offered freely through Christ.",
          placeholder: true,
        });
      } catch (fallbackErr) {
        // Ultimate hardcoded fallback
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
