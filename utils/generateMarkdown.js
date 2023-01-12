// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  
  return `![badge](https://img.shields.io/badge/license-${license}-blue) \n`; 
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return `https://choosealicense.com/licenses/${license}`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseInfo = 'N/A'; 
  if (license !== "None"){
    licenseInfo =`This application has [${license}](${renderLicenseLink(license)}) Lincense. \n`; 
  }
  return `## License \n
  ${licenseInfo} \n` ; 
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  if(data.license){
    licenseLink = renderLicenseLink(data.license);
    licenseSection = renderLicenseSection(data.license);
    licenseBadge = renderLicenseBadge(data.license);  
  }
  let tableOfContents =`## Table of Contents \n 
 - [Installation](#installation) 
 - [Usage](#usage) 
 - [Tests](#tests) 
 - [Contributing](#contributing) 
 - [License](#license) 
 - [Questions](#questions) 
 - [Contributors](#contributors) \n`; 
  
  let installSteps = 'N/A'; 
  if (data.install){
    installSteps = data.install; 
  }

  let installContent =`\n## Installation \n \n`
  installContent += `${installSteps} \n \n`; 

  let usageSteps = 'N/A'; 
  if (data.usage){
    usageSteps = data.usage;
  }

  let usageContent =`\n## Usage \n \n` 
  usageContent += `${usageSteps} \n \n`; 

  let testSteps = 'N/A';
  if (data.test){
    testSteps=data.test;
  }

  let testContent =`\n ## Tests \n \n` 
  testContent += `${testSteps} \n \n`; 

  let contributeSteps ='N/A'; 
  if (data.contribute){
    contributeSteps =data.contribute;
  }

  let contributeContent= `\n## Contributing \n \n`
  contributeContent += `${contributeSteps} \n \n`; 

  let questionsContent =`\n## Questions \n \n`
  questionsContent += `For any questions please contact ${data.email} \n \n`; 

  let contributorsContent = `\n## Contributors \n \n`
  contributorsContent += `${data.username}('https://github.com/${data.username}') \n \n`;

  let readMEContent=`# ${data.title} \n \n`;
  if (data.license !== "None"){
    readMEContent += renderLicenseBadge(data.license); 
  }
  readMEContent += `\n## Description \n
  ${data.purpose} \n\n`; 
  readMEContent +=tableOfContents;
  readMEContent +=installContent;
  readMEContent +=usageContent; 
  readMEContent +=testContent;
  readMEContent +=contributeContent; 
  readMEContent +=renderLicenseSection(data.license);
  readMEContent +=questionsContent;  
  readMEContent +=contributorsContent; 

  return readMEContent;
}

module.exports = generateMarkdown;
