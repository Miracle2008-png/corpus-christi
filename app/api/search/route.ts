import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Saint from "@/models/Saint";
import Pope from "@/models/Pope";
import LibraryBook from "@/models/LibraryBook";
import Prayer from "@/models/Prayer";
import Hymn from "@/models/Hymn";
import { HOLY_SITES } from "@/data/holy-sites";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) return NextResponse.json([]);

  try {
    await connectToDatabase();
    const regex = new RegExp(query, "i");

    // Search static holy sites first (synchronous)
    const holySites = HOLY_SITES.filter(
      (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);

    const [saints, popes, books, prayers, hymns] = await Promise.all([
      Saint.find({ name: regex }).limit(3).select("name slug category").lean(),
      Pope.find({ name: regex }).limit(3).select("name slug").lean(),
      LibraryBook.find({ title: regex }).limit(3).select("title slug author").lean(),
      Prayer.find({ title: regex }).limit(3).select("title").lean(),
      Hymn.find({ title: regex }).limit(3).select("title slug").lean(),
    ]);

    const results = [
      ...holySites.map((s) => ({ title: s.name, type: "Holy Site", url: `/pilgrimage` })),
      ...saints.map((s: any) => ({ title: s.name, type: "Saint", url: `/saints/${s.slug}` })),
      ...popes.map((p: any) => ({ title: p.name, type: "Pope", url: `/popes/${p.slug}` })),
      ...books.map((b: any) => ({ title: b.title, type: "Book", url: `/library/${b.slug}` })),
      ...prayers.map((p: any) => ({ title: p.title, type: "Prayer", url: `/prayers` })),
      ...hymns.map((h: any) => ({ title: h.title, type: "Hymn", url: `/hymns/${h.slug}` })),
    ];

    return NextResponse.json(results.slice(0, 8)); // Max 8 results
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
