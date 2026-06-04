import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hymn from "@/models/Hymn";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const hymn = await Hymn.findOne({ slug });
      
    if (!hymn) {
      return NextResponse.json(
        { error: "Hymn not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hymn);
  } catch (error) {
    console.error("Error fetching hymn:", error);
    return NextResponse.json(
      { error: "Failed to fetch hymn" },
      { status: 500 }
    );
  }
}
