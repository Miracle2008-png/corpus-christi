const https = require('https');

async function checkApi(filename) {
  return new Promise((resolve) => {
    // MediaWiki API requires the filename to be prefixed with File:
    // and properly URL encoded.
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === "-1") {
            resolve("File not found on Wikipedia");
          } else {
            resolve(pages[pageId].imageinfo[0].url);
          }
        } catch (e) {
          resolve("JSON parse error: " + e.message);
        }
      });
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  console.log("Francis:", await checkApi("Papa_Francisco_(2023).jpg"));
  console.log("Bernadette:", await checkApi("Bernadette_Soubirous_(body).jpg"));
}

main();
