"use client";
import { useState } from "react";

const MARY_IMAGE = "/images/mary.jpg";

const mysteries = [
  { set: "Joyful Mysteries", days: "Monday & Saturday", list: [
    { n: 1, title: "The Annunciation", ref: "Luke 1:26-38", fruit: "Humility", desc: "The Angel Gabriel appears to Mary and announces she will conceive the Son of God by the Holy Spirit. Mary's response — 'Let it be done to me according to your word' — is the perfect act of faith and the model of all Christian surrender. Heaven holds its breath as a young woman in Nazareth says yes to God, and the Word begins to take flesh." },
    { n: 2, title: "The Visitation", ref: "Luke 1:39-56", fruit: "Charity", desc: "Mary, newly pregnant, immediately sets out to visit her elderly cousin Elizabeth, who is six months pregnant with John the Baptist. When Mary's greeting reaches Elizabeth's ears, the child leaps in her womb and Elizabeth is filled with the Holy Spirit. The Magnificat pours from Mary's lips — the great hymn of the lowly exalting God." },
    { n: 3, title: "The Nativity", ref: "Luke 2:1-20", fruit: "Poverty of Spirit", desc: "The eternal Son of God is born in a stable in Bethlehem because there was no room in the inn. Shepherds are the first to hear the angels' song. The One who holds the universe is laid in a feeding trough. God enters creation in absolute poverty and vulnerability — to meet us exactly where we are." },
    { n: 4, title: "The Presentation", ref: "Luke 2:22-38", fruit: "Obedience", desc: "Mary and Joseph present Jesus at the Temple in Jerusalem, following the Law of Moses. The aged Simeon takes the child in his arms and recognizes the Messiah. He blesses the family and prophesies: 'This child is destined to cause the falling and rising of many in Israel — and a sword will pierce your own soul.' Mary receives the first shadow of the cross." },
    { n: 5, title: "Finding Jesus in the Temple", ref: "Luke 2:41-52", fruit: "Zeal for God", desc: "At age twelve, Jesus remains behind in Jerusalem after Passover. After three days of searching, Mary and Joseph find Him in the Temple, sitting among the teachers, listening and asking questions. All who heard Him were amazed. To Mary's anguish He says: 'Did you not know that I must be about my Father's business?' Jesus belongs first to the Father." },
  ]},
  { set: "Luminous Mysteries", days: "Thursday", list: [
    { n: 1, title: "The Baptism of Jesus", ref: "Matthew 3:13-17", fruit: "Openness to the Holy Spirit", desc: "Jesus comes to John at the Jordan River and insists on being baptized. As He rises from the water, the heavens open, the Holy Spirit descends as a dove, and the Father's voice thunders: 'This is my beloved Son, in whom I am well pleased.' The Trinity is revealed together for the first time. Jesus sanctifies the waters of Baptism and all who will receive it." },
    { n: 2, title: "The Wedding at Cana", ref: "John 2:1-11", fruit: "Marian Intercession", desc: "At a wedding feast in Cana, the wine runs out. Mary notices before anyone else and goes to Jesus: 'They have no wine.' Jesus replies that His hour has not yet come. Yet Mary turns to the servants and says: 'Do whatever He tells you.' At Mary's intercession, Jesus performs His first public miracle — turning water into the finest wine. The disciples believe." },
    { n: 3, title: "Proclamation of the Kingdom", ref: "Mark 1:14-15", fruit: "Repentance and Trust", desc: "Jesus goes through Galilee proclaiming: 'The time is fulfilled, and the Kingdom of God is at hand; repent and believe in the gospel.' He calls fishermen from their nets, heals the sick, casts out demons, and forgives sinners. The Kingdom is not a place — it is the reign of God breaking into history wherever Jesus is present and received." },
    { n: 4, title: "The Transfiguration", ref: "Matthew 17:1-8", fruit: "Desire for Holiness", desc: "Jesus takes Peter, James, and John to the top of a high mountain. Before their eyes He is transfigured — His face shines like the sun, His garments become dazzling white. Moses and Elijah appear beside Him. The Father speaks from a bright cloud: 'This is my beloved Son, with whom I am well pleased; listen to Him.' The disciples fall on their faces in awe." },
    { n: 5, title: "Institution of the Eucharist", ref: "Luke 22:14-20", fruit: "Eucharistic Adoration", desc: "At the Last Supper on Holy Thursday, Jesus takes bread, blesses it, breaks it, and says: 'This is my Body which will be given up for you.' He takes the chalice and says: 'This is the chalice of my Blood, the Blood of the new and eternal covenant, which will be poured out for you and for many for the forgiveness of sins. Do this in memory of me.' The source and summit of Christian life is instituted." },
  ]},
  { set: "Sorrowful Mysteries", days: "Tuesday & Friday", list: [
    { n: 1, title: "The Agony in the Garden", ref: "Luke 22:39-46", fruit: "Conformity to God's Will", desc: "Jesus goes to the Garden of Gethsemane on the night of His arrest. He prays with such intensity that His sweat becomes like drops of blood falling to the ground. 'Father, if you are willing, take this cup from me; yet not my will, but yours be done.' An angel comes to strengthen Him. He accepted, in full human terror, the Father's will. This is the foundation of all Christian prayer." },
    { n: 2, title: "The Scourging at the Pillar", ref: "Matthew 27:26", fruit: "Mortification", desc: "At Pilate's order, Jesus is bound to a stone pillar and flogged by Roman soldiers. Roman scourging was among the most brutal punishments in the ancient world — the flagrum stripped flesh to the bone. Isaiah foresaw this: 'By His wounds we are healed.' Every blow absorbs human sin. The Body that fed thousands in the wilderness is now destroyed for the salvation of the world." },
    { n: 3, title: "Crowning with Thorns", ref: "Matthew 27:27-31", fruit: "Moral Courage", desc: "The soldiers twist a crown of long thorns into Jesus's scalp and press it down. They place a purple robe on His torn back and a reed in His hand. They kneel in mockery: 'Hail, King of the Jews!' They spit on Him and strike the crown deeper with the reed. Pilate presents Him to the crowd: 'Behold the man.' They cannot see that this battered figure is, in fact, the King of Kings." },
    { n: 4, title: "The Carrying of the Cross", ref: "John 19:17", fruit: "Patience in Suffering", desc: "Jesus takes up His cross and carries it through the streets of Jerusalem toward Golgotha. He has been awake all night, tortured, and is near death from blood loss. He falls three times. He meets His mother. Simon of Cyrene is conscripted to help. Veronica wipes His face. The women of Jerusalem weep. Every step is a free choice — He could call legions of angels. He does not." },
    { n: 5, title: "The Crucifixion and Death", ref: "John 19:18-30", fruit: "Salvation", desc: "At nine in the morning, Jesus is nailed to the cross at Golgotha, between two criminals. From the cross He speaks seven words: He forgives His executioners; He promises paradise to the repentant thief; He gives His mother to John and John to His mother; He cries out in the agony of abandonment; He thirsts; He declares all finished; He commends His spirit to the Father. At 3 PM He dies. The earth shakes. The temple veil tears from top to bottom. Tetelestai — it is finished." },
  ]},
  { set: "Glorious Mysteries", days: "Wednesday & Sunday", list: [
    { n: 1, title: "The Resurrection", ref: "John 20:1-18", fruit: "Faith", desc: "On the third day, before dawn, Mary Magdalene goes to the tomb and finds the stone rolled away. She runs for Peter and John. When John enters the tomb and sees the burial cloths lying folded, he sees and believes. Jesus appears to Mary Magdalene in the garden — she mistakes Him for the gardener until He speaks her name. Death is defeated. The resurrection of Jesus is the hinge of all history." },
    { n: 2, title: "The Ascension", ref: "Acts 1:6-11", fruit: "Hope in Eternal Life", desc: "Forty days after the Resurrection, Jesus leads His disciples to the Mount of Olives. He blesses them, and as He is blessing them, He is taken up into heaven before their eyes. A cloud receives Him. Two men in white robes appear: 'Why do you stand looking into the sky? This Jesus, who has been taken from you into heaven, will come back in the same way.' He goes to prepare a place for us." },
    { n: 3, title: "Descent of the Holy Spirit", ref: "Acts 2:1-13", fruit: "Love of God and Neighbor", desc: "On the feast of Pentecost, fifty days after Passover, the apostles are gathered in the Upper Room with Mary. A sound like a rushing mighty wind fills the house. Tongues of fire rest on each of them. They are all filled with the Holy Spirit and begin to speak in other languages. Three thousand are baptized that day. The Church is born. The age of the Spirit begins." },
    { n: 4, title: "The Assumption of Mary", ref: "Revelation 12:1", fruit: "Grace of a Holy Death", desc: "At the completion of her earthly life, the Blessed Virgin Mary is taken up body and soul into heavenly glory. She shares in her Son's victory over death — not by her own power but by His grace. She is the first human being to experience what the resurrection of the body means for all the redeemed. In Mary assumed into heaven, we see the destiny of the Church and of every baptised soul." },
    { n: 5, title: "Coronation of Mary, Queen of Heaven", ref: "Revelation 12:1", fruit: "Trust in Mary's Intercession", desc: "In heaven, Mary is crowned Queen by her Son — not because she earned a throne, but because she is the Mother of the King and the perfect disciple. She reigns at the right hand of Christ, interceding without ceasing for her children on earth. From the throne of grace, she holds every rosary bead ever prayed, every desperate cry ever whispered to her, and presents them to her Son." },
  ]},
];

