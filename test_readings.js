const https = require('https');

https.get('https://corpus-christi.vercel.app/api/readings', (res) => {
  let data = '';
  console.log('Status:', res.statusCode);
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch(e) {
      console.log('Raw:', data);
    }
  });
}).on('error', console.error);
