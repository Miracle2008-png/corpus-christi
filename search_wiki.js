const fs = require('fs');
const path = require('path');

const fileNames = [
  "Pilate Washes His Hands Tissot",
  "Jesus Bearing the Cross Tissot",
  "The First Fall Tissot",
  "Jesus Meets His Mother Tissot",
  "Simon the Cyrenian Compelled to Carry the Cross with Jesus Tissot",
  "Saint Veronica Tissot",
  "The Second Fall Tissot",
  "The Daughters of Jerusalem Tissot",
  "The Third Fall Tissot",
  "Jesus Stripped of His Clothing Tissot",
  "The First Nail Tissot",
  "The Death of Jesus Tissot",
  "The Descent from the Cross Tissot",
  "Jesus Carried to the Tomb Tissot"
];

async function searchWiki(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.query.search.length > 0) {
    // get title of first result
    const title = data.query.search[0].title;
    // get image info
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = await fetch(infoUrl);
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pages[pageId].imageinfo) {
       return pages[pageId].imageinfo[0].url;
    }
  }
  return null;
}

async function main() {
  const stationsFile = path.join(__dirname, 'data', 'stations.json');
  const stationsData = JSON.parse(fs.readFileSync(stationsFile, 'utf8'));

  for (let i = 0; i < fileNames.length; i++) {
    const query = fileNames[i];
    try {
      const url = await searchWiki(query);
      if (url) {
        console.log(`Station ${i + 1}: Found URL - ${url}`);
        stationsData[i].image_url = url;
      } else {
        console.log(`Station ${i + 1}: Not found for ${query}`);
      }
    } catch (err) {
      console.error(`Error on Station ${i + 1}:`, err.message);
    }
  }

  fs.writeFileSync(stationsFile, JSON.stringify(stationsData, null, 2));
  console.log("Finished updating stations.json");
}

main();
