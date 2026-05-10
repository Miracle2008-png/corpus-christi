const https = require('https');

async function testFetch(url) {
  return new Promise((resolve) => {
    https.get(url, { 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://en.wikipedia.org/",
      } 
    }, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function main() {
  const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg/500px-Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg";
  console.log("Status:", await testFetch(url));
}

main();
