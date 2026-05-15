import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  // Only allow wikimedia and trusted sources
  if (
    !url.includes("wikimedia.org") &&
    !url.includes("unsplash.com") &&
    !url.includes("pexels.com") &&
    !url.includes("wikipedia.org")
  ) {
    return new NextResponse("Invalid image source", { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CorpusChristiBot/1.0; +https://corpus-christi.vercel.app) AppleWebKit/537.36 Chrome/124.0.0.0",
        Referer: "https://en.wikipedia.org/",
        Accept: "image/webp,image/avif,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      console.error(`Proxy failed for ${url}: HTTP ${response.status}`);
      return new NextResponse(`Failed to fetch image: ${response.status}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    // Validate it's actually an image (at least 500 bytes)
    if (arrayBuffer.byteLength < 500) {
      return new NextResponse("Image too small — likely an error response", { status: 502 });
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Error proxying image", { status: 500 });
  }
}
