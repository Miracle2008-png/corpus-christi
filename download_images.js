const fs = require('fs');
const path = require('path');
const https = require('https');

const stationsFile = path.join(__dirname, 'data', 'stations.json');
const publicDir = path.join(__dirname, 'public', 'images', 'stations');

// Ensure directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const stationsData = JSON.parse(fs.readFileSync(stationsFile, 'utf8'));

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Corpus Christi Catholic Platform/1.0 (+https://corpuschristi.netlify.app)'
      }
    };
    
    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  let updatedStations = [];
  
  for (const station of stationsData) {
    const ext = path.extname(station.image_url.split('?')[0]) || '.jpg';
    const localFilename = `station-${station.number}${ext}`;
    const localPath = path.join(publicDir, localFilename);
    const localUrl = `/images/stations/${localFilename}`;
    
    console.log(`Downloading station ${station.number}...`);
    try {
      await downloadImage(station.image_url, localPath);
      console.log(`Saved to ${localPath}`);
      
      updatedStations.push({
        ...station,
        image_url: localUrl
      });
    } catch (err) {
      console.error(`Error downloading station ${station.number}:`, err.message);
      // Keep old URL if it fails
      updatedStations.push(station);
    }
  }
  
  fs.writeFileSync(stationsFile, JSON.stringify(updatedStations, null, 2));
  console.log('Finished downloading images and updated stations.json');
}

main();
