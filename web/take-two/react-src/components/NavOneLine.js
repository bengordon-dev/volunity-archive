import React from 'react';
import "../App.css"

export default function NavOneLine(props) {
  return (
    <div style={{display: "inline-block", marginBottom: 5}}>
      <input type={props.type} placeholder={props.placeholder} 
        value={props.value} onChange={props.onChange}
      />
      <p style={{...complainStyle, opacity: (props.complain ? 1 : 0)}}>{props.complain ? props.complainText : "_"}&#32;</p>
    </div>
  )
}

const complainStyle = {
  marginBlockStart: 0, 
  marginBlockEnd: 0, 
  fontSize: 12,
  color: "red"
}