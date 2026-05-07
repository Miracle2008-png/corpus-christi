import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    
    await Subscriber.findOneAndUpdate(
      { email },
      { email, active: true },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (e: any) { 
    return NextResponse.json({ error: e.message }, { status: 400 }); 
  }
}
