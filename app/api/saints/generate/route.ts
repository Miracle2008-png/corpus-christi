import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SaintBio from "@/models/SaintBio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Saint name is required" }, { status: 400 });
    }

    await connectDB();

    // 1. Check if we already generated a bio for this exact saint
    const existingSaint = await SaintBio.findOne({ name });
    if (existingSaint) {
      return NextResponse.json(existingSaint);
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback if no API key
      return NextResponse.json({
        name,
        feastDay: "Unknown",
        patronage: "Unknown",
        biography: `${name} is celebrated today by the universal Catholic Church. Their heroic life of virtue points us toward Christ.`,
      });
    }

    // 2. Generate new bio using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert, orthodox Catholic historian and theologian.
      Write a brief profile for the Catholic saint: "${name}".
      Return ONLY a valid JSON object matching this structure exactly, with no markdown formatting or extra text:
      {
        "feastDay": "The month and day they are celebrated (e.g. October 4)",
        "patronage": "What they are the patron saint of (e.g. Animals, Ecology, Italy)",
        "biography": "A beautifully written, historically accurate, deeply orthodox 2-3 sentence biography highlighting their life, virtues, and spiritual significance in the Catholic Church."
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean up potential markdown formatting from Gemini response
    if (text.startsWith("\`\`\`json")) text = text.replace("\`\`\`json", "");
    if (text.startsWith("\`\`\`")) text = text.replace("\`\`\`", "");
    if (text.endsWith("\`\`\`")) text = text.substring(0, text.length - 3);
    text = text.trim();

    const data = JSON.parse(text);

    // 3. Save to database for future fast loading
    const newSaint = await SaintBio.create({
      name,
      feastDay: data.feastDay || "Unknown",
      patronage: data.patronage || "Unknown",
      biography: data.biography || `${name} is celebrated today by the universal Catholic Church.`,
    });

    return NextResponse.json(newSaint);

  } catch (error) {
    console.error("Saint generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate saint biography" },
      { status: 500 }
    );
  }
}
