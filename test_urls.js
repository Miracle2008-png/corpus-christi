const https = require('https');

const titles = [
  "Brooklyn_Museum_-_Pilate_Washes_His_Hands_(Pilate_se_lave_les_mains)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Bearing_the_Cross_(Jésus_chargé_de_la_Croix)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_First_Fall_(La_première_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Meets_His_Mother_(Jésus_rencontre_sa_mère)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Simon_the_Cyrenian_Compelled_to_Carry_the_Cross_with_Jesus_(Simon_de_Cyrène_contraint_de_porter_la_Croix_avec_Jésus)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Saint_Veronica_(Sainte_Véronique)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Second_Fall_(La_deuxième_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Daughters_of_Jerusalem_(Les_filles_de_Jérusalem)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Third_Fall_(La_troisième_chute)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Stripped_of_His_Clothing_(Jésus_dépouillé_des_ses_vêtements)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_First_Nail_(Le_premier_clou)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Death_of_Jesus_(La_mort_de_Jésus)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_The_Descent_from_the_Cross_(La_descente_de_croix)_-_James_Tissot.jpg",
  "Brooklyn_Museum_-_Jesus_Carried_to_the_Tomb_(Jésus_porté_au_tombeau)_-_James_Tissot.jpg"
];

function checkUrl(title) {
  return new Promise((resolve) => {
    // Add ?width=800 so it gives us a thumbnail (much faster, no timeouts)
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=800`;
    https.get(url, { headers: { 'User-Agent': 'CorpusChristiTest/1.0' } }, (res) => {
      console.log(`${title.substring(0, 30)}... -> Status: ${res.statusCode}`);
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log(`  Redirects to: ${res.headers.location}`);
      }
      resolve();
    }).on('error', (err) => {
      console.error(`Error on ${title}: ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  for (const title of titles) {
    await checkUrl(title);
  }
}

main();
