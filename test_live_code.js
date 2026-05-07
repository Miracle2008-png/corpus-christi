const https = require('https');

https.get('https://corpus-christi.vercel.app/readings', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Contains ReadingMode?', data.includes('Reading Mode') || data.includes('reading-mode-overlay'));
    console.log('Contains new SVG Logo?', data.includes('icon.svg'));
  });
}).on('error', (e) => {
  console.error(e);
});
