import './ExperienceList.css';
import { MentorContext } from '../components/MentorContext.jsx';
import {useContext} from 'react';

function ExperienceList() {
  const { AddExperience } = useContext(MentorContext)
  const email = localStorage.getItem("userEmail");
  return (
    <div className="experience-card">
      <p>{email}</p>
      <h2>{Name || "Name is not Found"}</h2>
      <h4>{Role || "Role Not Mentioned"}</h4>
      <h6>{Year || "Year Not Specified"}</h6>
      <p>{Exp || "Enter Experience Please"}</p>
      <h2>{Package || "Package field is not there"}</h2>

      <ul>
        {Tip.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>

      <button onClick={() => window.open(URL, '_blank')}>View Profile</button>

      {/* QA Section */}
      {QAList.map((qa, idx) => (
        <div key={idx} className="qa-block">
          <h5>Q{idx + 1}: {qa.question}</h5>
          <ul>
            {qa.answers.map((ans, aIdx) => (
              <li key={aIdx}>{ans}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExperienceList;
