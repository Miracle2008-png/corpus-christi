/**
 * Re-fetch missing Bible texts with retry logic.
 * Run: node scripts/prefetch-texts.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const data = require('../data/lectionary-2026-full.json');

function fetchText(reference, attempt = 1) {
  return new Promise((resolve) => {
    if (!reference) return resolve('');
    const encoded = encodeURIComponent(reference);
    const url = `https://bible-api.com/${encoded}?translation=web`;
    const req = https.get(url, (res) => {
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
    req.on('error', () => {
      if (attempt < 4) {
        setTimeout(() => fetchText(reference, attempt + 1).then(resolve), 1000 * attempt);
      } else {
        resolve('');
      }
    });
    req.setTimeout(10000, () => {
      req.destroy();
      if (attempt < 4) {
        setTimeout(() => fetchText(reference, attempt + 1).then(resolve), 1000 * attempt);
      } else {
        resolve('');
      }
    });
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function isPlaceholder(text) {
  return !text || text.startsWith('A reading from') || text === 'Praise the Lord, all nations.';
}

async function main() {
  const output = [...data];
  let fixed = 0;
  let stillBad = 0;

  for (let i = 0; i < output.length; i++) {
    const day = output[i];
    const needsOT = isPlaceholder(day.old_testament?.text);
    const needsPS = isPlaceholder(day.psalm?.text);
    const needsNT = day.new_testament && isPlaceholder(day.new_testament?.text);
    const needsGS = isPlaceholder(day.gospel?.text);

    if (!needsOT && !needsPS && !needsNT && !needsGS) continue;

    process.stdout.write(`\r[${i + 1}/${output.length}] Fixing ${day.date} (fixed:${fixed}, still bad:${stillBad})...`);

    // Fetch sequentially to avoid rate limit
    const otText = needsOT ? await fetchText(day.old_testament?.reference) : day.old_testament?.text;
    await sleep(300);
    const psText = needsPS ? await fetchText(day.psalm?.reference) : day.psalm?.text;
    await sleep(300);
    const gsText = needsGS ? await fetchText(day.gospel?.reference) : day.gospel?.text;
    await sleep(300);
    let ntText = day.new_testament?.text;
    if (needsNT) {
      ntText = await fetchText(day.new_testament?.reference);
      await sleep(300);
    }

    if (!isPlaceholder(gsText)) fixed++;
    else stillBad++;

    output[i] = {
      ...day,
      old_testament: { ...day.old_testament, text: isPlaceholder(otText) ? day.old_testament.text : otText },
      psalm: { ...day.psalm, text: isPlaceholder(psText) ? day.psalm.text : psText },
      gospel: { ...day.gospel, text: isPlaceholder(gsText) ? day.gospel.text : gsText },
      ...(day.new_testament && {
        new_testament: { ...day.new_testament, text: (!isPlaceholder(ntText) ? ntText : day.new_testament.text) }
      }),
    };
  }

  const outPath = path.join(__dirname, '../data/lectionary-2026-full.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\n\nDone! Newly fixed: ${fixed}, Still missing: ${stillBad}`);
  console.log('Saved to data/lectionary-2026-full.json');
}

main().catch(console.error);
