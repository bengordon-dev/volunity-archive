import React, { useState, useEffect } from "react";
import { signIn } from '../firebase-users'
import '../App.css';
import { useNavigate } from "react-router";
import NavOneLine from "../components/NavOneLine";

export default function OrgLogIn(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  function logIn(email, password) {
    signIn(email, password, (user) => orgSignInSuccess(user), () => showError())
  }
  
  function orgSignInSuccess(user) {
    //setOrgUser(user);
    localStorage.setItem("@volunity-org-token", user.accessToken)
    localStorage.setItem("@volunity-org-email", user.email)
    navigate("/orgview")
  }

  function showError() {
    setError(true)
    console.log("Something went wrong")
  }
  
  return (
    <div> 
      <h2 className="label">Log In</h2>
      <div className="detailsBox">
        <div className="signInForm">
          <NavOneLine 
            placeholder="Username" type="text"
            value={email} onChange={(event) => setEmail(event.target.value)}
          />
          {"\n"}
          <NavOneLine 
            placeholder="Password" type="password"
            value={password} onChange={(event) => setPassword(event.target.value)}
            complain={error} complainText={"Invalid username or password"}
          />
          {"\n"}
          <button className="loginButton" 
            disabled={email.length === 0 || password.length === 0}
            onClick={() => logIn(email, password)}>Log In
          </button>
          
        </div>
      </div>
    </div>
  );
}
