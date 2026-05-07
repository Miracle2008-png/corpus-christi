const https = require('https');

https.get('https://corpus-christi.vercel.app/icon.svg', (res) => {
  console.log('Icon SVG Status:', res.statusCode);
  if (res.statusCode !== 200) {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => console.log('Error Body:', data));
  }
}).on('error', (e) => {
  console.error(e);
});
