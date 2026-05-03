import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prayer from "@/models/Prayer";
import prayersData from "@/data/prayers.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (category) query.category = category;

    const [prayers, total] = await Promise.all([
      Prayer.find(query).sort({ title: 1 }).skip((page - 1) * limit).limit(limit).lean(),
      Prayer.countDocuments(query),
    ]);

    return NextResponse.json({ prayers, total, page, pages: Math.ceil(total / limit) });
  } catch {
    const filtered = category ? prayersData.filter((p) => p.category === category) : prayersData;
    const start = (page - 1) * limit;
    return NextResponse.json({
      prayers: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      pages: Math.ceil(filtered.length / limit),
      offline: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const prayer = await Prayer.create(body);
    return NextResponse.json(prayer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
