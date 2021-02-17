const { Certificate } = require('crypto');
const fs = require('fs');
// module axios not found
//const axios = require('axios');

const levels = {
  'Débutant': 1,
  'Intermédiaire': 2,
  'Avancé': 3,
  'Courant': 4,
  'Langue maternelle': 5,
};

const transform = async (input) => {
  // create object output
  let output = {};

  // used axios for countryCode request
  // let restcountriesCode = await axios.get('https://restcountries.eu/rest/v2/alpha/FR');

  // output to create attribute on my file = input to take the attribute I want to modify from my old file
  output.id = input.id;
  output.firstname = input.firstname;
  output.lastname = input.lastname;
  output.dob = input.birthday;

  //use the attribute of the API array: alpha2Code in 'restcountriesCode'
  //let countryCode = restcountriesCode.alpha2Code;
  let countryCode = "FR";

  // create an object that uses objects and add a created attribute
  let addAddress = {
    zipCode: input.zipCode,
    street: input.street,
    city: input.city,
    countryCode: countryCode
  };
  // output to create attribute on my file =  integrates the 'address' attribute created 
  output.address = addAddress;

  // create a variable and tell it to fetch the 'experiences' file from the old one 
  let experiences = input.experiences;
  // create array for array 'experiences' and forEach to tell him to treat a part one
  let arrayExperiences = [];
  experiences.forEach(experience => {
    // create an empty object to add attributes to it
    let oneExperience = {};
    oneExperience.companyName = experience.companyName;
    oneExperience.startDate = experience.startDate;
    oneExperience.endDate = experience.endDate;
    oneExperience.jobId = experience.job.id;
    // push() adds one or more elements at the end of an array and returns the new array size
    arrayExperiences.push(oneExperience);
  });
  // output to create attribute on my file =  integrates the 'array experiences' attribute created 
  output.experiences = arrayExperiences;

  let certificates = input.certificates;
  let arrayCertificates = [];
  certificates.forEach(certificate => {
    let oneCertificate = {};
    oneCertificate.date = certificate.date;
    oneCertificate.certificate = certificate.certificate.title;
    oneCertificate.type = certificate.certificateType.title;
    arrayCertificates.push(oneCertificate);
  });
  output.certificates = arrayCertificates;

  let languages = input.languages;
  let arrayLanguages = [];
languages.forEach(language =>{
  let oneLanguage = {};
  oneLanguage.languageId = language.id;
  oneLanguage.title = language.title;
  oneLanguage.levelTitle = language.level;
  oneLanguage.level = levels[language.level];
  arrayLanguages.push(oneLanguage);
});
output.languages = arrayLanguages;

  return output;
};

(async () => {
  const inStr = fs.readFileSync('./in.json', 'UTF-8');
  const jsonIn = JSON.parse(inStr);
  const output = await transform(jsonIn);
  const outStr = JSON.stringify(output, null, 2);
  fs.writeFileSync('./out.json', outStr);
})();