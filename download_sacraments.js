const https = require('https');
const fs = require('fs');
const path = require('path');

const queries = [
  "Nicolas Poussin Baptism Sacrament",
  "Nicolas Poussin Confirmation Sacrament",
  "Nicolas Poussin Eucharist Sacrament",
  "Nicolas Poussin Penance Sacrament",
  "Nicolas Poussin Extreme Unction",
  "Nicolas Poussin Ordination Sacrament",
  "Nicolas Poussin Marriage Sacrament"
];

const publicDir = path.join(__dirname, 'public', 'images', 'sacraments');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function searchWiki(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`;
    https.get(searchUrl, { headers: { 'User-Agent': 'CatholicPlatformScript/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        if (json.query && json.query.search && json.query.search.length > 0) {
          resolve(json.query.search[0].title);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

function getDirectUrl(title) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'CatholicPlatformScript/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].imageinfo) {
          resolve(pages[pageId].imageinfo[0].url);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CatholicPlatformScript/1.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  for (let i = 0; i < queries.length; i++) {
    console.log(`Searching for: ${queries[i]}`);
    try {
      const title = await searchWiki(queries[i]);
      if (title) {
        const url = await getDirectUrl(title);
        if (url) {
          console.log(`  Found URL: ${url}`);
          const dest = path.join(publicDir, `sacrament-${i + 1}.jpg`);
          await downloadImage(url, dest);
          console.log(`  Downloaded -> ${dest}`);
        }
      }
    } catch (err) {
      console.error(`  Error:`, err.message);
    }
  }
}

main();
