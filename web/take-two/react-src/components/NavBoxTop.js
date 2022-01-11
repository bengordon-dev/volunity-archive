import React from 'react';
import "../App.css"

export default function NavBoxTop(props) {
  return (
    <div style={{display: "flex"}}>
      <h3 className="navBoxh3">{props.text}</h3>
      <div className="navButtons">
        <button onClick={props.leftFunc} disabled={props.page <= 0 ? true : false}>
          {props.leftText ? props.leftText : "<"}
        </button>
        <button onClick={props.rightFunc} disabled={props.page >= props.maxPage ? true : false}>
          {props.rightText ? props.rightText : ">"}
        </button>
      </div>
    </div>
  )
}