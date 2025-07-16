import React, { useState } from "react";
import "../login-popup/LoginPopup.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function SigninPopUp({ isOpen, onClose, onOpenLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/mentormesh/signup", {
        email: email.trim(),
        password: password.trim(),
        confirm_password: confirmPassword.trim(),
      })
      .then((res) => {
        toast.info("Signup Successful!");
        console.log(res.data);
        onClose(); 
        onOpenLogin(); 
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.info("User already exists!");
        } else if (err.response && err.response.status === 400) {
          toast.info("Passwords do not match!");
        } else {
          toast.info("Something went wrong.");
        }
        console.log(err);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      });
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Welcome</h2>
        <p>Please sign up to your account</p>

        <div className="googleContinue">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponseDecoded);
            }}
            onError={() => {
              console.log("Google Signup Failed");
            }}
          />
        </div>

        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="submit-btn">
            SignUp
          </button>
          <br />
          <br />
          <text>
            Already Have An Account? -
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
            >
              Login
            </span>
          </text>
        </form>
      </div>
    </div>
  );
}

export default SigninPopUp;
