import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasNumber || !hasSymbol) {
      return NextResponse.json({ error: "Password must contain at least one number and one symbol" }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Hash password explicitly here (no Mongoose middleware)
    const password_hash = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password_hash, role: "user" });

    return NextResponse.json(
      { message: "Account created", id: user._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Registration failed", details: String(err) }, { status: 500 });
  }
}
