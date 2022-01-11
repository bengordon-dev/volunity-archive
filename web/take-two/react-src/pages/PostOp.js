import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import NavBoxTop from "../components/NavBoxTop";
import NavOneLine from "../components/NavOneLine";

export default function PostOp() {
  const [page, setPage] = useState(0)
  const [email, setEmail] = useState(0)
  const navigate = useNavigate();
  const [date, setDate] = setDate("")
  const [hours, setHours] = setHours(0)
  const [address, setAddress] = setAddress("")
  const [phone, setPhone] = setPhone(0)

  function post(title, organization) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: title, organization: organization})
    };
    fetch('/opportunities', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.data))
    }

  useEffect(() => {
    if (!localStorage.getItem("@volunity-org-token")) {
      navigate("/orgview/signedout")
    } else {
      localStorage.getItem("@volunity-org-email") && setEmail(localStorage.getItem("@volunity-org-email"))
    }
  }, [])
     
  return (
    <div> 
      <h2 className="label">Opportunity information</h2>
     
      <div className="detailsBox">
        <NavBoxTop 
          text={page === 0 ? "What Actions Will Volunteers Be Doing?" : "Final Review"}
          leftFunc={() => setPage(page - 1)} rightFunc={() => setPage(page + 1)}
          page={page} maxPage={1}
        />
        {page === 0 ? 
        <div>
          <textarea
            className="multiLine"
            style={{height: 168}}
            type="text"
            placeholder="Ex: Sorting cans..."
          />
          <h3 className="navBoxh3">Details</h3>
          <NavOneLine
            type="text"
            placeholder="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <NavOneLine
            type="text"
            placeholder="Hours"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          />
          <NavOneLine
            type="text"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <NavOneLine
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        : page === 1 ? 
          <div>
            <button>Submit</button>
          </div>
        :
          <div><p>{page}</p></div>
        } 
      </div>
    </div>
  );
}
