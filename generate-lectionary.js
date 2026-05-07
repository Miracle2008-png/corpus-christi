const fs = require('fs');
const path = require('path');

const gospels = ["Matthew", "Mark", "Luke", "John"];
const epistles = ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "1 Timothy", "Hebrews", "James", "1 Peter", "1 John"];

function generateLectionary() {
  const days = [];
  const start = new Date("2026-01-01T12:00:00Z");
  const end = new Date("2026-12-31T12:00:00Z");
  
  let current = new Date(start);
  let index = 0;

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    
    // Cycle through Old Testament chapters
    const otChapter = (index % 50) + 1;
    // Cycle through Psalms
    const psalmChapter = (index % 150) + 1;
    // Cycle through Epistles
    const epistleBook = epistles[Math.floor(index / 10) % epistles.length];
    const epistleChapter = (index % 5) + 1;
    // Cycle through Gospels
    const gospelBook = gospels[Math.floor(index / 20) % gospels.length];
    const gospelChapter = (index % 20) + 1;

    days.push({
      date: dateStr,
      liturgical_season: "Ordinary Time",
      old_testament: { reference: `Genesis ${otChapter}:1-5` },
      psalm: { reference: `Psalm ${psalmChapter}:1-3`, response: "The Lord is my shepherd, there is nothing I shall want." },
      new_testament: { reference: `${epistleBook} ${epistleChapter}:1-4` },
      gospel: { reference: `${gospelBook} ${gospelChapter}:1-8` }
    });
    
    current.setDate(current.getDate() + 1);
    index++;
  }

  const outputPath = path.join(__dirname, 'data', 'lectionary-2026.json');
  fs.writeFileSync(outputPath, JSON.stringify(days, null, 2));
  console.log(`Generated ${days.length} days of readings and saved to ${outputPath}`);
}

generateLectionary();
