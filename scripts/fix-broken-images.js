const fs = require('fs');
const path = require('path');
const https = require('https');

async function getWikiImage(name) {
  const titles = [name, `Pope ${name}`, `${name} (pope)`, `Saint ${name}`];
  for (const title of titles) {
    const result = await new Promise(async (resolve) => {
      await new Promise(r => setTimeout(r, 500)); // Throttle
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const pages = parsed.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pageId !== "-1" && pages[pageId].thumbnail) {
              resolve(pages[pageId].thumbnail.source);
            } else {
              resolve(null);
            }
          } catch (e) { resolve(null); }
        });
      }).on('error', (e) => resolve(null));
    });
    if (result) return result;
  }
  return null;
}

const files = [
  'data/popes-1-50.json',
  'data/popes-51-100.json',
  'data/popes-101-150.json',
  'data/popes-151-200.json',
  'data/popes-201-250.json',
  'data/popes-251-265.json',
  'data/saints.json'
];

async function fixFile(filePath) {
  const absolutePath = path.resolve(__dirname, '..', filePath);
  const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  let count = 0;

  for (let item of data) {
    const name = item.name;
    const currentImg = item.img || item.image_url;
    
    // Refresh all wikimedia URLs to ensure they are current
    if (!currentImg || (typeof currentImg === 'string' && currentImg.includes("wikimedia.org"))) {
      console.log(`Checking/Refreshing ${name}...`);
      const newImg = await getWikiImage(name);
      if (newImg) {
        if (item.img !== undefined) item.img = newImg;
        if (item.image_url !== undefined) item.image_url = newImg;
        count++;
      }
    }
  }

  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${count} images in ${filePath}`);
}

async function main() {
  for (const file of files) {
    await fixFile(file);
  }
}

main();
