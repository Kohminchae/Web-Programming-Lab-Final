import "./css/wordList.css";
import Table from "./component/Table"
import { Link } from 'react-router-dom';

function Menu() {
  const rows = [
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
    ['apprehensive', '걱정하는, 염려하는'],
  ]
  const cols = ['#','a','as']
  return (
    <div className="list-container">
      <Link to="/menu" className="home">Home</Link>
      <div className="list-body">
        <div className="list-table">
          <Table cols={cols} rows={rows}/>
        </div>
      </div>
    </div>
  );
}

export default Menu;
