const fs = require('fs');
const path = require('path');

const files = [
  "popes-1-50.json",
  "popes-51-100.json",
  "popes-101-150.json",
  "popes-151-200.json",
  "popes-201-250.json",
  "popes-251-265.json"
];

async function fetchWikiImage(popeName) {
  const searchQuery = popeName.startsWith("Pope") ? popeName : `Pope ${popeName.replace("St. ", "").replace("Bl. ", "")}`;
  
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchQuery)}&prop=pageimages&format=json&pithumbsize=500`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'CatholicPlatformBot/1.0 (victus@example.com)'
      }
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== "-1" && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
      }
    } catch (e) {
      console.error(`Invalid JSON for ${searchQuery}. Response starts with:`, text.substring(0, 50));
    }
  } catch (e) {
    console.error(`Error fetching for ${searchQuery}:`, e.message);
  }
  return null;
}

async function processAll() {
  for (const file of files) {
    const filePath = path.join(__dirname, '..', 'data', file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    for (const pope of data) {
      if (!pope.img) {
        console.log(`Fetching image for ${pope.name}...`);
        const img = await fetchWikiImage(pope.name);
        if (img) {
          pope.img = img;
          changed = true;
          console.log(`Found image for ${pope.name}: ${img}`);
        } else {
          console.log(`No image found for ${pope.name}`);
        }
        await new Promise(r => setTimeout(r, 1500)); // 1.5 seconds delay
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Saved updates to ${file}`);
    }
  }
}

processAll().catch(console.error);
