"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const saints = [
  { name: "St. Joseph", feast: "March 19", patronage: "Universal Church, Workers, Fathers", bio: "Foster father of Jesus and husband of the Blessed Virgin Mary. Scripture shows him as a righteous, obedient, and courageous man who protected the Holy Family. He is invoked for a holy death as he died in the arms of Jesus and Mary.", ref: "Matthew 1:18-25; 2:13-23", slug: "" },
  { name: "St. Francis of Assisi", feast: "October 4", patronage: "Animals, Ecology, Italy, Merchants", bio: "Born into wealth in Assisi (1181), Francis gave everything away for a life of radical poverty and gospel preaching. He founded the Franciscan Order, received the stigmata of Christ's wounds, and composed the Canticle of Creatures — one of the first Italian literary works.", ref: "Matthew 19:21", slug: "francis-of-assisi" },
  { name: "St. Teresa of Ávila", feast: "October 15", patronage: "Spain, Headache sufferers, Chess players", bio: "A 16th-century Spanish mystic and Doctor of the Church. Teresa reformed the Carmelite Order and wrote masterpieces of spiritual theology: The Interior Castle and The Way of Perfection. Her teaching on prayer — from vocal prayer to contemplative union — remains the gold standard.", ref: "Luke 10:38-42", slug: "teresa-of-avila" },
  { name: "St. Faustina Kowalska", feast: "October 5", patronage: "Divine Mercy devotion, Poland", bio: "A simple Polish nun (1905–1938) chosen by Christ to receive the message of Divine Mercy. She recorded her mystical experiences in her Diary, one of the most widely read spiritual books of the 20th century. She was canonised by Pope John Paul II in 2000.", ref: "John 20:22-23", slug: "" },
  { name: "St. Thérèse of Lisieux", feast: "October 1", patronage: "Missionaries, France, Florists", bio: "The 'Little Flower' entered Carmel at 15 and died of tuberculosis at 24 (1897). Her autobiography Story of a Soul revealed her 'Little Way' — doing small things with great love. She was declared a Doctor of the Church in 1997.", ref: "Matthew 18:3", slug: "" },
  { name: "St. Patrick", feast: "March 17", patronage: "Ireland, Engineers, Nigeria", bio: "Born in Roman Britain around 385 AD, Patrick was captured by Irish pirates and spent six years as a slave in Ireland. He escaped, became a bishop, and returned to Ireland as a missionary. He used the three-leaf shamrock to explain the Trinity and baptised thousands.", ref: "Matthew 28:19", slug: "" },
  { name: "St. Michael the Archangel", feast: "September 29", patronage: "Police, Soldiers, Paramedics, Sick", bio: "One of the three archangels named in Scripture. Michael ('Who is like God?') leads the heavenly armies against Satan in the Book of Revelation. The Prayer to St. Michael was composed by Pope Leo XIII after a vision.", ref: "Revelation 12:7; Daniel 10:13; Jude 1:9", slug: "" },
  { name: "St. Paul the Apostle", feast: "June 29", patronage: "Theologians, Writers, Press", bio: "Born Saul of Tarsus, Paul was a zealous persecutor of Christians until his dramatic conversion on the Damascus road. He became the greatest missionary in history, founding churches across the Mediterranean world and writing 13 epistles that form the backbone of the New Testament.", ref: "Acts 9:1-19; Galatians 1:11-17", slug: "" },
  { name: "St. Peter the Apostle", feast: "June 29", patronage: "Popes, Fishermen, Locksmiths", bio: "Born Simon, renamed Peter ('Rock') by Jesus. He was the first of the Apostles called, the first to confess Christ as the Son of God, the first Bishop of Rome, and was crucified upside down under Nero around AD 68. His keys are the symbol of papal authority.", ref: "Matthew 16:18-19", slug: "" },
  { name: "St. Thomas Aquinas", feast: "January 28", patronage: "Students, Academics, Theologians", bio: "Dominican friar and the greatest theologian in Church history. His Summa Theologiae synthesises faith and reason, integrating Aristotelian philosophy with Christian theology. He was declared a Doctor of the Church (Doctor Angelicus) and his philosophy underpins much of Catholic moral teaching.", ref: "Proverbs 4:7", slug: "thomas-aquinas" },
  { name: "St. John Paul II", feast: "October 22", patronage: "World Youth Day, Poland, Families", bio: "Karol Wojtyła (1920-2005) was elected Pope in 1978 — the first non-Italian pope in 455 years. He visited 129 countries, helped bring down communism in Eastern Europe, launched World Youth Day, and his Theology of the Body transformed the Church's teaching on human dignity and sexuality.", ref: "Matthew 16:18", slug: "" },
  { name: "St. Augustine of Hippo", feast: "August 28", patronage: "Theologians, Brewers, Sore Eyes", bio: "After a wild youth, Augustine (354-430) converted at 33, influenced by his mother St. Monica's prayers and St. Ambrose's preaching. He became Bishop of Hippo and wrote Confessions (the world's first autobiography) and The City of God. His thought shaped Western Christianity profoundly.", ref: "Romans 13:13-14", slug: "" },
];

