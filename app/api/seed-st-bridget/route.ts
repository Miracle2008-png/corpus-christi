import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Prayer from "@/models/Prayer";

const stBridgetPrayer = {
  title: "The 12-Year Prayers of St. Bridget",
  slug: "st-bridget-12-year-prayers",
  category: "novena", // Using novena/devotion category
  explanation: "These prayers were given to St. Bridget of Sweden by Jesus. He promised that whoever prays these daily for 12 years will receive five special graces, including that they will not suffer purgatory, and will be accepted among the martyrs as if they had shed their blood for the faith.",
  occasion: "Daily devotion for 12 years",
  english_text: `Prayer 1: The Circumcision
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy Circumcision and the first drops of Thy Precious Blood which Thou hast shed...
(Say 1 Our Father, 1 Hail Mary)

Prayer 2: The Agony in the Garden
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy bloody sweat in the Garden of Olives...
(Say 1 Our Father, 1 Hail Mary)

Prayer 3: The Scourging
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy cruel Scourging...
(Say 1 Our Father, 1 Hail Mary)

Prayer 4: The Crowning with Thorns
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy Crowning with Thorns...
(Say 1 Our Father, 1 Hail Mary)

Prayer 5: The Carrying of the Cross
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy Carrying of the Cross...
(Say 1 Our Father, 1 Hail Mary)

Prayer 6: The Crucifixion
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor Thy Crucifixion...
(Say 1 Our Father, 1 Hail Mary)

Prayer 7: The Piercing of His Side
O Jesus, Son of God and of the Virgin Mary, I offer Thee this prayer to honor the Piercing of Thy Sacred Heart...
(Say 1 Our Father, 1 Hail Mary)

O my God, I offer Thee these prayers for Thy greater glory, and for the salvation of souls. Amen.`
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Check if it already exists
    const existing = await Prayer.findOne({ slug: stBridgetPrayer.slug });
    if (existing) {
      return NextResponse.json({ message: "St. Bridget 12-Year Prayer already exists in the database." });
    }

    await Prayer.create(stBridgetPrayer);
    
    return NextResponse.json({
      success: true,
      message: `Successfully added the 12-Year Prayers of St. Bridget.`,
    });
  } catch (error) {
    console.error("Failed to seed St. Bridget prayer:", error);
    return NextResponse.json({ error: "Failed to seed St. Bridget prayer" }, { status: 500 });
  }
}
