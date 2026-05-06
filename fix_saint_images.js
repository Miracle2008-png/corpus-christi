const fs = require('fs');
const path = require('path');

// Real Wikipedia/Wikimedia image URLs for saints missing local images
const imageMap = {
  'maximilian-of-tebessa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Maximilian_Martyr.jpg/400px-Maximilian_Martyr.jpg',
  'martin-de-porres': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Martin_de_Porres_2.jpg/400px-Martin_de_Porres_2.jpg',
  'nicholas-of-myra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Jaroslav_Čermák_-_Saint_Nicholas.jpg/400px-Jaroslav_Čermák_-_Saint_Nicholas.jpg',
  'edith-stein': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Edith_Stein.jpg/400px-Edith_Stein.jpg',
  'aloysius-gonzaga': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Aloysius_Gonzaga.jpg/400px-Aloysius_Gonzaga.jpg',
  'elizabeth-of-hungary': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ElizabethOfHungary.jpg/400px-ElizabethOfHungary.jpg',
  'john-vianney': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Curédars1.jpg/400px-Curédars1.jpg',
  'rose-of-lima': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rosa_de_Lima-Murillo.jpg/400px-Rosa_de_Lima-Murillo.jpg',
  'maximilian-martyr': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Maximilian_Kolbe_1939.jpg/400px-Maximilian_Kolbe_1939.jpg',
  'philip-neri': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Filippo_Neri_-_Guido_Reni.jpg/400px-Filippo_Neri_-_Guido_Reni.jpg',
  'mother-teresa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/400px-Mother_Teresa_1.jpg',
  'sebastian': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Guido_Reni_-_Saint_Sebastian_-_Google_Art_Project.jpg/400px-Guido_Reni_-_Saint_Sebastian_-_Google_Art_Project.jpg',
  'lucy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Francisco_de_Zurbarán_-_Saint_Lucy.jpg/400px-Francisco_de_Zurbarán_-_Saint_Lucy.jpg',
  'cecilia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Carlo_Dolci_-_St_Cecilia.jpg/400px-Carlo_Dolci_-_St_Cecilia.jpg',
  'lawrence': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Fra_Angelico_034.jpg/400px-Fra_Angelico_034.jpg',
  'john-of-capistrano': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Giovanni_da_Capestrano.jpg/400px-Giovanni_da_Capestrano.jpg',
  'john-chrysostom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/John_Chrysostom_Icon.jpg/400px-John_Chrysostom_Icon.jpg',
  'jerome': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Caravaggio_-_Saint_Jerome_Writing.jpg/400px-Caravaggio_-_Saint_Jerome_Writing.jpg',
  'thomas-becket': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Thomas_Becket_Cath_-_William_FitzStephen.jpg/400px-Thomas_Becket_Cath_-_William_FitzStephen.jpg',
  'hildegard-of-bingen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Hildegard_von_Bingen.jpg/400px-Hildegard_von_Bingen.jpg',
  'robert-bellarmine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Saint_Robert_Bellarmine.jpg/400px-Saint_Robert_Bellarmine.jpg',
  'charles-borromeo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Carlo_Borromeo.jpg/400px-Carlo_Borromeo.jpg',
  'damien-of-molokai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Father_Damien_de_Veuster.jpg/400px-Father_Damien_de_Veuster.jpg',
  'isaac-jogues': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Isaac_Jogues_001.jpg/400px-Isaac_Jogues_001.jpg',
  'gemma-galgani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gemma_Galgani.jpg/400px-Gemma_Galgani.jpg',
  'john-diego': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Juan_Diego.jpg/400px-Juan_Diego.jpg',
};

const dataPath = path.join(__dirname, 'data', 'saints.json');
const saints = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updated = 0;
saints.forEach(saint => {
  if (imageMap[saint.slug]) {
    saint.image_url = imageMap[saint.slug];
    updated++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(saints, null, 2));
console.log(`Updated ${updated} saint images.`);
