const https = require('https');
const fs = require('fs');
const path = require('path');

const missing = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Brooklyn_Museum_-_Jesus_Falls_Beneath_the_Cross_%28J%C3%A9sus_tombe_sous_la_Croix%29_-_James_Tissot.jpg", file: "station-3.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Brooklyn_Museum_-_A_Holy_Woman_Wipes_the_Face_of_Jesus_%28Une_sainte_femme_essuie_le_visage_de_J%C3%A9sus%29_-_James_Tissot.jpg", file: "station-6.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Brooklyn_Museum_-_The_Second_Fall_%28La_deuxi%C3%A8me_chute%29_-_James_Tissot.jpg", file: "station-7.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Brooklyn_Museum_-_Jesus_Falls_the_Third_Time_%28J%C3%A9sus_tombe_pour_la_troisi%C3%A8me_fois%29_-_James_Tissot.jpg", file: "station-9.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Brooklyn_Museum_-_The_Descent_from_the_Cross_%28La_descente_de_croix%29_-_James_Tissot.jpg", file: "station-13.jpg" }
];

const publicDir = path.join(__dirname, 'public', 'images', 'stations');

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CorpusChristiScript/1.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
         downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed with status ${res.statusCode} on ${url}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  for (const item of missing) {
    const dest = path.join(publicDir, item.file);
    console.log(`Downloading ${item.file}...`);
    try {
      await downloadImage(item.url, dest);
      console.log(`  Success! -> ${dest}`);
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }
}

main();
