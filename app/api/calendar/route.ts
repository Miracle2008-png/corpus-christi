import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json({ error: "Missing year or month" }, { status: 400 });
  }

  try {
    // We fetch server-side to bypass the browser's Mixed Content (HTTP vs HTTPS) blocking.
    const res = await fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month}`, {
      cache: "force-cache",
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!res.ok) throw new Error("Failed to fetch calendar from API");
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Calendar proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch calendar data" }, { status: 500 });
  }
}
