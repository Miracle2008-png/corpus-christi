const fs = require("fs");
const path = require("path");
const https = require("https");

const dataDir = path.join(__dirname, "data");

// List of files
const files = [
  "popes-1-50.json",
  "popes-51-100.json",
  "popes-101-150.json",
  "popes-151-200.json",
  "popes-201-250.json",
  "popes-251-265.json",
];

const popesToFix = [
  "St. Sylvester I", "St. Sylvester", "Sylvester I",
  "St. Leo I", "St. Leo I (The Great)", "Leo I",
  "St. Gregory I", "St. Gregory I (The Great)", "Gregory I",
  "Innocent III", "Boniface VIII", "Sixtus IV", "Alexander VI", "Julius II",
  "Leo X", "Clement VII", "Paul III", "St. Pius V", "Pius V",
  "Gregory VIII", "Sixtus V", "Clement VIII", "Paul V", "Urban VIII",
  "Innocent X", "Bl. Innocent XI", "Innocent XI", "Benedict XIV",
  "Pius VI", "Pius VII", "Gregory XVI", "Bl. Pius IX", "Leo XIII",
  "St. Pius X", "Benedict XV", "Pius XI", "Bl. Pius XII",
  "St. John XXIII", "St. Paul VI", "St. John Paul I", "St. John Paul II",
  "Benedict XVI", "Pope Francis", "Pope Leo XIV"
];

async function getWikipediaImage(popeName) {
  // clean up name for wikipedia
  let cleanName = popeName
    .replace(/^St\. /i, "")
    .replace(/^Bl\. /i, "")
    .replace(/^Pope /i, "")
    .replace(/ \(The Great\)/i, "");
    
  // Add Pope prefix for better searching on Wikipedia
  if (!cleanName.startsWith("Pope ")) {
    cleanName = "Pope " + cleanName;
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cleanName)}&prop=pageimages&format=json&pithumbsize=500`;

  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'CatholicPlatform/1.0' } }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== "-1" && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on("error", () => resolve(null));
  });
}

async function fixPopes() {
  let updatedCount = 0;
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let popes = JSON.parse(fs.readFileSync(filePath, "utf8"));
    let changed = false;

    for (let pope of popes) {
      if (popesToFix.some(p => pope.name.includes(p) || p.includes(pope.name)) || pope.img === null || (pope.img && pope.img.includes("wikipedia") && pope.img.includes("400px"))) {
        console.log(`Fetching image for: ${pope.name}`);
        const imgUrl = await getWikipediaImage(pope.name);
        if (imgUrl) {
          pope.img = imgUrl;
          changed = true;
          updatedCount++;
          console.log(` -> Found: ${imgUrl}`);
        } else {
          // fallback search without "Pope" prefix
          let cleanName = pope.name
            .replace(/^St\. /i, "")
            .replace(/^Bl\. /i, "")
            .replace(/ \(The Great\)/i, "");
          const imgUrl2 = await getWikipediaImage(cleanName.replace("Pope ", ""));
          if (imgUrl2) {
             pope.img = imgUrl2;
             changed = true;
             updatedCount++;
             console.log(` -> Found (fallback): ${imgUrl2}`);
          } else {
             console.log(` -> No image found.`);
          }
        }
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(popes, null, 2));
      console.log(`Saved ${file}`);
    }
  }
  console.log(`Fixed ${updatedCount} pope images.`);
}

fixPopes();
