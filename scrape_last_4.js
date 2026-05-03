const https = require('https');
const fs = require('fs');
const path = require('path');

const missingPages = [
  { url: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_A_Holy_Woman_Wipes_the_Face_of_Jesus_(Une_sainte_femme_essuie_le_visage_de_J%C3%A9sus)_-_James_Tissot.jpg", file: "station-6.jpg" },
  { url: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_The_Second_Fall_(La_deuxi%C3%A8me_chute)_-_James_Tissot.jpg", file: "station-7.jpg" },
  { url: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_The_Third_Fall_(La_troisi%C3%A8me_chute)_-_James_Tissot.jpg", file: "station-9.jpg" },
  { url: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_The_Descent_from_the_Cross_(La_descente_de_croix)_-_James_Tissot.jpg", file: "station-13.jpg" }
];

const publicDir = path.join(__dirname, 'public', 'images', 'stations');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status ${res.statusCode}`));
      }
    });
  });
}

async function main() {
  for (const item of missingPages) {
    console.log(`Fetching HTML for ${item.file}...`);
    try {
      const html = await fetchHtml(item.url);
      const match = html.match(/<a href="(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]+)" class="internal" title="[^"]+">Original file<\/a>/);
      if (match && match[1]) {
        let imgUrl = match[1];
        console.log(`  Found original URL: ${imgUrl}`);
        const dest = path.join(publicDir, item.file);
        await downloadImage(imgUrl, dest);
        console.log(`  Downloaded successfully!`);
      } else {
        console.error(`  Could not find image URL in HTML.`);
      }
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }
}

main();
