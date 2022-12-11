import "./css/home.css";
import Button from './component/Button';
import { useNavigate } from 'react-router-dom';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import { useState } from 'react';

function Menu() {
  const navigate = useNavigate()
  const [fileName, setFile] = useState('')
  const [wordFile, setWordFile] = useState({cols: [], rows: []})

  const fileUpload = (e) => {
    setFile(()=>e.target.files[0].name)
    ExcelRenderer(e.target.files[0], (err, resp) => {
      if(err){
        console.log(err)        
      }
      else{
        console.log(resp)
        setWordFile({
          cols: resp.cols,
          rows: resp.rows
        });
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
