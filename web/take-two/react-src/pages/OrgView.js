import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"

export default function OrgView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(0)

  function signOut() {
    localStorage.removeItem("@volunity-org-token")
    localStorage.removeItem("@volunity-org-email")
    navigate("/orgview/signedout")
  }

  useEffect(() => {
    if (!localStorage.getItem("@volunity-org-token")) {
      navigate("/orgview/signedout")
    } else {
      localStorage.getItem("@volunity-org-email") && setEmail(localStorage.getItem("@volunity-org-email"))
    }
  }, [])
  
  return (
    <div className="App">
      <Link to="/orgview/postop">
        <button className="blueButton" style={{width: 430, height: 195, fontSize: 40, marginTop: 20}}>
          Post a Volunteer Opportunity!
        </button>
      </Link>
      <div className="homepageBlurb">
        Volunteers are eager to find new opportunities. Customize your opportunity and post it for them to see. 
        Whether it’s a food drive assistant or tree planter, any and all opportunities are welcome!
      </div>
      <button style={{marginTop: 20}} onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
