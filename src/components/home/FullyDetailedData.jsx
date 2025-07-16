import React, { useState } from 'react';
import './UserHome.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function FullyDetailedData() {
  const location = useLocation();
  const interview = location.state?.interview;
  const loggedInEmail = localStorage.getItem("userEmail");

 const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!interview) return <p>No data found</p>;

const handleLike = () => {
  if (!loggedInEmail || !interview?._id) return console.error("Missing email or ID");

  axios.post('http://localhost:3000/mentormesh/like', {
    email: loggedInEmail,
    interviewId: String(interview._id)
  })
  .then(res => {
    setLiked(res.data.liked);
    setLikeCount(res.data.count);
  })
  .catch(err => console.log("Like error:", err));
};

const handleSave = () => {
  if (!loggedInEmail || !interview?._id) return console.error("Missing email or ID");

  axios.post('http://localhost:3000/mentormesh/save', {
    email: loggedInEmail,
    interviewId: String(interview._id)
  })
  .then(res => {
    setSaved(res.data.saved);
  })
  .catch(err => console.log("Save error:", err));
};


  return (
    <div className="experience-card">
      <p id="email">{interview.email}</p>

      <div className="namerole">
        <h2 id="company-name">{interview.companyName}</h2>
        <h4 id="company-role">{interview.role}</h4>
      </div>

      <div className="yearpackage">
        <h6 id="company-year">Experience: {interview.year}yr</h6>
        <h2 id="company-package">Package: {interview.lpa}LPA</h2>
      </div>

      <p id="company-experience">{interview.interviewExperience}</p>

      <ul id="tipsList">
        {interview.tips?.map((tip, index) => (
          <li key={index}>👉 {tip}</li>
        ))}
      </ul>

      <br />
      <button
        onClick={() => window.open(interview.url, '_blank')}
        id="profile-button"
      >
        View Profile
      </button>
      {interview.qaList?.map((qa, qIndex) => (
        <div key={qIndex} className="qa-block">
          <h5 id="question">Q{qIndex + 1}: {qa.question}</h5>
          <ul>
            {qa.answers?.map((ans, aIdx) => (
              <li key={aIdx} id="answer">{ans}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="ig-action-buttons">
        <div className="like-section">
          <button
            className={`ig-like ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            {liked ? '❤️' : '🤍'}
          </button>
          <span>{likeCount} Likes</span>
        </div>

        <button
          className={`ig-save ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '🔖 Saved' : '🔖 Save'}
        </button>
      </div>
    </div>
  );
}

export default FullyDetailedData;
