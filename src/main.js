import React, { useState, useEffect } from "react";
import './main.scss';


function Main() {
  const [arr, setArr] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [colorArr, setColorArr] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ])
  const [line, setLine] = useState(0);
  const [row, setRow] = useState(0);
  const [answer, setAnswer] = useState();
  const [texts, setTexts] = useState([]);
  const [correct, setCorrect] = useState(false);
  let isOperated = false;
  const [havingArr, setHavingArr] = useState([]);
  useEffect(() => {
    try {
      const rawFile = new XMLHttpRequest();
      rawFile.open("GET", './text.txt', false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
            let textArr = [];
            const allText = rawFile.responseText;
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
            setHavingArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setTexts(textArr);
          }
        }
      }
      rawFile.send(null);
    } catch (e) {
      console.log(e);
    }
  }, []);
  function isTheLetterExist(i) {
    for (let j = 0; j < 5; j++) {
      if (arr[line][i] === answer.charAt(j)) {//존재시 
        for (let k = 0; k < 26; k++) {
          if (havingArr[k] > 0) {
            havingArr[k]--;
            // console.log(havingArr);
            return true;
          }
        }
      }
    }
    return false;
  }
  function RYGenius() {
    switch (line) {
      case 0:
        return "'re Genius!";
      case 1:
        return "'re Magnficent!";
      case 2:
        return `'re Impressive!`;
      case 3:
        return `'re Splendid!`;
      case 4:
        return `'re Great`;
      case 5:
        return `'re Phew`;
      default:
        return ' should need to more practice.';
    }
  }
  function initialsetting() {
    setAnswer(texts[Math.floor(Math.random() * texts.length)]);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        colorArr[i][j] = '';
        arr[i][j] = '';
      }
    }
    setCorrect(false);
    setLine(0);
    setRow(0);
    isOperated = false;
  }
  window.onkeyup = e => {
    if (!correct) {
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
      else if (e.key === 'Enter' && arr[line].toString().replace(/,/g, '').length > 4) {
        let copiedColor = [...colorArr];
        if (arr[line].toString().replace(/,/g, '') === answer) { //다 맞을 경우
          for (let i = 0; i < 5; i++) {
            copiedColor[line][i] = 'skyblue';
          }
          setCorrect(true);
        }
        else {
          if (texts.includes(arr[line].toString().replace(/,/g, '')) && line <= 5) {//단어장에서 있는지 확인
            if (!isOperated) {//초기 설정
              isOperated = true;
              for (let j = 97; j <= 121; j++) {
                if (answer.indexOf(String.fromCharCode(j)) >= 0) {//존재하면 해당 위치 +1
                  havingArr[j - 97]++;
                }
              }
            }
            for (let i = 0; i < 5; i++) {
              if (arr[line][i] === answer.charAt(i)) {//같은 글자가 현재 자리에 있을 경우
                for (let k = 0; k < 26; k++) {
                  if (havingArr[k] > 0) {
                    havingArr[k]--;
                  }
                }
                copiedColor[line][i] = 'skyblue';
              }
              else if (isTheLetterExist(i)) {//자리가 달라도 같은 글자가 존재할 경우
                copiedColor[line][i] = 'darkorange';
              }
              else {//아예 없을 경우
                copiedColor[line][i] = 'lightgray';
              }
            }
            setLine(e => e <= 5 ? e + 1 : 5);
            setRow(0);
          }
          else if (line >= 5) {
            for (let i = 0; i < 5; i++) {
              if (arr[line][i] === answer.charAt(i)) {//같은 글자가 현재 자리에 있을 경우
                copiedColor[line][i] = 'skyblue';
              }
              else if (isTheLetterExist(i)) {//자리가 달라도 같은 글자가 존재할 경우
                copiedColor[line][i] = 'darkorange';
              }
              else {//아예 없을 경우
                copiedColor[line][i] = 'lightgray';
              }
            }
          }
          else {
            alert(`Please enter a 5 letter word correctly.`)
          }
          setColorArr(() => copiedColor);
        }
      }
      setArr(() => copy);
      console.log(answer);
    }
  }
  return <div className="main">
    <h1>WORDLE!</h1>
    <div className="contents">
      <Letters num={0} arr={arr} colorArr={colorArr} ></Letters>
      <Letters num={1} arr={arr} colorArr={colorArr} ></Letters>
      <Letters num={2} arr={arr} colorArr={colorArr} ></Letters>
      <Letters num={3} arr={arr} colorArr={colorArr} ></Letters>
      <Letters num={4} arr={arr} colorArr={colorArr} ></Letters>
      <Letters num={5} arr={arr} colorArr={colorArr} ></Letters>
    </div>
    {correct && <div className="corrected">
      <div className="background" />
      <div className={`popup${correct && ' true'}`}>
        <p>Answer : {answer}</p>
        <p>You{RYGenius()}</p>
        <button onClick={initialsetting}>Retry</button>
      </div>
    </div>}
  </div>
}

function Letters(props) {
  return <div className={`letters ${props.num}`}>
    <Letter value={props.arr[props.num][0].toUpperCase()} color={props.colorArr[props.num][0]} />
    <Letter value={props.arr[props.num][1].toUpperCase()} color={props.colorArr[props.num][1]} />
    <Letter value={props.arr[props.num][2].toUpperCase()} color={props.colorArr[props.num][2]} />
    <Letter value={props.arr[props.num][3].toUpperCase()} color={props.colorArr[props.num][3]} />
    <Letter value={props.arr[props.num][4].toUpperCase()} color={props.colorArr[props.num][4]} />
  </div>
}

function Letter(props) {
  return <div className={`letter`}
    style={{ backgroundColor: props.color }}>
    {props.value}
  </div>
}

export default Main;