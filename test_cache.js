const https = require('https');

https.get('https://corpus-christi.vercel.app/readings?date=2026-05-09', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    const hasText = data.includes("Hezekiah");
    console.log("Length of HTML:", data.length);
    console.log("Contains Isaiah text?", hasText);
    if (!hasText) {
        console.log("Still serving stale cache or empty data for today query param!");
    } else {
        console.log("Success! Fresh text is loaded for today query param.");
    }
  });
}).on('error', console.error);
