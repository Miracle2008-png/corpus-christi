"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Celebration {
  title: string;
  colour: string;
  rank: string;
  rank_num: number;
}

interface LiturgicalDay {
  date: string;
  season: string;
  season_week: number;
  celebrations: Celebration[];
  weekday: string;
}

const hexMap: Record<string, string> = {
  green: "#166534",
  white: "#f3f4f6",
  red: "#991b1b",
  violet: "#581c87",
  rose: "#9d174d",
  black: "#000000",
};

export default function CalendarPage() {
  const [days, setDays] = useState<LiturgicalDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchCalendar() {
      setLoading(true);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      try {
        const res = await fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDays(data);
      } catch (err) {
        console.error("Error fetching calendar:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, [currentDate]);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Pad the start of the month for grid display
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "4rem" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark), var(--navy))", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ Liturgical Year ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          Catholic Calendar
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          Follow the Church&apos;s seasons, feast days, and memorials throughout the year. The colors indicate the liturgical vestments worn at Mass.
        </p>
      </section>

      {/* Calendar Navigation */}
      <div className="container-sacred" style={{ maxWidth: "1200px", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", background: "#fff", padding: "1rem 2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <button onClick={prevMonth} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.5)", color: "var(--navy)", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            &larr; Previous
          </button>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={nextMonth} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.5)", color: "var(--navy)", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            Next &rarr;
          </button>
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--navy)", fontSize: "1.2rem", fontFamily: "var(--font-serif)" }}>
            Loading calendar...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "10px" }}>
            {/* Weekday Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} style={{ textAlign: "center", fontWeight: 700, color: "var(--gold-dark)", textTransform: "uppercase", fontSize: "0.8rem", paddingBottom: "0.5rem" }}>
                {day}
              </div>
            ))}

            {/* Empty Padding Days */}
            {paddingDays.map((_, i) => (
              <div key={`empty-${i}`} style={{ background: "rgba(0,0,0,0.02)", borderRadius: "8px", minHeight: "140px" }} />
            ))}

            {/* Days */}
            {days.map((day) => {
              const dateObj = new Date(day.date);
              // Important: adjust for timezone offset to prevent date shifting
              const localDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
              const dateNum = localDate.getDate();
              const primaryCelebration = day.celebrations[0];
              const color = primaryCelebration?.colour || "white";
              const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
              const isToday = todayStr === day.date;

              return (
                <div key={day.date} style={{ 
                  background: "#fff", 
                  borderRadius: "8px", 
                  minHeight: "140px", 
                  padding: "0.75rem", 
                  display: "flex", 
                  flexDirection: "column",
                  border: isToday ? "2px solid var(--gold)" : "1px solid rgba(0,0,0,0.05)",
                  boxShadow: isToday ? "0 4px 12px rgba(201,168,76,0.2)" : "none",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Liturgical Color Strip */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: hexMap[color] || "#f3f4f6" }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)" }}>{dateNum}</span>
                    {isToday && <span style={{ fontSize: "0.6rem", background: "var(--gold)", color: "var(--navy-dark)", padding: "0.15rem 0.4rem", borderRadius: "4px", fontWeight: 700, letterSpacing: "0.05em" }}>TODAY</span>}
                  </div>
                  
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {day.celebrations.slice(0, 2).map((celeb, idx) => (
                      <div key={idx} style={{ fontSize: "0.75rem", lineHeight: 1.3, color: "var(--text-primary)", paddingLeft: "0.4rem", borderLeft: `2.5px solid ${hexMap[celeb.colour]}` }}>
                        <strong style={{ display: "block", color: "var(--navy)", marginBottom: "0.1rem" }}>{celeb.title}</strong>
                        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "capitalize" }}>{celeb.rank.replace("ferial", "Feria")}</span>
                      </div>
                    ))}
                    {day.celebrations.length > 2 && (
                      <div style={{ fontSize: "0.65rem", color: "var(--gold-dark)", marginTop: "auto", fontWeight: 600 }}>
                        + {day.celebrations.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container-sacred > div:last-child {
            display: flex !important;
            flex-direction: column;
            gap: 1rem;
          }
          .container-sacred > div:last-child > div:nth-child(-n+7) {
            display: none; /* Hide weekday headers on mobile */
          }
          .container-sacred > div:last-child > div[style*="minHeight: 140px"] {
            min-height: auto !important;
            padding: 1.25rem !important;
          }
          .container-sacred > div:last-child > div[style*="background: rgba(0, 0, 0, 0.02)"] {
            display: none; /* Hide padding days on mobile */
          }
        }
      `}</style>
    </div>
  );
}
