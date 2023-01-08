import React, { useState, useEffect } from "react";
import './main.scss';

function Main() {
  useEffect(() => {
    try {
      const rawFile = new XMLHttpRequest();
      rawFile.open("GET", './text.txt', false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            const allText = rawFile.responseText;
            for (let i = 0; i < 100; i++) {
              const filteredText = allText[i];
              console.log(filteredText);
            }
          }
        }
      }
      rawFile.send(null);
    } catch (e) {
      console.log(e);
    }
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