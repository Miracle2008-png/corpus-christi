const fs = require('fs');
const path = require('path');

const API_URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=';

const fileNames = [
  "File:Brooklyn_Museum_-_Pilate_Washes_His_Hands_(Pilate_se_lave_les_mains)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Jesus_Bearing_the_Cross_(Jésus_chargé_de_la_Croix)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_First_Fall_(La_première_chute)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Jesus_Meets_His_Mother_(Jésus_rencontre_sa_mère)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Simon_the_Cyrenian_Compelled_to_Carry_the_Cross_with_Jesus_(Simon_de_Cyrène_contraint_de_porter_la_Croix_avec_Jésus)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Saint_Veronica_(Sainte_Véronique)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_Second_Fall_(La_deuxième_chute)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_Daughters_of_Jerusalem_(Les_filles_de_Jérusalem)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_Third_Fall_(La_troisième_chute)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Jesus_Stripped_of_His_Clothing_(Jésus_dépouillé_des_ses_vêtements)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_First_Nail_(Le_premier_clou)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_Death_of_Jesus_(La_mort_de_Jésus)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_The_Descent_from_the_Cross_(La_descente_de_croix)_-_James_Tissot.jpg",
  "File:Brooklyn_Museum_-_Jesus_Carried_to_the_Tomb_(Jésus_porté_au_tombeau)_-_James_Tissot.jpg"
];

async function main() {
  const stationsFile = path.join(__dirname, 'data', 'stations.json');
  const stationsData = JSON.parse(fs.readFileSync(stationsFile, 'utf8'));

  for (let i = 0; i < fileNames.length; i++) {
    const title = fileNames[i];
    try {
      const res = await fetch(API_URL + encodeURIComponent(title));
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== "-1" && pages[pageId].imageinfo) {
        const url = pages[pageId].imageinfo[0].url;
        console.log(`Station ${i + 1}: Found URL - ${url}`);
        stationsData[i].image_url = url;
      } else {
        console.log(`Station ${i + 1}: Not found for ${title}`);
      }
    } catch (err) {
      console.error(`Error on Station ${i + 1}:`, err);
    }
  }

  fs.writeFileSync(stationsFile, JSON.stringify(stationsData, null, 2));
  console.log("Finished updating stations.json");
}

main();
