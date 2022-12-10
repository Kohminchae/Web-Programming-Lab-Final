import "./css/menu.css";
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import { useState } from 'react';

function Upload() {
  let file;
  const [wordFile, setWordFile] = useState({cols: [], rows: []})
  const fileUpload = (e) => {
    file = e.target.files[0];
    ExcelRenderer(file, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        setWordFile({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });         
  }
  console.log(wordFile);

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={fileUpload}></input>
      {/* <OutTable data={wordFile.rows} columns={wordFile.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}
    </div>
  );
}

export default Upload;
