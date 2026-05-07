require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Reading = mongoose.models.Reading || mongoose.model('Reading', new mongoose.Schema({}, { strict: false }));
  
  await Reading.deleteMany({});
  console.log('Deleted all readings.');

  const days = [];
  const start = new Date("2026-05-01T12:00:00Z");
  const end = new Date("2026-12-31T12:00:00Z");
  let current = new Date(start);
  let index = 0;

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      liturgical_season: "Ordinary Time",
      old_testament: { reference: `Genesis ${(index % 50) + 1}:1-5`, text: " " },
      psalm: { reference: `Psalm ${(index % 150) + 1}:1-3`, response: "The Lord is my shepherd.", text: " " },
      new_testament: { reference: `Romans ${(index % 16) + 1}:1-2`, text: " " },
      gospel: { reference: `Mark ${(index % 16) + 1}:1-8`, text: " " },
      gospel_reflection: "Take a moment to reflect on how today's Gospel applies to your life and journey of faith."
    });
    current.setDate(current.getDate() + 1);
    index++;
  }

  await Reading.insertMany(days);
  console.log(`Seeded ${days.length} readings successfully.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
