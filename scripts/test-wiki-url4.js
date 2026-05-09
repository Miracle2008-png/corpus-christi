const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/100.0.0.0 Safari/537.36', 'Referer': 'https://corpus-christi.vercel.app/' } }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

function checkUrlNoReferer(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/100.0.0.0 Safari/537.36' } }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const bernadette = "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bernadette_Soubirous_%28body%29.jpg";
  const francisThumb = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Papa_Francisco_%282023%29.jpg/400px-Papa_Francisco_%282023%29.jpg";
  
  console.log("Bernadette No Referer:", await checkUrlNoReferer(bernadette));
  console.log("Bernadette With Referer:", await checkUrl(bernadette));
  console.log("Francis Thumb No Referer:", await checkUrlNoReferer(francisThumb));
  console.log("Francis Thumb With Referer:", await checkUrl(francisThumb));
}

main();
