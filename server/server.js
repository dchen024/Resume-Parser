const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = require('./firebase_private_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

app.use(cors());

app.post('/createApplicant', async (req, res) => {
  try {
    // Retrieve email and password from the request body
    const { email, password, fullname } = req.query;

    const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${process.env.HUNTERIO_API_KEY}`);

      if (response.data.data.result === 'deliverable'){
        // Create user account in Firebase Authentication
        const user = await admin.auth().createUser({
          email: email,
          password: password,
          displayName: fullname,
        });

        await admin.firestore().collection('Applicants').doc(email).set({
          fullname: fullname,
          email: email,
        });

        // Handle success (e.g., send success response)
        res.status(200).json({success:true, message: 'User created successfully' });
      }
      else{
        return res.json({success:false, message: 'Invalid Email'});
      }

  } catch (error) {
    // Handle error (e.g., send error response)
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/createRecruiter', async (req, res) => {
  try {
    // Retrieve email and password from the request body
    const { email, password, fullname } = req.query;

    const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${process.env.HUNTERIO_API_KEY}`);

      if (response.data.data.result === 'deliverable'){
        // Create user account in Firebase Authentication
        const user = await admin.auth().createUser({
          email: email,
          password: password,
          displayName: fullname,
        });

        await admin.firestore().collection('Recruiters').doc(email).set({
          fullname: fullname,
          email: email,
        });

        // Handle success (e.g., send success response)
        res.status(200).json({success:true, message: 'User created successfully' });
      }
      else{
        return res.json({success:false, message: 'Invalid Email'});
      }

  } catch (error) {
    // Handle error (e.g., send error response)
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const checkEmailInCollection = async (collectionName, email) => {
  const snapshot = await admin.firestore().collection(collectionName).where('email', '==', email).get();
  return !snapshot.empty;
};

app.post('/verifyApplicant', async (req, res) => {
  try {
    const { email, password } = req.query;

    const isApplicant = await checkEmailInCollection('Applicants', email);

    if (isApplicant){
      // Sign in the user using Firebase Authentication
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
      });

      const { idToken } = response.data;
      
      // User authentication successful
      res.json({ success: true, idToken: idToken });
    }else{
      const isRecruiter = await checkEmailInCollection('Recruiters', email);

      if(isRecruiter){
        res.json({ success: false, error: 'Recruiter email' });
      }
      else{
        res.json({ success: false, error: 'EMAIL_NOT_FOUND' });
      }
    }
  } catch (error) {
    const errorMessage = error.response.data.error.message;
    res.json({ success: false, error: errorMessage });
  }
});

app.post('/verifyRecruiter', async (req, res) => {
  try {
    const { email, password } = req.query;
    
    const isRecruiter = await checkEmailInCollection('Recruiters', email);
    
    if(isRecruiter){
      // Sign in the user using Firebase Authentication
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
      });

      const { idToken } = response.data;
      
      // User authentication successful
      res.json({ success: true, idToken: idToken });
    } else{
      const isApplicant = await checkEmailInCollection('Applicants', email);

      if (isApplicant) {
        // Send an error response indicating that the email is for an applicant, not a recruiter
        res.json({ success: false, error: 'Applicant email' });
      } else {
        // Send an error response indicating that the email is not found in either collection
        res.json({ success: false, error: 'EMAIL_NOT_FOUND' });
      }
    }
  } catch (error) {
    const errorMessage = error.response.data.error.message;
    res.json({ success: false, error: errorMessage });
  }
});

app.listen(8000, () =>{
    console.log("Server is listening on port 8000");
})
