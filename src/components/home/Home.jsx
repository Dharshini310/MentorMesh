import React, { useState } from 'react';
import './Home.css';
import Navbar from '../navbar/NavBar';
import SigninPopUp from '../signin-popup/SigninPopUp';
import LoginPopup from '../login-popup/LoginPopup';

const Home = () => {
  const [signinOpen, setSigninOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const openSignin = () => setSigninOpen(true);
  const openLogin = () => setLoginOpen(true);

  return (
    <div>
      <Navbar />
      <div className='b_body'>
        <div className='bodyLeft'>
          <h1>Your Network for Career Navigation</h1>
          <p id='para'>A Community for Career Development</p>
          <button id='getStart' onClick={openSignin} style={{ cursor: "pointer" }}>
            Start Reading
          </button>
        </div>
        <div className='bodyRight'>
          <img 
            src="https://res.cloudinary.com/dtejtkhk0/image/upload/v1751885367/image1_dexbsk.png" 
            alt="img" 
          />
        </div>
      </div>
      <SigninPopUp 
        isOpen={signinOpen} 
        onClose={() => setSigninOpen(false)} 
        onOpenLogin={() => {
          setSigninOpen(false);
          setLoginOpen(true);
        }}
      />
      <LoginPopup 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onOpenSignin={() => {
          setLoginOpen(false);
          setSigninOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
