import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"

export default function VolView() {
  return (
    <div className="App">
      <Link to="/volview/findop">
        <button className="blueButton" style={{width: 430, height: 195, fontSize: 40, marginTop: 20}}>
          Find an Opportunity!
        </button>
      </Link>
      <div className="homepageBlurb">
        Find volunteer opportunities of all kind! For school service hours or workplace volunteer programs, 
        volunity makes finding opportunities easy for any occassion!
      </div>
    </div>
  )
}