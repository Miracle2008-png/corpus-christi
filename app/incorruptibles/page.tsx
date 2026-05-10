import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export const metadata: Metadata = {
  title: "Incorruptible Saints — Bodies That Defy Decay",
  description: "Discover the miraculous phenomenon of incorrupt saints — holy men and women whose bodies have resisted natural decomposition, a sign of God's power over death.",
};

const incorruptibles = [
  {
    name: "St. Bernadette Soubirous",
    dates: "1844–1879",
    location: "Chapel of the Convent of St. Gildard, Nevers, France",
    feast: "April 16",
    description: "The visionary of Lourdes who saw the Blessed Virgin Mary 18 times in 1858. When her body was exhumed in 1909, 30 years after death, it was found perfectly intact and flexible. Exhumed again in 1919 and 1925, it remained remarkably preserved. Her body can be seen today in a glass reliquary at Nevers, where she appears to be peacefully sleeping.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Saint_Bernadette%27s_incorrupt_body.jpg/500px-Saint_Bernadette%27s_incorrupt_body.jpg",
    detail: "Three official exhumations confirmed the incorruption. The attending physicians noted the absence of any embalming and the supernatural preservation of the flesh.",
  },
  {
    name: "St. Catherine of Bologna",
    dates: "1413–1463",
    location: "Church of Corpus Domini, Bologna, Italy",
    feast: "March 9",
    description: "A Poor Clare nun, mystic, and artist. After her death, a sweet fragrance emanated from her grave. When exhumed 18 days later, her body was found completely incorrupt. She has been seated upright in a chapel in Bologna for over 500 years — visible to visitors to this day.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Saint_Catherine_of_Bologna_with_Three_Donors_by_the_Master_of_the_Baroncelli_Portraits.jpg/500px-Saint_Catherine_of_Bologna_with_Three_Donors_by_the_Master_of_the_Baroncelli_Portraits.jpg",
    detail: "Her body has remained seated in the same position for more than five centuries without any artificial preservation.",
  },
  {
    name: "St. Clare of Assisi",
    dates: "1194–1253",
    location: "Basilica of Saint Clare, Assisi, Italy",
    feast: "August 11",
    description: "Foundress of the Order of Poor Ladies (Poor Clares) and one of the first followers of St. Francis of Assisi. Her remains were rediscovered in 1850 under the high altar of the Basilica built in her honour. Though reduced to skeleton after 600 years, her body was still notably preserved in structure.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Simone_Martini_047.jpg/500px-Simone_Martini_047.jpg",
    detail: "A devoted follower of radical poverty, Clare's incorruption points to the holiness of her total self-giving to God.",
  },
  {
    name: "St. John Vianney (Curé d'Ars)",
    dates: "1786–1859",
    location: "Basilica of Ars, Ars-sur-Formans, France",
    feast: "August 4",
    description: "The patron saint of parish priests, famous for spending 16–18 hours daily in the confessional. He was said to have the gift of reading souls. When exhumed in 1904, 45 years after death, his body was found remarkably intact. His heart was removed as a relic and is venerated separately. His body lies in a gold-and-glass reliquary above the main altar at Ars.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/S%C3%A3o_Jo%C3%A3o_Maria_Vianney.png/500px-S%C3%A3o_Jo%C3%A3o_Maria_Vianney.png",
    detail: "Pope Pius X declared him patron of parish priests in 1929. His incorrupt body draws hundreds of thousands of pilgrims annually.",
  },
  {
    name: "St. Vincent de Paul",
    dates: "1581–1660",
    location: "Chapel of the Lazarists, Paris, France",
    feast: "September 27",
    description: "The great apostle of charity who founded the Congregation of the Mission (Lazarists) and the Daughters of Charity. His skeletal remains were found notably preserved and are now encased in a wax figure reliquary above the altar of the Lazarist chapel in Paris. His works for the poor transformed the Church's approach to social ministry.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Simon_Fran%C3%A7ois_de_Tours_-_Portrait_Vincent_de_Paul_%284x5_cropped%29.jpeg/500px-Simon_Fran%C3%A7ois_de_Tours_-_Portrait_Vincent_de_Paul_%284x5_cropped%29.jpeg",
    detail: "His charitable legacy includes founding hospitals, orphanages, and the systematization of parish missions throughout France.",
  },
  {
    name: "St. Rita of Cascia",
    dates: "1381–1457",
    location: "Basilica of St. Rita, Cascia, Italy",
    feast: "May 22",
    description: "The patron saint of impossible causes. After enduring an abusive marriage and the murder of her husband, she became an Augustinian nun. She bore a wound on her forehead said to be from a thorn of Christ's crown. After her death, a sweet fragrance surrounded her body, which has remained incorrupt for over 500 years in Cascia.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Santa_Rita_da_Cascia.jpg/500px-Santa_Rita_da_Cascia.jpg",
    detail: "The wound on her forehead, which appeared during a mystical experience, remained visible even after death — a permanent stigmata.",
  },
  {
    name: "St. Zita",
    dates: "1212–1272",
    location: "Basilica of San Frediano, Lucca, Italy",
    feast: "April 27",
    description: "A humble domestic servant who served one family in Lucca for 48 years. Known for extraordinary charity — she gave her own food and her master's provisions to the poor. Her body was found incorrupt when exhumed 300 years after her death and can still be viewed in Lucca.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Santa_Zita_lucca.jpg/500px-Santa_Zita_lucca.jpg",
    detail: "St. Zita is the patron saint of domestic workers and maids. Her incorruption, in a simple servant, demonstrates that holiness knows no social station.",
  },
  {
    name: "Bl. Anna Maria Taigi",
    dates: "1769–1837",
    location: "Basilica of San Crisogono, Rome, Italy",
    feast: "June 9",
    description: "A married laywoman and mother of seven children who experienced extraordinary mystical gifts, including a 'miraculous sun' vision in which she could see events happening around the world. Despite her humble life as a housewife, she was consulted by popes and cardinals. Her body remains incorrupt in Rome.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg/500px-Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg",
    detail: "Her incorruption is remarkable because she was neither a religious sister nor a cleric — she was a working-class wife and mother, proving that the highest holiness is accessible to everyone.",
  },
];

