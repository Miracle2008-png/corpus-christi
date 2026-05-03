const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
const publicDir = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const destPath = path.join(publicDir, 'hero.mp4');

https.get(videoUrl, (res) => {
  const file = fs.createWriteStream(destPath);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Video downloaded!');
  });
});
