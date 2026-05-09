const https = require('https');

https.get('https://corpus-christi.vercel.app/api/admin/readings', (res) => {
  let data = '';
  console.log('Status:', res.statusCode);
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
}).on('error', console.error);