export default function IncorruptiblesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(160deg, #0a0a1a 0%, var(--navy-dark) 40%, #1a0a2a 70%, #0a0a1a 100%)",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>
          ✦ Miracula Sanctorum ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          The Incorruptible Saints
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "640px", margin: "0 auto 2rem", lineHeight: 1.8, fontSize: "0.97rem" }}>
          Throughout history, the bodies of certain holy men and women have resisted the natural process of decomposition — sometimes for centuries. The Church considers these incorrupt bodies as signs of God&apos;s power and the saint&apos;s extraordinary holiness.
        </p>

        {/* Scripture Banner */}
        <div style={{
          maxWidth: "600px", margin: "0 auto",
          background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "12px", padding: "1.5rem 2rem",
        }}>
          <p style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6, marginBottom: "0.5rem" }}>
            &ldquo;For you will not abandon my soul to Sheol, nor let your holy one see corruption.&rdquo;
          </p>
          <p style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.82rem", fontWeight: 600 }}>
            — Psalm 16:10
          </p>
        </div>
      </section>

      {/* Explanation */}
      <section style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.4rem", marginBottom: "1rem", textAlign: "center" }}>
            What Is Incorruptibility?
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem", textAlign: "center", marginBottom: "1rem" }}>
            Incorruptibility is the phenomenon in which a deceased person&apos;s body resists natural decomposition without embalming or other artificial preservation. In Catholic tradition, when the incorrupt body belongs to a person of recognized holiness, it is considered a miraculous sign — not necessary for canonization, but a powerful testimony to the reality of grace.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem", textAlign: "center" }}>
            Not all saints are incorrupt, and not all incorrupt bodies belong to canonized saints. The Church is careful to distinguish true incorruption from natural mummification or environmental preservation.
          </p>
        </div>
      </section>

      {/* Saints Grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {incorruptibles.map((saint) => (
            <article key={saint.name} style={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(26,39,68,0.08)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            className="sacred-card"
            >
              {/* Image */}
              <div style={{
                height: "220px",
                background: "var(--navy)",
                position: "relative",
              }}>
                <SafeImage src={saint.image} alt={saint.name} fill={true} style={{ objectPosition: "top" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "1rem 1.25rem 0.75rem", zIndex: 2 }}>
                  <span style={{ background: "rgba(201,168,76,0.9)", color: "var(--navy-dark)", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: "999px" }}>
                    Feast: {saint.feast}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.15rem", marginBottom: "0.2rem" }}>
                  {saint.name}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                  {saint.dates}
                </p>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.72rem", fontWeight: 600, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  📍 {saint.location}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, flex: 1, marginBottom: "1rem" }}>
                  {saint.description}
                </p>
                <div style={{ background: "var(--cream)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, fontStyle: "italic", borderLeft: "3px solid var(--gold)" }}>
                  {saint.detail}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          Explore More
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.75rem", marginBottom: "1rem" }}>
          Discover the Lives of the Saints
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Every saint was once a sinner who never gave up. Explore their biographies, miracles, and the lessons they offer for our lives today.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/saints" className="btn-sacred">Explore Saints</Link>
          <Link href="/miracles" className="btn-outline-sacred">View Miracles</Link>
        </div>
      </section>

      <style>{`@media(max-width:600px){div[style*="minmax(320px"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
