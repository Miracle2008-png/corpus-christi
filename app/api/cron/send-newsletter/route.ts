import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Reading from "@/models/Reading";
import { sendNewsletterEmail } from "@/lib/email";

// Ensure this route only runs safely via Vercel Cron
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
  }

  try {
    await connectDB();
    
    // 1. Get today's reading
    const today = new Date().toISOString().split("T")[0];
    const reading = await Reading.findOne({ date: today });
    if (!reading) return NextResponse.json({ error: "No reading found for today" }, { status: 404 });

    // 2. Get all subscribers (creating a basic Subscriber model if needed)
    const SubscriberSchema = new mongoose.Schema({ email: String, active: Boolean });
    const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
    
    const subscribers = await Subscriber.find({ active: true });
    if (subscribers.length === 0) return NextResponse.json({ message: "No active subscribers to email." });

    // 3. Send emails
    const results = await Promise.allSettled(
      subscribers.map(sub => sendNewsletterEmail(sub.email, reading))
    );

    return NextResponse.json({ 
      success: true, 
      sent: results.filter(r => r.status === "fulfilled").length,
      failed: results.filter(r => r.status === "rejected").length
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
