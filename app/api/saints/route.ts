import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Saint from "@/models/Saint";
import saintsData from "@/data/saints.json";

// GET /api/saints — list with search, filter, pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (search) query.$text = { $search: search };
    if (category) query.category = category;

    const [saints, total] = await Promise.all([
      Saint.find(query)
        .select("name known_for category feast_day patron_of image_url slug")
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Saint.countDocuments(query),
    ]);

    return NextResponse.json({
      saints,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch {
    // Offline fallback — use JSON data
    const filtered = saintsData.filter((s) => {
      const matchSearch = search
        ? s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.known_for.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchCat = category ? s.category === category : true;
      return matchSearch && matchCat;
    });

    const start = (page - 1) * limit;
    return NextResponse.json({
      saints: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      pages: Math.ceil(filtered.length / limit),
      offline: true,
    });
  }
}

// POST /api/saints — create (admin only)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    // Generate slug from name
    body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const saint = await Saint.create(body);
    return NextResponse.json(saint, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create saint", details: String(err) }, { status: 500 });
  }
}
