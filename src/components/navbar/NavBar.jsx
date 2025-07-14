import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import LoginPopup from '../login-popup/LoginPopup'; 
import SigninPopUp from '../signin-popup/SigninPopUp';

const Navbar = () => {
   const [loginOpen, setLoginOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   const openLogin = () => setLoginOpen(true);
  const openSignin = () => setSigninOpen(true);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
  }, []);

  return (
    <>
      <div className='navbar'>
        <div className='navLeft'>
          <ul>
            <li id='mentorMesh'>MentorMesh</li>
            <li>
              <input placeholder='Search' id='search' />
            </li>
          </ul>
        </div>
        <div className='navRight'>
          <ul>
            <NavLink to={'/our-story'}><li>Our Story</li></NavLink>
            { isLoggedIn && (<NavLink to={'/write'}><li>Add Experience</li></NavLink>)}
            <li onClick={openLogin} style={{ cursor: "pointer" }}>SignIn</li>
            <li>
                <button id='getStarted' onClick={openSignin} style={{cursor:"pointer"}}>Get Started</button>
            </li>
          </ul>
        </div>
      </div>
      <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} onOpenSignin={()=>{setLoginOpen(false);setSigninOpen(true)}} />
      <SigninPopUp isOpen={signinOpen} onClose={() => setSigninOpen(false)} onOpenLogin={()=>{setSigninOpen(false);setLoginOpen(true)}}/>
    </>
  );
};

export default Navbar;
