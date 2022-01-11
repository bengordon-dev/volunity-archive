import React, {useState, useEffect} from 'react';

export default function FindOp() {
  const [opportunities, setOps] = useState([])
  
  useEffect(() => {
    getOps()
  }, [])

  function getOps() { 
    fetch("/opportunities")
    .then((response) => response.json())
    .then((data) => {
      setOps(data.data)
    })
  }
  return (
    <div>
    {opportunities && opportunities.filter(e => e.title).map((op, i) => {
      return (
        <p>{op.title}{" with " + op.organization}</p>
      )
    })}   
    </div>
  )
}