import React, { useState, useEffect } from "react";
import './main.scss';

function Main() {
  useEffect(() => {
    try {
      const rawFile = new XMLHttpRequest();
      rawFile.open("GET", './text.txt', false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
            const allText = rawFile.responseText;
            let textArr = [];
            let filteredText = '';
            for (let i = 0; i < allText.length; i++) {
              if (allText[i] >= 'a') {
                filteredText = filteredText.concat(allText[i]);
              }
              else {
                if (filteredText >= 'a' && filteredText.length === 5) {
                  textArr.push(filteredText);
                }
                filteredText = '';
              }
            }
            console.log(textArr);
          }
        }
      }
      rawFile.send(null);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <div className="main">
    <Letter value={''} filled={false} />
  </div>
}

function Letter(props) {
  const [filled, setFilled] = useState(false);
  window.onkeyup = e => {
    if (e.key === 'Backspace' || e.key === 'Enter' || ('z' >= e.key && e.key >= 'a')) {
      console.log(e.key);
      return e.key;
    }
  }
  return <div className={"letter" + filled ? "filled" : ''}>
    {props.value ? filled : ''}
  </div>
}

export default Main;