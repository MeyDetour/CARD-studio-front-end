import "./style.css";
import "../../assets/text.css";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import GameCreationEnvironnementNavigation from "../../components/GameCreationEnvironnementNavigation/GameCreationEnvironnementNavigation";
import { useUserContext } from "../../context/UserContext";
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Dashboard from "../subpages/Dashboard/Dashboard";
import EditGame from "../subpages/EditGame/EditGame";
import { useApi } from "../../hooks/useApi";
import { useGameContext } from "../../context/GameContext";
import AssetsBookshelf from "../subpages/AssetsBookshelf/AssetsBookshelf";
import Events from "../subpages/Events/Events";
import CardManagement from "../subpages/CarManagement/CardManagement";
import DisplayPage from "../subpages/Display/Display";
import {
  updateElementValue,
  updateValueArray,
} from "../../helpers/objectManagement";
import RoundsPage from "../subpages/RoundsAndManches/Rounds";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import { loadAlertListFormGame } from "../../helpers/alertOfGame";
import { useNotificationContext } from "../../context/NotificationContext";



export default function GameCreationEnvironnement() {
  const navigate = useNavigate();
  const { subpage, id } = useParams();
  const [game, setGame] = useState(null);
  const { result, loading, error, fetchData } = useApi();
  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  const { saveNewGameInStorage, pushModification, getGameInStorage, getGame , uploadFileForGameEdition } =
    useGameContext();
  const [gameImageUploaded, setGameImageUploaded] = useState();
  const [gameImageUploadedUrl, setGameImageUploadedUrl] = useState();
  const { t } = useTranslation();
  const { setAlerts, alertList } = useNotificationContext();
  const page = "rounds";
  useEffect(() => {
    const initGame = async () => {
      console.log(id);
      console.log(game);
      const stored = getGameInStorage(id);

      if (stored && String(stored.id) === String(id)) {
        console.log("Jeu trouvé localement, mise à jour du state...");
        if (stored && stored.id == id) {
          console.log("set game");

          console.log(stored);
          setGame(stored);
          setAlerts(loadAlertListFormGame(stored));
        }
      } else {
        console.log("Rien en local, appel API pour l'id:", id);
        const result = await getGame(id);
        if (result) {
          setAlerts(loadAlertListFormGame(result));
          setGame(result);
        }
      }
    };

    if (id && !game) {
      initGame();
    } else {
    }
  }, [id, game]);

  console.log("game :", game);
  useEffect(() => {
    console.log(game, playerHasEdit);
    if (!game || !playerHasEdit) return;
    const delayDebounceFn = setTimeout(() => {
      console.log("Sauvegarde automatique sur le serveur...");
    
      saveNewGameInStorage(game);
      setPlayerHasEdit(false);
    }, 2000);

          setAlerts(loadAlertListFormGame(game));
    return () => clearTimeout(delayDebounceFn);
  }, [game, playerHasEdit]);

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error}</p>;
  if (!game) return <p>{t("GameNotFound")}</p>;

  const updateGameValueHandler = (path, value) => {
    setGame((prev) => updateElementValue(path, prev, value));
    setPlayerHasEdit(true);
  };

  const updateGameValueArrayHandler = (path, value, type = "multiple") => {
    setGame((prev) => updateValueArray(path, prev, value, type));
    setPlayerHasEdit(true);
  };

  const saveGame = () => {
    pushModification(game); 
  }

  const uploadFileForGameEditionHandler = (file) => { 
    uploadFileForGameEdition(file, game.id);
  }
  console.log(alertList);
  return (
    <div className={" gameCreationEnvironnementPage"}>
      <GameCreationEnvironnementHeader name={game.name} />
      <div className="content">
        <GameCreationEnvironnementNavigation
          id={id}
          playerHasEdit={playerHasEdit}
          game={game}
          currentPage={subpage}
          saveGame={saveGame}
        />
        {(() => {
          switch (subpage) {
            case "edit":
              return (
                <EditGame
                  gameData={{
                    name: game.name,
                    types:
                      game.type && Array.isArray(game.type)
                        ? game.type
                        : game.type
                          ? game.type.split(",")
                          : [],
                    minPlayer:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.minPlayer
                        : 0,
                    maxPlayer:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.maxPlayer
                        : 0,
                    jeuSolo:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.jeuSolo
                        : false,
                    playersCanJoin:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.playersCanJoin
                        : false,
                    autoriseSpectator:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.autoriseSpectator
                        : false,
                    roleActivation:
                      game.params && game.params.roles
                        ? game.params.roles.activation
                        : false,
                    gainActivation:
                      game.params && game.params.gains
                        ? game.params.gains.activation
                        : false,
                    tourActivation:
                      game.params && game.params.tours
                        ? game.params.tours.activation
                        : false,
                    image: gameImageUploadedUrl
                      ? gameImageUploadedUrl
                      : game.image
                        ? game.image
                        : "/src/assets/images/template-game.png",
                  }}
                  uploadFileForGameEditionHandler={uploadFileForGameEditionHandler}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploaded={setGameImageUploaded}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "assets":
              return (
                <AssetsBookshelf
                  gameData={{
                    cards: game.assets.cards,
                    gains: game.assets.gains,
                    roles: game.assets.roles,
                    colors: game.assets.colors,
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploaded={setGameImageUploaded}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "displays":
              return (
                <DisplayPage
                  gameData={{
                    rendering: game.params.rendering,
                    timerActivation: game.params.tours.timerActivation,
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                />
              );

            case "rounds":
              return (
                <RoundsPage
                  gameData={{
                    tours: game.params.tours,
                    manches: game.params.manches,
                    globalGame: game.params.globalGame,
                    withValueEvents: game.events.withValueEvent,    events: game.events && game.events.events ? game.events.events : [],
                
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                />
              );
            case "events":
              return (
                <Events
                  gameData={{
                    events:
                      game.events && game.events.events
                        ? game.events.events.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    demons:
                      game.events && game.events.demons
                        ? game.events.demons.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    gains:
                      game.events && game.events.gains ? game.assets.gains.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          }) : [],
                    withValueEvents:
                      game.events && game.events.withValueEvent
                        ? game.events.withValueEvent.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    globalValue: game.globalValue,
                    playerGlobalValue: game.playerGlobalValue,
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploaded={setGameImageUploaded}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "cards":
              return (
                <CardManagement
                  gameData={{
                    events:
                      game.events && game.events.events
                        ? game.events.events.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    demons:
                      game.events && game.events.demons
                        ? game.events.demons
                        : [],
                    gains:
                      game.assets && game.assets.gains ? game.assets.gains : [],
                    withValueEvents:
                      game.events && game.events.withValueEvent
                        ? game.events.withValueEvent.sort((a, b) =>
                            a.name.localeCompare(b.name),
                          )
                        : [],
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploaded={setGameImageUploaded}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            default:
              return (
                <Dashboard
                  gameData={{
                    id: game.id,
                    cardsCount:
                      game.assets && game.assets.cards
                        ? Object.keys(game.assets.cards).length
                        : [],
                    rolesCount:
                      game.assets && game.assets.roles
                        ? game.assets.roles.length
                        : 0,
                    gainsCount:
                      game.assets && game.assets.gains
                        ? game.assets.gains.length
                        : 0,
                    editionHistory: game.editionHistory,
                    notes: game.notes,
                  }}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}
