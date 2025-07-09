import { useState } from "react";
import PeopleConnect from "../PeopleConnection";

function ProfessionalForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [exp, setExp] = useState("");
  const [tips, setTips] = useState("");
  const [url, setURL] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, role, year, exp, tips, url);
  }

  return (
    <div className="just">
      <h1 style={{ color: "#092b9c" }}>MentorMesh</h1>

      <div className="professionalanimation">
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="form-input"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Role"
              className="form-input"
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Internship Year"
              className="form-input"
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <textarea
              placeholder="Interview Experience"
              className="exp"
              onChange={(e) => setExp(e.target.value)}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Tips/Suggestions"
              className="form-input"
              onChange={(e) => setTips(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              className="form-input"
              onChange={(e) => setURL(e.target.value)}
              required
            />
            <button className="form-button">Submit</button>
          </form>
        </div>

        <div className="animation-block">
          <PeopleConnect />
        </div>
      </div>
    </div>
  );
}

export default ProfessionalForm;
