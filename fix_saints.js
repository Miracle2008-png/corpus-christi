const https = require('https');
const fs = require('fs');
const path = require('path');

// More specific searches for the ones that got wrong images
const fixes = [
  { name: 'thomas-aquinas', queries: ['Thomas Aquinas Dominican philosopher', 'Aquinas theology'] },
  { name: 'augustine-of-hippo', queries: ['Augustine Hippo bishop', 'Saint Augustine bishop confessions'] },
  { name: 'ignatius-of-loyola', queries: ['Ignatius Loyola Jesuit founder', 'Loyola spiritual exercises'] },
  { name: 'therese-of-lisieux', queries: ['Therese flower carmelite', 'carmelite nun saint'] },
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve(null); } });
    }).on('error', reject);
  });
}

function downloadImg(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      if (r.statusCode !== 200) { return resolve(false); }
      const f = fs.createWriteStream(dest);
      r.pipe(f);
      f.on('finish', () => resolve(true));
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const item of fixes) {
    let downloaded = false;
    for (const query of item.queries) {
      if (downloaded) break;
      console.log(`Searching ${item.name}: "${query}"`);
      const res = await get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}&hasImages=true`);
      if (!res || !res.objectIDs) continue;
      for (const id of res.objectIDs.slice(0, 15)) {
        const obj = await get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        if (!obj || !obj.primaryImageSmall) continue;
        // Skip the wrong Francis image
        if (obj.primaryImageSmall.includes('DP104367')) continue;
        const titleLower = (obj.title || '').toLowerCase();
        if (titleLower.includes('montmartre') || titleLower.includes('boulevard') || titleLower.includes('landscape')) continue;
        console.log(`  Trying: "${obj.title}"`);
        const dest = path.join('public', 'images', 'saints', `${item.name}.jpg`);
        const ok = await downloadImg(obj.primaryImageSmall, dest);
        if (ok) { console.log(`  ✓ Fixed!`); downloaded = true; break; }
      }
    }
    if (!downloaded) console.log(`  ✗ Could not find better image for ${item.name}`);
    await new Promise(r => setTimeout(r, 300));
  }
  console.log('\n✓ Done fixing!');
}
run().catch(console.error);
