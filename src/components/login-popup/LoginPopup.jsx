import "./LoginPopup.css";
import LoginSuccessfulPopup from "../datapopups/LoginSuccessfulPopup";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function LoginPopup({ isOpen, onClose, onOpenSignin }) {
  if (!isOpen) return null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/mentormesh/login", { email, password })
      .then((result) => {
        console.log(result);
         localStorage.setItem("userEmail", result.data.user.email);
         onClose()
         setShowSuccess(true) 
         setTimeout(() => {
          setShowSuccess(false);
          toast.success("Login Successful")
          navigate("/user-homepage"); 
        }, 2000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.info("User already exists!");
        } else {
          toast.error("Something went wrong. Try again.");
        }
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
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
     {showSuccess && (
        <LoginSuccessfulPopup onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}

export default LoginPopup;
