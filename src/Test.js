import "./css/test.css";
import { useEffect, useState, useRef } from 'react';
import Button from "./component/Button";
import { Link } from "react-router-dom";
import { db } from './firebase_config.js'
import { ref, onValue, update, set } from "firebase/database";

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
    // check answer if it is correct
    console.log(curQuestion, wordIndex , words[wordIndex[curQuestion]])
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

    userInput.current.value = ""
    setCurTime(()=>time)
    if(curQuestion < question - 1) {
      setCurQuestion(preQ => preQ + 1)
    } else {
      setState(pre => pre + 1) // change state to test finish
    }
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
      while(wordSetMaking.length < question){
        var r = Math.floor(Math.random() * (words.length-1)) + 1;
        if(wordSetMaking.indexOf(r) === -1) wordSetMaking.push(r);
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

  useEffect(()=>{ // calculate score
    if(state === 3){ 
      let count = 0
      words.map(i => {
        if(i.try[trial] === 1) count++
      })
      setScore(count)
    }
  },[state])

  useEffect(()=>{
    setMount(!isMounted)
  },[])

  useEffect(()=>{ // how many try
    if(isMounted === true){
      onValue(refs, (snapshot) => {
        let getData = snapshot.val();
        getData.map((d, index) => {
          if(d.try === undefined){
            setTry(0)
            d.try = [0];
            getData[index] = d;
          } else{
            setTry(d.try.length);
            d.try.push(0)
          }
        })
        setWord(getData)
      });
      setMount(!isMounted)
    }
  },[isMounted,words])

  useEffect(()=>{ // test again, store the result
    let updates = {}
    if(trial && (state === 0)){    
      //.map((i, index)=> {update["/words/" + index] = i})
      words.map((w, index)=>updates["/words/" + index + "/try/"] = w.try)
      update(ref(db), updates)
      //words.map((w, index)=>set(ref(db, "words/"+index+"try"), words.try))
    }
    console.log("hawer")
  },[state])

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
              <Button text="Try again?" height="60px" width="200px" whenClicked={()=>{setState(0); setCurQuestion(0)}} />
            </div>
          </div>
      }
      </div>
    </div>
  );
}

export default Test;
