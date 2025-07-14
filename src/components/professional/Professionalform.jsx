import { useContext, useState } from "react";
import PeopleConnect from "../PeopleConnection";
import "./ProfessionalForm.css";
import { MentorContext } from "../../App";
import axios from "axios"; 

function ProfessionalForm() {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [exp, setExp] = useState("");
  const [lpa,setLpa] = useState("")
  const [tips, setTips] = useState("");
  const [url, setURL] = useState("");
  const [tipsList, setTipsList] = useState([]);
  const [qaList, setQaList] = useState([]); 

  const {AddExperience,setAddExperience} = useContext(MentorContext)

async function handleSubmit(e) {
  e.preventDefault();
  const newExperience = {
    id: Date.now(),
    Name: companyName,
    Role: role,
    Package : lpa,
    Year: year,
    Exp: exp,
    Tip: tipsList,
    URL: url,
    QAList: qaList
  };

  setAddExperience((prev)=>[...prev,newExperience]);
  console.log(newExperience);

  try {
    const email = localStorage.getItem("userEmail");
    await axios.post('http://localhost:3000/mentormesh/addInterview', {
  email,
  companyName,
  role,
  year: parseInt(year),
  lpa: parseFloat(lpa),
  qaList,
  interviewExperience: exp,
  tips: tipsList,
  url
});
    console.log("Interview submitted successfully");
  } catch (error) {
  console.error(error); 
}

 setCompanyName("");
setRole("");
setYear("");
setExp("");
setTips("");
setTipsList([]);
setURL("");
setQaList([]);
setLpa("");
}


  function handleAddTip(e) {
    e.preventDefault();
    if (tips.trim() !== "") {
      setTipsList([...tipsList, tips]);
      setTips("");
    }
  }

    const addQuestionField = (e) => {
    e.preventDefault();
    setQaList([...qaList, { question: '', answers: [] }]);
  };

  const handleQuestionChange = (index, e) => {
    const updated = [...qaList];
    updated[index].question = e.target.value;
    setQaList(updated);
  };

  const addAnswerField = (questionIndex, e) => {
    e.preventDefault();
    const updated = [...qaList];
    updated[questionIndex].answers.push('');
    setQaList(updated);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updated = [...qaList];
    updated[questionIndex].answers[answerIndex] = e.target.value;
    setQaList(updated);
  };

  return (
    <div className="just">
      <h1 style={{ color: "#092b9c" }}>MentorMesh</h1>

      <div className="professionalanimation">
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your  Company Name"
              className="form-input"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            {/* <input
              type="text"
              placeholder="Enter Your Role"
              className="form-input"
              onChange={(e) => setRole(e.target.value)}
              required
            /> */}
            <select
              className="select-input"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled selected hidden>
                -- Select Role --
              </option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>QA Engineer</option>
              <option>AI Engineer</option>
            </select>

            <input 
          type="number" 
          placeholder="Enter Package" 
          className="form-input" 
          min={0}  
          value={lpa}
          onChange={(e) => setLpa(e.target.value)}/>
               
          {qaList.map((qa, qIndex) => (
            <div key={qIndex} className="questionField">
              <input
                type="text"
                placeholder={`Enter Question ${qIndex + 1}`}
                value={qa.question}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="form-input"
              />

              {qa.answers.map((ans, aIndex) => (
                <input
                  key={aIndex}
                  type="text"
                  placeholder={`Answer ${aIndex + 1}`}
                  value={ans}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                  className="form-input"
                />
              ))}

              <button onClick={(e) => addAnswerField(qIndex, e)} className="answer-btn" id="forAnswer">Add Answer</button>
            </div>
          ))}
 <button onClick={addQuestionField} id="forQuestion">Add Question</button>
            {/* <input
              type="number"
              placeholder="Interview Year"
              className="form-input"
              onChange={(e) => setYear(e.target.value)}
              required
            /> */}
            <select
              className="select-input"
              value = {year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value={exp} disabled selected hidden>
                --Select Year--
              </option>
              <option value={0}>0-6 months</option>
              <option value={1}>1 year</option>
              <option value={2}>2 year</option>
              <option value={3}>3 year</option>
              <option value={4}>4 year</option>
              <option value={5}>5 year</option>
              <option value={6}>6 year</option>
              <option value={7}>7 year</option>
              <option value={8}>8 year</option>
              <option value={9}>9 year</option>
              <option value={10}>10 year</option>
              <option value={11}>11-15 years</option>
              <option value={16}>16-20 years</option>
              <option value={20}>more then 20 years</option>
            </select>
            <textarea
              placeholder="Interview Experience"
              className="exp"
              onChange={(e) => setExp(e.target.value)}
              required
            ></textarea>
            <div className="tips-block">
              <input
                type="text"
                placeholder="Tips/Suggestions"
                className="form-input"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
              />
              <button className="add-button" onClick={handleAddTip}>
                +
              </button>
            </div>
            <ul className="tips-list">
              {tipsList.map((tip, index) => (
                <li key={index}>👉 {tip}</li>
              ))}
            </ul>
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
