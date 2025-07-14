import { useEffect,useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom"
import LoginPopup from '../login-popup/LoginPopup'; 
import SigninPopUp from '../signin-popup/SigninPopUp';
import './OurStory.css'
function UserOurStory() {
   const [loginOpen, setLoginOpen] = useState(false);
    const [signinOpen, setSigninOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [email, setEmail] = useState('');
      const navigate = useNavigate()
  
     const openLogin = () => setLoginOpen(true);
    const openSignin = () => setSigninOpen(true);
  useEffect(() => {
    document.body.style.backgroundColor = '#f1fdff';
  })
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
      <div className="ourstory-navbar">
        <h1 id='mentorMesh'>MentorMesh</h1>
        <div className="navbar-buttons">
        {isLoggedIn ? (
                <button id='getStarted' style={{ cursor: "pointer" }}>
                  {email}
                </button>
              ) : (
                <button onClick={openLogin} id='getStarted'>
                  Login
                </button>
              )}
        {isLoggedIn && (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
            )}
        </div>
      </div>
      <div>
        <h3 id="our-story">⭐ Our Story – MentorMesh</h3>
        <p>
          <span id="journey">Every journey begins with a question.</span>
          <br />

          <div className="questions">
            <li className="li">"What should I expect in my interview?"</li>
            <li className="li">"How do I prepare for this role?"</li>
            <li className="li">"What was the selection process like?"</li>
          </div>
        </p>
      </div>
      <div>
        <p className="content1">
          At MentorMesh, we believe that no student or fresher should walk into
          an interview feeling alone or unprepared. Our platform was born out of
          a simple idea — to bridge the gap between experience and aspiration.
        </p>
      </div>
      <div>
        <p className="content1">
          We’ve all faced uncertainty during job preparation not knowing what
          to study, which skills to focus on, or how the interview experience
          feels in real life. That’s where our community comes in. This platform
          is a space where seniors, alumni, and professionals can share their
          real interview experiences, preparation tips, and career journeys —
          directly helping juniors navigate their path with clarity and
          confidence.
        </p>
      </div>
      <div>
        <p className="content1">
          Whether you're a student preparing for your first job, or a
          professional looking to give back to the community, MentorMesh
          is your space — to learn, to share, and to grow together.
        </p>
      </div>
      <h3 id="our-story">🌱 Our Mission</h3>
      <div>
        <p className="content2">
          To empower and guide the next generation of students and job seekers
          by providing them access to first-hand interview experiences, curated
          advice, and a supportive network of peers and mentors.
        </p>
      </div>
      <h3 id="our-story">🤝 Why We Built This</h3>
      <div>
        <ul className="content3">
          <li>
            To reduce the fear and confusion faced by students during job
            preparation.
          </li>

          <li>
            To create a community-driven platform that fosters support and
            collaboration.
          </li>

          <li>
            To make real-life success stories accessible, transparent, and
            relatable.
          </li>

          <li>
            To encourage seniors and professionals to give back and make an
            impact.
          </li>
        </ul>
      </div>
      <h3 id="our-story">🧭 Join the Movement</h3>
      <div>
        <p className="content4">
            If you're someone who has cracked interviews or navigated your career path with hard work and learning, your story can change someone’s future. Share it here, and <span className="quote">let’s guide the next generation — together.</span>
        </p>
      </div>
      <div className="link">
        <ul>
            <NavLink to={'/read'}><li style={{textDecoration:"none"}} >Start reading<span  className="link-arrow">➡</span></li></NavLink>
            <NavLink to={'/write'}><li style={{textDecoration:"none"}}>Start writing<span  className="link-arrow">➡</span></li></NavLink>
        </ul>
      </div><br/>
      <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} onOpenSignin={()=>{setLoginOpen(false);setSigninOpen(true)}} />
      <SigninPopUp isOpen={signinOpen} onClose={() => setSigninOpen(false)} onOpenLogin={()=>{setSigninOpen(false);setLoginOpen(true)}}/>
     </>
  );
}

export default UserOurStory;