import { useNavigate } from "react-router";
import { useUserProvider } from "../../context/UserProvider.jsx";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import Button from "../../components/Button/Button.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import StatElement from "../../components/StatElement/StatElement.jsx";
import { useApi } from "../../hooks/useApi.js";
import { useTranslation } from "react-i18next";
export default function SelectGame() {
  let { token } = useUserProvider();
  const { result, loading, error, fetchData } = useApi();
  const [personalGames, setPersonalGames] = useState([]);
  const [otherStat, setOtherStat] = useState({
    partiesPlayed: 0,
    playersPlayed: 0,
    activPlayers: 0,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const resultGames = await fetchData("api/my/games", null, {
        token: token,
      });
      const finalOBject = {
        partiesPlayed: 0,
        playersPlayed: 0,
        activPlayers: 0,
      };
      if (resultGames && Array.isArray(resultGames)) {
        for (let game of resultGames) {
          finalOBject.partiesPlayed += game.gameCount;
          finalOBject.playersPlayed += game.playerCount;
        }
        setOtherStat(finalOBject);
        setPersonalGames(resultGames);
      }
    }

    if (token) {
      getData();
    } else {
      navigate("/login");
    }
  }, [token, fetchData]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="selectGamePage">
      <div className="headerSection">
        <h1>{t("selectGameTitle")}</h1>
        <p>{t(selectGameSubtitle)} </p>
      </div>
      <div className="formSection">
        <SearchBar className="searchBar" placeholder="searchGame" />
        <Button
          text="Créer un nouveau jeu"
          to="newGame/dashboard"
          type="violetButton"
          icon="new-white"
        ></Button>
      </div>
      <div className="statSection">
        <StatElement
          text={"statCreatedGames"}
          icon={"game-container"}
          number={personalGames.length}
        />{" "}
        <StatElement
          text={"statActivePlayers"}
          icon={"game-play"}
          number={otherStat.activPlayers}
        />
        <StatElement
          text={"statWhoAsPlayed"}
          icon={"game-players"}
          number={otherStat.playersPlayed}
        />
        <StatElement
          text={"statGamesPlayed"}
          icon={"game-stats"}
          number={otherStat.partiesPlayed}
        />
      </div>
      <div className="gamesWrapper"></div>
    </div>
  );
}
