const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/100.0.0.0 Safari/537.36' } }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const url1 = "https://commons.wikimedia.org/wiki/Special:FilePath/Papa_Francisco_%282023%29.jpg";
  const url2 = "https://commons.wikimedia.org/wiki/Special:FilePath/Bernadette_Soubirous_%28body%29.jpg";
  
  console.log("Papa Francisco:", await checkUrl(url1));
  console.log("Bernadette:", await checkUrl(url2));
}

main();
