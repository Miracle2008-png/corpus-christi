const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/100.0.0.0 Safari/537.36' } }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const thumbUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Papa_Francisco_%282023%29.jpg/400px-Papa_Francisco_%282023%29.jpg";
  const rawUrl1 = "https://upload.wikimedia.org/wikipedia/commons/1/1a/Papa_Francisco_%282023%29.jpg";
  const rawUrl2 = "https://upload.wikimedia.org/wikipedia/commons/1/1a/Papa_Francisco_(2023).jpg";
  
  console.log("Thumb URL:", await checkUrl(thumbUrl));
  console.log("Raw URL 1:", await checkUrl(rawUrl1));
  console.log("Raw URL 2:", await checkUrl(rawUrl2));
}

main();
