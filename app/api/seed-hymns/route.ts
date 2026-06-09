import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hymn from "@/models/Hymn";

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
  },
  {
    title: "Immaculate Mary",
    slug: "immaculate-mary",
    author: "Abbé Gaignet (Lourdes Hymn)",
    category: "marian",
    history: "A very popular Roman Catholic Marian hymn. It is also known as the Lourdes Hymn and is sung frequently at the Sanctuary of Our Lady of Lourdes.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Immaculate Mary, your praises we sing.\nYou reign now in heaven with Jesus our King.\nAve, Ave, Ave, Maria!\nAve, Ave, Maria!",
      },
      {
        stanza: 2,
        english_text: "In heaven the blessed your glory proclaim;\nOn earth we your children invoke your sweet name.\nAve, Ave, Ave, Maria!\nAve, Ave, Maria!",
      },
      {
        stanza: 3,
        english_text: "We pray for our Mother, the Church upon earth,\nAnd bless, Holy Mary, the land of our birth.\nAve, Ave, Ave, Maria!\nAve, Ave, Maria!",
      }
    ]
  },
  {
    title: "O Salutaris Hostia",
    latin_title: "O Salutaris Hostia",
    slug: "o-salutaris-hostia",
    author: "St. Thomas Aquinas",
    category: "eucharistic",
    history: "Written by St. Thomas Aquinas for the Feast of Corpus Christi. It consists of the last two stanzas of Verbum Supernum Prodiens.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "O salutaris Hostia,\nQuæ cæli pandis ostium:\nBella premunt hostilia,\nDa robur, fer auxilium.",
        english_text: "O saving Victim, opening wide\nThe gate of heaven to man below:\nOur foes press on from every side;\nThine aid supply, thy strength bestow.",
      },
      {
        stanza: 2,
        latin_text: "Uni trinoque Domino\nSit sempiterna gloria,\nQui vitam sine termino\nNobis donet in patria.\nAmen.",
        english_text: "All praise and thanks to thee ascend\nFor evermore, blest One in Three;\nO grant us life that shall not end\nIn our true native land with thee.\nAmen.",
      }
    ]
  },
  {
    title: "Veni Creator Spiritus",
    latin_title: "Veni Creator Spiritus",
    slug: "veni-creator-spiritus",
    author: "Rabanus Maurus (attributed)",
    category: "holy-spirit",
    history: "A traditional Latin hymn believed to have been written by Rabanus Maurus in the 9th century. It is heavily used in the liturgy for Pentecost.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Veni, Creator Spiritus,\nmentes tuorum visita,\nimple superna gratia\nquae tu creasti pectora.",
        english_text: "Come, Holy Ghost, Creator, come\nfrom thy bright heav'nly throne;\ncome, take possession of our souls,\nand make them all thine own.",
      },
      {
        stanza: 2,
        latin_text: "Qui diceris Paraclitus,\naltissimi donum Dei,\nfons vivus, ignis, caritas,\net spiritalis unctio.",
        english_text: "Thou who art called the Paraclete,\nbest gift of God above,\nthe living spring, the living fire,\nsweet unction and true love.",
      }
    ]
  },
  {
    title: "Be Thou My Vision",
    slug: "be-thou-my-vision",
    author: "St. Dallán Forgaill",
    category: "general",
    history: "An ancient Irish Christian hymn. The text is often attributed to the 6th-century Irish poet St. Dallán Forgaill.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Be Thou my vision, O Lord of my heart;\nNaught be all else to me, save that Thou art;\nThou my best thought, by day or by night;\nWaking or sleeping, Thy presence my light.",
      },
      {
        stanza: 2,
        english_text: "Be Thou my wisdom, and Thou my true Word;\nI ever with Thee and Thou with me, Lord;\nThou my great Father, and I Thy true son;\nThou in me dwelling, and I with Thee one.",
      },
      {
        stanza: 3,
        english_text: "Riches I heed not, nor man's empty praise;\nThou mine inheritance, now and always;\nThou and Thou only first in my heart;\nHigh King of heaven, my treasure Thou art.",
      }
    ]
  },
  {
    title: "Crown Him With Many Crowns",
    slug: "crown-him-with-many-crowns",
    author: "Matthew Bridges",
    category: "easter",
    history: "A traditional hymn written in 1851 by Catholic convert Matthew Bridges, celebrating the kingship and triumph of Christ.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Crown him with many crowns,\nthe Lamb upon his throne;\nhark, how the heav'nly anthem drowns\nall music but its own!\nAwake, my soul, and sing\nof him who died for thee,\nand hail him as thy matchless King\nthrough all eternity.",
      },
      {
        stanza: 2,
        english_text: "Crown him the Lord of love!\nBehold his hands and side,\nrich wounds, yet visible above,\nin beauty glorified.\nNo angel in the sky\ncan fully bear that sight,\nbut downward bends his burning eye\nat mysteries so bright.",
      }
    ]
  },
  {
    title: "Faith of Our Fathers",
    slug: "faith-of-our-fathers",
    author: "Frederick William Faber",
    category: "general",
    history: "A Catholic hymn written in 1849 by Frederick William Faber in memory of the Catholic martyrs from the time of the establishment of the Church of England.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Faith of our fathers, living still,\nIn spite of dungeon, fire and sword;\nO how our hearts beat high with joy,\nWhene'er we hear that glorious word!\nFaith of our fathers, holy faith!\nWe will be true to thee till death.",
      },
      {
        stanza: 2,
        english_text: "Our fathers, chained in prisons dark,\nWere still in heart and conscience free;\nAnd blest would be their children's fate,\nIf they, like them, should die for thee!\nFaith of our fathers, holy faith!\nWe will be true to thee till death.",
      }
    ]
  },
  {
    title: "Pange Lingua",
    latin_title: "Pange Lingua Gloriosi Corporis Mysterium",
    slug: "pange-lingua",
    author: "St. Thomas Aquinas",
    category: "eucharistic",
    history: "Written by St. Thomas Aquinas for the Feast of Corpus Christi. It extols the real presence of Christ in the Eucharist.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Pange, lingua, gloriosi\nCorporis mysterium,\nSanguinisque pretiosi,\nQuem in mundi pretium\nFructus ventris generosi\nRex effudit Gentium.",
        english_text: "Sing, my tongue, the Savior's glory,\nof His flesh the mystery sing;\nof the Blood, all price exceeding,\nshed by our immortal King,\ndestined, for the world's redemption,\nfrom a noble womb to spring.",
      },
      {
        stanza: 2,
        latin_text: "Nobis datus, nobis natus\nEx intacta Virgine,\nEt in mundo conversatus,\nSparso verbi semine,\nSui moras incolatus\nMiro clausit ordine.",
        english_text: "Of a pure and spotless Virgin\nborn for us on earth below,\nHe, as Man, with man conversing,\nstayed, the seeds of truth to sow;\nthen He closed in solemn order\nwondrously His life of woe.",
      }
    ]
  },
  {
    title: "Adoro Te Devote",
    latin_title: "Adoro Te Devote",
    slug: "adoro-te-devote",
    author: "St. Thomas Aquinas",
    category: "eucharistic",
    history: "One of the five Eucharistic hymns attributed to St. Thomas Aquinas. It is a deeply personal and theological meditation on the Eucharist.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Adoro te devote, latens Deitas,\nquae sub his figuris vere latitas:\ntibi se cor meum totum subjicit,\nquia te contemplans totum deficit.",
        english_text: "I devoutly adore You, hidden Deity,\nWho truly hide Yourself under these appearances:\nMy whole heart submits to You,\nBecause in contemplating You, it is fully deficient.",
      },
      {
        stanza: 2,
        latin_text: "Visus, tactus, gustus in te fallitur,\nsed auditu solo tuto creditur:\ncredo quidquid dixit Dei Filius:\nnil hoc verbo veritatis verius.",
        english_text: "Sight, touch, and taste in You are deceived,\nBut by hearing alone one safely believes:\nI believe whatever the Son of God has said:\nNothing is truer than this word of Truth.",
      }
    ]
  },
  {
    title: "Panis Angelicus",
    latin_title: "Panis Angelicus",
    slug: "panis-angelicus",
    author: "St. Thomas Aquinas",
    category: "eucharistic",
    history: "The penultimate strophe of the hymn 'Sacris solemniis' written by St. Thomas Aquinas for the Feast of Corpus Christi.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Panis angelicus\nfit panis hominum;\nDat panis cælicus\nfiguris terminum:\nO res mirabilis!\nManducat Dominum\nPauper, servus et humilis.",
        english_text: "The angelic bread\nbecomes the bread of men;\nThe heavenly bread\ngives an end to earthly forms:\nO marvelous thing!\nThe poor, the servant, and the humble\nFeed upon the Lord.",
      }
    ]
  },
  {
    title: "Attende Domine",
    latin_title: "Attende Domine",
    slug: "attende-domine",
    author: "Unknown",
    category: "lent",
    history: "A traditional Latin Lenten prose translated as 'Hear us, O Lord'.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Attende Domine, et miserere,\nquia peccavimus tibi.",
        english_text: "Hear us, O Lord, and have mercy upon us,\nfor we have sinned against thee.",
      },
      {
        stanza: 2,
        latin_text: "Ad te Rex summe, omnium Redemptor,\noculos nostros sublevamus flentes:\nexaudi, Christe, supplicantum preces.",
        english_text: "To thee, highest King, Redeemer of all,\nwe lift up our eyes weeping:\nhear, O Christ, the prayers of thy suppliants.",
      }
    ]
  },
  {
    title: "O Sacred Head, Surrounded",
    latin_title: "Salve caput cruentatum",
    slug: "o-sacred-head-surrounded",
    author: "St. Bernard of Clairvaux (attributed)",
    category: "lent",
    history: "A Christian Passion hymn based on a long medieval Latin poem with stanzas addressing the various parts of Christ's crucified body.",
    lyrics: [
      {
        stanza: 1,
        english_text: "O sacred Head, surrounded\nby crown of piercing thorn!\nO bleeding Head, so wounded,\nreviled and put to scorn!\nDeath's pallid hue comes o'er thee,\nthe glow of life decays,\nyet angel hosts adore thee,\nand tremble as they gaze.",
      },
      {
        stanza: 2,
        english_text: "I see thy strength and vigor\nall fading in the strife,\nand death with cruel rigor,\nbereaving thee of life;\nO agony and dying!\nO love to sinners free!\nJesus, all grace supplying,\nO turn thy face on me.",
      }
    ]
  },
  {
    title: "Regina Caeli",
    latin_title: "Regina Caeli",
    slug: "regina-caeli",
    author: "Unknown",
    category: "marian",
    history: "One of the four Marian antiphons, traditionally sung or recited during the Easter season in place of the Angelus.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Regina caeli, laetare, alleluia;\nQuia quem meruisti portare, alleluia,\nResurrexit, sicut dixit, alleluia:\nOra pro nobis Deum, alleluia.",
        english_text: "Queen of Heaven, rejoice, alleluia.\nFor He whom you did merit to bear, alleluia.\nHas risen, as he said, alleluia.\nPray for us to God, alleluia.",
      }
    ]
  },
  {
    title: "Ave Maris Stella",
    latin_title: "Ave Maris Stella",
    slug: "ave-maris-stella",
    author: "Unknown",
    category: "marian",
    history: "A plainsong Marian hymn, especially popular in the Middle Ages. It is often sung at Vespers on Marian feasts.",
    lyrics: [
      {
        stanza: 1,
        latin_text: "Ave maris stella,\nDei Mater alma,\natque semper Virgo,\nfelix caeli porta.",
        english_text: "Hail, star of the sea,\nloving Mother of God,\nand always a virgin,\nhappy gate of heaven.",
      },
      {
        stanza: 2,
        latin_text: "Solve vincla reis,\nprofer lumen caecis,\nmala nostra pelle,\nbona cuncta posce.",
        english_text: "Break the chains of sinners,\nbring light to the blind,\ndrive away our evils,\nask for all good things.",
      }
    ]
  },
  {
    title: "Come, Holy Ghost",
    slug: "come-holy-ghost",
    author: "Rabanus Maurus",
    category: "holy-spirit",
    history: "An English translation of Veni Creator Spiritus, widely sung at Pentecost and Confirmations.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Come, Holy Ghost, Creator blest,\nand in our hearts take up Thy rest;\ncome with Thy grace and heav'nly aid\nto fill the hearts which Thou hast made.",
      },
      {
        stanza: 2,
        english_text: "O Comforter, to Thee we cry,\nThou heav'nly gift of God most high,\nThou fount of life, and fire of love,\nand sweet anointing from above.",
      }
    ]
  },
  {
    title: "Hail Redeemer, King Divine",
    slug: "hail-redeemer-king-divine",
    author: "Rev. Patrick Brennan",
    category: "general",
    history: "A very popular Catholic hymn honoring Christ the King.",
    lyrics: [
      {
        stanza: 1,
        english_text: "Hail Redeemer, King divine!\nPriest and Lamb, the throne is thine;\nKing, whose reign shall never cease,\nPrince of everlasting peace.",
      },
      {
        stanza: 2,
        english_text: "Angels, saints and nations sing:\n\"Praised be Jesus Christ our King;\nLord of life, earth, sky and sea,\nKing of love on Calvary.\"",
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    
    // Simple protection for seed endpoint to prevent spam, can use a secret from env
    // For now, allowing without auth for ease of use in initial setup
    
    await connectDB();
    await Hymn.deleteMany({});
    const result = await Hymn.insertMany(hymnsData);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} hymns`,
    });
  } catch (error) {
    console.error("Failed to seed hymns:", error);
    return NextResponse.json({ error: "Failed to seed hymns" }, { status: 500 });
  }
}
