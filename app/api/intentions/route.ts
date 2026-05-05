import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Intention from "@/models/Intention";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    // Fetch latest 50 intentions, sorted by newest first
    const intentions = await Intention.find({}).sort({ created_at: -1 }).limit(50);
    return NextResponse.json(intentions);
  } catch (error) {
    console.error("Error fetching intentions:", error);
    return NextResponse.json({ error: "Failed to fetch intentions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const newIntention = await Intention.create({
      author_name: session.user.name || "Anonymous",
      title,
      description,
    });

    return NextResponse.json(newIntention, { status: 201 });
  } catch (error) {
    console.error("Error creating intention:", error);
    return NextResponse.json({ error: "Failed to create intention" }, { status: 500 });
  }
}
