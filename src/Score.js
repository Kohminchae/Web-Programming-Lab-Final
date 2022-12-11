import "./css/score.css";
import Table from "./component/Table"
import { Link } from 'react-router-dom';
import { db } from './firebase_config.js'
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Button from "./component/Button";

function Menu() {
  const cols = ['#','word1','word2']
  const [words, setWord] = useState()
  const [trial, setTry] = useState(0)
  const [isMounted, setMount] = useState(false)
  const [curTry, setCurTry] = useState(0)
  const [curWord, setCurWord] = useState([])
  const [score, setScore] = useState(0)
  const refs = ref(db, "words")

  const changeTry = (e) => {
    console.log(parseInt(e.target.innerText.split(" ")[1]))
    setCurTry(()=>parseInt(e.target.innerText.split(" ")[1]))
    let wrong = []
    let correct = []
    words.map(i => {
      if(i.try[curTry-1] === -1) { wrong.push(i) }
      else if(i.try[curTry-1] === 1) { correct.push(i) }
    })
    setScore(()=>(correct.length*100/(wrong.length + correct.length)).toFixed(0))
    setCurWord(()=>wrong)
  }

  useEffect(()=>{
    setMount(!isMounted)
  },[])

  useEffect(()=>{
    if(isMounted === true){
      onValue(refs, (snapshot) => {setWord(snapshot.val())});
      setMount(!isMounted)
    }
  },[isMounted])

  useEffect(()=>{
    console.log(words)
    if(words) {
      setTry(words[0].try.length)
    }
  },[words])

  return (
    <div className="score-container">
      <Link to="/menu" className="home">Home</Link>
      <div className="score-body">
        <div className="button-group">
          {
            trial && [...Array(trial).keys()].map(i =>
              <div className="button-container" key={i}>
                <Button text={"Try " + (i+1)} width="100px" height="50px" whenClicked={changeTry}/>
              </div>
            )
          }
        </div>
        {
          words ? (curWord.length > 0 ? 
          <>
            <div className="score">Score: {score}</div>
            <div className="score-table">
              <Table cols={cols} rows={curWord}/>
            </div>
          </> : '') : ''
        }
      </div>
    </div>
  );
}

export default Menu;
