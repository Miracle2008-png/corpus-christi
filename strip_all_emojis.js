const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const dirs = ['app', 'components', 'data'];
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s?/gu;

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) return;
  walkDir(fullPath, (filePath) => {
    if (extensions.includes(path.extname(filePath))) {
      let content = fs.readFileSync(filePath, 'utf-8');
      if (emojiRegex.test(content)) {
        const newContent = content.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s?/gu, '');
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log('Stripped more emojis from:', filePath);
      }
    }
  });
});
console.log('Done stripping ALL emojis.');
