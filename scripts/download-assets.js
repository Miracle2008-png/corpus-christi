const fs = require('fs');
const https = require('https');
const path = require('path');

const assets = [
  // Incorruptibles
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Saint_Bernadette%27s_incorrupt_body.jpg/500px-Saint_Bernadette%27s_incorrupt_body.jpg", path: "public/assets/images/incorruptibles/bernadette.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Saint_Catherine_of_Bologna_with_Three_Donors_by_the_Master_of_the_Baroncelli_Portraits.jpg/500px-Saint_Catherine_of_Bologna_with_Three_Donors_by_the_Master_of_the_Baroncelli_Portraits.jpg", path: "public/assets/images/incorruptibles/catherine.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Simone_Martini_047.jpg/500px-Simone_Martini_047.jpg", path: "public/assets/images/incorruptibles/clare.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/S%C3%A3o_Jo%C3%A3o_Maria_Vianney.png/500px-S%C3%A3o_Jo%C3%A3o_Maria_Vianney.png", path: "public/assets/images/incorruptibles/vianney.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Simon_Fran%C3%A7ois_de_Tours_-_Portrait_Vincent_de_Paul_%284x5_cropped%29.jpeg/500px-Simon_Fran%C3%A7ois_de_Tours_-_Portrait_Vincent_de_Paul_%284x5_cropped%29.jpeg", path: "public/assets/images/incorruptibles/vincent.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Santa_Rita_da_Cascia.jpg/500px-Santa_Rita_da_Cascia.jpg", path: "public/assets/images/incorruptibles/rita.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Santa_Zita_lucca.jpg/500px-Santa_Zita_lucca.jpg", path: "public/assets/images/incorruptibles/zita.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg/500px-Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg", path: "public/assets/images/incorruptibles/taigi.jpg" },
  
  // Critical Popes
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg/500px-Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg", path: "public/assets/images/popes/francis.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pope_Leo_XIV_3_%283x4_cropped%29.png/500px-Pope_Leo_XIV_3_%283x4_cropped%29.png", path: "public/assets/images/popes/leo-xiv.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/JohnPaulII_portrait.jpg/500px-JohnPaulII_portrait.jpg", path: "public/assets/images/popes/john-paul-ii.jpg" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Benedikt_XVI_ua.jpg/500px-Benedikt_XVI_ua.jpg", path: "public/assets/images/popes/benedict-xvi.jpg" },
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://en.wikipedia.org/"
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const asset of assets) {
    console.log(`Downloading ${asset.url} to ${asset.path}...`);
    try {
      await download(asset.url, asset.path);
      console.log(`Success!`);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }
}

main();
