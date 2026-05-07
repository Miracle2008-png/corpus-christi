const https = require('https');

const popeImg = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Menologion_of_Basil_II_-_Patrobulus%2C_Hermas%2C_Linus%2C_Caius%2C_Philologus_of_70_disciples_%28Portrait_of_Linus%29.jpg";
const nextUrl = `https://corpus-christi.vercel.app/_next/image?url=${encodeURIComponent(popeImg)}&w=640&q=75`;

https.get(nextUrl, (res) => {
  console.log('Next Image API (Wikimedia) Status:', res.statusCode);
  if (res.statusCode !== 200) {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => console.log('Error Body:', data));
  }
}).on('error', (e) => {
  console.error(e);
});
