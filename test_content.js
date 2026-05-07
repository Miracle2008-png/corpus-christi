const https = require('https');

https.get('https://corpus-christi.vercel.app/images/stations/station-1.jpg', (res) => {
  console.log('Direct Image Status:', res.statusCode);
  console.log('Direct Image Content-Type:', res.headers['content-type']);
}).on('error', (e) => {
  console.error(e);
});

https.get('https://corpus-christi.vercel.app/_next/image?url=%2Fimages%2Fstations%2Fstation-1.jpg&w=1920&q=75', (res) => {
  console.log('Next Image API Status:', res.statusCode);
  console.log('Next Image Content-Type:', res.headers['content-type']);
}).on('error', (e) => {
  console.error(e);
});
