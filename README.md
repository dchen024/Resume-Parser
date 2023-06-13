# Resume Parser
Projected Asigned by **HeadStarter** and **Mofizur Rahman**, Developer Relations Engineer at Google.  
Created by Jawad Chowdhury, Daniel Chen, and Shadman Sakib.

## Inspriation / Problem We Are Solving
The hiring process for large companies is often a lengthy and costly process. Every year some FAANG companies recieve upward of 10M applications.

## Applicant DEMO
![applicant demo video](https://github.com/dchen024/Resume-Parser/blob/main/applicant.gif)

## Recruiter DEMO
![recruiter demo video](https://github.com/dchen024/Resume-Parser/blob/main/recruiter.gif)

## npm install
Installs all the necessary dependencies for the code to compile properly.

## Available Scripts

In the project directory, you can run:

### Create a .env file
Hides your API key to prevent attackers from accessing firebase storage. 
Go to firebase.google.com, create a new project, and copy the code to configure your firebase.js file into a .env file

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Application Information
Our Resume Parser app has an interface for two types of users, an applicant and a recruiter. 
Applicants post their resumes which we store in our database and Recruiters can search for employees based on their qualifications by inputing a keyword into the search bar. On our backend, we search all the stored "applications" or Resumes and return a list of all Resumes that include the keyword in them, making recruiting infinitely simpler for employers. 

### Applicant Interface


### Recruiter Interface
