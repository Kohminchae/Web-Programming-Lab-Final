import '../css/menuCard.css'
import { Link } from 'react-router-dom';

function MenuCard({text, next}) {
  return (
    <Link to={next} style={{textDecoration: "none"}}>
      <div className="menuCard-component">
        {text}
      </div>
    </Link>
  );
}

export default MenuCard;
