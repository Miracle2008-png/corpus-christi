const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const ReadingSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  old_testament: {
    reference: String,
    text: String,
  },
  psalm: {
    reference: String,
    text: String,
    response: String,
  },
  new_testament: {
    reference: String,
    text: String,
  },
  gospel: {
    reference: String,
    text: String,
  },
  gospel_reflection: String,
});

const Reading = mongoose.models.Reading || mongoose.model("Reading", ReadingSchema);

// A rich collection of authentic, deeply researched Catholic Liturgical Readings
const authenticReadings = [
  {
    old_testament: {
      reference: "Isaiah 55:10-11",
      text: "Thus says the LORD: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it."
    },
    psalm: {
      reference: "Psalm 34:4-7",
      text: "I sought the LORD, and he answered me and delivered me from all my fears. Look to him that you may be radiant with joy, and your faces may not blush with shame.",
      response: "From all their afflictions God will deliver the just."
    },
    new_testament: {
      reference: "Romans 8:18-23",
      text: "I consider that the sufferings of this present time are as nothing compared with the glory to be revealed for us. For creation awaits with eager expectation the revelation of the children of God."
    },
    gospel: {
      reference: "Matthew 6:7-15",
      text: "Jesus said to his disciples: 'In praying, do not babble like the pagans, who think that they will be heard because of their many words. Do not be like them. Your Father knows what you need before you ask him. This is how you are to pray: Our Father who art in heaven, hallowed be thy name...'"
    },
    gospel_reflection: "Jesus gives us the Our Father not just as a formula, but as a framework for the heart. We do not pray to inform God of our needs—He already knows them. We pray to align our wills with His, entering into the eternal communion of the Trinity."
  },
  {
    old_testament: {
      reference: "Ezekiel 36:24-28",
      text: "I will take you away from among the nations, gather you from all the foreign lands, and bring you back to your own land. I will sprinkle clean water upon you to cleanse you from all your impurities, and from all your idols I will cleanse you. I will give you a new heart and place a new spirit within you, taking from your bodies your stony hearts and giving you natural hearts."
    },
    psalm: {
      reference: "Psalm 51:12-15",
      text: "A clean heart create for me, O God, and a steadfast spirit renew within me. Cast me not out from your presence, and your Holy Spirit take not from me.",
      response: "Create a clean heart in me, O God."
    },
    new_testament: {
      reference: "2 Corinthians 5:17-21",
      text: "Whoever is in Christ is a new creation: the old things have passed away; behold, new things have come. And all this is from God, who has reconciled us to himself through Christ."
    },
    gospel: {
      reference: "Luke 15:1-3, 11-32",
      text: "Tax collectors and sinners were all drawing near to listen to Jesus, but the Pharisees and scribes began to complain, saying, 'This man welcomes sinners and eats with them.' So to them he addressed this parable: 'A man had two sons, and the younger son said to his father, Father, give me the share of your estate that should come to me...' (The Parable of the Prodigal Son)."
    },
    gospel_reflection: "The Parable of the Prodigal Son is really the Parable of the Running Father. Before the son can even utter his rehearsed apology, the father runs to him, embraces him, and restores his dignity. This is the scandalous, unrestrained mercy of God."
  },
  {
    old_testament: {
      reference: "1 Kings 19:9a, 11-13a",
      text: "At the mountain of God, Horeb, Elijah came to a cave where he took shelter. Then the LORD said, 'Go outside and stand on the mountain before the LORD; the LORD will be passing by.' A strong and heavy wind was rending the mountains and crushing rocks before the LORD—but the LORD was not in the wind. After the wind there was an earthquake—but the LORD was not in the earthquake. After the earthquake there was fire—but the LORD was not in the fire. After the fire there was a tiny whispering sound."
    },
    psalm: {
      reference: "Psalm 85:9-14",
      text: "I will hear what God proclaims; the LORD—for he proclaims peace. Near indeed is his salvation to those who fear him, glory dwelling in our land.",
      response: "Lord, let us see your kindness, and grant us your salvation."
    },
    new_testament: {
      reference: "Philippians 4:6-9",
      text: "Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God. Then the peace of God that surpasses all understanding will guard your hearts and minds in Christ Jesus."
    },
    gospel: {
      reference: "Matthew 14:22-33",
      text: "During the fourth watch of the night, Jesus came toward them walking on the sea. When the disciples saw him walking on the sea they were terrified. 'It is a ghost,' they said, and they cried out in fear. At once Jesus spoke to them, 'Take courage, it is I; do not be afraid.' Peter said to him in reply, 'Lord, if it is you, command me to come to you on the water.' He said, 'Come.'"
    },
    gospel_reflection: "Peter sinks not because the wind is too strong, but because he takes his eyes off Christ. The storms of our lives are real, but they have no power over the One who commands the wind and the waves. Keep your gaze fixed on Jesus."
  },
  {
    old_testament: {
      reference: "Genesis 22:1-2, 9a, 10-13, 15-18",
      text: "God put Abraham to the test. He called to him, 'Abraham!' 'Here I am!' he replied. Then God said: 'Take your son Isaac, your only one, whom you love, and go to the land of Moriah. There you shall offer him up as a holocaust on a height that I will point out to you.' ... But the LORD's messenger called to him from heaven, 'Do not lay your hand on the boy.'"
    },
    psalm: {
      reference: "Psalm 116:10, 15-19",
      text: "Precious in the eyes of the LORD is the death of his faithful ones. O LORD, I am your servant; I am your servant, the son of your handmaid; you have loosed my bonds.",
      response: "I will walk before the Lord, in the land of the living."
    },
    new_testament: {
      reference: "Hebrews 4:14-16",
      text: "Since we have a great high priest who has passed through the heavens, Jesus, the Son of God, let us hold fast to our confession. For we do not have a high priest who is unable to sympathize with our weaknesses, but one who has similarly been tested in every way, yet without sin."
    },
    gospel: {
      reference: "Mark 9:2-10",
      text: "Jesus took Peter, James, and John and led them up a high mountain apart by themselves. And he was transfigured before them, and his clothes became dazzling white, such as no fuller on earth could bleach them. Then Elijah appeared to them along with Moses, and they were conversing with Jesus."
    },
    gospel_reflection: "The Transfiguration is given to the apostles as a glimpse of glory to sustain them through the coming darkness of the Cross. When we experience moments of profound spiritual consolation, we must hold onto them to carry us through the dark nights of the soul."
  },
  {
    old_testament: {
      reference: "Exodus 3:1-8a, 13-15",
      text: "Moses was tending the flock of his father-in-law Jethro, the priest of Midian. Leading the flock across the desert, he came to Horeb, the mountain of God. There an angel of the LORD appeared to him in fire flaming out of a bush. As he looked on, he was surprised to see that the bush, though on fire, was not consumed. God called out to him from the bush, 'Moses! Moses!' He answered, 'Here I am.'"
    },
    psalm: {
      reference: "Psalm 103:1-4, 6-8, 11",
      text: "Bless the LORD, O my soul; and all my being, bless his holy name. Bless the LORD, O my soul, and forget not all his benefits. He pardons all your iniquities, heals all your ills.",
      response: "The Lord is kind and merciful."
    },
    new_testament: {
      reference: "1 Corinthians 10:1-6, 10-12",
      text: "I do not want you to be unaware, brothers and sisters, that our ancestors were all under the cloud and all passed through the sea, and all of them were baptized into Moses in the cloud and in the sea. All ate the same spiritual food, and all drank the same spiritual drink, for they drank from a spiritual rock that followed them, and the rock was the Christ."
    },
    gospel: {
      reference: "Luke 13:1-9",
      text: "Jesus told them this parable: 'There once was a person who had a fig tree planted in his orchard, and when he came in search of fruit on it but found none, he said to the gardener, For three years now I have come in search of fruit on this fig tree but have found none. So cut it down. Why should it exhaust the soil?'"
    },
    gospel_reflection: "The gardener begs for one more year to cultivate and fertilize the barren tree. This is the patience of Christ. He does not wish to cut us down in our barrenness; He desires to pour out grace upon us so that we might finally bear fruit. God's mercy is precisely this extra time."
  },
  {
    old_testament: {
      reference: "Proverbs 31:10-13, 19-20, 30-31",
      text: "When one finds a worthy wife, her value is far beyond pearls. Her husband, entrusting his heart to her, has an unfailing prize. She brings him good, and not evil, all the days of her life. She reaches out her hands to the poor, and extends her arms to the needy."
    },
    psalm: {
      reference: "Psalm 128:1-5",
      text: "Blessed are you who fear the LORD, who walk in his ways! For you shall eat the fruit of your handiwork; blessed shall you be, and favored.",
      response: "Blessed are those who fear the Lord."
    },
    new_testament: {
      reference: "1 Thessalonians 5:1-6",
      text: "Concerning times and seasons, brothers and sisters, you have no need for anything to be written to you. For you yourselves know very well that the day of the Lord will come like a thief at night. But you, brothers and sisters, are not in darkness, for that day to overtake you like a thief."
    },
    gospel: {
      reference: "Matthew 25:14-30",
      text: "Jesus told his disciples this parable: 'A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one—to each according to his ability. Then he went away. Immediately the one who received five talents went and traded with them, and made another five...'"
    },
    gospel_reflection: "The master praises the servants who invested their talents, taking risks for the Kingdom. The servant who buried his talent did so out of fear. God does not want us to be paralyzed by the fear of making mistakes; He wants us to boldly invest the grace He has given us for the salvation of the world."
  },
  {
    old_testament: {
      reference: "Wisdom 2:12, 17-20",
      text: "The wicked say: Let us beset the just one, because he is obnoxious to us; he sets himself against our doings, reproaches us for transgressions of the law and charges us with violations of our training. Let us see whether his words be true; let us find out what will happen to him. For if the just one be the son of God, God will defend him."
    },
    psalm: {
      reference: "Psalm 54:3-8",
      text: "O God, by your name save me, and by your might defend my cause. O God, hear my prayer; hearken to the words of my mouth.",
      response: "The Lord upholds my life."
    },
    new_testament: {
      reference: "James 3:16—4:3",
      text: "Where jealousy and selfish ambition exist, there is disorder and every foul practice. But the wisdom from above is first of all pure, then peaceable, gentle, compliant, full of mercy and good fruits, without inconstancy or insincerity. And the fruit of righteousness is sown in peace for those who cultivate peace."
    },
    gospel: {
      reference: "Mark 9:30-37",
      text: "Jesus and his disciples began a journey through Galilee, but he did not wish anyone to know about it. He was teaching his disciples and telling them, 'The Son of Man is to be handed over to men and they will kill him, and three days after his death the Son of Man will rise.' But they did not understand the saying, and they were afraid to question him."
    },
    gospel_reflection: "While Jesus predicts His brutal passion and death, the disciples are arguing about which of them is the greatest. How often do we do the same? We seek worldly status while missing the radical truth of the Gospel: true greatness is found in becoming the servant of all, embracing the cross of Christ."
  },
  {
    old_testament: {
      reference: "Sirach 27:30—28:7",
      text: "Wrath and anger are hateful things, yet the sinner hugs them tight. The vengeful will suffer the LORD's vengeance, for he remembers their sins in detail. Forgive your neighbor's injustice; then when you pray, your own sins will be forgiven. Could anyone nourish anger against another and expect healing from the LORD?"
    },
    psalm: {
      reference: "Psalm 103:1-4, 9-12",
      text: "Bless the LORD, O my soul; and all my being, bless his holy name. He pardons all your iniquities, heals all your ills. He redeems your life from destruction, crowns you with kindness and compassion.",
      response: "The Lord is kind and merciful, slow to anger, and rich in compassion."
    },
    new_testament: {
      reference: "Romans 14:7-9",
      text: "Brothers and sisters: None of us lives for oneself, and no one dies for oneself. For if we live, we live for the Lord, and if we die, we die for the Lord; so then, whether we live or die, we are the Lord's. For this is why Christ died and came to life, that he might be Lord of both the dead and the living."
    },
    gospel: {
      reference: "Matthew 18:21-35",
      text: "Peter approached Jesus and asked him, 'Lord, if my brother sins against me, how often must I forgive? As many as seven times?' Jesus answered, 'I say to you, not seven times but seventy-seven times. That is why the kingdom of heaven may be likened to a king who decided to settle accounts with his servants...'"
    },
    gospel_reflection: "The parable of the unforgiving servant is a stark warning. We have been forgiven an infinite debt by God through the blood of Christ. To harbor unforgiveness toward a neighbor for a finite offense is an affront to the cross. We must forgive as we have been forgiven."
  },
  {
    old_testament: {
      reference: "Isaiah 50:5-9a",
      text: "The Lord GOD opens my ear that I may hear; and I have not rebelled, have not turned back. I gave my back to those who beat me, my cheeks to those who plucked my beard; my face I did not shield from buffets and spitting. The Lord GOD is my help, therefore I am not disgraced."
    },
    psalm: {
      reference: "Psalm 116:1-9",
      text: "I love the LORD because he has heard my voice in supplication, because he has inclined his ear to me the day I called. The cords of death encompassed me; the snares of the netherworld seized upon me; I fell into distress and sorrow.",
      response: "I will walk before the Lord, in the land of the living."
    },
    new_testament: {
      reference: "James 2:14-18",
      text: "What good is it, my brothers and sisters, if someone says he has faith but does not have works? Can that faith save him? If a brother or sister has nothing to wear and has no food for the day, and one of you says to them, 'Go in peace, keep warm, and eat well,' but you do not give them the necessities of the body, what good is it?"
    },
    gospel: {
      reference: "Mark 8:27-35",
      text: "Jesus and his disciples set out for the villages of Caesarea Philippi. Along the way he asked his disciples, 'Who do people say that I am?' They said in reply, 'John the Baptist, others Elijah, still others one of the prophets.' And he asked them, 'But who do you say that I am?' Peter said to him in reply, 'You are the Christ.'"
    },
    gospel_reflection: "Jesus asks the ultimate question: 'Who do you say that I am?' He is not looking for a theological dissertation or public opinion. He is asking for a personal declaration of faith. But He immediately clarifies that following Him means taking up the cross. A Christ without a cross is an illusion."
  },
  {
    old_testament: {
      reference: "Daniel 7:13-14",
      text: "As the visions during the night continued, I saw: One like a Son of man coming, on the clouds of heaven; When he reached the Ancient One and was presented before him, the one like a Son of man received dominion, glory, and kingship; all peoples, nations, and languages serve him."
    },
    psalm: {
      reference: "Psalm 93:1-2, 5",
      text: "The LORD is king, in splendor robed; robed is the LORD and girt about with strength. And he has made the world firm, not to be moved.",
      response: "The Lord is king; he is robed in majesty."
    },
    new_testament: {
      reference: "Revelation 1:5-8",
      text: "Jesus Christ is the faithful witness, the firstborn of the dead and ruler of the kings of the earth. To him who loves us and has freed us from our sins by his blood, who has made us into a kingdom, priests for his God and Father, to him be glory and power forever and ever. Amen."
    },
    gospel: {
      reference: "John 18:33b-37",
      text: "Pilate said to Jesus, 'Are you the King of the Jews?' Jesus answered, 'Do you say this on your own or have others told you about me?' Pilate answered, 'I am not a Jew, am I? Your own nation and the chief priests handed you over to me. What have you done?' Jesus answered, 'My kingdom does not belong to this world.'"
    },
    gospel_reflection: "Christ the King stands bound, beaten, and crowned with thorns before Pilate. He has no earthly army, yet He is the ruler of the universe. His kingship is not of domination, but of truth, self-sacrifice, and eternal love. To belong to His Kingdom is to bear witness to the Truth, even unto death."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Clear existing readings to ensure a clean slate
    await Reading.deleteMany({});
    console.log("Cleared existing readings.");

    const readingsToInsert = [];
    
    // Generate dates for the entire year of 2026
    const year = 2026;
    let startDate = new Date(Date.UTC(year, 0, 1)); // Jan 1, 2026
    const endDate = new Date(Date.UTC(year, 11, 31)); // Dec 31, 2026

    let dayCounter = 0;

    while (startDate <= endDate) {
      const dateString = startDate.toISOString().split("T")[0];
      
      // Cycle through our rich collection of authentic readings
      const baseReading = authenticReadings[dayCounter % authenticReadings.length];
      
      readingsToInsert.push({
        date: dateString,
        old_testament: baseReading.old_testament,
        psalm: baseReading.psalm,
        new_testament: baseReading.new_testament,
        gospel: baseReading.gospel,
        gospel_reflection: baseReading.gospel_reflection
      });

      // Move to next day
      startDate.setUTCDate(startDate.getUTCDate() + 1);
      dayCounter++;
    }

    // Insert all 365 readings in bulk
    await Reading.insertMany(readingsToInsert);
    console.log(`Successfully inserted ${readingsToInsert.length} daily readings for the year ${year}.`);

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

seedDatabase();
