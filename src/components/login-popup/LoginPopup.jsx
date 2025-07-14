import "./LoginPopup.css";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPopup({ isOpen, onClose, onOpenSignin }) {
  if (!isOpen) return null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/mentormesh/login", { email, password })
      .then((result) => {
        console.log(result);
        alert("Login Successful");
         localStorage.setItem("userEmail", result.data.user.email); 
        onClose(); // close popup
        navigate('/user-homepage');
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("User already exists!");
        } else {
          alert("Something went wrong. Try again.");
        }
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>
        <div className="googleContinue">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponseDecoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="submit-btn">
            Login
          </button>
          <br />
          <br />
          <text>
            Don't Have An Account? -
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                onClose();
                onOpenSignin();
              }}
            >
              Signup
            </span>
          </text>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
