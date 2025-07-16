import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
// import { themeContext } from '../../App';

function Login({ isOpen, isClose, openSignin }) {
  const navigate = useNavigate();
  const {setLogin} = useContext(themeContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const createOne = () => {
    isClose(); 
    setTimeout(() => openSignin(), 200); 
  };
  const handleLogin = () => {
    setLogin(true);
  }

  if (!isOpen) return null; 

  return (
    <>
      <div className="login-overlay" onClick={isClose} />
      <div className="login">
        <div className="loginLeft">
          <img
            src="https://res.cloudinary.com/dtejtkhk0/image/upload/v1751910361/ChatGPT_Image_Jul_7_2025_11_13_49_PM_w8b7nd.png"
            alt="login"
          />
        </div>
        <div className="loginRight">
          <button className="close-button" onClick={isClose}>✖</button>
          <h1 id="login">Log in</h1>
          <div className="googleContinue">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                console.log(credentialResponseDecoded);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          <br />
          <p>----------- or -----------</p>
          <br />
          <div className="loginForm">
            <input id="userName" placeholder="Enter User Name" />
          </div>
          <div className="loginForm">
            <input id="password" placeholder="Enter your password" type="password" />
          </div>
          <div className="submitButton">
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="newAccount">
            <p>
              Don’t have an account?{' '}
              <span id="signUp" onClick={createOne}>
                Create One
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
    


Login.jsx