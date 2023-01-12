//Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Array of questions for user input
const questions = [
    { type: "input",
      name: "title", 
      message: "What is the project title? (Required)",
      validate: title =>{
        if (title) {
            return true;  
        } else {
            return false;  
        }
      }  
    },
    { type: "input",
      name: "purpose", 
      message: "Can you describe the project and its purpose? (Required)",
      validate: purpose =>{
        if (purpose) {
            return true;  
        } else {
            return false;  
        }
      } 
    },  
    { 
    type: "editor",
    name: "install",
    message: "What are the installation steps?\n Use the editor to list steps on how to install. \n If no install required you can write N/A or leave the editor empty", 
    }, 
    { 
    type: "editor",
    name: "usage",
    message: "How do others use this?\n Use the editor to list steps on how to use your application.\n If no usage steps you can write N/A or leave the editor empty", 
    },
    { 
    type: "list",
    name: "license",
    message: "Do you have a license?", 
    choices: [
        "GNU AGPLv3",
        "GNU GPLv3", 
        "GNU LGPLv3",
        "Mozilla Public License 2.0", 
        "Apache License 2.0",
        "MIT License",
        "Boost Software License 1.0",
        "The Unlicense",
        "None",
        ], 
    loop: false, 
    }, 
    { type: "input",
      name: "contribute", 
      message: "Explain how others can contribute to your project. (optional)",
    },
    {
    type: "editor",
    name: "test",
    message: "Do you have any tests? \n If so use the editor to provide details on how to run your tests.\n Otherwise leave the file empty or wirte N/A.", 
    }, 
    {
    type: "input",
    name: "username",
    message:"What is your GitHub Username? (Required)",
    validate: username =>
    {
        if(username){
            return true; 
        } else {
            console.log("Username is required.");
            return false;
        }
    }
    },
    {
        type: "input",
        name: "email",
        message:"What is your email? (Required)", 
        validate: email =>
        {
            if(email){
               return validateEmail(email); 
            } else {
                console.log("\nEmail is required.\n");
                return false;
            }
    
        }
    },

 ]; 

 // Function to validate emails 
 function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)){
        return true;
    }
    console.log("\nPlease enter a valid email.\n");
    return false;
  }

// Function to write README file
function writeToFile(fileName, data) {
    let dir =`./${data.title.trim().split(" ").join('-')}` 
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(`${dir}/${fileName}`, generateMarkdown(data), (err) => {
        if (err) {
            console.log(err)
        }
        });
    
}

// Function to initialize app
async function init() {
    await inquirer
        .prompt(questions)
        .then((data) =>{
            writeToFile('README.md', data);
        });
}

// Function call to initialize app
init();
