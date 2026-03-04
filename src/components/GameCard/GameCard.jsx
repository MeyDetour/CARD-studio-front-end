import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { formatSmartDate } from "../../helpers/date";
import Separator from "../Separator/Separator";
import Button from "../Button/Button";
import { useGameContext } from "../../context/GameContext.jsx";

export default function GameCard({ game }) {
  const { getGameInStorage } = useGameContext();

  const { t } = useTranslation();
  return (
    <div className="gameCard">
      <div className="cardHeader">
        <div>
          <span className="name">{game.name}</span>
          <p>{game.description ? game.description : "Aucune description "}</p>
        </div>
        <Icon></Icon>
      </div>
      <div className="badgeWrapper">
        {game &&
          game.types &&
          game.types.split(",").map((type, index) => (
            <div className="badge" key={index}>
              {type}
            </div>
          ))}
      </div>
      <Separator></Separator>

      <div className="stats">
        {[
          {
            icon: "players-grey",
            count: game.playerCount,
            name: "Joueurs accuillis",
          },
          {
            icon: "play-grey",
            count: game.gameCount,
            name: "Parties jouées",
          },
          {
            icon: "star-yellow",
            count: (game.notes.lenght = 0 ? "--" : game.averageNotes),
            name: "Note",
          },
        ].map((elt, index) => (
          <div key={index}>
            <Icon name={elt.icon}></Icon>
            <span className="count">{elt.count}</span>
            <span className="text">{elt.name}</span>
          </div>
        ))}
      </div>

      <Separator></Separator>
      {getGameInStorage(game.id) ? (
        <div className="savedGame">Jeu non sauvegardée</div>
      ) : game.editionHistory[0] ? (
        <div className="lastEdit">
          <Icon name={"clock-grey"}></Icon>
          <span> {formatSmartDate(game.editionHistory[0].date_relative)}</span>
        </div>
      ) : (
        <div className="lastEdit">
          <span>{t("noLastEdit")}</span>
        </div>
      )}

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
