const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  "https://www.wga.hu/art/p/poussin/2/21poussi.jpg", // Baptism
  "https://www.wga.hu/art/p/poussin/2/22poussi.jpg", // Confirmation
  "https://www.wga.hu/art/p/poussin/2/23poussi.jpg", // Eucharist
  "https://www.wga.hu/art/p/poussin/2/24poussi.jpg", // Penance
  "https://www.wga.hu/art/p/poussin/2/25poussi.jpg", // Extreme Unction
  "https://www.wga.hu/art/p/poussin/2/26poussi.jpg", // Ordination
  "https://www.wga.hu/art/p/poussin/2/27poussi.jpg"  // Marriage
];

const publicDir = path.join(__dirname, 'public', 'images', 'sacraments');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status ${res.statusCode} on ${url}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  for (let i = 0; i < urls.length; i++) {
    console.log(`Downloading sacrament-${i + 1}...`);
    try {
      const dest = path.join(publicDir, `sacrament-${i + 1}.jpg`);
      await downloadImage(urls[i], dest);
      console.log(`  Success! -> ${dest}`);
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }
}

main();
