import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  // Only allow wikimedia and trusted sources
  if (!url.includes("wikimedia.org") && !url.includes("unsplash.com") && !url.includes("pexels.com")) {
    return new NextResponse("Invalid image source", { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://en.wikipedia.org/",
      },
      next: { revalidate: 31536000 } // Cache for 1 year in Vercel's Data Cache
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Error proxying image", { status: 500 });
  }
}
