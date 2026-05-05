const https = require('https');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(r => setTimeout(r, ms));

function fetchApi(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'CorpusChristiApp/1.0 (contact@example.com)' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'CorpusChristiApp/1.0' } }, r => {
      if (r.statusCode !== 200) return resolve(false);
      const f = fs.createWriteStream(dest);
      r.pipe(f);
      f.on('finish', () => resolve(true));
    }).on('error', () => resolve(false));
  });
}

async function run() {
  fs.mkdirSync('public/images/popes', { recursive: true });
  const files = ['popes-1-50.json', 'popes-51-100.json', 'popes-101-150.json', 'popes-151-200.json', 'popes-201-250.json', 'popes-251-265.json'];
  
  for (const file of files) {
    if (!fs.existsSync(`data/${file}`)) continue;
    let data = JSON.parse(fs.readFileSync(`data/${file}`));
    let updated = false;

    for (let p of data) {
      if (p.img) continue; // Skip if already has image
      
      let searchName = p.name.replace('St. ', '').replace('Bl. ', '');
      if (!searchName.includes('Peter')) searchName = 'Pope ' + searchName;
      
      console.log(`Fetching: ${searchName}`);
      const api = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=400`;
      
      const res = await fetchApi(api);
      if (res && res.query && res.query.pages) {
        const pages = Object.values(res.query.pages);
        if (pages[0] && pages[0].thumbnail) {
          const url = pages[0].thumbnail.source;
          const ext = path.extname(new URL(url).pathname) || '.jpg';
          const filename = `pope-${p.n}${ext}`;
          const dest = path.join('public', 'images', 'popes', filename);
          
          const ok = await download(url, dest);
          if (ok) {
            console.log(`  ✓ Saved ${filename}`);
            p.img = `/images/popes/${filename}`;
            updated = true;
          }
        } else {
          console.log(`  ✗ No image found on Wikipedia`);
        }
      }
      await delay(300); // 300ms delay to avoid rate limit
    }
    
    if (updated) {
      fs.writeFileSync(`data/${file}`, JSON.stringify(data, null, 2));
      console.log(`=> Updated ${file}`);
    }
  }
}

run().then(() => console.log('Done!'));
