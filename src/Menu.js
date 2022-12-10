import MenuCard from "./component/MenuCard";
import "./css/menu.css";

function Menu() {
  const menuText = ["memorize", "test", "wrong"] // myword
  return (
    <div className="container">
      <div className="menus">
        {
          menuText.map(i=>
          <MenuCard text={i} />
          )
        }
      </div>
    </div>
  );
}

export default Menu;
