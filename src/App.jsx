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
import FullyDetailedData from './components/home/FullyDetailedData.jsx';
import { ToastContainer } from 'react-toastify';
import UserData from './components/userProfile/UserData.jsx';

export const MentorContext = createContext()
export const SearchContext = createContext();
function App() {
  const [loading, setLoading] = useState(true);
  const [AddExperience,setAddExperience] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
 const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");


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
    <MentorContext.Provider value={{AddExperience,setAddExperience,email,setEmail}}>
       <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
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
          <Route path='/user-data' element={<FullyDetailedData/>}/>
          <Route path='/UserData' element={<UserData/>}/>
        </Routes>
      )}
    </BrowserRouter>
    <ToastContainer
     position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"  />
    </SearchContext.Provider>
    </MentorContext.Provider>
    // <>
    // <h1>POP UP</h1>
    //  <LoginPopup/>
    // </>
  );
}

export default App;
