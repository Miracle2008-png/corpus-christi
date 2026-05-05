const fs = require('fs');
const path = require('path');

const newSaints = [
  {
    name: "Saint John Chrysostom",
    slug: "john-chrysostom",
    birth_date: "c. 347",
    death_date: "September 14, 407",
    feast_day: "September 13",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "doctor",
    known_for: "Golden-mouthed preaching, Divine Liturgy of St. John Chrysostom",
    patron_of: ["preachers", "orators", "speakers", "Constantinople", "epileptics"],
    biography_long: "John was born in Antioch. After practicing law, he became a monk and later a deacon and priest in Antioch, where his extraordinary eloquence earned him the nickname 'Chrysostomos' (Golden-Mouthed). Against his will, he was consecrated Archbishop of Constantinople in 398. He used his position to reform the corrupt clergy, sell church luxuries to feed the poor, and fearlessly denounce the extravagance of the imperial court, particularly Empress Eudoxia. This made him powerful enemies. He was banished twice, finally to the remote region of Pontus. He died in exile during a forced march, his final words being 'Glory to God for all things.'",
    miracles: ["His relics brought reconciliation and healing to Constantinople years after his exile"],
    quotes: [
      "Glory to God for all things.",
      "The bee is more honored than other animals, not because she labors, but because she labors for others.",
      "If you cannot find Christ in the beggar at the church door, you will not find Him in the chalice."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Jerome",
    slug: "jerome",
    birth_date: "c. 347",
    death_date: "September 30, 420",
    feast_day: "September 30",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "doctor",
    known_for: "Translating the Bible into Latin (The Vulgate), fierce temper, asceticism",
    patron_of: ["translators", "librarians", "archaeologists", "Bible scholars", "students"],
    biography_long: "Eusebius Sophronius Hieronymus was born in Dalmatia. A brilliant scholar, he went to Rome to study grammar and rhetoric, living a worldly life before experiencing a profound conversion. He lived as a hermit in the Syrian desert, mastering Hebrew. Pope Damasus commissioned him to translate the Bible from Greek and Hebrew into Latin. Jerome moved to Bethlehem, living in a cave near the site of the Nativity, and spent 40 years producing the Latin Vulgate—the standard Bible of the Western Church for over a millennium. Known for his fierce temper and blistering polemics against heretics, he engaged in famous literary disputes, notably with St. Augustine. He died in Bethlehem.",
    miracles: ["Removing a thorn from a lion's paw, after which the lion became a loyal companion (Legendary)"],
    quotes: [
      "Ignorance of Scripture is ignorance of Christ.",
      "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
      "A friend is long sought, hardly found, and with difficulty kept."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Thomas Becket",
    slug: "thomas-becket",
    birth_date: "December 21, 1119",
    death_date: "December 29, 1170",
    feast_day: "December 29",
    canonization_date: "February 21, 1173",
    canonized_by_pope: "Pope Alexander III",
    category: "martyr",
    known_for: "Martyrdom in Canterbury Cathedral, defending Church rights against the King",
    patron_of: ["secular clergy", "Portsmouth", "Exeter"],
    biography_long: "Thomas Becket was the brilliant, worldly Chancellor of England and a close friend of King Henry II. Hoping to consolidate royal control over the Church, Henry appointed Becket as Archbishop of Canterbury. To the King's shock, Becket underwent a radical conversion, resigned the chancellorship, and became a fierce defender of the Church's independence from the Crown. After years of bitter conflict and exile, Becket returned to England. Enraged by Becket's excommunication of royal supporters, Henry allegedly shouted, 'Will no one rid me of this turbulent priest?' Four knights traveled to Canterbury and brutally murdered Becket inside the cathedral during Vespers. His martyrdom shocked Europe, forcing the King to do public penance.",
    miracles: ["Countless miraculous healings at his shrine in Canterbury, which became one of Europe's premier pilgrimage sites (as famously recorded in Chaucer's Canterbury Tales)"],
    quotes: ["For the name of Jesus and the protection of the Church, I am ready to embrace death."],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Hildegard of Bingen",
    slug: "hildegard-of-bingen",
    birth_date: "1098",
    death_date: "September 17, 1179",
    feast_day: "September 17",
    canonization_date: "May 10, 2012",
    canonized_by_pope: "Pope Benedict XVI",
    category: "doctor",
    known_for: "The Sibyl of the Rhine, mystical visions, musical compositions, medicine",
    patron_of: ["musicians", "writers", "linguists", "natural scientists"],
    biography_long: "Hildegard was a German Benedictine abbess, writer, composer, philosopher, Christian mystic, visionary, and polymath. From the age of three, she experienced mystical visions, which she later described as the 'shade of the living light.' In her forties, she received a command from God to 'write down that which you see and hear.' With papal approval, she authored massive visionary theological works like Scivias. She also wrote extensive treatises on medicine and natural history, invented an alternative alphabet, and composed one of the largest repertoires of medieval sacred music, including the Ordo Virtutum, an early morality play. She corresponded with popes and emperors and preached publicly. Pope Benedict XVI named her a Doctor of the Church in 2012.",
    miracles: ["Healing the sick with water from the Rhine River", "Her visions revealing deep theological mysteries and medicinal cures"],
    quotes: [
      "The Word is living, being, spirit, all verdant greening, all creativity.",
      "Humanity, take a good look at yourself. Inside, you've got heaven and earth, and all of creation."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Robert Bellarmine",
    slug: "robert-bellarmine",
    birth_date: "October 4, 1542",
    death_date: "September 17, 1621",
    feast_day: "September 17",
    canonization_date: "June 29, 1930",
    canonized_by_pope: "Pope Pius XI",
    category: "doctor",
    known_for: "Defending the Catholic faith during the Counter-Reformation, Doctor of the Church",
    patron_of: ["catechists", "catechumens", "canon lawyers", "Cincinnati"],
    biography_long: "Robert Bellarmine was an Italian Jesuit and a cardinal of the Catholic Church. He was one of the most important figures in the Counter-Reformation. A brilliant intellectual, his massive work 'Disputationes de Controversiis' was the definitive Catholic defense against Protestant theology; it was so effective that special chairs were established in Protestant universities just to attempt to refute it. He taught at the Roman College and was the spiritual director of St. Aloysius Gonzaga. He played a significant role in the Galileo affair, advising caution and maintaining that the Church would have to reinterpret Scripture if heliocentrism were definitively proven. Despite his high office, he lived austerely, famously using the tapestries in his apartment to clothe the poor.",
    miracles: ["His intense and profound gift of tears during prayer"],
    quotes: [
      "Charity is that with which no man is lost, and without which no man is saved.",
      "Sweet Lord, you are playing a trick on me... You promise me heaven, but you are bringing heaven to me here on earth."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Charles Borromeo",
    slug: "charles-borromeo",
    birth_date: "October 2, 1538",
    death_date: "November 3, 1584",
    feast_day: "November 4",
    canonization_date: "November 1, 1610",
    canonized_by_pope: "Pope Paul V",
    category: "bishop",
    known_for: "Reforming the Diocese of Milan, implementing the Council of Trent, serving plague victims",
    patron_of: ["bishops", "catechists", "seminarians", "spiritual directors", "intestinal disorders"],
    biography_long: "Charles was a nephew of Pope Pius IV, who appointed him as a cardinal and administrator of Milan at age 21. Charles was instrumental in guiding the final session of the Council of Trent and writing the Roman Catechism. Ordained a priest and bishop, he finally moved to Milan, where he undertook a massive, rigorous reform of the corrupt and spiritually impoverished diocese. He established seminaries to educate ignorant clergy, enforced discipline, and reduced his own household to a life of strict poverty. During the great plague and famine of 1576, when secular officials fled, Charles remained in Milan, personally tending to the sick and using his own fortune to feed 70,000 people daily. He survived an assassination attempt by a rogue monastic order. He died of exhaustion at age 46.",
    miracles: ["Surviving an assassination attempt when a bullet fired at him at point-blank range failed to pierce his robes"],
    quotes: [
      "If a tiny spark of God's love already burns within you, do not expose it to the wind, for it may get blown out.",
      "Be sure that you first preach by the way you live."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Damien of Molokai",
    slug: "damien-of-molokai",
    birth_date: "January 3, 1840",
    death_date: "April 15, 1889",
    feast_day: "May 10",
    canonization_date: "October 11, 2009",
    canonized_by_pope: "Pope Benedict XVI",
    category: "confessor",
    known_for: "Apostle to the Lepers, volunteering to live in the leper colony of Kalaupapa",
    patron_of: ["people with leprosy", "outcasts", "HIV/AIDS patients", "State of Hawaii"],
    biography_long: "Jozef De Veuster was born in Belgium and joined the Congregation of the Sacred Hearts of Jesus and Mary. He volunteered for a mission in the Hawaiian Islands. In 1873, he volunteered to serve the quarantined leper colony on the isolated Kalaupapa Peninsula of Molokai. He found a lawless, despairing colony lacking basic medical care, housing, and spiritual guidance. Father Damien transformed the colony, building houses, schools, a hospital, and a church. He dressed their ulcers, built their coffins, and dug their graves. After 11 years, he contracted leprosy (Hansen's disease) himself. He famously began his sermon that Sunday not with 'My brethren,' but with 'We lepers.' He worked for five more years until the disease took his life.",
    miracles: [
      "Healing of a French nun from a terminal intestinal illness in 1895",
      "Healing of Audrey Toguchi from terminal lung cancer in 1999"
    ],
    quotes: [
      "I make myself a leper with the lepers to gain all to Jesus Christ.",
      "It is at the foot of the altar that we find the strength we need in our isolation."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Isaac Jogues",
    slug: "isaac-jogues",
    birth_date: "January 10, 1607",
    death_date: "October 18, 1646",
    feast_day: "October 19",
    canonization_date: "June 29, 1930",
    canonized_by_pope: "Pope Pius XI",
    category: "martyr",
    known_for: "North American Martyr, Jesuit missionary to the Huron and Mohawk",
    patron_of: ["the Americas", "Canada"],
    biography_long: "Isaac Jogues was a French Jesuit priest who traveled to New France (Canada) to evangelize the Huron people. In 1642, his party was ambushed by a Mohawk war party. Jogues and his companions were brutally tortured; Jogues's fingers were chewed off or burned, rendering him incapable of properly holding the Eucharistic host. He was held as a slave for 13 months before Dutch traders helped him escape to France. Upon his return, he was greeted as a living martyr; Pope Urban VIII gave him special dispensation to celebrate Mass despite his mutilated hands. Incredibly, Jogues volunteered to return to Mohawk territory as an ambassador of peace. Accused of causing crop failure through sorcery, he was captured again, tomahawked to death, and beheaded at Ossernenon (Auriesville, New York).",
    miracles: ["His extraordinary resilience and his return to the people who tortured him out of love for their souls"],
    quotes: [
      "My confidence is placed in God who does not need our help for accomplishing his designs.",
      "I felt as if it were a great privilege to be able to suffer for His name."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Gemma Galgani",
    slug: "gemma-galgani",
    birth_date: "March 12, 1878",
    death_date: "April 11, 1903",
    feast_day: "April 11",
    canonization_date: "May 2, 1940",
    canonized_by_pope: "Pope Pius XII",
    category: "virgin",
    known_for: "Stigmatist, Mystic, 'Daughter of Passion'",
    patron_of: ["students", "pharmacists", "paratroopers", "loss of parents", "back pain"],
    biography_long: "Gemma was born near Lucca, Italy. She lost her mother at a young age and later her father, leaving her and her siblings impoverished. A deeply pious girl, she desired to become a Passionist nun but was rejected due to her poor health, having miraculously recovered from spinal meningitis through the intercession of St. Gabriel of Our Lady of Sorrows. Starting in 1899, Gemma received the stigmata every Thursday evening, bleeding until Friday afternoon. She experienced intense mystical visions of Jesus, Mary, and her Guardian Angel, with whom she conversed familiarly. She also endured violent physical attacks from the devil. She died of tuberculosis on Holy Saturday at the age of 25. Her spiritual director, Venerable Germanus Ruoppolo, documented her extraordinary mystical life.",
    miracles: [
      "Her own miraculous cure from spinal meningitis",
      "Receiving the stigmata weekly",
      "Healing of an elderly woman from a stomach ulcer (Beatification miracle)"
    ],
    quotes: [
      "If you really want to love Jesus, first learn to suffer, because suffering teaches you to love.",
      "Let us go to Jesus. He is all alone and hardly anyone thinks of Him. Poor Jesus!"
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint John Paul II (Repeated check)",
    slug: "john-diego", // Using a different saint to avoid duplicates, let's use Juan Diego
    birth_date: "1474",
    death_date: "May 30, 1548",
    feast_day: "December 9",
    canonization_date: "July 31, 2002",
    canonized_by_pope: "Pope John Paul II",
    category: "confessor",
    known_for: "Visionary of Our Lady of Guadalupe, the Tilma",
    patron_of: ["Indigenous peoples of the Americas"],
    biography_long: "Born Cuauhtlatoatzin in the Aztec Empire, he converted to Catholicism and took the name Juan Diego following the Spanish conquest of Mexico. On December 9, 1531, while walking to Mass, he experienced a vision of the Virgin Mary on Tepeyac Hill. She appeared as a young indigenous woman and asked him to tell the bishop to build a church on the site. The bishop demanded a sign. Mary told Juan to gather Castilian roses—which were out of season and native to Spain—from the frozen, barren hilltop. Juan gathered them in his tilma (cloak). When he opened his tilma before the bishop, the roses fell to the floor, and the miraculous, radiant image of Our Lady of Guadalupe was imprinted on the cactus fiber cloth. The apparition sparked the conversion of millions of indigenous people to Catholicism. The tilma remains perfectly intact to this day.",
    miracles: [
      "The miraculous image of Our Lady of Guadalupe imprinted on his tilma, which defies scientific explanation and has not decayed after nearly 500 years",
      "The sudden mass conversion of the Aztec empire following the apparition"
    ],
    quotes: [
      "(Words of Mary to Juan Diego): 'Am I not here, I who am your mother? Are you not under my shadow and protection?'"
    ],
    image_url: "/images/saints/placeholder.jpg"
  }
];

const dataPath2 = path.join(__dirname, 'data', 'saints.json');
const existingSaints2 = JSON.parse(fs.readFileSync(dataPath2, 'utf8'));

// Filter out duplicates
const newSaintsFiltered2 = newSaints.filter(n => !existingSaints2.some(e => e.slug === n.slug));

const updatedSaints2 = [...existingSaints2, ...newSaintsFiltered2];
fs.writeFileSync(dataPath2, JSON.stringify(updatedSaints2, null, 2));

console.log(`Added ${newSaintsFiltered2.length} saints. Total saints: ${updatedSaints2.length}`);
