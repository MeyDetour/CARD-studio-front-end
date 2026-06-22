// CSS
import "./style.css";

// External libraries
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../context/GameContext.jsx";
import { useNavigate } from "react-router";
import { useDeckContext } from "../../context/DeckContext.jsx";
// Hooks
import { useApi } from "../../hooks/useApi.js";

// Components
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import StatElement from "../../components/StatElement/StatElement.jsx";
import GameCard from "../../components/GameCard/GameCard.jsx";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar.jsx";
import DeckCard from "../../components/DeckCard/DeckCard.jsx";
import Icon from "../../components/Icon/Icon.jsx";

export default function SelectGame() {
  const { createNewGame, getGames } = useGameContext();
  const { createNewDeck, getDecks } = useDeckContext();

  const { result, loading, error, fetchData } = useApi();
  const [personalGames, setPersonalGames] = useState([]);
  const [personalDecks, setPersonalDecks] = useState([]);
  const [subPage, setSubPage] = useState("myGames");
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const resultGames = await getGames();
      const resultDeck = await getDecks();
      if (!resultGames || !resultDeck) {
        navigate("/login");
      }
      if (resultGames && Array.isArray(resultGames)) {
        setPersonalGames(resultGames);
      }
      if (resultDeck && Array.isArray(resultDeck)) {
        setPersonalDecks(resultDeck);
      }
    }

    getData();
  }, []);

  async function newGame() {
    setIsNewGameLoading(true);
    const resultGames = await createNewGame();
    if (resultGames) {
      navigate("/game/dashboard/" + resultGames.id);
    } else {
    }
  }
  async function newDeck() {
    setIsNewGameLoading(true);
    const resultDeck = await createNewDeck();
    if (resultDeck) {
      navigate("/deck/" + resultDeck.id);
    } else {
    }
  }

  // return <Loader></Loader>

  if (error) return <p>Erreur : {error}</p>;
  if (isNewGameLoading) return <Loader />;
  return (
    <div className="selectGamePage">
      <div className="settingsIcon" onClick={() => navigate("account")}>
        <Icon name="settings-white"></Icon>
      </div>
      <div className="headerSection">
        <img src="/./assets/CARDStudioLogo.svg" alt="logo" className="logo" />
        <h1>{t("selectGameTitle")}</h1>
        <p>{t("selectGameSubtitle")} </p>
      </div>
      <div className="formSection">
        <SearchBar className="searchBar" placeholder="searchGame" />
        <Button
          text="createAGame"
          action={newGame}
          type="violetButton"
          icon="new-white"
        ></Button>{" "}
        <Button
          text="createADeck"
          action={newDeck}
          type="grey"
          icon="new-white"
        ></Button>
      </div>
      <SubNavigationBar
        page={subPage}
        buttons={{
          myGames: () => setSubPage("myGames"),
          myDecks: () => setSubPage("myDecks"),
          account: () => navigate("account"),
        }}
      ></SubNavigationBar>

      <div className="gamesWrapper">
        {loading && <Loader></Loader>}
        {personalGames &&
          subPage == "myGames" &&
          personalGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        {personalDecks &&
          subPage == "myDecks" &&
          personalDecks.map((deck, index) => (
            <DeckCard key={index} deck={deck} />
          ))}
      </div>
    </div>
  );
}
