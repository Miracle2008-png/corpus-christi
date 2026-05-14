const https = require('https');
const http = require('http');
const fs = require('fs');

// Use Wikipedia API to find working image URLs, then download
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`  SKIP (already exists): ${dest}`);
      return resolve(true);
    }
    
    const mod = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://en.wikipedia.org/'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        if (size < 100) {
          fs.unlinkSync(dest);
          reject(new Error(`File too small: ${size} bytes`));
        } else {
          console.log(`  OK: ${dest} (${size} bytes)`);
          resolve(true);
        }
      });
    });
    req.on('error', (e) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(e);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(new Error('Timeout'));
    });
  });
}

async function getWikiImageUrl(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600&piprop=original`;
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          const page = pages[pageId];
          // Try original first, then thumbnail
          const imgUrl = page?.original?.source || page?.thumbnail?.source || null;
          resolve(imgUrl);
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const tasks = [
    // Popes (empty files)
    { title: 'Pope John Paul II', dest: 'public/assets/images/popes/john-paul-ii.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/JohnPaulII_portrait.jpg/400px-JohnPaulII_portrait.jpg' },
    { title: 'Pope Benedict XVI', dest: 'public/assets/images/popes/benedict-xvi.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Benedikt_XVI_ua.jpg/400px-Benedikt_XVI_ua.jpg' },
    { title: 'Pope Leo XIV', dest: 'public/assets/images/popes/leo-xiv.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Pope_Leo_XIV_3_%283x4_cropped%29.png' },
    
    // Incorruptibles (empty files)
    { title: 'Vincent de Paul', dest: 'public/assets/images/incorruptibles/vincent.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Saint_Vincent_de_Paul.PNG/400px-Saint_Vincent_de_Paul.PNG' },
    { title: 'Saint Zita', dest: 'public/assets/images/incorruptibles/zita.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Santa_Zita_Lucca.jpg/400px-Santa_Zita_Lucca.jpg' },
    { title: 'Anna Maria Taigi', dest: 'public/assets/images/incorruptibles/taigi.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg/400px-Anna_Maria_Gesualda_Antonia_Taigi_in_2012.jpg' },
    
    // Pope Francis (already works, skip)
    // Pope John Paul I (need to verify)
    { title: 'Pope John Paul I', dest: 'public/assets/images/popes/john-paul-i.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Giovanni_Paolo_I.jpg/400px-Giovanni_Paolo_I.jpg' },
  ];

  for (const task of tasks) {
    // Skip if already valid
    if (fs.existsSync(task.dest) && fs.statSync(task.dest).size > 0) {
      console.log(`SKIP (valid): ${task.dest}`);
      continue;
    }
    
    console.log(`\nFetching: ${task.title}...`);
    
    // Try Wikipedia API first
    const wikiUrl = await getWikiImageUrl(task.title);
    if (wikiUrl) {
      console.log(`  Wiki URL: ${wikiUrl.substring(0, 80)}...`);
      try {
        await downloadFile(wikiUrl, task.dest);
        continue;
      } catch (e) {
        console.log(`  Wiki download failed: ${e.message}, trying fallback...`);
      }
    }
    
    // Try fallback
    try {
      await downloadFile(task.fallback, task.dest);
    } catch (e) {
      console.log(`  FAILED: ${e.message}`);
    }
  }
  
  console.log('\n=== DONE ===');
}

main();
