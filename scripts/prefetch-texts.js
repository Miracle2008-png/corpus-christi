/**
 * Pre-fetch all Bible texts from bible-api.com and bake them into lectionary-2026.json
 * Run locally: node scripts/prefetch-texts.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const data = require('../data/lectionary-2026.json');

function fetchText(reference) {
  return new Promise((resolve) => {
    if (!reference) return resolve('');
    const encoded = encodeURIComponent(reference);
    const url = `https://bible-api.com/${encoded}?translation=web`;
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve((json.text || '').trim().replace(/\n{3,}/g, '\n\n'));
        } catch {
          resolve('');
        }
      });
    }).on('error', () => resolve(''));
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const output = [];
  const total = data.length;

  for (let i = 0; i < total; i++) {
    const day = data[i];
    process.stdout.write(`\r[${i + 1}/${total}] Fetching ${day.date}...`);

    const [otText, psText, ntText, gsText] = await Promise.all([
      fetchText(day.old_testament?.reference),
      fetchText(day.psalm?.reference),
      fetchText(day.new_testament?.reference), // will be '' on weekdays since reference is undefined
      fetchText(day.gospel?.reference),
    ]);

    const entry = {
      date: day.date,
      liturgical_season: day.liturgical_season,
      old_testament: {
        reference: day.old_testament.reference,
        text: otText || `A reading from the Old Testament (${day.old_testament.reference}).`,
      },
      psalm: {
        reference: day.psalm.reference,
        response: day.psalm.response,
        text: psText || `Praise the Lord, all nations.`,
      },
      gospel: {
        reference: day.gospel.reference,
        text: gsText || `A reading from the Holy Gospel.`,
      },
      gospel_reflection: "Take a moment to reflect on how today's Gospel applies to your life and journey of faith.",
    };

    // Only add second reading for Sundays (when new_testament exists in source)
    if (day.new_testament?.reference) {
      entry.new_testament = {
        reference: day.new_testament.reference,
        text: ntText || `A reading from the New Testament (${day.new_testament.reference}).`,
      };
    }

    output.push(entry);

    // Polite rate limit: 200ms between requests to avoid being blocked
    await sleep(200);
  }

  const outPath = path.join(__dirname, '../data/lectionary-2026-full.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\n\nDone! Saved ${output.length} days with full texts to data/lectionary-2026-full.json`);
}

main().catch(console.error);
