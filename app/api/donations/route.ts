import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { auth } from "@/lib/auth";

// GET — admin can fetch all donations
export async function GET() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const donations = await Donation.find().sort({ createdAt: -1 });
  return NextResponse.json({ donations });
}

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
