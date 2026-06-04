import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Import Model
import Hymn from "../models/Hymn";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const hymnsData = [
  {
    title: "Salve Regina",
    latin_title: "Salve Regina",
    slug: "salve-regina",
    author: "Hermann of Reichenau (attributed)",
    category: "marian",
    history: "One of four Marian antiphons sung at different seasons within the Christian liturgical calendar of the Catholic Church. The Salve Regina is traditionally sung at Compline in the time from the Saturday before Trinity Sunday until the Friday before the first Sunday of Advent.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Salve, Regina, Mater misericordiæ,\nvita, dulcedo, et spes nostra, salve.",
        english_text: "Hail, holy Queen, Mother of Mercy,\nHail our life, our sweetness and our hope.",
      },
      {
        stanza: 2,
        latin_text: "Ad te clamamus exsules filii Hevæ,\nAd te suspiramus, gementes et flentes\nin hac lacrimarum valle.",
        english_text: "To thee do we cry, Poor banished children of Eve;\nTo thee do we send up our sighs,\nMourning and weeping in this valley of tears.",
      },
      {
        stanza: 3,
        latin_text: "Eia, ergo, advocata nostra, illos tuos\nmisericordes oculos ad nos converte;",
        english_text: "Turn then, most gracious advocate,\nThine eyes of mercy toward us;",
      },
      {
        stanza: 4,
        latin_text: "Et Jesum, benedictum fructum ventris tui,\nnobis post hoc exsilium ostende.\nO clemens, O pia, O dulcis Virgo Maria.",
        english_text: "And after this our exile, show unto us\nThe blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary.",
      }
    ]
  },
  {
    title: "Tantum Ergo",
    latin_title: "Tantum Ergo Sacramentum",
    slug: "tantum-ergo",
    author: "St. Thomas Aquinas",
    category: "eucharistic",
    history: "Comprises the last two stanzas of Pange Lingua Gloriosi Corporis Mysterium, a medieval Latin hymn written by St. Thomas Aquinas for the Feast of Corpus Christi. It is sung during the veneration and Benediction of the Blessed Sacrament.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Tantum ergo Sacramentum\nVeneremur cernui:\nEt antiquum documentum\nNovo cedat ritui:\nPræstet fides supplementum\nSensuum defectui.",
        english_text: "Down in adoration falling,\nLo! the sacred Host we hail,\nLo! oe'r ancient forms departing\nNewer rites of grace prevail;\nFaith for all defects supplying,\nWhere the feeble senses fail.",
      },
      {
        stanza: 2,
        latin_text: "Genitori, Genitoque\nLaus et jubilatio,\nSalus, honor, virtus quoque\nSit et benedictio:\nProcedenti ab utroque\nCompar sit laudatio.\nAmen.",
        english_text: "To the Everlasting Father,\nAnd the Son Who reigns on high\nWith the Holy Spirit proceeding\nForth from each eternally,\nBe salvation, honor, blessing,\nMight and endless majesty.\nAmen.",
      }
    ]
  },
  {
    title: "Holy God, We Praise Thy Name",
    latin_title: "Te Deum laudamus",
    slug: "holy-god-we-praise-thy-name",
    author: "Ignaz Franz",
    category: "general",
    history: "A Catholic paraphrase of the Te Deum, translated into English by Rev. Clarence A. Walworth. It is commonly sung as a hymn of thanksgiving.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Holy God, we praise Thy Name;\nLord of all, we bow before Thee!\nAll on earth Thy scepter claim,\nAll in Heaven above adore Thee;\nInfinite Thy vast domain,\nEverlasting is Thy reign.",
      },
      {
        stanza: 2,
        english_text: "Hark! the loud celestial hymn\nAngel choirs above are raising,\nCherubim and seraphim,\nIn unceasing chorus praising;\nFill the heavens with sweet accord:\nHoly, holy, holy, Lord.",
      },
      {
        stanza: 3,
        english_text: "Holy Father, Holy Son,\nHoly Spirit, Three we name Thee;\nWhile in essence only One,\nUndivided God we claim Thee;\nAnd adoring bend the knee,\nWhile we own the mystery.",
      }
    ]
  },
  {
    title: "O Come, O Come, Emmanuel",
    latin_title: "Veni, veni, Emmanuel",
    slug: "o-come-o-come-emmanuel",
    author: "Unknown (O Antiphons)",
    category: "advent",
    history: "A translation of the Latin hymn 'Veni, veni, Emmanuel', which is a metrical paraphrase of the O Antiphons, a series of plainchant antiphons attached to the Magnificat at Vespers over the final days before Christmas.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Veni, veni Emmanuel!\nCaptivum solve Israel!\nQui gemit in exilio,\nPrivatus Dei Filio,\nGaude, gaude, Emmanuel\nnascetur pro te, Israel.",
        english_text: "O come, O come, Emmanuel,\nAnd ransom captive Israel,\nThat mourns in lonely exile here\nUntil the Son of God appear.\nRejoice! Rejoice!\nEmmanuel shall come to thee, O Israel.",
      },
      {
        stanza: 2,
        english_text: "O come, Thou Wisdom from on high,\nWho orderest all things mightily;\nTo us the path of knowledge show,\nAnd teach us in her ways to go.\nRejoice! Rejoice!\nEmmanuel shall come to thee, O Israel.",
      },
      {
        stanza: 3,
        english_text: "O come, Thou Dayspring from on high,\nAnd cheer us by thy drawing nigh;\nDisperse the gloomy clouds of night,\nAnd death's dark shadow put to flight.\nRejoice! Rejoice!\nEmmanuel shall come to thee, O Israel.",
      }
    ]
  },
  {
    title: "Let All Mortal Flesh Keep Silence",
    slug: "let-all-mortal-flesh-keep-silence",
    author: "Liturgy of St. James (Translated by Gerard Moultrie)",
    category: "eucharistic",
    history: "An ancient Christian hymn from the Divine Liturgy of St. James. It is traditionally sung as the Cherubic Hymn during the Great Entrance of the liturgy.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Let all mortal flesh keep silence,\nAnd with fear and trembling stand;\nPonder nothing earthly-minded,\nFor with blessing in His hand,\nChrist our God to earth descendeth,\nOur full homage to demand.",
      },
      {
        stanza: 2,
        english_text: "King of kings, yet born of Mary,\nAs of old on earth He stood,\nLord of lords, in human vesture,\nIn the body and the blood;\nHe will give to all the faithful\nHis own self for heavenly food.",
      },
      {
        stanza: 3,
        english_text: "Rank on rank the host of heaven\nSpreads its vanguard on the way,\nAs the Light of light descendeth\nFrom the realms of endless day,\nThat the powers of hell may vanish\nAs the darkness clears away.",
      },
      {
        stanza: 4,
        english_text: "At His feet the six-winged seraph,\nCherubim with sleepless eye,\nVeil their faces to the presence,\nAs with ceaseless voice they cry:\n\"Alleluia, Alleluia,\nAlleluia, Lord Most High!\"",
      }
    ]
  }
];

async function seedHymns() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB for Hymns seeding.");

    // Clear existing hymns
    await Hymn.deleteMany({});
    console.log("Cleared existing hymns collection.");

    // Insert new hymns
    const result = await Hymn.insertMany(hymnsData);
    console.log(`Successfully seeded ${result.length} hymns.`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding hymns:", error);
    process.exit(1);
  }
}

seedHymns();