const prayers = [
  { title: "The Apostles' Creed", when: "Begin the Rosary", latin: "Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae...", text: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen." },
  { title: "Our Father", when: "Once per decade", latin: "Pater noster, qui es in caelis, sanctificetur nomen tuum...", text: "Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
  { title: "Hail Mary", when: "Ten times per decade", latin: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus...", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
  { title: "Glory Be", when: "After each decade", latin: "Gloria Patri et Filio et Spiritui Sancto...", text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen." },
  { title: "Fatima Prayer", when: "After each Glory Be", latin: "O mi Jesu, dimitte nobis debita nostra...", text: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen." },
  { title: "Hail Holy Queen (Salve Regina)", when: "Close the Rosary", latin: "Salve, Regina, Mater misericordiae; vita, dulcedo et spes nostra, salve...", text: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope! To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy towards us, and after this our exile, show unto us the blessed Fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen." },
  { title: "The Benediction", when: "Final blessing", latin: "Beatissima Virgo Maria...", text: "Let us pray. O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life: grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain, and obtain what they promise. Through the same Christ our Lord. Amen.\n\nMay the divine assistance remain always with us. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen." },
];

const rosaryMiracles = [
  { title: "Battle of Lepanto, 1571", desc: "Pope Pius V called all of Europe to pray the Rosary before the Battle of Lepanto on October 7, 1571. The Christian fleet, vastly outnumbered by the Ottoman armada, won a decisive victory that saved Western civilization. Pope Pius V, hundreds of miles away in Rome, reportedly had a vision of the victory before any messenger arrived. He attributed the victory entirely to the Rosary and established October 7 as the Feast of Our Lady of Victory, now Our Lady of the Rosary.", youtube: "https://www.youtube.com/watch?v=LZ3gfbZMfkU" },
  { title: "Hiroshima — The Miracle of the Eight Jesuits", desc: "On August 6, 1945, the atomic bomb was dropped on Hiroshima. Eight Jesuit priests living in a rectory less than a mile from the epicenter survived without radiation sickness or significant injury. Fr. Hubert Schiffer, who survived, later testified: 'We believe that we survived because we were living the message of Fatima. We lived and prayed the Rosary daily.' When scientific teams examined the site, they had no natural explanation for the priests' survival. Fr. Schiffer was examined over 200 times by atomic bomb experts. No abnormalities were ever found.", youtube: "https://www.youtube.com/watch?v=A9u2kHiJbfY" },
  { title: "Father Peyton and the National Rosary Crusade", desc: "Fr. Patrick Peyton, CSC, diagnosed with terminal tuberculosis in 1939, prayed the Rosary daily for healing. He recovered completely, which he attributed to Our Lady's intercession. He went on to found the Family Rosary Crusade, holding Rosary rallies attended by millions across six continents. At his São Paulo rally in Brazil, over one million people gathered. His famous motto: 'The family that prays together stays together.'", youtube: "https://www.youtube.com/watch?v=MN9jfYHVtME" },
  { title: "Our Lady of Pompeii and the Miraculous Picture", desc: "In 1875, a battered and worm-eaten canvas of Our Lady of the Rosary was transported on a cart of manure to a chapel in Pompeii, Italy. Within years, remarkable healings were reported by those who prayed the Rosary before the image. The most famous was the healing of Fortuna Agrelli, a young girl given up by doctors as hopeless. After a novena of Rosaries before the image, she was fully healed. The Vatican investigated and confirmed the healing as miraculous. The chapel became the Basilica of Our Lady of the Rosary of Pompei.", youtube: "https://www.youtube.com/watch?v=kKJLqF8e65U" },
];

export default function RosaryPage() {
  const [activeSet, setActiveSet] = useState(0);
  const [activeMystery, setActiveMystery] = useState(0);
  const [showLatin, setShowLatin] = useState(false);
  const [tab, setTab] = useState<"mysteries"|"prayers"|"miracles">("mysteries");

  const mystery = mysteries[activeSet].list[activeMystery];

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)" }}>

      {/* Hero with Mary image */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src={MARY_IMAGE}
          alt="Virgin of the Rosary by Bartolomé Esteban Murillo, c. 1650"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.8)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,39,68,0.3) 0%, var(--navy) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 1.5rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>The Most Holy Rosary</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem,7vw,5rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.1 }}>
            Pray the Holy Rosary
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 1rem", lineHeight: 1.7 }}>
            The Rosary is the weapon of our times. — Pope Pius XI
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontStyle: "italic" }}>
            Our Lady of the Rosary by Bartolomé Esteban Murillo, c. 1650 · Public Domain
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        {(["mysteries","prayers","miracles"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "0.6rem 1.4rem", borderRadius: "999px",
            border: "1.5px solid rgba(201,168,76,0.4)",
            background: tab === t ? "var(--gold)" : "transparent",
            color: tab === t ? "var(--navy-dark)" : "var(--gold)",
            fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
            textTransform: "capitalize", transition: "all 0.2s",
          }}>
            {t === "mysteries" ? "The Mysteries" : t === "prayers" ? "All Prayers" : "Rosary Miracles"}
          </button>
        ))}
      </div>

      {/* MYSTERIES TAB */}
      {tab === "mysteries" && (
        <div className="container-sacred" style={{ maxWidth: "1100px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          {/* Set selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
            {mysteries.map((m, i) => (
              <button key={m.set} onClick={() => { setActiveSet(i); setActiveMystery(0); }} style={{
                padding: "1rem 1.25rem", borderRadius: "10px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                border: `2px solid ${i === activeSet ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
                background: i === activeSet ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.02)",
              }}>
                <p style={{ color: i === activeSet ? "var(--gold)" : "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{m.set}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{m.days}</p>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}>
            {/* Mystery list */}
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", marginBottom: "1.25rem", fontSize: "1.2rem" }}>{mysteries[activeSet].set}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {mysteries[activeSet].list.map((m, i) => (
                  <button key={i} onClick={() => setActiveMystery(i)} style={{
                    padding: "0.9rem 1rem", borderRadius: "8px", textAlign: "left", cursor: "pointer", transition: "all 0.2s",
                    border: `1.5px solid ${i === activeMystery ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)"}`,
                    background: i === activeMystery ? "rgba(201,168,76,0.1)" : "transparent",
                    display: "flex", gap: "0.75rem", alignItems: "flex-start",
                  }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.82rem", minWidth: "1.5rem" }}>{m.n}.</span>
                    <div>
                      <p style={{ color: i === activeMystery ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.15rem" }}>{m.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>{m.ref}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mystery detail */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "1.75rem" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Mystery {activeMystery + 1}</p>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.4rem", marginBottom: "0.5rem" }}>{mystery.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "1rem" }}>{mystery.ref}</p>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.92rem" }}>{mystery.desc}</p>
              <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.875rem" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Spiritual Fruit</p>
                <p style={{ color: "#fff", fontWeight: 600 }}>{mystery.fruit}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: "1.25rem" }}>
                For each mystery: 1 Our Father · 10 Hail Marys · 1 Glory Be · 1 Fatima Prayer
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PRAYERS TAB */}
      {tab === "prayers" && (
        <div className="container-sacred" style={{ maxWidth: "800px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
            <button onClick={() => setShowLatin(!showLatin)} style={{
              background: showLatin ? "rgba(201,168,76,0.2)" : "transparent",
              border: "1.5px solid rgba(201,168,76,0.4)", color: "var(--gold)",
              padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600,
            }}>
              {showLatin ? "Show English" : "Show Latin"}
            </button>
          </div>
          {prayers.map((p, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem" }}>{p.title}</h3>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontStyle: "italic" }}>{p.when}</span>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.95, whiteSpace: "pre-wrap" }}>
                {showLatin ? p.latin : p.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* MIRACLES TAB */}
      {tab === "miracles" && (
        <div className="container-sacred" style={{ maxWidth: "900px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Throughout history, the Rosary has been associated with miraculous events — military victories, physical healings, and extraordinary providences — documented by the Church and confirmed by historical record.
          </p>
          {rosaryMiracles.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderLeft: "4px solid var(--gold)", borderRadius: "0 12px 12px 0", padding: "1.75rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem", marginBottom: "0.75rem" }}>{m.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.25rem" }}>{m.desc}</p>
              <a href={m.youtube} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,80,80,0.3)",
                color: "#ff6b6b", padding: "0.5rem 1rem", borderRadius: "8px",
                textDecoration: "none", fontSize: "0.82rem", fontWeight: 600,
              }}>
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
