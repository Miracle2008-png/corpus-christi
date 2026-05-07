import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Saint from "@/models/Saint";
import Pope from "@/models/Pope";
import LibraryBook from "@/models/LibraryBook";
import Prayer from "@/models/Prayer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) return NextResponse.json([]);

  try {
    await connectToDatabase();
    const regex = new RegExp(query, "i");

    // Search across collections in parallel
    const [saints, popes, books, prayers] = await Promise.all([
      Saint.find({ name: regex }).limit(3).select("name slug category").lean(),
      Pope.find({ name: regex }).limit(3).select("name slug").lean(),
      LibraryBook.find({ title: regex }).limit(3).select("title slug author").lean(),
      Prayer.find({ title: regex }).limit(3).select("title").lean(),
    ]);

    const results = [
      ...saints.map((s: any) => ({ title: s.name, type: "Saint", url: `/saints/${s.slug}` })),
      ...popes.map((p: any) => ({ title: p.name, type: "Pope", url: `/popes/${p.slug}` })),
      ...books.map((b: any) => ({ title: b.title, type: "Book", url: `/library/${b.slug}` })),
      ...prayers.map((p: any) => ({ title: p.title, type: "Prayer", url: `/prayers` })),
    ];

    return NextResponse.json(results.slice(0, 8)); // Max 8 results
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
