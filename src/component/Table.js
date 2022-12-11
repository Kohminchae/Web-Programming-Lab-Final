import { useState } from "react";
import '../css/table.css';
//import Left from '~icons/fa6-solid/angle-left';
//import Right from '~icons/fa6-solid/angle-right';

export function Left(props) {
  return (
    <svg width="0.63em" height="1em" viewBox="0 0 320 320" {...props}><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
  )
}

export function Right(props) {
  return (
    <svg width="0.63em" height="1em" viewBox="0 0 320 320" {...props}><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
  )
}
function Table({cols, rows}) {
  const [currentPage, setPage] = useState(0)
  const pageEnd = rows.length % 5 === 0 ? rows.length / 5 - 1 : parseInt(rows.length / 5)
  return (
    <div className="table-container">
      <div className="table">
        {/* Header of the table */}
        <thead>
          <tr>
            {cols.map(i => <th key={i}>{i}</th>)}
          </tr>
        </thead>

        {/* Body of the table. Display items */}
        <tbody>
          {rows.slice(currentPage*5, currentPage*5 + 5 < rows.length ? currentPage*5 + 5 : rows.length).map(
            (row, index) => 
              <tr key={index}>
                <td className="row-index">{index + currentPage*5}</td>
                <td className="row-first">{row[0]}</td>
                <td className="row-second">{row[1]}</td>
              </tr>
          )}
        </tbody>
      </div>
      {/* pagination of the table */}
      <div className="pagination">
        {(currentPage === 0) &&
          <div className="paginationItem">
            <Left />
          </div>}
        {(currentPage !== 0) && 
          <div className="paginationItem" onClick={()=>setPage(pre => pre-1)} style={{cursor: "pointer"}}>
            <Left />
          </div>}

        <div className="paginationItem">{currentPage}</div>
        
        {(currentPage === pageEnd) &&
          <div className="paginationItem">
            <Right />
          </div>}
        {(currentPage !== pageEnd) && 
          <div className="paginationItem" onClick={()=>setPage(pre => pre+1)} style={{cursor: "pointer"}}>
            <Right />
          </div>}
      </div>
    </div>
  );
}

export default Table;
