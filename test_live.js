const https = require('https');

https.get('https://corpus-christi.vercel.app/stations', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Body length:', data.length);
    console.log('Contains station-1.jpg?', data.includes('station-1.jpg'));
    console.log('Contains upload.wikimedia.org?', data.includes('upload.wikimedia.org'));
  });
}).on('error', (e) => {
  console.error(e);
});
