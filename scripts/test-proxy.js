const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://en.wikipedia.org/'
      } 
    }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const thumbUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Papa_Francisco_%282023%29.jpg/400px-Papa_Francisco_%282023%29.jpg";
  const rawUrl = "https://upload.wikimedia.org/wikipedia/commons/1/1a/Papa_Francisco_%282023%29.jpg";
  const bernadette = "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bernadette_Soubirous_%28body%29.jpg";

  console.log("Francis Thumb:", await checkUrl(thumbUrl));
  console.log("Francis Raw:", await checkUrl(rawUrl));
  console.log("Bernadette:", await checkUrl(bernadette));
}

main();
