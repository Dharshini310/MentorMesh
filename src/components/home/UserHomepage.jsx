import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import { MentorContext } from '../../App'; 
import './UserHome.css'
import ExperienceData from './ExperienceData';

function UserHomePage() {
  const [interviews, setInterviews] = useState([]);
  const { AddExperience } = useContext(MentorContext);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
  axios
    .get("http://localhost:3000/mentormesh/all-interview-data")
    .then((res) => {
      const allInterviews = [];

      res.data.forEach((user) => {
        user.interview.forEach((iv) => {
          allInterviews.push({ ...iv, email: user.email });
        });
      });

      setInterviews(allInterviews);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
    <>
      <UserNavbar />
      <ExperienceData/>
    </>
  );
}

export default UserHomePage;
