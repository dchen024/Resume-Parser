import React, {useState} from 'react'
import './forgotPassword.css';
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import {isEmail} from 'validator';
import { useNavigate } from 'react-router-dom';

function ForgotPassword (){
    const [email, setEmail] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const validateInputs = () => {
        const errors = {};
      
        // Check each input field for empty values
        if (email.trim() === '') {
          errors.email = 'Email is required';
        }
      
        // Update the validation errors state
        setValidationErrors(errors);
      
        // Return true if there are no validation errors
        return Object.keys(errors).length === 0;
    };

    const handleForgotPassword = async () =>{
        const isValid = validateInputs();

        if (isValid){
            try{
                
                if (!isEmail(email)) {
                    setInvalidEmailFormat(true);
                    return;
                }

                const auth = getAuth();
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);
                
                if (signInMethods.length === 0){
                    setInvalidEmail(true);
                    return;
                }
                else{
                    // Send the password reset email using Firebase Authentication
                    await sendPasswordResetEmail(auth, email);
                    navigate('/applicantAuth');
                }
            } catch(error){
                console.error('Error sending password reset email:', error);
            }
        }
    }

    return(
        <div className="background">
            <div className="container">
                <div className="ForgotPassword border border-primary rounded p-3">
                    <h2 className="d-flex justify-content-center">Forgot Password?</h2>
                    <br></br>
                    <div className='forgot-password-section'>
                        <label htmlFor='Email' className='Email'>
                            <input type = "text" placeholder="Email Address" value={email} onChange={handleEmail} className={validationErrors.email ? 'input-error' : ''} style={{width:'400px', paddingRight: '2.5rem'}} />
                            {validationErrors.email && <div className="error-message">{validationErrors.email}</div>}
                            {invalidEmail && <div className="error-message">Email does not exist</div>}
                            {invalidEmailFormat && <div className="error-message">Please enter a valid email</div>}
                        </label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary rounded-button" 
                            type="button" 
                            onClick={handleForgotPassword} 
                            style={{ width: '400px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }}>
                            Submit
                        </button>
                        <span/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;