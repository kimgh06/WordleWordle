import React, { useState, useEffect } from "react";
import './main.scss';


function Main() {
  const [line, setLine] = useState(0);
  const [row, setRow] = useState(0);
  const [answer, setAnswer] = useState();
  const [updown, setUpdown] = useState('up');
  const [arr, setArr] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [colorArr, setColorArr] = useState([
    ['lightgray', 'skyblue', 'darkorange', 'lightgray', 'lightgray'],
    ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'],
    ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'],
    ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'],
    ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'],
  ])
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
      if (row < 5) {
        copy[line][row] = e.key;
      }
      setRow(e => e > 4 ? 5 : e + 1);
    }
    else if (e.key === 'Backspace') {
      copy[line][row - 1] = '';
      setRow(e => e > 0 ? e - 1 : 0);
    }
    else if (e.key === 'Enter') {
      if (arr[line].toString().replace(/,/g, '') === answer) { //다 맞을 경우
        alert('correct!');
      }
      else {
        for (let i = 0; i < 5; i++) {
          if (arr[line][i] === answer.charAt(i)) {//같은 글자가 현재 자리에 있을 경우
            console.log(i + '번째 자리 맞음');
          }
          else if (arr[line]) {//자리가 달라도 같은 글자가 존재할 경우

          }
          else {//아예 없을 경우

          }
        }
      }
    }
    setArr(() => copy);
    console.log(line, row, arr[0].toString().replace(/,/g, ''), answer);
  }
  return <div className="main">
    <h1>WORDLE!</h1>
    <div className="contents">
      <div className="letters 1">
        <Letter value={arr[0][0].toUpperCase()} color={colorArr[0][0]} />
        <Letter value={arr[0][1].toUpperCase()} color={colorArr[0][1]} />
        <Letter value={arr[0][2].toUpperCase()} color={colorArr[0][2]} />
        <Letter value={arr[0][3].toUpperCase()} color={colorArr[0][3]} />
        <Letter value={arr[0][4].toUpperCase()} color={colorArr[0][4]} />
      </div>
    </div>
  </div>
}

function Letter(props) {
  const [filled, setFilled] = useState(false);
  return <div className={`letter${filled ? ' filled' : ''}`} style={{ backgroundColor: props.color }}>
    {props.value}
  </div>
}

export default Main;