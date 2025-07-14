import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import { MentorContext } from '../../App'; 

function UserHomePage() {
  const [interviews, setInterviews] = useState([]);
  const { AddExperience } = useContext(MentorContext);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get("http://localhost:3000/mentormesh/all-interview-data")
      .then((res) => {
        setInterviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserNavbar />
      {interviews.map((interview, idx) => (
        <div className="experience-card" key={idx}>
          <p>{email}</p>
          <h2>{interview.companyName || "Name is not Found"}</h2>
          <h4>{interview.role || "Role Not Mentioned"}</h4>
          <h6>{interview.year || "Year Not Specified"}</h6>
          <p>{interview.interviewExperience || "Enter Experience Please"}</p>
          <h2>{interview.lpa || "Package field is not there"}</h2>

          <ul>
            {interview.tips?.map((tip, index) => (
              <li key={index}>👉 {tip}</li>
            ))}
          </ul>

          <button onClick={() => window.open(interview.url, '_blank')}>
            View Profile
          </button>

          {/* QA Section */}
          {interview.qaList?.map((qa, qIndex) => (
            <div key={qIndex} className="qa-block">
              <h5>Q{qIndex + 1}: {qa.question}</h5>
              <ul>
                {qa.answers?.map((ans, aIdx) => (
                  <li key={aIdx}>{ans}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default UserHomePage;
