# Resume Parser
Projected Assigned by **HeadStarter** and **Mofizur Rahman**, Developer Relations Engineer at **Google**.  
Created by Jawad Chowdhury, Daniel Chen, and Shadman Sakib.


## Inspriation / Problem We Are Solving
The hiring process for large companies is often a lengthy and costly process. Every year some FAANG companies recieve upward of 10M applications.

## What is Resume Parser
Resume Parser allows applicants to upload their resume to the company's cloud storage. After applicants upload their resume, recruiters can look and search for resumes using keywords on the recruiter dashboard.

## Technology Stack
**Frontend**
- React
- Bootstrap 

**Backend**
- Node
- Firebase

## Applicant Interface
Applicants will click on the applicant button to go to the applicant dashboard.  Then they will upload their resume by selecting the pdf on their computer and clicking the upload button.  

![applicant demo video](https://github.com/dchen024/Resume-Parser/blob/main/applicant.gif)

## Recruiter Interface
Recruiters can click on the recruiter button to open the recruiter dashboard. There they can search for **keyword** which will filter and only show resume containing the keyword. Another feature is the fetch all button which shows all resumes currently in the cloud storage.  

![recruiter demo video](https://github.com/dchen024/Resume-Parser/blob/main/recruiter.gif)

## Hurdles
1) This was our first time using React, Node, Firebase, and Bootstrap
2) Finding a good PDF API was difficult since many had little documentation and bugs
3) Couldn't use Firebase Storage & Firebase Firestore at the same time. This made returning the applicants resume difficult since we had no way of referencing the pdf that corrosponded to the txt file.

## Future Iterations
1) Add multiple search query feature for the recruiter dashboard
2) add authentication to access the recruiter and applicant dashboards

## How to Run
1) Run `npm install` inside the project's terminal <br>
Installs all the necessary dependencies for the code to compile properly.
2) Create a `.env` file in the root directory <br>
Used to connect Resume Parser to your Firebase Storage
```
REACT_APP_API_KEY = "Your API key in quotes"
REACT_APP_AUTH_DOMAIN = "Your domain in quotes"
REACT_APP_PROJECT_ID = "Your Project ID in quotes"
REACT_APP_STORAGE_BUCKET = "Your storage bucket in quotes"
REACT_APP_MESSAGING_SENDER_ID = "Your Message Sender ID in quotes"
REACT_APP_APP_ID = "Your App ID in quotes"
```
3) Run `npm start` in the project's terminal
Opens Resume Parser app in your browser <br>
By default it will open [http://localhost:3000](http://localhost:3000)



