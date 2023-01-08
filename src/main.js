import React, { useState, useEffect } from "react";
import './main.scss';
import fs from "fs";

function Main() {
  useEffect(() => {
    fs.readFile('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', 'utf-8',
      (e, data) => e ? console.error(e) : console.log(data));
  }, []);
  return <div className="main">
    <Letter value={window.onkeyup = e => {
      if (e.key === 'Backspace' || e.key === 'Enter' || ('z' >= e.key && e.key >= 'a')) {
        console.log(e.key);
        return e.key;
      }
    }} filled={false} />
  </div>
}

function Letter(props) {
  const [filled, setFilled] = useState(false);
  return <div className={"letter" + filled ? "filled" : ''}>
    {props.value}
  </div>
}

export default Main;