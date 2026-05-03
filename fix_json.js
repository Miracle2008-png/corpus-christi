const fs = require('fs');
const path = require('path');

const stationsFile = path.join(__dirname, 'data', 'stations.json');
const stationsData = JSON.parse(fs.readFileSync(stationsFile, 'utf8'));

for (let i = 0; i < stationsData.length; i++) {
  stationsData[i].image_url = `/images/stations/station-${i + 1}.jpg`;
}

fs.writeFileSync(stationsFile, JSON.stringify(stationsData, null, 2));
console.log('Fixed stations.json URLs');
