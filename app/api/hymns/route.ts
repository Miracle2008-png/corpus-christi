import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hymn from "@/models/Hymn";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    
    let query = {};
    if (category && category !== "all") {
      query = { category };
    }
    
    // Select minimal fields for the index page to reduce payload
    const hymns = await Hymn.find(query)
      .select("title slug category author meter")
      .sort({ title: 1 });
      
    return NextResponse.json(hymns);
  } catch (error) {
    console.error("Error fetching hymns:", error);
    return NextResponse.json(
      { error: "Failed to fetch hymns" },
      { status: 500 }
    );
  }
}
