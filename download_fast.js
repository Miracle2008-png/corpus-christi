const fs = require('fs');
const path = require('path');
const https = require('https');

const titles = [
  "Brooklyn_Museum_-_Pilate_Washes_His_Hands_(Pilate_se_lave_les_mains)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Bearing_the_Cross_(Jésus_chargé_de_la_Croix)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_First_Fall_(La_première_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Meets_His_Mother_(Jésus_rencontre_sa_mère)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Simon_the_Cyrenian_Compelled_to_Carry_the_Cross_with_Jesus_(Simon_de_Cyrène_contraint_de_porter_la_Croix_avec_Jésus)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Saint_Veronica_(Sainte_Véronique)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Second_Fall_(La_deuxième_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Daughters_of_Jerusalem_(Les_filles_de_Jérusalem)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Third_Fall_(La_troisième_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Stripped_of_His_Clothing_(Jésus_dépouillé_des_ses_vêtements)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_First_Nail_(Le_premier_clou)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Death_of_Jesus_(La_mort_de_Jésus)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Descent_from_the_Cross_(La_descente_de_croix)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Carried_to_the_Tomb_(Jésus_porté_au_tombeau)_-_James_Tissot.jpg"
];

const publicDir = path.join(__dirname, 'public', 'images', 'stations');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CorpusChristi/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) {
        let location = res.headers.location;
        if (location.startsWith('/')) location = 'https://commons.wikimedia.org' + location;
        return downloadImage(location, destPath).then(resolve).catch(reject);
      }
      
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed with status ${res.statusCode} on ${url}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  const stationsFile = path.join(__dirname, 'data', 'stations.json');
  const stationsData = JSON.parse(fs.readFileSync(stationsFile, 'utf8'));

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    // Use width=1024 so the image is reasonably sized but fast to download
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=1024`;
    const destPath = path.join(publicDir, `station-${i + 1}.jpg`);
    
    console.log(`Downloading Station ${i + 1}...`);
    try {
      await downloadImage(url, destPath);
      console.log(`  Success -> ${destPath}`);
      stationsData[i].image_url = `/images/stations/station-${i + 1}.jpg`;
    } catch (err) {
      console.error(`  Error on Station ${i + 1}:`, err.message);
    }
  }

  fs.writeFileSync(stationsFile, JSON.stringify(stationsData, null, 2));
  console.log('All downloads complete and stations.json updated.');
}

main();
