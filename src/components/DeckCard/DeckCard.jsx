import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon.jsx";
import { formatSmartDate } from "../../helpers/date.js";
import Separator from "../Separator/Separator.jsx";
import Button from "../Button/Button.jsx";
import { useGameContext } from "../../context/GameContext.jsx";
import { sendMessageToCardStudioTester } from "../../helpers/browserMessageWithCardStudioTester.js";
import { useTokenContext } from "../../context/TokenContext.jsx";

export default function DeckCard({ deck }) {
  const { getDeckInStorage } = useGameContext();

  const { getToken } = useTokenContext();
  const { t } = useTranslation();
  return (
    <div className="gameCard">
      <div className="cardHeader">
        <div>
          <span className="name">{deck.name}</span>
          <p>{deck.description ? deck.description : "Aucune description "}</p>
        </div>
        <Icon></Icon>
      </div>
      
      <Separator></Separator>
 
      <div className="buttonContainer">
        <Button
          icon="settings-white"
          type="violetButton"
          text="editGame"
          to={"/game/dashboard/" + game.id}
        ></Button>
      
      </div>
    </div>
  );
}
