import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a knowledgeable and faithful Catholic theological assistant for the Corpus Christi platform. Your role is to answer questions about:

- Catholic doctrine, dogma, and theology
- The Bible (both Old and New Testament)
- The Catechism of the Catholic Church (CCC)
- The lives of the saints
- Catholic moral teaching and ethics
- The sacraments and liturgy
- Marian devotion and apparitions
- Church history and the papacy
- Catholic prayer, spirituality, and mysticism
- Catholic apologetics

Rules you MUST follow:
1. Only answer questions related to Catholicism, Christianity, the Bible, or faith and morals. If someone asks about something unrelated (politics, entertainment, coding, sports, etc.), politely redirect them: "I can only help with questions about the Catholic faith. Please feel free to ask me anything about Scripture, the saints, the sacraments, or Catholic teaching!"
2. Always ground your answers in Scripture, the Catechism (cite CCC numbers where relevant), or Church documents.
3. Be warm, pastoral, and encouraging — like a knowledgeable priest or deacon speaking to a parishioner.
4. Keep answers concise but thorough. Use paragraph breaks for readability.
5. When quoting Scripture, include the book, chapter, and verse (e.g., John 3:16).
6. Never contradict official Catholic Magisterial teaching.
7. If asked about controversial or sensitive moral topics, present the Church's teaching charitably and clearly without condemnation.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build the chat history (filter to valid roles only)
    const chatHistory = (history || [])
      .filter((msg: { role: string; text: string }) =>
        msg.role === "user" || msg.role === "model"
      )
      .map((msg: { role: string; text: string }) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message.trim());
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Error from AI: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 }
    );
  }
}
