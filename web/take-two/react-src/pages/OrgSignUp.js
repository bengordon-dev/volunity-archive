import React, { useState, useEffect } from "react";
import '../App.css';
import { createUser } from '../firebase-users'
import { useNavigate } from "react-router";
import NavBoxTop from "../components/NavBoxTop";
import NavOneLine from "../components/NavOneLine";


export default function OrgSignUp(props) {
  const [page, setPage] = useState(0)
  const [mission, setMission] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPass, setConfPass] = useState("")
 

  const navigate = useNavigate();
    
  function signUp(email, password) {
    createUser(email, password, (user) => orgSignInSuccess(user), complain())
  }

  function orgSignInSuccess(user) {
    localStorage.setItem("@volunity-org-token", user.accessToken)
    localStorage.setItem("@volunity-org-email", user.email)
    user.name = name
    user.bio = {mission: mission}
    console.log(user)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('/orgUser', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.data))
    navigate("/orgview")
  }

  function complain() {
    console.log("Something went wrong")
  }
  
  return (
    <div> 
      <h2 className="label">Create an Account</h2>
      <div className="detailsBox">
        <NavBoxTop 
          text={page == 0 ? "Account Details" : "Information"}
          leftFunc={() => setPage(page - 1)} rightFunc={() => setPage(page + 1)}
          page={page} maxPage={1}
        />
        {page === 0 ? 
          <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start"}}>
            <input type="text" placeholder="Organization Name" 
              value={name} onChange={(event) => setName(event.target.value)}
            />
            <NavOneLine
              type="password" placeholder="Password" 
              value={password} onChange={(event) => setPassword(event.target.value)}
              complain={password.length > 0 && password.length < 6} complainText={"Passwords must be at least 6 characters"}
            />
            <NavOneLine
              type="text" placeholder="Email" 
              value={email} onChange={(event) => setEmail(event.target.value)}
              complain={false} complainText={"I am angry"}
            />
            <NavOneLine
              type="password" placeholder="Confirm Password" 
              value={confPass} onChange={(event) => setConfPass(event.target.value)}
              complain={password != confPass} complainText={"Passwords must match"}
            />
            <br/>
          </div>
        : page === 1 ? 
          <div>
            <textarea
              type="text" className="multiLine" style={{height: 168}}
              placeholder="Mission statement"
              value={mission} onChange={(event) => setMission (event.target.value)}
            />
            <br/>
            <button className="loginButton" onClick={() => signUp(email, password)}>Sign up</button>
          </div>
        :
          <div><p>{page}</p></div>
        } 
      </div>
    </div>
  );
}
