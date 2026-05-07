const https = require('https');

https.get('https://corpus-christi.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Contains <details>?', data.includes('<details'));
    console.log('Contains ReadingMode?', data.includes('Reading Mode') || data.includes('reading-mode-overlay'));
    if (data.includes('details')) console.log('Live site IS updated.');
    else console.log('Live site is NOT updated.');
  });
}).on('error', (e) => {
  console.error(e);
});
