require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Reading = mongoose.models.Reading || mongoose.model('Reading', new mongoose.Schema({}, { strict: false }));
  
  await Reading.deleteMany({});
  console.log('Deleted all readings.');

  const lectionaryData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'lectionary-2026.json'), 'utf-8'));

  const documents = lectionaryData.map(day => ({
    date: day.date,
    liturgical_season: day.liturgical_season,
    old_testament: { reference: day.old_testament.reference, text: " " },
    psalm: { reference: day.psalm.reference, response: day.psalm.response, text: " " },
    new_testament: { reference: day.new_testament.reference, text: " " },
    gospel: { reference: day.gospel.reference, text: " " },
    gospel_reflection: "Take a moment to reflect on how today's Gospel applies to your life and journey of faith."
  }));

  await Reading.insertMany(documents);
  console.log(`Seeded ${documents.length} readings successfully.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
