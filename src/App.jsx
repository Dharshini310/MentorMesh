import './App.css';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';
import Home from './components/home/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OurStory from './components/ourstory/OurStory.jsx';
import ProfessionalForm from './components/professional/Professionalform.jsx';
import Login from './components/login/Login.jsx'
import LoginPopup from './components/login-popup/LoginPopup.jsx';
// import Aspriants from './components/aspriants/Aspriants.jsx';
// import { MentorContext } from './components/MentorContext.jsx';
import SigninPopUp from './components/signin-popup/SigninPopUp'
import UserHomePage from './components/home/UserHomepage.jsx';
import UserOurStory from './components/ourstory/UserOurStory.jsx';
import { createContext } from "react";

export const MentorContext = createContext()
function App() {
  const [loading, setLoading] = useState(true);
  const [AddExperience,setAddExperience] = useState([])


  useEffect(() => {
    if(window.location.pathname != '/') {
      window.location.href = '/';
    }
  },[]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MentorContext.Provider value={{AddExperience,setAddExperience}}>
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/user-homepage' element={<UserHomePage/>}/>
          <Route path="/our-story" element={<OurStory />} />
          <Route path='/user-our-story' element={<UserOurStory/>}/>
          <Route path="/write" element={<ProfessionalForm />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/get-started" element={<ProfessionalForm/>}/>
          <Route path='/signin' element={<SigninPopUp/>}/>
        </Routes>
      )}
    </BrowserRouter>
    </MentorContext.Provider>
    // <>
    // <h1>POP UP</h1>
    //  <LoginPopup/>
    // </>
  );
}

export default App;
