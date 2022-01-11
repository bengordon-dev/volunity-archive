import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
export default function Main() {
  return (   
    <div class="App">
      <Link to="/volview">
        <button className="blueButton" style={{fontSize: 20, marginTop: 20}}>
          For Volunteers
        </button>
      </Link>
      <Link to="/orgview">
        <button className="blueButton" style={{fontSize: 20, marginTop: 20}}>For Organizations</button>
      </Link>
    </div>
  )
}