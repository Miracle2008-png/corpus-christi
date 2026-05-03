const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

function unThumb(url) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('/thumb/')) return url;
  
  // Replace /thumb/ with /
  let newUrl = url.replace('/thumb/', '/');
  
  // Remove the trailing /...px-.... suffix
  const parts = newUrl.split('/');
  const lastPart = parts[parts.length - 1];
  if (lastPart.match(/^\d+px-/)) {
    parts.pop(); // Remove the thumbnail suffix
    newUrl = parts.join('/');
  }
  
  return newUrl;
}

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let changed = false;
  
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.image_url && item.image_url.includes('/thumb/')) {
        item.image_url = unThumb(item.image_url);
        changed = true;
      }
      if (item.img && item.img.includes('/thumb/')) {
        item.img = unThumb(item.img);
        changed = true;
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
}
