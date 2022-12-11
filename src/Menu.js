import MenuCard from "./component/MenuCard";
import "./css/menu.css";

function Menu() {
  const menuText = ["Word List", "Word Test", "Score board"] // myword
  return (
    <div className="container">
      <div className="menus">
        <MenuCard text={menuText[0]} next="/wordlist" />
        <MenuCard text={menuText[1]} next="/test" />
        <MenuCard text={menuText[2]} next="/score" />
      </div>
    </div>
  );
}

export default Menu;
