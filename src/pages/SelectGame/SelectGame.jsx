import Loader from "../../components/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom"; 
import { useEffect, useRef, useState } from "react";
import "./style.css";
import Button from "../../components/Button/Button.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import StatElement from "../../components/StatElement/StatElement.jsx";
import { useApi } from "../../hooks/useApi.js";
import GameCard from "../../components/GameCard/GameCard.jsx";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/GameContext.jsx";
export default function SelectGame() { 
  const {createNewGame , getGames} = useGameContext();
  const { result, loading, error, fetchData } = useApi();
  const [personalGames, setPersonalGames] = useState([]);
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);
  const [otherStat, setOtherStat] = useState({
    partiesPlayed: 0,
    playersPlayed: 0,
    activPlayers: 0,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
     const resultGames = await  getGames()
      const finalOBject = {
        partiesPlayed: 0,
        playersPlayed: 0,
        activPlayers: 0,
      };
      if (!resultGames) {
        navigate("/login");
      }
      if (resultGames && Array.isArray(resultGames)) {
        for (let game of resultGames) {
          finalOBject.partiesPlayed += game.gameCount;
          finalOBject.playersPlayed += game.playerCount;
        }
        setOtherStat(finalOBject);
        setPersonalGames(resultGames);
      }
    }

  
      getData();
    
  }, []);

  async function newGame() {
    setIsNewGameLoading(true); 
    const resultGames = await createNewGame();
    if (resultGames) {
      navigate("/game/dashboard/" + resultGames.id);
    }else{}
  }
 
  // return <Loader></Loader>

  if (error) return <p>Erreur : {error}</p>;
  if (isNewGameLoading) return <Loader />;
  return (
    <div className="selectGamePage">
      <div className="headerSection">
        <img src="/src/assets/CARDStudioLogo.svg" alt="logo" className="logo" />
        <h1>{t("selectGameTitle")}</h1>
        <p>{t("selectGameSubtitle")} </p>
      </div>
      <div className="formSection">
        <SearchBar className="searchBar" placeholder="searchGame" />
        <Button
          text="Créer un nouveau jeu"
          action={newGame}
          type="violetButton"
          icon="new-white"
        ></Button>
      </div>
      <div className="statSection">
        <StatElement
          text={"statCreatedGames"}
          icon={"game-container"}
          number={personalGames.length}
        />
        <StatElement
          text={"statActivePlayers"}
          icon={"game-play"}
          number={otherStat.activPlayers}
        />
        <StatElement
          text={"playerWichHasPlayed"}
          icon={"game-players"}
          number={otherStat.playersPlayed}
        />
        <StatElement
          text={"statGamesPlayed"}
          icon={"game-stats"}
          number={otherStat.averageNotes}
        />
      </div>
      <div className="gamesWrapper">
        {loading && <Loader></Loader>}{" "}
        {personalGames &&
          personalGames.map((game, index) => <GameCard key={index} game={game} />)}
      </div>
    </div>
  );
}
