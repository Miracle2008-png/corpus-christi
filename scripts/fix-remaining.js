const fs = require('fs');
const https = require('https');
const path = require('path');

const data = require('../data/lectionary-2026-full.json');

const missingDates = [
  "2026-05-22", "2026-08-07", "2026-09-24", "2026-09-25",
  "2026-09-26", "2026-09-27", "2026-12-13", "2026-12-28"
];

function fetchText(reference) {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(reference);
    const url = `https://bible-api.com/${encoded}?translation=web`;
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          const text = (json.text || '').trim().replace(/\n{3,}/g, '\n\n');
          resolve(text);
        } catch {
          resolve('');
        }
      });
    });
  });
}

async function fix() {
  for (const date of missingDates) {
    const day = data.find(d => d.date === date);
    if (day && day.gospel) {
      console.log(`Fetching ${day.gospel.reference} for ${date}...`);
      const text = await fetchText(day.gospel.reference);
      if (text) {
        day.gospel.text = text;
        console.log(`Success for ${date}`);
      } else {
        console.log(`Failed for ${date}`);
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  fs.writeFileSync(path.join(__dirname, '../data/lectionary-2026-full.json'), JSON.stringify(data, null, 2));
  console.log('Saved data/lectionary-2026-full.json');
}

fix();
