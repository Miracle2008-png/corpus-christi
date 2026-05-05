const https = require('https');
const fs = require('fs');
const path = require('path');

// Met Museum searches for each saint + Mary
const searches = [
  { name: 'mary', query: 'Immaculate Conception Virgin Mary Murillo' },
  { name: 'francis-of-assisi', query: 'Saint Francis of Assisi' },
  { name: 'teresa-of-avila', query: 'Saint Teresa of Avila' },
  { name: 'thomas-aquinas', query: 'Saint Thomas Aquinas' },
  { name: 'joan-of-arc', query: 'Joan of Arc' },
  { name: 'augustine-of-hippo', query: 'Saint Augustine' },
  { name: 'catherine-of-siena', query: 'Saint Catherine Siena' },
  { name: 'ignatius-of-loyola', query: 'Saint Ignatius Loyola' },
  { name: 'john-paul-ii', query: 'Pope John Paul' },
  { name: 'therese-of-lisieux', query: 'Saint Therese Lisieux' },
  { name: 'peter-apostle', query: 'Saint Peter Apostle' },
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve(null); }
      });
    }).on('error', reject);
  });
}

function downloadImg(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      if (r.statusCode !== 200) { console.log('  Skip', r.statusCode); return resolve(false); }
      const f = fs.createWriteStream(dest);
      r.pipe(f);
      f.on('finish', () => resolve(true));
    }).on('error', () => resolve(false));
  });
}

async function run() {
  // Ensure directories exist
  fs.mkdirSync('public/images/saints', { recursive: true });
  fs.mkdirSync('public/images', { recursive: true });

  for (const item of searches) {
    console.log(`\nSearching for: ${item.name} (${item.query})`);
    
    const searchRes = await get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(item.query)}&hasImages=true&medium=Paintings`);
    
    if (!searchRes || !searchRes.objectIDs || searchRes.objectIDs.length === 0) {
      console.log('  No results, trying without medium filter...');
      const r2 = await get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(item.query)}&hasImages=true`);
      if (!r2 || !r2.objectIDs || r2.objectIDs.length === 0) {
        console.log('  No results at all');
        continue;
      }
      searchRes.objectIDs = r2.objectIDs;
    }

    let downloaded = false;
    for (const id of searchRes.objectIDs.slice(0, 10)) {
      const obj = await get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      if (!obj || !obj.primaryImageSmall) continue;
      
      console.log(`  Found: "${obj.title}" — ${obj.primaryImageSmall}`);
      
      const dest = item.name === 'mary' 
        ? path.join('public', 'images', 'mary.jpg')
        : path.join('public', 'images', 'saints', `${item.name}.jpg`);
      
      const ok = await downloadImg(obj.primaryImageSmall, dest);
      if (ok) {
        console.log(`  ✓ Downloaded to ${dest}`);
        downloaded = true;
        break;
      }
    }

    if (!downloaded) console.log('  ✗ Failed to download');
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('\n✓ Done!');
}

run().catch(console.error);
