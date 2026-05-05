import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Intention from "@/models/Intention";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: intentionId } = await params;
    await connectDB();

    const intention = await Intention.findById(intentionId);
    if (!intention) {
      return NextResponse.json({ error: "Intention not found" }, { status: 404 });
    }

    // Check if user already prayed
    if (intention.prayed_by.includes(session.user.email)) {
      return NextResponse.json({ error: "Already prayed for this intention" }, { status: 400 });
    }

    // Add user email to list and increment count
    intention.prayed_by.push(session.user.email);
    intention.prayer_count += 1;
    await intention.save();

    return NextResponse.json({ success: true, prayer_count: intention.prayer_count });
  } catch (error) {
    console.error("Error praying for intention:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
