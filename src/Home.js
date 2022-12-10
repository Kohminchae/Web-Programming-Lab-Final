import "./css/home.css";
import Button from './component/button';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="App">
      <div className="intro">Memorize every</div>
      <div className="intro">word</div>
      <div className="button">
      <Link to='/menu' style={{textDecoration: 'none'}}>
        <Button text="Start" height="50px"></Button>
      </Link>
      </div>
    </div>
  );
}

export default Menu;
