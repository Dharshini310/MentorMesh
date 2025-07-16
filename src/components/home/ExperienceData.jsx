import React, { useContext, useEffect, useState } from 'react';
import './UserHome.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { SearchContext } from '../../App';

function ExperienceData() {
  const [interviews, setInterviews] = useState([]);
  const [likes, setLikes] = useState({});
  const [saves, setSaves] = useState({});
  const {searchTerm} = useContext(SearchContext)

  const loggedInEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get("http://localhost:3000/mentormesh/all-interview-data")
      .then((res) => {
        const allInterviews = [];
        const likeData = {};
        const saveData = {};

        res.data.forEach((user) => {
          user.interview?.forEach((iv) => {
            allInterviews.push({ ...iv, email: user.email });
            likeData[iv._id] = {
              liked: iv.likes?.users.includes(loggedInEmail),
              count: iv.likes?.count || 0,
            };
            saveData[iv._id] = iv.saves?.includes(loggedInEmail);
          });
        });

        setInterviews(allInterviews);
        setLikes(likeData);
        setSaves(saveData);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [loggedInEmail]);

  const handleLike = (id) => {
    axios
      .post('http://localhost:3000/mentormesh/like', {
        email: loggedInEmail,
        interviewId: id,
      })
      .then((res) => {
        setLikes((prev) => ({
          ...prev,
          [id]: { liked: res.data.liked, count: res.data.count },
        }));
      })
      .catch((err) => console.error("Like error:", err));
  };

  const handleSave = (id) => {
    axios
      .post('http://localhost:3000/mentormesh/save', {
        email: loggedInEmail,
        interviewId: id,
      })
      .then((res) => {
        setSaves((prev) => ({
          ...prev,
          [id]: res.data.saved,
        }));
      })
      .catch((err) => console.error("Save error:", err));
  };

const filteredInterviews = interviews.filter((interview) => {
  const email = interview.email?.toLowerCase() || '';
  const role = interview.role?.toLowerCase() || '';
  const company = interview.companyName?.toLowerCase() || '';

  return (
    email.includes(searchTerm) ||
    role.includes(searchTerm) ||
    company.includes(searchTerm)
  );
});

  return (
    <div className="interview-container">
      {filteredInterviews.map((interview, idx) => (
  <div className="experience-card" key={idx}>
    <p id='email'>{interview.email}</p>

    <div className='name-role'>
      <h2 id='company-name'>{interview.companyName || "Name is not Found"}</h2>
      <h4 id='company-role'>{interview.role || "Role Not Mentioned"}</h4>
    </div>

    <p id='company-experience1'>{interview.interviewExperience}</p>

    <NavLink to="/user-data" state={{ interview }}>
      <button className='show-more'>Show More</button>
    </NavLink>

    <div className="ig-action-buttons">
      <div className="like-section">
        <button
          className={`ig-like ${likes[interview._id]?.liked ? 'liked' : ''}`}
          onClick={() => handleLike(interview._id)}
        >
          {likes[interview._id]?.liked ? '❤️' : '🤍'}
        </button>
        <span>{likes[interview._id]?.count || 0} Likes</span>
      </div>

      <button
        className={`ig-save ${saves[interview._id] ? 'saved' : ''}`}
        onClick={() => handleSave(interview._id)}
      >
        {saves[interview._id] ? '🔖 Saved' : '🔖 Save'}
      </button>
    </div>
  </div>
))}

    </div>
  );
}

export default ExperienceData;
