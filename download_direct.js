const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Seven_Sacraments_-_Baptism_%28II%29_1646_Nicolas_Poussin.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/Seven_Sacraments_-_Confirmation_II_%281645%29_Nicolas_Poussin.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/Nicolas_Poussin_-_The_Sacrament_of_the_Holy_Eucharist_%281647%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Nicolas_Poussin_-_The_Sacrament_of_Penance_%281647%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Nicolas_Poussin_-_The_Sacrament_of_Extreme_Unction_%281644%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Nicolas_Poussin_-_The_Sacrament_of_Ordination_%281647%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Nicolas_Poussin_-_The_Sacrament_of_Marriage_%281647%29.jpg"
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