function getTodaySaint(month: number, day: number) {
  const seed = month * 31 + day;
  return saints[seed % saints.length];
}

export default function SaintOfTheDayPage() {
  const [mounted, setMounted] = useState(false);
  const [saint, setSaint] = useState(saints[0]);
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    setDateStr(today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    
    async function fetchTodaySaint() {
      try {
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        // 1. Get Liturgical Calendar for today
        const calRes = await fetch(`/api/calendar?year=${year}&month=${month}`);
        if (!calRes.ok) throw new Error("Calendar fetch failed");
        const days = await calRes.json();
        
        // Ensure we find the exact day, avoiding timezone offset issues
        const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const todayData = days.find((d: any) => d.date === dateString);

        if (todayData && todayData.celebrations) {
          // Look for a saint celebration (not a ferial day)
          const saintCelebration = todayData.celebrations.find((c: any) => 
            c.rank.includes("memorial") || c.rank.includes("feast") || c.rank.includes("solemnity")
          );

          if (saintCelebration && saintCelebration.title && !saintCelebration.title.includes("Feria")) {
            // We found a real saint for today! Ask AI to generate/retrieve the bio
            const genRes = await fetch("/api/saints/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: saintCelebration.title }),
            });

            if (genRes.ok) {
              const aiSaint = await genRes.json();
              setSaint({
                name: aiSaint.name,
                feast: aiSaint.feastDay,
                patronage: aiSaint.patronage,
                bio: aiSaint.biography,
                ref: "Generated by Catholic AI",
                slug: ""
              });
              setLoading(false);
              setMounted(true);
              return;
            }
          }
        }
        
        // Fallback: If it's a ferial day with no saint, or APIs fail, use classic fallback
        setSaint(getTodaySaint(month, day));
      } catch (error) {
        console.error("Error fetching true saint of the day:", error);
        setSaint(getTodaySaint(today.getMonth() + 1, today.getDate()));
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    fetchTodaySaint();
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: "100vh", background: "var(--ivory)" }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #2a1a0a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ Communion of Saints ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "0.75rem", lineHeight: 1.15 }}>Saint of the Day</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>{dateStr}</p>
      </section>

      <div className="container-sacred" style={{ maxWidth: "780px", padding: "3rem 1.5rem" }}>

        <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", boxShadow: "0 8px 40px rgba(26,39,68,0.1)", marginBottom: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, var(--navy-dark), #1a2a4a)", padding: "2.5rem", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "2rem" }}>✦</div>
            <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>Today's Saint</p>
            {loading ? (
              <div style={{ padding: "2rem", color: "rgba(255,255,255,0.7)" }}>
                Checking the Liturgical Calendar...
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "2rem", margin: "0 0 0.4rem" }}>{saint.name}</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>Feast Day: {saint.feast}</p>
              </>
            )}
          </div>

          <div style={{ padding: "2.5rem" }}>
            {loading ? (
              <div style={{ height: "100px", background: "rgba(0,0,0,0.02)", borderRadius: "8px", animation: "pulse 2s infinite" }} />
            ) : (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "0.85rem", color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 700 }}>Patronage</h3>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    {saint.patronage.split(", ").map((p, i) => (
                      <span key={i} style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold-dark)", fontSize: "0.72rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                        Patron of {p}
                      </span>
                    ))}
                  </div>
                </div>

                <p style={{ color: "var(--text-primary)", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "1.75rem" }}>{saint.bio}</p>

                <div style={{ background: "rgba(26,39,68,0.03)", borderLeft: "4px solid var(--gold)", borderRadius: "0 10px 10px 0", padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Scripture Reference</p>
                  <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>{saint.ref}</p>
                </div>

                {saint.slug && !loading && (
                  <Link href={`/saints/${saint.slug}`} style={{ display: "inline-block", marginTop: "2rem", color: "var(--gold)", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", borderBottom: "1px solid var(--gold)", paddingBottom: "0.2rem" }}>
                    Read full biography →
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{ background: "var(--navy-dark)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Prayer for Today</p>
          <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.9, fontStyle: "italic" }}>
            &ldquo;Dear {saint.name}, you walked faithfully in the footsteps of Christ and now enjoy the vision of God in heaven. Pray for us that we may follow your example, persevere in faith, and one day join you in the company of all the saints. Amen.&rdquo;
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/saints" style={{ color: "var(--navy)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", borderBottom: "1px solid rgba(26,39,68,0.3)" }}>
            Browse All Saints →
          </Link>
        </div>
      </div>
    </div>
  );
}
