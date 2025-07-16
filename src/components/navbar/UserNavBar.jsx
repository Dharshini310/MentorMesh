import React, { useContext, useEffect, useState } from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginPopup from '../login-popup/LoginPopup'; 
import SigninPopUp from '../signin-popup/SigninPopUp';
import { SearchContext } from '../../App';

const UserNavbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const { searchTerm, setSearchTerm } = useContext(SearchContext)

  const openLogin = () => setLoginOpen(true);
  const openSignin = () => setSigninOpen(true);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setEmail('');
    setIsLoggedIn(false);
    navigate('/')
  };

  return (
    <>
      <div className='navbar'>
        <div className='navLeft'>
          <ul>
            <li id='mentorMesh'>MentorMesh</li>
            <li>
              <input placeholder='Search' id='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
            </li>
          </ul>
        </div>
        <div className='navRight'>
          <ul>
            <NavLink to={'/user-our-story'}><li>Our Story</li></NavLink>
            <NavLink to={'/write'}><li>Add Experience</li></NavLink>
            <li>
              {isLoggedIn ? (
                <button id='getStarted' style={{ cursor: "pointer" }} onClick={()=> navigate('/UserData')}>
                  {email}
                </button>
              ) : (
                <button onClick={openLogin} id='getStarted'>
                  Login
                </button>
              )}
            </li>
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} onOpenSignin={openSignin} />
      <SigninPopUp isOpen={signinOpen} onClose={() => setSigninOpen(false)} onOpenLogin={openLogin} />
    </>
  );
};

export default UserNavbar;
