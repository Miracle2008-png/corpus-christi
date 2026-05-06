import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { donor_name, email, amount, purpose, reference } = body;

    if (!donor_name || !email || !amount || !purpose || !reference) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const donation = await Donation.create({
      donor_name,
      email,
      amount,
      purpose,
      reference,
      status: "success",
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error("Donation saving error:", error);
    return NextResponse.json({ error: "Failed to save donation" }, { status: 500 });
  }
}
