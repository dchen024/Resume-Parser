import React, {useState, useEffect} from 'react';
import {app} from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import {isEmail} from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecruiterAuth.css';

function RecruiterAuth(){
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [ApplicantEmail, setApplicantEmail] = useState(false);
    
    const navigate = useNavigate();

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, []);

      const handleRememberMeChange = (event) =>{
        setRememberMe(event.target.checked);
      }

    const handleAuthentication = async () =>{
        const isValid = validateInputs();

        if (isValid){
            try{
                if(!isEmail(email)){
                    setInvalidEmailFormat(true);
                    setInvalidEmail(false);
                    setInvalidPassword(false);
                    setApplicantEmail(false);
                    return;
                }
                const response = await axios.post(`http://localhost:8000/verifyRecruiter?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
                
                if (response.data.success){
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                    }

                    navigate('/recruiter');
                }else{

                    if(response.data.error === 'EMAIL_NOT_FOUND'){
                        setInvalidPassword(false);
                        setInvalidEmail(true);
                        setInvalidEmailFormat(false);
                        setApplicantEmail(false);
                    }
                    else if(response.data.error === 'Applicant email'){
                        setInvalidPassword(false);
                        setInvalidEmail(false);
                        setInvalidEmailFormat(false);
                        setApplicantEmail(true);
                    }
                    else if(response.data.error ==='INVALID_PASSWORD'){
                        setHasErrors(true);
                        setInvalidEmail(false);
                        setInvalidPassword(true);
                        setInvalidEmailFormat(false);
                        setApplicantEmail(false);
                    }
                }
            } catch(error){
                console.log('Error verifying user:', error);
            }
        }
        else{
            setHasErrors(true);
            return;
        }
    }

    const handleGoogleAuth = async (response) => {
        try {
          const { tokenId } = response;
        
          const provider = new GoogleAuthProvider();

          provider.setCustomParameters({
            id_token: tokenId
          });
        
          const auth = getAuth(app);
          const result = await signInWithPopup(auth, provider);

          const { user, credential } = result;
        
          console.log('Authenticated user:', user);
          console.log('Google credential:', credential);
        
          navigate('/recruiter');
        } catch (error) {
          console.error('Error authenticating with Firebase:', error);
        }
    }; 
    
    const validateInputs = () => {
        const errors = {};
      
        // Check each input field for empty values
        if (email.trim() === '') {
          errors.email = 'Email is required';
        }
        if (password.trim() === '') {
            setInvalidPassword(false);
          errors.password = 'Password is required';
        }
      
        // Update the validation errors state
        setValidationErrors(errors);
      
        // Return true if there are no validation errors
        return Object.keys(errors).length === 0;
    };

    const errorCount = Object.keys(validationErrors).length;
    const hasInvalidPassword = invalidPassword ? 1 : 0;
    const heightIncrease = (errorCount + hasInvalidPassword) * 20;

    return(
        <div className="background">
        <div className="container">
            <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', fontFamily:'Helvetica' ,}}> Welcome to WeatherWatch! </h2>
            <div className={`Authenticate ${hasErrors ? 'error' : ''} border border-primary rounded p-3`} style={{ '--height-increase': `${heightIncrease}px` }}>
                <h2 className="d-flex justify-content-center">Login as Recruiter</h2>
                <div className = "signUp-section d-flex justify-content-center">
                <Link to="/newRecruiter" className="newUser" style={{textDecoration:'none'}}>
                    <span className="gray-text">New?</span> Sign Up - and stay updated! 
                </Link>
                </div>
                <br></br>
                <div className="authentication-container">
                <div className='authentication-section'>
                    <label htmlFor='Email' className='Email'>
                        <input type = "text" placeholder="Email" value={email} onChange={handleEmail} className={validationErrors.email ? 'input-error' : ''} style={{width:'300px', paddingRight: '2.5rem'}} />
                        {validationErrors.email && <div className="error-message">{validationErrors.email}</div>}
                        {invalidEmail && <div className="error-message">Email does not exist {' '} 
                        <Link to="/newRecruiter" className="emailNotExists" style={{textDecoration:'none'}}>
                            sign up!
                        </Link>
                        </div>}
                        {invalidEmailFormat && <div className="error-message">Please enter a valid email</div>}
                        {ApplicantEmail && <div className="error-message">You are an applicant! Sign in, {' '}
                        <Link to="/applicantAuth" className="applicantEmail" style={{textDecoration:'none'}}>
                            here!
                        </Link>
                        </div>}
                    </label>
                </div>
                <div className='authentication-section'>
                    <label htmlFor='Password' className='passWord'>
                    <div className="password-input-container">
                        <input type={showPassword ? 'password' : 'text'} placeholder="Password" value = {password} onChange={handlePasswordChange} className={validationErrors.password ? 'input-error' : ''} style={{width:'300px'}}></input>
                        {showPassword ? (
                            <FaEyeSlash className={`password-icon ${hasErrors ? 'error' : ''}`} onClick={togglePasswordVisibility} />
                            ) : (
                            <FaEye className= {`password-icon ${hasErrors ? 'error' : ''}`} onClick={togglePasswordVisibility} />
                        )}
                        {validationErrors.password && <div className="error-message">{validationErrors.password}</div>}
                        {invalidPassword && <div className="error-message">Incorrect password</div>}
                    </div>
                    </label>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                <button className="btn btn-primary rounded-button" 
                type="button" 
                onClick={handleAuthentication} 
                style={{ width: '300px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }}>
                Sign in
                </button>
                <span/>
                </div>
                
                <br></br>

                <div className="form-check">
                <input className="form-check-input" style={{marginLeft: '15px'}} type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} id="remember-checkbox" />
                <label className="form-check-label" style={{marginLeft: '7.5px'}} htmlFor="remember-checkbox">
                Remember me
                </label>
                <Link to="/forgotPassword" className="forgot-link" style={{marginLeft: '80px', textDecoration: 'none'}}>Forgot Password?</Link>
                </div>

                <div className="line-section">
                <hr className="horizontal-line" />
                <span className="or-text">OR</span>
                <hr className="horizontal-line" />
                </div>

                
                <div className="google-sign-in d-flex justify-content-center">
                <button
                    className="google-button"
                    type="button"
                    onClick={handleGoogleAuth}
                    style={{ width: '300px' }}
                >
                    <span className="google-icon">
                    <i className="google-icon"></i>
                    </span>
                    <span className="google-text1">Sign in with Google</span>
                </button>
                </div>

            </div>
        </div>
        </div>
    );
}

export default RecruiterAuth;