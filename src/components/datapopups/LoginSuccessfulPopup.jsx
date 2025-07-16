
import React from "react";
import "./LoginSuccessfulPopup.css";

function LoginSuccessfulPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>✔ Successfully Logged In!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LoginSuccessfulPopup;
