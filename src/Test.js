import "./css/test.css";
import { useEffect, useState, useRef } from 'react';
import Button from "./component/Button";
import { Link } from "react-router-dom";
import { db } from './firebase_config.js'
import { ref, onValue, update } from "firebase/database";

function Test() {
  const [state, setState] = useState(0)
  const [time, setTime] = useState(0)
  const [question, setQuestion] = useState(0)
  const [curQuestion, setCurQuestion] = useState(0)
  const [curTime, setCurTime] = useState(0)
  const [countDown, setCount] = useState(3)
  const [wordIndex, setIndex] = useState([])
  const [score, setScore] = useState(0)
  const userInput = useRef() 
  const [words, setWord] = useState()
  const [isMounted, setMount] = useState(false)
  const [trial, setTry] = useState(0)

  const refs = ref(db, "words")

  const nextQuestion = () => {
    checkAnswer()
    userInput.current.value = ""
    setCurTime(()=>time)
    if(curQuestion < question - 1) {
      setCurQuestion(preQ => preQ + 1)
    } else {
      setState(pre => pre + 1) // change state to test finish
    }
  }

  const checkAnswer = () => {
    if(userInput.current.value === words[wordIndex[curQuestion]].word2){
      setWord(words => {
        const newWords = [...words]
        newWords[wordIndex[curQuestion]].try[trial]++;
        return newWords
      })
    } else {
      setWord(words => {
        const newWords = [...words]
        newWords[wordIndex[curQuestion]].try[trial]--;
        return newWords
      })
    }
  }

  const testAgain = () => {
    update(ref(db), {words: words});

    setState(0)
  }

  useEffect(()=>{ // count down Effect
    if(state === 1){
      if(countDown > 0) {

        const timer = setInterval(()=>{
          setCount(pre => pre-1)
        }, 1000)
        return () => clearInterval(timer);
      } else if(countDown === 0) {
        setState(pre => pre + 1)
      }
    }
  },[countDown, state])

  useEffect(()=>{ // select random word set 
    if(state === 2) {
      let wordSetMaking = [];
      for(let i = 0; i < question; i++){
        let index = Math.floor(Math.random()*words.length)
        wordSetMaking.push(index)
        setIndex(() => wordSetMaking)
      }
      setCurTime(()=>time)
    }
  },[state])

  useEffect(()=>{ // timer during test

    if(state === 2){
      if(curTime >= 0) {
        const timer = setInterval(()=>{
          setCurTime(time => time - 1)
        }, 1000)
        return () => clearInterval(timer)
      } else {
        nextQuestion();
      }
    }
  },[curTime])

  useEffect(()=>{
    console.log(words)
    if(state === 3){ // calculate score
      let count = 0
      words.map(i => {
        if(i[2] === 1) count++
      })
      setScore(count)
    }
  },[state])

  useEffect(()=>{
    setMount(!isMounted)
  },[])

  useEffect(()=>{
    if(isMounted === true){
      onValue(refs, (snapshot) => {
        let getData = snapshot.val();
        getData.map((d, index) => {
          if(d.try === undefined){
            setTry(0)
            d.try = [0];
            getData[index] = d;
          } else{
            d.try.push(0)
            if(!trial) setTry(d.try.length);
          }
        })
        setWord(getData)
      });
      setMount(!isMounted)
      
    }
  },[isMounted])

  return (
    <div className="test-container">
      <Link to="/menu" className="home">Home</Link>
      <div className="test-body">
      {/* before start user select some options */}
      {
        (state === 0) && 
          <div className="ready">
            <div className="option">
              <div className="question">How Many Questions?</div>
              <input type="number" id="question" onChange={(e) => setQuestion(e.target.value)}/>
            </div>

            <div className="option">
              <div className="question">Select Time Interval</div>
              <input type="number" id="interval" onChange={(e) => {setTime(e.target.value)}}/>
            </div>

            <div className="start-button">
              <Button text="Test Start" height="60px" width="200px" whenClicked={() => setState(pre => pre + 1)}></Button>
            </div>
          </div>
      }

      {/* countDown before test start */}
      {
        (state === 1) && 
          <div className="test-countdown">
            {countDown}
          </div>
      }

      {/* test start */}
      {
        (state === 2) && 
          <div className="test-start">
            <div className="test-timer">Timer: {curTime}</div>
            <div className="current-word">{wordIndex[curQuestion] && words[wordIndex[curQuestion]].word1}</div>
            <input type="text" ref={userInput} />
            <div className="start-button">
              <Button text="next" height="60px" width="200px" whenClicked={nextQuestion} />
            </div>
          </div>
      }

      {/* test finish show score board */}
      {
        (state === 3) && 
          <div className="test-finish">
            <div className="test-score">{score} / {question}</div>
            <div className="start-button">
              <Button text="Try again?" height="60px" width="200px" whenClicked={testAgain()} />
            </div>
          </div>
      }
      </div>
    </div>
  );
}

export default Test;
