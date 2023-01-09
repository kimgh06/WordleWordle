import React, { useState, useEffect } from "react";
import './main.scss';


function Main() {
  const [line, setLine] = useState(0);
  const [row, setRow] = useState(0);
  const [answer, setAnswer] = useState();
  const [arr, setArr] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
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
            console.log("answer : " + textArr[Math.floor((Math.random() * textArr.length))]);
            setAnswer(textArr[Math.floor((Math.random() * textArr.length))]);
          }
        }
      }
      rawFile.send(null);
    } catch (e) {
      console.log(e);
    }
  }, []);
  window.onkeyup = e => {
    let copy = [...arr];
    if ('z' >= e.key && e.key >= 'a') {
      setRow(e => e > 3 ? 0 : e + 1);
      copy[line][row] = e.key;
      setArr(copy);
    }
    else if (e.key === 'Backspace') {
      copy[line][row] = '';
      setRow(e => e >= 0 ? e - 1 : 0);
      console.log(e.key);
    }
    else if (e.key === 'Enter') {
      console.log(e.key);
    }
  }
  return <div className="main">
    <h1>WORDLE!</h1>
    <div className="contents">
      <div className="letters 1">
        <Letter value={arr[0][0].toUpperCase()} color={'gray'} />
        <Letter value={arr[0][1].toUpperCase()} color={'gray'} />
        <Letter value={arr[0][2].toUpperCase()} color={'gray'} />
        <Letter value={arr[0][3].toUpperCase()} color={'gray'} />
        <Letter value={arr[0][4].toUpperCase()} color={'gray'} />
      </div>
    </div>
  </div>
}

function Letter(props) {
  const [filled, setFilled] = useState(false);
  return <div className={`letter${filled ? ' filled' : ''}`}>
    {props.value}
  </div>
}

export default Main;