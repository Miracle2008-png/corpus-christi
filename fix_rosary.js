const fs = require('fs');
const path = require('path');

const images = {
  "the-annunciation": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fra_Angelico_-_Annunciation_%28San_Marco%29_-_WGA00615.jpg/800px-Fra_Angelico_-_Annunciation_%28San_Marco%29_-_WGA00615.jpg",
  "the-visitation": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Visitation_domenico_ghirlandaio.jpg/800px-Visitation_domenico_ghirlandaio.jpg",
  "the-nativity": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Caravaggio_-_Adoration_of_the_Shepherds_-_WGA04118.jpg/800px-Caravaggio_-_Adoration_of_the_Shepherds_-_WGA04118.jpg",
  "the-presentation": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Rembrandt_Harmensz._van_Rijn_-_Simeon_with_the_Infant_Jesus_-_Nationalmuseum_NM_819.jpg/800px-Rembrandt_Harmensz._van_Rijn_-_Simeon_with_the_Infant_Jesus_-_Nationalmuseum_NM_819.jpg",
  "finding-jesus-in-the-temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hunt_The_Finding_of_the_Saviour_in_the_Temple.jpg/800px-Hunt_The_Finding_of_the_Saviour_in_the_Temple.jpg",
  "the-baptism-of-jesus": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tintoretto_-_The_Baptism_of_Christ.jpg/800px-Tintoretto_-_The_Baptism_of_Christ.jpg",
  "the-wedding-at-cana": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Paolo_Veronese_008.jpg/800px-Paolo_Veronese_008.jpg",
  "proclamation-of-the-kingdom": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sermon_on_the_Mount_Fra_Angelico.jpg/800px-Sermon_on_the_Mount_Fra_Angelico.jpg",
  "the-transfiguration": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Transfiguration_Raphael.jpg/800px-Transfiguration_Raphael.jpg",
  "institution-of-the-eucharist": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Da_Vinci_The_Last_Supper_high_res_noframe.jpg/800px-Da_Vinci_The_Last_Supper_high_res_noframe.jpg",
  "the-agony-in-the-garden": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/El_Greco_-_Christ_in_the_Garden_of_Gethsemane_-_WGA10498.jpg/800px-El_Greco_-_Christ_in_the_Garden_of_Gethsemane_-_WGA10498.jpg",
  "the-scourging-at-the-pillar": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Caravaggio-Flagellation-of-Christ.jpg/800px-Caravaggio-Flagellation-of-Christ.jpg",
  "crowning-with-thorns": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Crowning_with_thorns_rubens.jpg/800px-Crowning_with_thorns_rubens.jpg",
  "the-carrying-of-the-cross": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/El_Greco_-_Christ_Carrying_the_Cross_-_WGA10498.jpg/800px-El_Greco_-_Christ_Carrying_the_Cross_-_WGA10498.jpg",
  "the-crucifixion-and-death": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Diego_Velazquez_-_Christ_Crucified_-_Prado.jpg/800px-Diego_Velazquez_-_Christ_Crucified_-_Prado.jpg",
  "the-resurrection": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Piero_della_Francesca_-_Ressurrezione_%28dettaglio%29_-_Museo_Civico_-_Sansepolcro.jpg/800px-Piero_della_Francesca_-_Ressurrezione_%28dettaglio%29_-_Museo_Civico_-_Sansepolcro.jpg",
  "the-ascension": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/The_Ascension_of_Christ_Garofalo.jpg/800px-The_Ascension_of_Christ_Garofalo.jpg",
  "descent-of-the-holy-spirit": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/El_Greco_-_Pentecost.jpg/800px-El_Greco_-_Pentecost.jpg",
  "the-assumption-of-mary": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Titian_-_Assumption_of_the_Virgin_-_WGA22891.jpg/800px-Titian_-_Assumption_of_the_Virgin_-_WGA22891.jpg",
  "coronation-of-mary": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Diego_Velázquez_-_The_Coronation_of_the_Virgin_-_Prado.jpg/800px-Diego_Velázquez_-_The_Coronation_of_the_Virgin_-_Prado.jpg"
};

const dataPath = path.join(__dirname, 'data', 'rosary.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.forEach(set => {
  set.list.forEach(mystery => {
    if (images[mystery.slug]) {
      mystery.image = images[mystery.slug];
    }
  });
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Rosary images updated.');
