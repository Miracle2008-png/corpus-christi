import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// One-time admin seeder — uses ADMIN_EMAIL + ADMIN_PASSWORD env vars
// Visit /api/seed-admin once to create the admin account, then it's safe to call again (idempotent)
export async function GET() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { error: "ADMIN_EMAIL and ADMIN_PASSWORD env vars must be set." },
      { status: 400 }
    );
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    // Update role to admin if it isn't already
    if (existing.role !== "admin") {
      await User.findByIdAndUpdate(existing._id, { role: "admin" });
      return NextResponse.json({ message: "Existing user upgraded to admin.", email });
    }
    return NextResponse.json({ message: "Admin account already exists. Ready to log in.", email });
  }

  const password_hash = await bcrypt.hash(password, 12);
  await User.create({
    name: "Admin",
    email,
    password_hash,
    role: "admin",
  });

  return NextResponse.json({ message: "Admin account created successfully.", email });
}
