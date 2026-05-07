import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  const bookmarks = await Bookmark.find({ user_email: session.user.email }).sort({ createdAt: -1 });
  return NextResponse.json(bookmarks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  try {
    const { item_type, item_id, item_title, item_url } = await req.json();
    const bookmark = await Bookmark.create({
      user_email: session.user.email,
      item_type, item_id, item_title, item_url
    });
    return NextResponse.json(bookmark);
  } catch (e: any) { 
    // Ignore duplicate key error (code 11000) gracefully
    if (e.code === 11000) return NextResponse.json({ success: true, message: "Already bookmarked" });
    return NextResponse.json({ error: e.message }, { status: 400 }); 
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectToDatabase();
  try {
    const { _id } = await req.json();
    await Bookmark.findOneAndDelete({ _id, user_email: session.user.email });
    return NextResponse.json({ success: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
