const fs = require("fs");
const path = require("path");

const overrides = {
  "St. Sylvester I": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Saint_Sylvester_I.jpg",
  "St. Leo I — The Great": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Francisco_de_Herrera_el_Mozo_-_St_Leo_the_Great_-_WGA11363.jpg",
  "St. Gregory I — The Great": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Francisco_de_Zurbar%C3%A1n_044.jpg",
  "Innocent III": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Innocentius_III.jpg",
  "Boniface VIII": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Boniface_VIII.jpg",
  "Sixtus IV": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Justus_van_Gent_-_Pope_Sixtus_IV_-_WGA12068.jpg",
  "Alexander VI": "https://upload.wikimedia.org/wikipedia/commons/6/69/Pope_Alexander_Vi.jpg",
  "Julius II": "https://upload.wikimedia.org/wikipedia/commons/1/18/Raphael_Portrait_of_Pope_Julius_II.jpg",
  "Leo X": "https://upload.wikimedia.org/wikipedia/commons/4/48/Raffaello_Sanzio_-_Portrait_of_Leo_X_with_cardinals_Giulio_de%27_Medici_and_Luigi_de%27_Rossi_-_WGA18751.jpg",
  "Clement VII": "https://upload.wikimedia.org/wikipedia/commons/5/51/Sebastiano_del_Piombo_-_Portrait_of_Pope_Clement_VII_-_WGA21110.jpg",
  "Paul III": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Titian_-_Pope_Paul_III_Without_Cap_-_WGA22960.jpg",
  "St. Pius V": "https://upload.wikimedia.org/wikipedia/commons/4/45/Pius_V._-_G._A._Facchinetti_%28Uffizien_Florenz%29.jpg",
  "Gregory XIII": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Pope_Gregory_XIII_by_Lavinia_Fontana.jpg",
  "Sixtus V": "https://upload.wikimedia.org/wikipedia/commons/4/41/Sixtus_v.jpg",
  "Clement VIII": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Pope_Clement_VIII_portrait.jpg",
  "Paul V": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Paul_v.jpg",
  "Urban VIII": "https://upload.wikimedia.org/wikipedia/commons/9/90/Pietro_da_Cortona_002.jpg",
  "Innocent X": "https://upload.wikimedia.org/wikipedia/commons/a/af/Diego_Vel%C3%A1zquez_-_Portrait_of_Pope_Innocent_X_-_WGA24409.jpg",
  "Bl. Innocent XI": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Beato_Inocencio_XI.jpg",
  "Benedict XIV": "https://upload.wikimedia.org/wikipedia/commons/7/77/Subleyras%2C_Pierre_-_Pope_Benedict_XIV_-_1746.jpg",
  "Pius VI": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Pompeo_Batoni_-_Portrait_of_Pope_Pius_VI_-_WGA01487.jpg",
  "Pius VII": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Jacques-Louis_David_-_Portrait_of_Pope_Pius_VII_-_WGA06086.jpg",
  "Pope Leo XIV": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Pope_Leo_XIV_%28Robert_Prevost%29.jpg/400px-Pope_Leo_XIV_%28Robert_Prevost%29.jpg"
};

const dataDir = path.join(__dirname, "data");
const files = [
  "popes-1-50.json",
  "popes-51-100.json",
  "popes-101-150.json",
  "popes-151-200.json",
  "popes-201-250.json",
  "popes-251-265.json",
];

let fixed = 0;
for (const file of files) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let popes = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;

  for (let pope of popes) {
    if (overrides[pope.name]) {
      pope.img = overrides[pope.name];
      changed = true;
      fixed++;
      console.log(`Updated ${pope.name}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(popes, null, 2));
  }
}

console.log(`Hardcoded images for ${fixed} popes.`);
