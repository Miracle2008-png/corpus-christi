const fs = require('fs');
const path = require('path');

const newSaints = [
  {
    name: "Saint Joseph",
    slug: "joseph",
    birth_date: "c. 90 BC",
    death_date: "c. 18 AD",
    feast_day: "March 19",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "confessor",
    known_for: "Foster father of Jesus, Husband of Mary, Patron of the Universal Church",
    patron_of: ["fathers", "workers", "the Universal Church", "a happy death", "carpenters"],
    biography_long: "Saint Joseph was the husband of the Blessed Virgin Mary and the legal father of Jesus Christ. A carpenter from Nazareth, he was of the royal lineage of King David. The Gospels describe him as a 'just man.' When he discovered Mary was pregnant before they lived together, he planned to divorce her quietly to spare her public disgrace, but an angel appeared to him in a dream revealing that the child was conceived by the Holy Spirit. He protected the Holy Family, fleeing to Egypt to save the infant Jesus from Herod's massacre. Joseph is venerated as the patron of the Universal Church, workers, and a happy death, as tradition holds he died in the arms of Jesus and Mary.",
    miracles: [
      "Staircase at Loretto Chapel in Santa Fe, New Mexico (attributed)",
      "Miraculous protection of the Holy Family during the Flight to Egypt"
    ],
    quotes: [
      "(No spoken words of St. Joseph are recorded in Scripture, highlighting his silent obedience and humility.)"
    ],
    image_url: "/images/saints/joseph.jpg"
  },
  {
    name: "Saint Anthony of Padua",
    slug: "anthony-of-padua",
    birth_date: "August 15, 1195",
    death_date: "June 13, 1231",
    feast_day: "June 13",
    canonization_date: "May 30, 1232",
    canonized_by_pope: "Pope Gregory IX",
    category: "doctor",
    known_for: "Evangelical Doctor, finding lost things, miraculous preaching",
    patron_of: ["lost items", "lost people", "lost souls", "amputees", "fishermen", "Padua"],
    biography_long: "Born Fernando Martins in Lisbon, Portugal, he initially joined the Augustinian Canons before transferring to the Franciscan Order, hoping to be martyred in Morocco. Illness forced his return to Europe, where a storm blew his ship to Italy. There, he met St. Francis of Assisi. Anthony's extraordinary gift for preaching was discovered by accident when he was asked to give an unprepared homily. He became known as the 'Hammer of Heretics' for his eloquent defense of the Catholic faith against the Cathar heresy. After his death at age 35, his tongue remained miraculously incorrupt, a testament to his preaching.",
    miracles: [
      "Preaching to the fishes in Rimini when the heretics would not listen",
      "The miracle of the mule kneeling before the Eucharist",
      "Holding the Infant Jesus in his arms (a frequent vision)"
    ],
    quotes: [
      "Actions speak louder than words; let your words teach and your actions speak.",
      "Earthly riches are like the reed. Its roots are sunk in the swamp, and its exterior is fair to behold; but inside it is hollow.",
      "The creator of the heavens obeys a carpenter; the God of eternal glory listens to a poor virgin."
    ],
    image_url: "/images/saints/anthony-of-padua.jpg"
  },
  {
    name: "Saint Maximilian Kolbe",
    slug: "maximilian-kolbe",
    birth_date: "January 8, 1894",
    death_date: "August 14, 1941",
    feast_day: "August 14",
    canonization_date: "October 10, 1982",
    canonized_by_pope: "Pope John Paul II",
    category: "martyr",
    known_for: "Apostle of Consecration to Mary, Martyr of Charity at Auschwitz",
    patron_of: ["drug addicts", "political prisoners", "families", "journalists", "the pro-life movement"],
    biography_long: "Raymond Kolbe was born in Poland. As a child, he had a vision of the Virgin Mary holding two crowns: one white for purity, one red for martyrdom. He accepted both. Joining the Conventual Franciscans, he founded the Militia Immaculatae (Army of the Immaculate One) to evangelize through modern media, building a massive monastery and printing press in Niepokalanów, and later a mission in Japan. During WWII, he provided shelter to refugees, including 2,000 Jews, hiding them from the Nazis. Arrested and sent to Auschwitz, he volunteered to take the place of Franciszek Gajowniczek, a man condemned to the starvation bunker. After surviving two weeks of starvation while leading the others in prayer, he was killed with a lethal injection.",
    miracles: [
      "Healing of Angela Testoni from intestinal tuberculosis (Beatification)",
      "Healing of Francis Ranier from arterial sclerosis (Canonization)"
    ],
    quotes: [
      "No one in the world can change Truth. What we can do and and should do is to seek truth and to serve it when we have found it.",
      "The most deadly poison of our times is indifference.",
      "Let us remember that love lives through sacrifice and is nourished by giving."
    ],
    image_url: "/images/saints/maximilian-kolbe.jpg"
  },
  {
    name: "Saint John the Baptist",
    slug: "john-the-baptist",
    birth_date: "Late 1st century BC",
    death_date: "c. 28-36 AD",
    feast_day: "June 24",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "Forerunner of Christ, baptizing Jesus, beheaded by Herod",
    patron_of: ["baptism", "conversion", "tailors", "Jordan", "Puerto Rico", "Florence"],
    biography_long: "John was the son of Zechariah and Elizabeth, Mary's cousin. His birth was miraculously announced by the Archangel Gabriel. He lived an ascetic life in the Judean desert, preaching a baptism of repentance for the forgiveness of sins, preparing the way for the Messiah. When Jesus came to him at the River Jordan, John recognized Him, saying, 'Behold the Lamb of God, who takes away the sin of the world!' John famously baptized Jesus, witnessing the descent of the Holy Spirit. He fearlessly condemned King Herod Antipas for unlawfully marrying his brother's wife, Herodias. For this, Herod imprisoned him and, at the manipulation of Herodias's daughter Salome, had John beheaded.",
    miracles: [
      "Leaping in his mother's womb at the Visitation of Mary",
      "Witnessing the Holy Spirit descending as a dove at Christ's baptism"
    ],
    quotes: [
      "He must increase, but I must decrease.",
      "Behold the Lamb of God, who takes away the sin of the world!",
      "I am the voice of one crying in the wilderness: Make straight the way of the Lord."
    ],
    image_url: "/images/saints/john-the-baptist.jpg"
  },
  {
    name: "Saint Padre Pio",
    slug: "padre-pio",
    birth_date: "May 25, 1887",
    death_date: "September 23, 1968",
    feast_day: "September 23",
    canonization_date: "June 16, 2002",
    canonized_by_pope: "Pope John Paul II",
    category: "confessor",
    known_for: "Stigmata, reading hearts in confession, bilocation",
    patron_of: ["civil defense volunteers", "adolescents", "stress relief", "Pietrelcina"],
    biography_long: "Born Francesco Forgione in Pietrelcina, Italy, he joined the Capuchin Franciscans at age 15. In 1918, while praying before a crucifix in San Giovanni Rotondo, he received the visible stigmata—the wounds of Christ—which bled for 50 years until his death. Padre Pio became renowned as an extraordinary confessor, spending up to 16 hours a day in the confessional, often reading the souls of penitents and reminding them of unconfessed sins. He established a hospital, the 'Home for the Relief of Suffering,' which became one of the most efficient hospitals in Europe. Despite enduring Vatican investigations and intense physical suffering, he remained deeply obedient to the Church.",
    miracles: [
      "Bearing the stigmata for exactly 50 years",
      "Numerous documented cases of bilocation (e.g., appearing to a general in WWII)",
      "Miraculous cure of Matteo Pio Colella from severe meningitis (Canonization miracle)"
    ],
    quotes: [
      "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.",
      "Prayer is the best weapon we possess. It is the key that opens the heart of God.",
      "The society of saints in heaven will heal the wounds of our earthly society."
    ],
    image_url: "/images/saints/padre-pio.jpg"
  },
  {
    name: "Saint Jude Thaddeus",
    slug: "jude-thaddeus",
    birth_date: "1st century AD",
    death_date: "c. 65 AD",
    feast_day: "October 28",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "apostle",
    known_for: "Patron of desperate cases, author of the Epistle of Jude",
    patron_of: ["desperate situations", "forgotten causes", "hospital workers", "police officers"],
    biography_long: "Jude, also known as Thaddeus, was one of the original Twelve Apostles of Jesus. He is identified as the brother of James the Less and a relative of Jesus. After the Ascension and Pentecost, Jude preached the Gospel in Judea, Samaria, Idumaea, Syria, Mesopotamia, and Libya. He is credited with authoring the brief Epistle of Jude in the New Testament, which warns against false teachers and encourages the faithful to persevere. According to tradition, he was martyred in Beirut or Persia around 65 AD, often depicted carrying the image of Jesus (the Mandylion) or with a flame above his head representing Pentecost. He became widely known as the patron of lost causes due to the belief that, because his name resembled Judas Iscariot, the faithful rarely prayed to him, leaving his intercessory power available for the most desperate cases.",
    miracles: [
      "Healing King Abgar of Edessa with the Image of Edessa (Mandylion)",
      "Countless modern-day miracles attributed to his intercession in desperate situations"
    ],
    quotes: [
      "But you, beloved, build yourselves up in your most holy faith; pray in the Holy Spirit."
    ],
    image_url: "/images/saints/jude-thaddeus.jpg"
  },
  {
    name: "Saint Benedict of Nursia",
    slug: "benedict-of-nursia",
    birth_date: "c. 480",
    death_date: "March 21, 547",
    feast_day: "July 11",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "confessor",
    known_for: "Rule of St. Benedict, Father of Western Monasticism, St. Benedict Medal",
    patron_of: ["Europe", "monks", "poison sufferers", "agricultural workers", "students"],
    biography_long: "Born in Nursia, Italy, Benedict was sent to Rome to study but, repulsed by the city's vice, he fled to live as a hermit in a cave at Subiaco. His reputation for holiness attracted followers, though his strict discipline also caused some rebellious monks to attempt to poison him (the glass shattered when he blessed it). He eventually founded the great monastery of Monte Cassino, where he wrote the 'Rule of St. Benedict.' This Rule became the foundation of Western monasticism, emphasizing a balance of prayer and work ('Ora et Labora'), obedience, and stability. Through his monks, Benedict profoundly shaped the civilization, agriculture, and education of Christian Europe.",
    miracles: [
      "A poisoned cup of wine shattered when he made the sign of the cross over it",
      "Retrieving a sunken tool from a lake using only the wooden handle",
      "Reviving a young boy crushed by a falling wall"
    ],
    quotes: [
      "Idleness is the enemy of the soul; and therefore the brethren ought to be employed in manual labor at certain times, at others, in devout reading.",
      "Let all guests who arrive be received like Christ.",
      "Listen and attend with the ear of your heart."
    ],
    image_url: "/images/saints/benedict-of-nursia.jpg"
  },
  {
    name: "Saint Maria Goretti",
    slug: "maria-goretti",
    birth_date: "October 16, 1890",
    death_date: "July 6, 1902",
    feast_day: "July 6",
    canonization_date: "June 24, 1950",
    canonized_by_pope: "Pope Pius XII",
    category: "martyr",
    known_for: "Martyr of Purity, forgiving her attacker on her deathbed",
    patron_of: ["youth", "teenage girls", "victims of rape", "purity", "forgiveness"],
    biography_long: "Maria was born into a poor farming family in Corinaldo, Italy. After her father's death, the family shared a tenant house with another family, the Serenellis. At age 11, Maria was deeply pious and helped raise her siblings. The 20-year-old neighbor, Alessandro Serenelli, repeatedly made sexual advances toward her, which she rejected, warning him it was a mortal sin. On July 5, 1902, he attempted to rape her. When she resisted, shouting that it was a sin and he would go to hell, he stabbed her 14 times. Before dying the next day in the hospital, Maria explicitly forgave Alessandro, saying, 'I forgive him, and I want him to be in Paradise with me.' Alessandro spent 27 years in prison, experienced a conversion after a vision of Maria giving him lilies, and eventually attended her canonization in 1950—the first time a mother (Maria's mother, Assunta) attended her child's canonization.",
    miracles: [
      "Her appearance to Alessandro in prison, handing him 14 lilies which healed his soul",
      "Healing of Giuseppe Coppa from a severe foot infection",
      "Healing of Anna Grossi from pleurisy"
    ],
    quotes: [
      "I forgive him, and I want him to be in Paradise with me.",
      "No, no, it is a sin! God does not want it!"
    ],
    image_url: "/images/saints/maria-goretti.jpg"
  },
  {
    name: "Saint John Bosco",
    slug: "john-bosco",
    birth_date: "August 16, 1815",
    death_date: "January 31, 1888",
    feast_day: "January 31",
    canonization_date: "April 1, 1934",
    canonized_by_pope: "Pope Pius XI",
    category: "confessor",
    known_for: "Apostle of Youth, founding the Salesians, prophetic dreams",
    patron_of: ["youth", "apprentices", "editors", "magicians", "juvenile delinquents"],
    biography_long: "John Bosco, known as Don Bosco, was born in Piedmont, Italy, to a poor farming family. At age nine, he had a prophetic dream where Jesus and Mary showed him his life's mission: transforming aggressive boys (represented as wolves) into gentle youths (lambs). Ordained a priest, he dedicated his life to the impoverished, neglected, and exploited boys of Turin during the Industrial Revolution. He established the 'Oratory,' a safe haven combining play, religious instruction, and job training. Refusing the harsh corporal punishment common at the time, he developed the 'Preventive System' based on reason, religion, and loving kindness. He founded the Salesian Society, named after St. Francis de Sales, to continue his educational mission globally.",
    miracles: [
      "Multiplying bread, chestnuts, and communion hosts for his boys",
      "The mysterious grey dog, 'Grigio,' that repeatedly protected him from assassins",
      "Detailed prophetic dreams predicting church events and the futures of his students"
    ],
    quotes: [
      "It is not enough to love the young; they must know that they are loved.",
      "Without confidence and love, there can be no true education.",
      "Run, jump, have all the fun you want at the right time, but, for heaven's sake, do not commit sin!"
    ],
    image_url: "/images/saints/john-bosco.jpg"
  },
  {
    name: "Saint Kateri Tekakwitha",
    slug: "kateri-tekakwitha",
    birth_date: "1656",
    death_date: "April 17, 1680",
    feast_day: "July 14",
    canonization_date: "October 21, 2012",
    canonized_by_pope: "Pope Benedict XVI",
    category: "virgin",
    known_for: "Lily of the Mohawks, first Native American Catholic saint",
    patron_of: ["Native Americans", "ecology", "environment", "people in exile", "orphans"],
    biography_long: "Kateri was born in the Mohawk village of Ossernenon (now New York state). A smallpox epidemic when she was four killed her parents and brother, and left her with facial scars and poor eyesight. She was adopted by her uncle, a Mohawk chief. Influenced by French Jesuit missionaries, she embraced Catholicism at age 19, taking the name Kateri (Catherine). Her conversion caused her to be shunned and threatened by her tribe. To practice her faith freely, she fled 200 miles to a Christian native village near Montreal. There, she lived a life of intense prayer, penance, and care for the elderly and sick. She took a vow of perpetual virginity. Fifteen minutes after her death at age 24, her smallpox scars miraculously vanished, leaving her face radiantly beautiful.",
    miracles: [
      "The immediate clearing of her smallpox scars upon her death",
      "Healing of Jake Finkbonner from flesh-eating bacteria in 2006 (Canonization miracle)"
    ],
    quotes: [
      "I am not my own; I have given myself to Jesus. He must be my only love.",
      "Who will teach me what is most pleasing to God, that I may do it?"
    ],
    image_url: "/images/saints/kateri-tekakwitha.jpg"
  },
  {
    name: "Saint John of the Cross",
    slug: "john-of-the-cross",
    birth_date: "June 24, 1542",
    death_date: "December 14, 1591",
    feast_day: "December 14",
    canonization_date: "December 27, 1726",
    canonized_by_pope: "Pope Benedict XIII",
    category: "doctor",
    known_for: "Dark Night of the Soul, reforming the Carmelites with St. Teresa, mystical poetry",
    patron_of: ["contemplatives", "mystics", "Spanish poets"],
    biography_long: "Juan de Yepes y Álvarez was born in poverty in Spain. He joined the Carmelite Order and was ordained a priest. Dissatisfied with the laxity of the order, he considered joining the stricter Carthusians until he met St. Teresa of Ávila, who recruited him to help reform the male branch of the Carmelites. His reform efforts met fierce resistance from the non-reformed Carmelites, who eventually kidnapped and imprisoned him in a tiny cell in Toledo for nine months. In this darkness and isolation, he composed some of the greatest mystical poetry in Spanish literature. He miraculously escaped and continued his spiritual writings, most notably 'The Dark Night of the Soul' and 'The Ascent of Mount Carmel.' He was declared a Doctor of the Church in 1926.",
    miracles: [
      "Miraculous escape from his prison cell in Toledo, guided by the Virgin Mary",
      "Levitations during prayer",
      "His body remained incorrupt after death and emitted a sweet fragrance"
    ],
    quotes: [
      "In the evening of life, we will be judged on love.",
      "To reach satisfaction in all, desire satisfaction in nothing. To come to possess all, desire the possession of nothing.",
      "God's first language is silence."
    ],
    image_url: "/images/saints/john-of-the-cross.jpg"
  },
  {
    name: "Saint Faustina Kowalska",
    slug: "faustina-kowalska",
    birth_date: "August 25, 1905",
    death_date: "October 5, 1938",
    feast_day: "October 5",
    canonization_date: "April 30, 2000",
    canonized_by_pope: "Pope John Paul II",
    category: "virgin",
    known_for: "Apostle of Divine Mercy, The Diary of Saint Maria Faustina Kowalska",
    patron_of: ["Mercy", "World Youth Day"],
    biography_long: "Born Helena Kowalska to a poor Polish peasant family, she had only three years of basic education. She joined the Sisters of Our Lady of Mercy in Warsaw. Despite performing menial tasks like cooking and gardening, she experienced profound mystical graces. Jesus appeared to her numerous times, tasking her with spreading the devotion to the Divine Mercy. He instructed her to have an image painted with the signature 'Jesus, I trust in You,' and requested the establishment of the Feast of Divine Mercy on the Sunday after Easter. She recorded her visions and spiritual journey in her Diary, which became a global spiritual classic. She died of tuberculosis at age 33. She was the first saint canonized in the 21st century.",
    miracles: [
      "Healing of Maureen Digan from lymphedema (Beatification miracle)",
      "Healing of Fr. Ronald Pytel from severe heart failure (Canonization miracle)"
    ],
    quotes: [
      "Jesus, I trust in You.",
      "O my Jesus, each of Your saints reflects one of Your virtues; I desire to reflect Your compassionate heart, full of mercy.",
      "Love endures everything, love is stronger than death, love fears nothing."
    ],
    image_url: "/images/saints/faustina-kowalska.jpg"
  },
  {
    name: "Saint Bernadette Soubirous",
    slug: "bernadette-soubirous",
    birth_date: "January 7, 1844",
    death_date: "April 16, 1879",
    feast_day: "April 16",
    canonization_date: "December 8, 1933",
    canonized_by_pope: "Pope Pius XI",
    category: "virgin",
    known_for: "Visionary of Lourdes, Our Lady of Lourdes",
    patron_of: ["bodily illness", "Lourdes", "shepherds", "people ridiculed for their piety"],
    biography_long: "Marie-Bernarde Soubirous was born to a very poor miller in Lourdes, France. She suffered from severe asthma and cholera, remaining small and frail. Between February 11 and July 16, 1858, at the age of 14, she experienced 18 visions of a 'beautiful lady' in the grotto of Massabielle. The lady asked for penance, a chapel to be built, and instructed Bernadette to dig in the mud to uncover a spring of water, which subsequently produced hundreds of miraculous healings. The lady finally identified herself, saying, 'I am the Immaculate Conception.' Despite intense skepticism, interrogations by authorities, and crowds of thousands, Bernadette remained humble and consistent in her account. She later joined the Sisters of Charity in Nevers, seeking a hidden life, and died of tuberculosis of the bone at age 35.",
    miracles: [
      "The miraculous spring at Lourdes, which has resulted in 70 officially recognized medical miracles",
      "Her body remains entirely incorrupt and is on display in Nevers, France"
    ],
    quotes: [
      "I was told to tell you, not to make you believe.",
      "The Grotto was my heaven.",
      "O Jesus, I would rather die a thousand times than offend You by a single deliberate sin."
    ],
    image_url: "/images/saints/bernadette-soubirous.jpg"
  },
  {
    name: "Saint Thomas More",
    slug: "thomas-more",
    birth_date: "February 7, 1478",
    death_date: "July 6, 1535",
    feast_day: "June 22",
    canonization_date: "May 19, 1935",
    canonized_by_pope: "Pope Pius XI",
    category: "martyr",
    known_for: "Martyrdom under Henry VIII, Utopia, Lord Chancellor of England",
    patron_of: ["statesmen", "politicians", "lawyers", "civil servants", "large families"],
    biography_long: "Thomas More was an English Renaissance humanist, lawyer, and statesman who served as Lord High Chancellor of England under King Henry VIII. A devout Catholic father of four, he was a close friend of Erasmus and author of the famous book 'Utopia.' When Henry VIII sought to annul his marriage to Catherine of Aragon and declare himself Supreme Head of the Church of England, breaking away from the Pope, More resigned his chancellorship. He refused to swear the Oath of Supremacy, citing his conscience and the unity of Christendom. He was imprisoned in the Tower of London for over a year, tried for treason on perjured testimony, and beheaded. His final words proclaimed his loyalty to both king and God.",
    miracles: [
      "Cure of Sister Maria Gabriella of the Sacred Heart from a spinal tumor (Canonization)"
    ],
    quotes: [
      "I die the King's good servant, but God's first.",
      "Earth has no sorrow that heaven cannot heal.",
      "I do not care very much what others say and think about me. But I do care very much what I say and think about others."
    ],
    image_url: "/images/saints/thomas-more.jpg"
  },
  {
    name: "Saint Catherine of Alexandria",
    slug: "catherine-of-alexandria",
    birth_date: "c. 287",
    death_date: "c. 305",
    feast_day: "November 25",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "virgin",
    known_for: "Defeating pagan philosophers in debate, the Catherine Wheel, mystical marriage to Christ",
    patron_of: ["philosophers", "students", "apologists", "librarians", "unmarried girls"],
    biography_long: "Catherine was a noble, highly educated young woman in Alexandria, Egypt. When Emperor Maxentius began persecuting Christians, she went to him and rebuked him for his cruelty, debating him on the truths of Christianity. Unable to answer her, the Emperor summoned 50 of the best pagan philosophers to debate her; guided by the Holy Spirit, Catherine's arguments were so compelling that several of the philosophers converted on the spot (and were immediately martyred). Refusing the Emperor's offer of marriage, she was scourged and imprisoned. She was condemned to death on a spiked breaking wheel, but at her touch, the wheel miraculously shattered. She was finally beheaded. Tradition holds that angels transported her body to Mount Sinai, where St. Catherine's Monastery was later built.",
    miracles: [
      "The shattering of the spiked breaking wheel intended for her execution",
      "Milk, rather than blood, flowing from her neck when she was beheaded",
      "Angels transporting her body to Mount Sinai"
    ],
    quotes: [
      "I have given myself as a bride to Christ."
    ],
    image_url: "/images/saints/catherine-of-alexandria.jpg"
  },
  {
    name: "Saint Dominic",
    slug: "dominic",
    birth_date: "August 8, 1170",
    death_date: "August 6, 1221",
    feast_day: "August 8",
    canonization_date: "July 13, 1234",
    canonized_by_pope: "Pope Gregory IX",
    category: "confessor",
    known_for: "Founding the Dominican Order (Order of Preachers), promoting the Rosary",
    patron_of: ["astronomers", "falsely accused people", "Dominican Republic"],
    biography_long: "Domingo Félix de Guzmán was born in Caleruega, Spain. As a priest, he accompanied his bishop on a diplomatic mission to France, where he encountered the Albigensian (Cathar) heresy, which taught that the physical world was evil. Dominic realized that combating this heresy required preachers who were highly educated in theology but lived in absolute poverty, matching the asceticism of the heretics. He founded the Order of Preachers (Dominicans) in 1216 to preach truth and combat error. Tradition holds that the Virgin Mary appeared to Dominic and gave him the Holy Rosary as the ultimate spiritual weapon against heresy. His order produced some of the Church's greatest intellectuals, including Thomas Aquinas.",
    miracles: [
      "Raising the young man Napoleon Orsini from the dead after he fell from his horse",
      "A book of his teachings surviving a fire while the heretics' books burned",
      "Angels appearing in the refectory to provide bread for the friars"
    ],
    quotes: [
      "Arm yourself with prayer rather than a sword; wear humility rather than fine clothes.",
      "A man who governs his passions is master of the world. We must either command them, or be enslaved by them."
    ],
    image_url: "/images/saints/dominic.jpg"
  },
  {
    name: "Saint Clare of Assisi",
    slug: "clare-of-assisi",
    birth_date: "July 16, 1194",
    death_date: "August 11, 1253",
    feast_day: "August 11",
    canonization_date: "September 26, 1255",
    canonized_by_pope: "Pope Alexander IV",
    category: "virgin",
    known_for: "Founding the Poor Clares, defending Assisi with the Eucharist, first woman to write a monastic rule",
    patron_of: ["television", "eye disease", "goldsmiths", "laundry workers"],
    biography_long: "Chiara Offreduccio was born to a wealthy, noble family in Assisi. Hearing St. Francis preach, she was deeply moved and resolved to dedicate her life to God. At age 18, she escaped her home at night, met Francis, exchanged her rich gown for a rough tunic, and had her hair cut off. She founded the Order of Poor Ladies (now Poor Clares), living in radical poverty, silence, and prayer at San Damiano. When the army of Frederick II attacked Assisi, Clare, though ill, had herself carried to the wall with a monstrance containing the Blessed Sacrament. Upon seeing the Eucharist, the attacking army was struck with panic and fled. She is the patron of television because, when too ill to attend Midnight Mass, she miraculously saw and heard the Mass projected on her cell wall.",
    miracles: [
      "Defeating an invading Saracen army by raising the Blessed Sacrament",
      "Seeing and hearing a distant Christmas Mass on the wall of her cell (basis for television patronage)"
    ],
    quotes: [
      "We become what we love and who we love shapes what we become.",
      "Gaze upon Christ, consider Christ, contemplate Christ, as you desire to imitate Christ.",
      "Love Him totally, who gave Himself totally for your love."
    ],
    image_url: "/images/saints/clare-of-assisi.jpg"
  },
  {
    name: "Saint Maximilian of Tebessa",
    slug: "maximilian-of-tebessa",
    birth_date: "274",
    death_date: "March 12, 295",
    feast_day: "March 12",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "First recorded conscientious objector in history",
    patron_of: ["conscientious objectors"],
    biography_long: "Maximilian was a young Christian living in Numidia (modern-day Algeria) during the Roman Empire. As the son of a Roman army veteran, he was legally obliged to serve in the military. When he was brought before the proconsul Dion to be measured and enrolled, Maximilian famously refused, stating: 'I cannot serve in the military; I am a Christian. I cannot do evil.' Despite the proconsul's threats and arguments that other Christians served in the emperor's guard, Maximilian remained steadfast, valuing his heavenly King above the Roman Emperor. He was executed by beheading at the age of 21, becoming an early martyr for Christian pacifism.",
    miracles: [
      "His unwavering courage in the face of death, converting his executioners by his testimony"
    ],
    quotes: [
      "I cannot serve, I cannot do evil. I am a Christian.",
      "My army is the army of God, and I cannot fight for this world."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Stephen",
    slug: "stephen",
    birth_date: "c. 5 AD",
    death_date: "c. 34 AD",
    feast_day: "December 26",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "The Protomartyr (First Martyr of the Church), one of the first deacons",
    patron_of: ["deacons", "stonemasons", "headaches", "horses"],
    biography_long: "Stephen was one of the original seven deacons ordained by the Apostles to care for the Greek-speaking widows in the early Jerusalem church, allowing the Apostles to focus on prayer and the ministry of the Word. He was 'a man full of faith and of the Holy Spirit' (Acts 6:5). He performed great wonders and signs, and his powerful apologetic preaching enraged the Jewish authorities. Brought before the Sanhedrin, Stephen delivered a masterful summary of salvation history, accusing the leaders of resisting the Holy Spirit. As he looked up to heaven, he saw the glory of God and Jesus standing at the right hand of God. He was dragged out of the city and stoned to death. As he died, he prayed for his killers: 'Lord, do not hold this sin against them,' echoing Christ on the cross. Saul of Tarsus (later St. Paul) approved of his execution.",
    miracles: [
      "Great wonders and signs among the people (Acts 6:8)",
      "Vision of the open heavens and Christ standing at the right hand of God"
    ],
    quotes: [
      "Look! I see heaven open and the Son of Man standing at the right hand of God.",
      "Lord Jesus, receive my spirit.",
      "Lord, do not hold this sin against them."
    ],
    image_url: "/images/saints/stephen.jpg"
  },
  {
    name: "Saint Athanasius",
    slug: "athanasius",
    birth_date: "c. 296",
    death_date: "May 2, 373",
    feast_day: "May 2",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "doctor",
    known_for: "Defending the Incarnation against Arianism, 'Athanasius contra mundum' (Athanasius against the world)",
    patron_of: ["theologians", "orthodox and catholic believers"],
    biography_long: "Athanasius, the Bishop of Alexandria, was the primary defender of orthodox Christology against the Arian heresy in the 4th century. Arianism, which taught that Jesus was a created being and not co-eternal with God the Father, gained massive popularity, even among emperors and many bishops. Athanasius famously stood 'contra mundum' (against the world) defending the divinity of Christ as established at the Council of Nicaea (325 AD). Because of his steadfast orthodoxy, he was exiled from his diocese five times by four different Roman Emperors, spending a total of 17 years in exile. His work 'On the Incarnation' remains one of the greatest theological works ever written. He also wrote the influential 'Life of St. Antony,' which popularized monasticism in the West.",
    miracles: [
      "Preserving the true faith when nearly the entire Christian world had fallen into the Arian heresy"
    ],
    quotes: [
      "The Son of God became man so that we might become God.",
      "Jesus, whom I know as my Redeemer, cannot be less than God.",
      "If the world is against the truth, then I am against the world."
    ],
    image_url: "/images/saints/athanasius.jpg"
  },
  {
    name: "Saint Rita of Cascia",
    slug: "rita-of-cascia",
    birth_date: "1381",
    death_date: "May 22, 1457",
    feast_day: "May 22",
    canonization_date: "May 24, 1900",
    canonized_by_pope: "Pope Leo XIII",
    category: "confessor",
    known_for: "Patroness of impossible causes, abusive marriages, stigmata of the thorn",
    patron_of: ["impossible causes", "abused wives", "widows", "heartbreak"],
    biography_long: "Margherita Lotti was married at an early age to a harsh and abusive man, Paolo Mancini. For 18 years she endured his insults and infidelities with patience and prayer, eventually converting him. Shortly after his conversion, he was murdered in a family feud. Rita's two sons vowed revenge, but Rita prayed they would die rather than commit murder; both boys died of dysentery shortly after. Now a widow and childless, she sought to join the Augustinian nuns, but was refused due to her husband's family feud. Through prayer, she miraculously reconciled the feuding families and was admitted. Later in life, while praying before a crucifix, she received a stigmata on her forehead—a wound from the crown of thorns, which remained open and painful until her death.",
    miracles: [
      "Miraculously transported inside the locked convent by St. John the Baptist, St. Augustine, and St. Nicholas of Tolentino",
      "A rose blooming in the freezing snow near her death",
      "Her incorrupt body in Cascia"
    ],
    quotes: [
      "There is nothing impossible to God."
    ],
    image_url: "/images/saints/rita-of-cascia.jpg"
  },
  {
    name: "Saint Gianna Beretta Molla",
    slug: "gianna-beretta-molla",
    birth_date: "October 4, 1922",
    death_date: "April 28, 1962",
    feast_day: "April 28",
    canonization_date: "May 16, 2004",
    canonized_by_pope: "Pope John Paul II",
    category: "confessor",
    known_for: "Sacrificing her life for her unborn child, modern working mother saint",
    patron_of: ["mothers", "physicians", "unborn children", "families"],
    biography_long: "Gianna was a modern Italian pediatrician, wife, and mother who loved skiing, painting, and music. Deeply devout, she viewed her medical practice as a mission. While pregnant with her fourth child, she was diagnosed with a uterine fibroid tumor. She was given three choices: an abortion, a complete hysterectomy (which would kill the child), or removal of just the tumor, which carried severe risks to her own life. Gianna explicitly demanded that the baby's life be prioritized over hers. The baby, Gianna Emanuela, was successfully delivered via C-section, but Gianna died of septic peritonitis a week later, repeatedly saying, 'Jesus, I love you.' Her husband and the daughter she saved were present at her canonization.",
    miracles: [
      "Healing of Lucia Sylvia Cirilo from a fatal uterine complication (Beatification)",
      "Healing of Elizabeth Comparini whose water broke at 16 weeks; she delivered a healthy baby at term (Canonization)"
    ],
    quotes: [
      "If you must decide between me and the child, do not hesitate: choose the child. I insist on it. Save him.",
      "Love is the most beautiful sentiment the Lord has put into the soul of men and women.",
      "The secret of happiness is to live moment by moment and to thank God for all that He, in His goodness, sends to us day after day."
    ],
    image_url: "/images/saints/gianna-beretta-molla.jpg"
  },
  {
    name: "Saint Ambrose",
    slug: "ambrose",
    birth_date: "c. 340",
    death_date: "April 4, 397",
    feast_day: "December 7",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "doctor",
    known_for: "Doctor of the Church, baptizing St. Augustine, forcing Emperor Theodosius to do penance",
    patron_of: ["Milan", "beekeepers", "beggars", "learning", "students"],
    biography_long: "Aurelius Ambrosius was the Roman governor of Liguria and Emilia, headquartered in Milan. When the Bishop of Milan died, a fierce dispute broke out between Nicene Catholics and Arians over his successor. Ambrose attended the election to keep the peace. According to legend, a child in the crowd cried out, 'Ambrose, bishop!' and the crowd unanimously demanded he be made bishop. At the time, he was only an unbaptized catechumen. Within a week, he was baptized, ordained, and consecrated bishop. He became a fierce defender of orthodoxy, a prolific writer, and introduced congregational singing (hymns) to the Western Church. His preaching famously led to the conversion of St. Augustine. He fearlessly stood up to state power, excommunicating Emperor Theodosius for the massacre in Thessalonica and forcing him to do public penance.",
    miracles: [
      "As an infant, a swarm of bees landed on his face and left a drop of honey on his lips (foreshadowing his 'honeyed' preaching)",
      "Discovery of the relics of martyrs Gervasius and Protasius"
    ],
    quotes: [
      "When you are at Rome live in the Roman style; when you are elsewhere live as they live elsewhere.",
      "No one heals himself by wounding another.",
      "The Emperor is within the Church, not above the Church."
    ],
    image_url: "/images/saints/ambrose.jpg"
  },
  {
    name: "Saint Patrick",
    slug: "patrick",
    birth_date: "c. 385",
    death_date: "March 17, 461",
    feast_day: "March 17",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "confessor",
    known_for: "Apostle of Ireland, using the shamrock to explain the Trinity",
    patron_of: ["Ireland", "engineers", "paralegals", "against snakes"],
    biography_long: "Born in Roman Britain to a Christian deacon, Patrick was captured by Irish pirates at age 16 and enslaved as a shepherd in pagan Ireland. During his six years of captivity, he underwent a profound spiritual conversion. After hearing a voice telling him his ship was ready, he escaped and returned to Britain. However, he had a vision of the 'Voice of the Irish' begging him to return. After studying and being ordained a bishop, he returned to Ireland as a missionary. He fiercely opposed slavery, battled the pagan Druids, converted kings, baptized thousands, and established churches across the island. His famous breastplate prayer reflects his deep Christocentric mysticism.",
    miracles: [
      "Lighting the Paschal fire on the Hill of Slane which the druids could not extinguish",
      "Driving the snakes (often symbolic of paganism) out of Ireland",
      "Using the three-leafed shamrock to explain the mystery of the Holy Trinity"
    ],
    quotes: [
      "Christ with me, Christ before me, Christ behind me, Christ in me...",
      "I am Patrick, a sinner, most unlearned, the least of all the faithful, and utterly despised by many."
    ],
    image_url: "/images/saints/patrick.jpg"
  },
  {
    name: "Saint Monica",
    slug: "monica",
    birth_date: "332",
    death_date: "387",
    feast_day: "August 27",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "confessor",
    known_for: "Praying for 17 years for the conversion of her son, St. Augustine",
    patron_of: ["mothers", "wives", "alcoholics", "difficult marriages", "disappointing children"],
    biography_long: "Monica was an early African Christian born in Thagaste (modern Algeria). She was married to Patricius, a pagan with a violent temper, and endured a difficult mother-in-law. Through her patience, almsgiving, and constant prayer, she eventually converted both her husband and her mother-in-law before Patricius died. Her greatest grief, however, was her brilliant but wayward son, Augustine, who lived with a concubine and joined the Manichean heresy. Monica wept and prayed for him for 17 years. A bishop famously consoled her, saying, 'It is not possible that the son of so many tears should perish.' She followed him to Rome and Milan, where she met St. Ambrose, who eventually baptized Augustine. Monica died peacefully in Ostia shortly after witnessing her son's conversion.",
    miracles: [
      "The conversion of St. Augustine, considered one of the greatest graces in Church history"
    ],
    quotes: [
      "Son, nothing in this world now affords me delight. I do not know what there is now left for me to do or why I am still here, all my hopes in this world being now fulfilled.",
      "Lay this body anywhere, let not the care for it trouble you at all. This only I ask, that you will remember me at the Lord's altar, wherever you be."
    ],
    image_url: "/images/saints/monica.jpg"
  },
  {
    name: "Saint Martin de Porres",
    slug: "martin-de-porres",
    birth_date: "December 9, 1579",
    death_date: "November 3, 1639",
    feast_day: "November 3",
    canonization_date: "May 6, 1962",
    canonized_by_pope: "Pope John XXIII",
    category: "confessor",
    known_for: "Miraculous healing, deep humility, bi-location, love of animals",
    patron_of: ["mixed-race people", "barbers", "innkeepers", "public health workers", "social justice"],
    biography_long: "Martin was born in Lima, Peru, the illegitimate son of a Spanish nobleman and a freed slave of African and Native descent. Because of his mixed race, he faced severe discrimination and was legally barred from full religious orders. He joined the Dominicans as a 'donado' (a lay volunteer performing menial tasks) and later became a lay brother. Assigned to the infirmary, his medical skills, combined with miraculous healing powers, made him famous throughout Lima. He treated nobles and slaves alike. He established an orphanage, cared for the poor, and was known to converse with and heal animals, famously getting mice to leave the monastery by feeding them outside. He lived a life of extreme penance and possessed spiritual gifts including bilocation and levitation.",
    miracles: [
      "Bilocation (appearing in Mexico, Japan, and Africa to comfort missionaries while remaining in Lima)",
      "Levitation while in deep prayer before the Crucifix",
      "Passing through locked doors to tend to the sick"
    ],
    quotes: [
      "Everything, even sweeping, scraping vegetables, weeding a garden and waiting on the sick could be a prayer, if it were offered to God.",
      "Compassion, my dear Brother, is preferable to cleanliness."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Nicholas of Myra",
    slug: "nicholas-of-myra",
    birth_date: "March 15, 270",
    death_date: "December 6, 343",
    feast_day: "December 6",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "bishop",
    known_for: "Secret gift-giving, defender of orthodoxy at Nicaea, basis for Santa Claus",
    patron_of: ["children", "sailors", "pawnbrokers", "brewers", "unmarried people", "Russia", "Greece"],
    biography_long: "Nicholas was a Greek bishop of Myra (in modern-day Turkey). Orphaned young, he used his inheritance to assist the needy, the sick, and the suffering. He is famously remembered for secretly dropping bags of gold down the chimney of a poor man's house to provide dowries for his three daughters, saving them from prostitution. He was imprisoned during the persecution of Diocletian. At the Council of Nicaea in 325, tradition holds that he became so enraged by Arius's blasphemy against Christ's divinity that he slapped or punched the heretic in the face. His legendary habit of secret gift-giving gave rise to the traditional model of Santa Claus ('Saint Nick').",
    miracles: [
      "Resurrecting three children who had been murdered and pickled in a barrel during a famine",
      "Multiplying wheat during a great famine in Myra",
      "Calming a storm at sea, saving sailors"
    ],
    quotes: [
      "The giver of every good and perfect gift has called upon us to mimic God's giving, by grace, through faith, and this is not of ourselves."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Edith Stein (Teresa Benedicta of the Cross)",
    slug: "edith-stein",
    birth_date: "October 12, 1891",
    death_date: "August 9, 1942",
    feast_day: "August 9",
    canonization_date: "October 11, 1998",
    canonized_by_pope: "Pope John Paul II",
    category: "martyr",
    known_for: "Jewish convert, brilliant philosopher, Carmelite nun, martyr at Auschwitz",
    patron_of: ["Europe", "loss of parents", "martyrs", "World Youth Day"],
    biography_long: "Edith Stein was born into a prominent Jewish family in Germany but lost her faith and became an atheist in her teens. A brilliant student, she earned a doctorate in philosophy under Edmund Husserl. One night, while staying with friends, she read the autobiography of St. Teresa of Ávila in a single sitting, declaring at dawn, 'This is the truth.' She was baptized in 1922 and became a leading Catholic philosopher and speaker on the dignity of women. In 1933, she entered the Carmelite monastery in Cologne, taking the name Teresa Benedicta of the Cross. As Nazi persecution intensified, she was moved to a convent in the Netherlands. In retaliation for the Dutch bishops' condemnation of Nazi racism, all Catholic Jews in the Netherlands were arrested. Edith was sent to Auschwitz, where she comforted the children and women before being gassed.",
    miracles: [
      "Healing of Teresa Benedicta McCarthy from a fatal dose of paracetamol (Canonization miracle)"
    ],
    quotes: [
      "Do not accept anything as truth if it lacks love. And do not accept anything as love which lacks truth.",
      "Anyone who seeks truth seeks God, whether or not he realizes it.",
      "Come, we are going for our people."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Aloysius Gonzaga",
    slug: "aloysius-gonzaga",
    birth_date: "March 9, 1568",
    death_date: "June 21, 1591",
    feast_day: "June 21",
    canonization_date: "December 31, 1726",
    canonized_by_pope: "Pope Benedict XIII",
    category: "confessor",
    known_for: "Angelic purity, giving up a noble title, dying while caring for plague victims",
    patron_of: ["youth", "students", "Jesuit novices", "AIDS caregivers and patients", "purity"],
    biography_long: "Aloysius was born into the powerful and wealthy Gonzaga family in northern Italy. His father fully expected him to become a great soldier and nobleman, taking him to military camps at age four. Growing up amid the violence and decadence of Renaissance courts in Italy and Spain, Aloysius resolved to live a life of intense purity and devotion. He signed over his inheritance to his brother and joined the Society of Jesus (Jesuits) in Rome under the spiritual direction of St. Robert Bellarmine. In 1591, a plague struck Rome. The Jesuits opened a hospital, and Aloysius begged to serve the sick. He contracted the plague from a patient he was carrying to the hospital and died at the age of 23.",
    miracles: [
      "Appearing in glory to St. Mary Magdalene de Pazzi",
      "Healing of the terminally ill student Nicolaus Celestini"
    ],
    quotes: [
      "I am a piece of twisted iron; I entered religion in order to be untwisted straight.",
      "It is better to be a child of God than king of the whole world."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Elizabeth of Hungary",
    slug: "elizabeth-of-hungary",
    birth_date: "July 7, 1207",
    death_date: "November 17, 1231",
    feast_day: "November 17",
    canonization_date: "May 27, 1235",
    canonized_by_pope: "Pope Gregory IX",
    category: "confessor",
    known_for: "Royal princess serving the poor, miracle of the roses, Franciscan tertiary",
    patron_of: ["bakers", "beggars", "brides", "hospitals", "nursing homes", "widows"],
    biography_long: "Elizabeth was the daughter of King Andrew II of Hungary. Married at age 14 to Louis of Thuringia, they had a deeply loving marriage and three children. Under the spiritual influence of early Franciscan friars, Elizabeth used her royal position to care for the poor, building a hospital at the foot of her castle. When Louis died on Crusade, his family expelled Elizabeth from the court, seizing her dowry. She arranged for the care of her children, became a Secular Franciscan, and spent the remaining years of her short life living in poverty, spinning wool, and caring for the sickest patients—including lepers. She died at the age of 24.",
    miracles: [
      "The Miracle of the Roses: caught sneaking bread to the poor, her cloak was opened to reveal beautiful roses instead",
      "A leper she placed in her own bed miraculously appeared as the crucified Christ when her husband investigated"
    ],
    quotes: [
      "We are made to love and to be loved.",
      "How could I bear a crown of gold, when the Lord bears a crown of thorns? And bears it for me!"
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint John Vianney",
    slug: "john-vianney",
    birth_date: "May 8, 1786",
    death_date: "August 4, 1859",
    feast_day: "August 4",
    canonization_date: "May 31, 1925",
    canonized_by_pope: "Pope Pius XI",
    category: "confessor",
    known_for: "The Curé of Ars, patron of parish priests, spending 16 hours a day in confession",
    patron_of: ["parish priests", "confessors"],
    biography_long: "Jean-Baptiste-Marie Vianney grew up during the French Revolution, when attending Mass was illegal and priests were executed. He struggled immensely with his studies, especially Latin, and was almost denied ordination. Assigned to the remote, spiritually indifferent farming village of Ars, he sparked a massive spiritual revival through his severe fasting, fervent preaching, and extraordinary ability in the confessional. He could read souls and know unconfessed sins. Pilgrims flocked from all over Europe to see him; in his later years, he spent 12 to 16 hours a day in the confessional. For 35 years, he was physically harassed at night by the devil (whom he called 'the grappin').",
    miracles: [
      "Reading the hidden sins of thousands of penitents",
      "Multiplying grain during a famine to feed the orphans",
      "His body remains incorrupt"
    ],
    quotes: [
      "If we really understood the Mass, we would die of joy.",
      "The priesthood is the love of the heart of Jesus.",
      "You either belong wholly to the world or wholly to God."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Rose of Lima",
    slug: "rose-of-lima",
    birth_date: "April 20, 1586",
    death_date: "August 24, 1617",
    feast_day: "August 23",
    canonization_date: "April 12, 1671",
    canonized_by_pope: "Pope Clement X",
    category: "virgin",
    known_for: "First saint of the Americas, extreme penance, mystic",
    patron_of: ["the Americas", "Peru", "florists", "gardeners", "against vanity"],
    biography_long: "Isabel Flores de Oliva was born in Lima, Peru. She was exceptionally beautiful, which led her family to call her 'Rose.' To deter suitors and combat vanity, she rubbed her face with pepper to cause blisters and cut off her hair. Emulating St. Catherine of Siena, she refused marriage, took a vow of virginity, and became a Third Order Dominican. She lived in a tiny hut in her parents' garden, practicing severe penances, wearing a heavy silver crown with spikes inside, and fasting constantly. She dedicated herself to needlework and selling flowers to help support her impoverished family, while caring for the sick and poor of Lima. She experienced intense mystical visions and dark nights of the soul.",
    miracles: [
      "Defending Lima from Dutch pirates through prayer in the Church of Santo Domingo",
      "Flowers blooming out of season upon her death"
    ],
    quotes: [
      "Apart from the cross, there is no other ladder by which we may get to heaven.",
      "Know that the greatest service that man can offer to God is to help convert souls."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Maximilian",
    slug: "maximilian-martyr",
    birth_date: "3rd Century",
    death_date: "3rd Century",
    feast_day: "August 26",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "Early Christian martyr",
    patron_of: [],
    biography_long: "An early Christian martyr about whom little is known historically, but venerated in ancient martyrologies.",
    miracles: [],
    quotes: [],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Philip Neri",
    slug: "philip-neri",
    birth_date: "July 21, 1515",
    death_date: "May 26, 1595",
    feast_day: "May 26",
    canonization_date: "March 12, 1622",
    canonized_by_pope: "Pope Gregory XV",
    category: "confessor",
    known_for: "Apostle of Rome, humor, founding the Oratorians, enlarged heart",
    patron_of: ["Rome", "US Special Forces", "humor", "joy"],
    biography_long: "Philip Neri went to Rome as a young man and lived a life of poverty, engaging people in the streets with his cheerful humor and warmth. During a profound mystical experience in the catacombs on the eve of Pentecost 1544, a globe of fire entered his mouth and physically enlarged his heart, breaking two of his ribs. Ordained a priest, he became an extraordinary confessor and founded the Congregation of the Oratory, bringing young people together for informal prayer, music, and joyful fellowship. He used humor, eccentric behavior, and practical jokes to combat pride and the worldly pomp of Renaissance Rome. He is considered the second Apostle of Rome after St. Peter.",
    miracles: [
      "His physical heart was miraculously enlarged by the Holy Spirit, which was verified upon his autopsy",
      "Bringing the young prince Paolo Massimo back to life just long enough to hear his confession"
    ],
    quotes: [
      "Cheerfulness strengthens the heart and makes us persevere in a good life.",
      "Cast yourself into the arms of God and be very sure that if He wants anything of you, He will fit you for the work and give you strength."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Teresa of Calcutta (Mother Teresa)",
    slug: "mother-teresa",
    birth_date: "August 26, 1910",
    death_date: "September 5, 1997",
    feast_day: "September 5",
    canonization_date: "September 4, 2016",
    canonized_by_pope: "Pope Francis",
    category: "confessor",
    known_for: "Founding the Missionaries of Charity, serving the poorest of the poor, Nobel Peace Prize",
    patron_of: ["World Youth Day", "Missionaries of Charity", "Calcutta"],
    biography_long: "Born Anjezë Gonxhe Bojaxhiu in North Macedonia, she joined the Sisters of Loreto and taught in India. In 1946, she experienced a 'call within a call' to leave the convent and serve the poorest of the poor in the slums of Calcutta. She founded the Missionaries of Charity, distinguished by their white saris with blue borders. They built hospices, orphanages, and leper colonies around the world. Mother Teresa became a global icon of Christian charity, winning the Nobel Peace Prize in 1979. After her death, her private diaries revealed that for the last 50 years of her life, she experienced a profound spiritual darkness and feeling of separation from God, sharing in Christ's agony on the cross while maintaining a radiant outward joy.",
    miracles: [
      "Healing of Monica Besra from an abdominal tumor (Beatification)",
      "Healing of Marcilio Haddad Andrino from multiple brain abscesses (Canonization)"
    ],
    quotes: [
      "Not all of us can do great things. But we can do small things with great love.",
      "If you judge people, you have no time to love them.",
      "Peace begins with a smile.",
      "I am a little pencil in the hand of a writing God who is sending a love letter to the world."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Sebastian",
    slug: "sebastian",
    birth_date: "c. 256",
    death_date: "288",
    feast_day: "January 20",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "Surviving execution by arrows, patron of athletes",
    patron_of: ["athletes", "archers", "soldiers", "against plagues"],
    biography_long: "Sebastian was an officer in the Praetorian Guard under the Emperor Diocletian. A secret Christian, he used his position to encourage imprisoned Christians facing martyrdom. When his faith was discovered, Diocletian ordered him to be tied to a stake and shot to death by arrows. He was left for dead, but Irene of Rome (also a saint) discovered he was still alive and nursed him back to health. Instead of fleeing Rome, Sebastian intercepted the Emperor on a staircase and publicly rebuked him for his cruelty against Christians. Stunned that Sebastian was alive, the Emperor ordered him to be beaten to death with clubs and thrown into the sewers.",
    miracles: [
      "Surviving the execution by arrows",
      "Numerous towns saved from the plague after invoking his intercession"
    ],
    quotes: [
      "(To the Emperor): 'The Lord has granted me life so that I might return to rebuke you for your treatment of His servants!'"
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Lucy",
    slug: "lucy",
    birth_date: "c. 283",
    death_date: "304",
    feast_day: "December 13",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "virgin",
    known_for: "Virgin martyr, eyes gouged out, patron of the blind",
    patron_of: ["the blind", "eye illness", "martyrs", "epidemics", "Syracuse"],
    biography_long: "Lucy (Lucia) was a young noblewoman in Syracuse, Sicily, who vowed her virginity to God. Her mother arranged a marriage to a pagan, but after Lucy's prayers at the tomb of St. Agatha miraculously cured her mother's bleeding disorder, the betrothal was canceled, and Lucy gave her dowry to the poor. The rejected suitor denounced her as a Christian to the governor during the Diocletian persecution. The governor ordered her to be taken to a brothel, but miraculously, the guards could not move her—she became as heavy as a mountain. They tried to burn her, but the fire would not harm her. She was finally killed by a sword thrust to the throat. Tradition says her eyes were gouged out prior to her death, but miraculously restored.",
    miracles: [
      "Her body becoming immovable when guards tried to force her to a brothel",
      "Surviving being burned alive",
      "Her eyes being restored after being gouged out"
    ],
    quotes: [
      "Those whose hearts are pure are the temples of the Holy Spirit."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Cecilia",
    slug: "cecilia",
    birth_date: "2nd Century",
    death_date: "November 22, 230",
    feast_day: "November 22",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "virgin",
    known_for: "Patroness of music, singing to God while dying",
    patron_of: ["musicians", "composers", "instrument makers", "singers"],
    biography_long: "Cecilia was a Roman noblewoman who had vowed her virginity to God but was forced to marry a pagan nobleman named Valerian. On her wedding night, while musicians played, Cecilia 'sang in her heart to the Lord.' She told Valerian that an angel guarded her virginity; Valerian asked to see the angel, converted, and was baptized. Both Valerian and his brother were martyred for burying executed Christians. Cecilia was arrested and condemned to be suffocated in the baths. When the steam failed to kill her after a day and a night, an executioner struck her neck three times with a sword but failed to decapitate her. She survived for three days, preaching and distributing her wealth to the poor, before dying.",
    miracles: [
      "Surviving suffocating steam in the baths",
      "Surviving three sword blows to the neck and living for three days",
      "Her body was found perfectly incorrupt in 1599"
    ],
    quotes: [
      "Arise, soldiers of Christ, throw away the works of darkness and put on the armor of light."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint Lawrence",
    slug: "lawrence",
    birth_date: "December 31, 225",
    death_date: "August 10, 258",
    feast_day: "August 10",
    canonization_date: "Pre-Congregation",
    canonized_by_pope: "Pre-Congregation",
    category: "martyr",
    known_for: "Deacon, gridiron martyrdom, humor under torture",
    patron_of: ["comedians", "cooks", "deacons", "librarians", "the poor", "Rome"],
    biography_long: "Lawrence was one of the seven deacons of Rome serving under Pope Sixtus II. During the persecution of Emperor Valerian, the Pope was executed. Lawrence was commanded by the prefect of Rome to turn over the treasures of the Church. Lawrence asked for three days to gather them. He worked swiftly to distribute as much Church property as possible to the poor. On the third day, he presented the blind, the crippled, the orphaned, and the poor to the prefect, declaring: 'Behold in these poor persons the treasures which I promised to show you.' Enraged, the prefect had Lawrence roasted alive on a giant gridiron. According to tradition, after suffering pain for a long time, Lawrence cheerfully said, 'I am well done on this side. Turn me over!'",
    miracles: [
      "His extraordinary courage and supernatural joy while being burned alive"
    ],
    quotes: [
      "Turn me over, I'm done on this side.",
      "The Church is truly rich, far richer than your emperor."
    ],
    image_url: "/images/saints/placeholder.jpg"
  },
  {
    name: "Saint John of Capistrano",
    slug: "john-of-capistrano",
    birth_date: "June 24, 1386",
    death_date: "October 23, 1456",
    feast_day: "October 23",
    canonization_date: "October 16, 1690",
    canonized_by_pope: "Pope Alexander VIII",
    category: "confessor",
    known_for: "Franciscan preacher, leading the crusade at the Siege of Belgrade at age 70",
    patron_of: ["military chaplains", "judges", "jurists", "Hungary"],
    biography_long: "John was a successful lawyer and governor of Perugia. After being imprisoned during a war, he had a vision of St. Francis and experienced a conversion. He joined the Franciscans and became a dynamic preacher across Europe, drawing crowds of up to 100,000 people. When the Ottoman Empire conquered Constantinople in 1453 and threatened to overrun Europe, the Pope commissioned the 70-year-old John to preach a crusade. He rallied an army of peasants and led them personally at the Siege of Belgrade in 1456. Despite overwhelming odds, carrying only a crucifix, he led a charge shouting 'Jesus, Jesus, Jesus!' breaking the Ottoman siege and saving Europe. He died of bubonic plague shortly after.",
    miracles: [
      "Miraculous victory at the Siege of Belgrade",
      "Healing of the sick with the relic of the blood of St. Francis"
    ],
    quotes: [
      "Those who are called to the table of the Lord must glow with the brightness that comes from the good example of a praiseworthy and blameless life."
    ],
    image_url: "/images/saints/placeholder.jpg"
  }
];

const dataPath = path.join(__dirname, 'data', 'saints.json');
const existingSaints = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Filter out duplicates just in case
const newSaintsFiltered = newSaints.filter(n => !existingSaints.some(e => e.slug === n.slug));

const updatedSaints = [...existingSaints, ...newSaintsFiltered];
fs.writeFileSync(dataPath, JSON.stringify(updatedSaints, null, 2));

console.log(`Added ${newSaintsFiltered.length} saints. Total saints: ${updatedSaints.length}`);
