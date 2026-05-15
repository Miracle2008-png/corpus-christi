import { NextResponse } from "next/server";

// Built-in liturgical calendar fallback so the page never stays blank
function buildFallbackCalendar(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];

  // Basic season calculation
  function getSeason(m: number, d: number): { season: string; color: string } {
    const md = m * 100 + d;
    // Easter 2026 = April 5
    const easter = year === 2026 ? { m: 4, d: 5 } : { m: 4, d: 20 }; // default fallback
    const easterMd = easter.m * 100 + easter.d;
    const diff = md - easterMd;
    if (diff >= -46 && diff < -6) return { season: "Lent", color: "violet" };
    if (diff >= -6 && diff < 0) return { season: "Holy Week", color: "red" };
    if (diff === 0) return { season: "Easter Sunday", color: "white" };
    if (diff > 0 && diff <= 49) return { season: "Easter", color: "white" };
    if (md >= 1201 && md <= 1224) return { season: "Advent", color: "violet" };
    if (md >= 1225 || md <= 113) return { season: "Christmas", color: "white" };
    return { season: "Ordinary Time", color: "green" };
  }

  // Key feast days
  const feasts: Record<string, { title: string; color: string; rank: string }[]> = {
    "1-1": [{ title: "Solemnity of Mary, Mother of God", color: "white", rank: "solemnity" }],
    "1-6": [{ title: "Epiphany of the Lord", color: "white", rank: "solemnity" }],
    "2-2": [{ title: "Presentation of the Lord", color: "white", rank: "feast" }],
    "2-14": [{ title: "Valentine's Day / Ss. Cyril & Methodius", color: "white", rank: "memorial" }],
    "3-17": [{ title: "St. Patrick", color: "green", rank: "optional memorial" }],
    "3-19": [{ title: "St. Joseph, Spouse of the Blessed Virgin Mary", color: "white", rank: "solemnity" }],
    "3-25": [{ title: "Annunciation of the Lord", color: "white", rank: "solemnity" }],
    "4-5": [{ title: "Easter Sunday of the Resurrection", color: "white", rank: "solemnity" }],
    "4-12": [{ title: "Divine Mercy Sunday", color: "white", rank: "feast" }],
    "4-23": [{ title: "St. George", color: "red", rank: "optional memorial" }],
    "5-1": [{ title: "St. Joseph the Worker", color: "white", rank: "optional memorial" }],
    "5-13": [{ title: "Our Lady of Fátima", color: "white", rank: "optional memorial" }],
    "5-31": [{ title: "Visitation of the Blessed Virgin Mary", color: "white", rank: "feast" }],
    "6-13": [{ title: "St. Anthony of Padua", color: "white", rank: "memorial" }],
    "6-24": [{ title: "Nativity of St. John the Baptist", color: "white", rank: "solemnity" }],
    "6-29": [{ title: "Ss. Peter and Paul, Apostles", color: "red", rank: "solemnity" }],
    "7-22": [{ title: "St. Mary Magdalene", color: "white", rank: "feast" }],
    "7-26": [{ title: "Ss. Joachim and Anne", color: "white", rank: "memorial" }],
    "8-6": [{ title: "Transfiguration of the Lord", color: "white", rank: "feast" }],
    "8-14": [{ title: "St. Maximilian Mary Kolbe", color: "red", rank: "memorial" }],
    "8-15": [{ title: "Assumption of the Blessed Virgin Mary", color: "white", rank: "solemnity" }],
    "8-28": [{ title: "St. Augustine", color: "white", rank: "memorial" }],
    "9-8": [{ title: "Nativity of the Blessed Virgin Mary", color: "white", rank: "feast" }],
    "9-14": [{ title: "Exaltation of the Holy Cross", color: "red", rank: "feast" }],
    "9-15": [{ title: "Our Lady of Sorrows", color: "white", rank: "memorial" }],
    "9-29": [{ title: "Ss. Michael, Gabriel, and Raphael", color: "white", rank: "feast" }],
    "10-1": [{ title: "St. Thérèse of the Child Jesus", color: "white", rank: "memorial" }],
    "10-4": [{ title: "St. Francis of Assisi", color: "white", rank: "memorial" }],
    "10-7": [{ title: "Our Lady of the Rosary", color: "white", rank: "memorial" }],
    "10-15": [{ title: "St. Teresa of Ávila", color: "white", rank: "memorial" }],
    "10-22": [{ title: "St. John Paul II", color: "white", rank: "optional memorial" }],
    "11-1": [{ title: "All Saints", color: "white", rank: "solemnity" }],
    "11-2": [{ title: "All Souls", color: "violet", rank: "commemoration" }],
    "11-9": [{ title: "Dedication of the Lateran Basilica", color: "white", rank: "feast" }],
    "11-22": [{ title: "St. Cecilia", color: "red", rank: "memorial" }],
    "12-8": [{ title: "Immaculate Conception of the Blessed Virgin Mary", color: "white", rank: "solemnity" }],
    "12-12": [{ title: "Our Lady of Guadalupe", color: "white", rank: "feast" }],
    "12-25": [{ title: "Nativity of the Lord (Christmas)", color: "white", rank: "solemnity" }],
    "12-26": [{ title: "St. Stephen, First Martyr", color: "red", rank: "feast" }],
    "12-27": [{ title: "St. John, Apostle and Evangelist", color: "white", rank: "feast" }],
    "12-28": [{ title: "Holy Innocents, Martyrs", color: "red", rank: "feast" }],
  };

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const { season, color } = getSeason(month, d);
    const feastKey = `${month}-${d}`;
    const celebrations = feasts[feastKey] || [
      { title: season === "Lent" ? `${weekdays[new Date(year, month - 1, d).getDay()]} of Lent` : `Feria of ${season}`, color, rank: "ferial" }
    ];
    days.push({
      date: dateStr,
      season,
      season_week: Math.ceil(d / 7),
      celebrations,
      weekday: weekdays[new Date(year, month - 1, d).getDay()],
    });
  }
  return days;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json({ error: "Missing year or month" }, { status: 400 });
  }

  // Try the HTTPS version of the liturgical calendar API
  try {
    const res = await fetch(
      `https://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month}`,
      {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(6000), // 6 second timeout
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return NextResponse.json(data);
      }
    }
  } catch {
    // External API failed — fall through to local fallback
  }

  // Local fallback — always works, no external dependency
  const fallback = buildFallbackCalendar(Number(year), Number(month));
  return NextResponse.json(fallback);
}
