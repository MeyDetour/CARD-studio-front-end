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
  if (!deck) {
    return null;
  } 
  console.log(deck);
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
       <div className="badgeWrapper">
        <div className="badge" >
              { deck.cards? Object.keys(deck.cards).length : 0} {Object.keys(deck.cards).length > 1 ? t("cards") : t("card")}
            </div>

              <div className="badge" >
              {deck.isPublished?t("published"):t("unpublished")}
            </div>
         
      </div>
      <Separator></Separator>
 
      <div className="buttonContainer">
        <Button
          icon="settings-white"
          type="violetButton"
          text="editDeck"
          to={"/deck/" + deck.id}
        ></Button>
      
      </div>
    </div>
  );
}
