import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function OrgSignedOut() {
  return (
    <div className="App">
      <h2 className="label">Signed Out</h2>
      <div style={{marginTop: 100}}>
        <Link to="/orgview/signup">
          <button className="blueButton" style={signButton}>Sign up</button>
        </Link>
        <Link to="/orgview/login">
          <button className="blueButton" style={signButton}>Log in</button>
        </Link>
      </div>
    </div>
  )
}

const signButton = {
  width: 265,
  height: 92,
  marginLeft: 40,
  marginRight: 40,
  fontSize: 30
}
