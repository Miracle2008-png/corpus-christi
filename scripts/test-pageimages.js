const https = require('https');

async function getWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    
    https.get(url, { headers: { 'User-Agent': 'CorpusChristiApp/1.0 (test)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === "-1" || !pages[pageId].thumbnail) {
            resolve(null);
          } else {
            resolve(pages[pageId].thumbnail.source);
          }
        } catch (e) {
          resolve("JSON parse error: " + e.message);
        }
      });
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const names = [
    "Bernadette Soubirous",
    "Catherine of Bologna",
    "Clare of Assisi",
    "John Vianney",
    "Vincent de Paul",
    "Rita of Cascia",
    "Saint Zita",
    "Anna Maria Taigi"
  ];
  for (const name of names) {
    console.log(`${name}:`, await getWikiImage(name));
  }
}

main();
