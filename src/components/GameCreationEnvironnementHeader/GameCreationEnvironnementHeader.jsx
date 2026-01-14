import { useParams } from "react-router";
import "./style.css";
import Button from "../Button/Button";

export default function GameCreationEnvironnementHeader({name}) {
  
  return (
    <header className="gameCreationEnvironnementHeader">
      <div>
        <img src={"/src/assets/icon/CARDStudioCréationLogo.svg"} alt="" />
        <span className="firstPart">CARD Studio</span>
        <span>•</span>
        <span>{name}</span>
      </div>
      <div>
        <Button type="whiteWithBordure" to="/" text="changeSelectedGame" icon="back"></Button>
        <Button  to="help" text="help" icon="help"></Button>
        <Button type="whiteWithBordure" to="account" text="account" icon="profile"></Button>
      </div>
    </header>
  );
}
