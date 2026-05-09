const https = require('https');

https.get('https://corpus-christi.vercel.app/readings', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check if the HTML contains the actual gospel text
    const hasText = data.includes("He began to speak to them in parables");
    console.log("Status:", res.statusCode);
    console.log("Contains actual text?", hasText);
    console.log("Contains 'God’s love is not abstract' (fallback)?", data.includes("God's love is not abstract"));
  });
}).on('error', console.error);
