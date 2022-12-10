import '../css/menuCard.css'

function MenuCard({color, text, height, width, fontSize}) {
  const cardStyle = {

  }
  return (
    <div className="menuCard-component" style={cardStyle}>
      {text}
    </div>
  );
}

export default MenuCard;
