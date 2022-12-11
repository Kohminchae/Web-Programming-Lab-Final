import "./css/home.css";
import Button from './component/Button';
import { useNavigate } from 'react-router-dom';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import { useState } from 'react';
import { getDatabase, ref, query, onValue, set } from "firebase/database";

function Menu() {
  const navigate = useNavigate()
  const [fileName, setFile] = useState('')
  const [wordFile, setWordFile] = useState({cols: [], rows: []})

  const db = getDatabase();

  const storeWord = async (data) => {
    set(ref(db, "words"), data)
  };
  const fileUpload = (e) => {
    setFile(()=>e.target.files[0].name)
    ExcelRenderer(e.target.files[0], (err, resp) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(resp.rows)
        setWordFile({
          cols: resp.cols,
          rows: resp.rows
        });
        let datas = []
        resp.rows.map(data => datas.push({
          word1: data[0],
          word2: data[1],
          try: [0]
        }))
        storeWord(datas)
      }
    });
  }
  
  const goMenu = () => {
    if(fileName){
      navigate('/menu')
    } else {
      console.log(fileName)
      alert("upload your word file!")
    }
  }

  return (
    <div className="App">
      <div className="intro">Memorize</div>
      <div className="intro">every word</div>
      {/* click to upload the word excel files end with .xlsx  */}
      <div className="button">
        <Button  whenClicked={()=>document.getElementById('getFile').click()} text="Upload Words" height="60px" width="200px"/>
        <input type="file" id="getFile" accept=".xlsx" style={{display:"none"}} onChange={fileUpload}></input>
      </div>
      {/* go to the menu if file is uploaded already */}
      <div className="button" onClick={goMenu}>
        <Button text="Start" height="60px" width="200px"/>
      </div>
    </div>
  );
}

export default Menu;
