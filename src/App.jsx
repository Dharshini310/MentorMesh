import './App.css';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';
import Home from './components/home/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OurStory from './components/ourstory/OurStory.jsx';
import ProfessionalForm from './components/professional/Professionalform.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/write" element={<ProfessionalForm />} />
          <Route path="/sign-in" element={<ProfessionalForm />} />
          <Route path="/get-started" element={<ProfessionalForm/>}/>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
