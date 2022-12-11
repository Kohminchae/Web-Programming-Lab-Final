import "./css/wordList.css";
import Table from "./component/Table"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { db } from './firebase_config.js'
import { ref, onValue } from "firebase/database";

function Menu() {
  const cols = ['#','word','meaning']
  const [words, setWord] = useState()
  const [isMounted, setMount] = useState(false)

  const refs = ref(db, "words")

  useEffect(()=>{
    setMount(!isMounted)
  },[])
  useEffect(()=>{
    if(isMounted === true){
      onValue(refs, (snapshot) => {setWord(snapshot.val())});
      setMount(!isMounted)
    }
  },[isMounted])

  return (
    <div className="list-container">
      <Link to="/menu" className="home">Home</Link>
      <div className="list-body">
        <div className="list-table">
          {words && <Table cols={cols} rows={words}/>}
        </div>
      </div>
    </div>
  );
}

export default Menu;
