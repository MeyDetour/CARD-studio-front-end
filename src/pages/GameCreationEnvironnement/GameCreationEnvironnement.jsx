import "./style.css";
import "../../../public/assets/text.css";

// External libraries
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// hooks
import { useDynamicEntitySuggestions } from "../../hooks/useDynamicSuggestions.js";

// Contexts
import { useUserContext } from "../../context/UserContext.jsx";
import { useGameContext } from "../../context/GameContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useHistoryContext } from "../../context/HistoryContext";

// Helpers
import { loadAlertListFormGame } from "../../helpers/alertOfGame";
import {
  updateElementValue,
  updateValueArray,
} from "../../helpers/objectManagement";
import { listenToCardStudioTester } from "../../helpers/browserMessageWithCardStudioTester.js";
import { applyDefaultGameSettings } from "../../helpers/game.js";

// Components
import Loader from "../../components/Loader/Loader";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import GameCreationEnvironnementNavigation from "../../components/GameCreationEnvironnementNavigation/GameCreationEnvironnementNavigation";
import LoadingRestorGame from "../../components/LoadingRestorGame/LoadingRestorGame.jsx";

// Subpages
import AssetsBookshelf from "./subpages/AssetsBookshelf/AssetsBookshelf";
import CardManagement from "./subpages/CarManagement/CardManagement.jsx";
import Dashboard from "./subpages/Dashboard/Dashboard";
import DisplayPage from "./subpages/Display/Display";
import EditGame from "./subpages/EditGame/EditGame";
import Logic from "./subpages/Logic/Logic.jsx";
import HelpAndSettings from "./subpages/HelpAndSettings/HelpAndSettings";
import RoundsPage from "./subpages/RoundsAndManches/Rounds";
import VisualisationPage from "./subpages/Visualisation/Visualisation";
import ActivityLog from "./subpages/ActivityLog/ActivityLog";
import Gains from "./subpages/Gains/Gains.jsx";
import Outils from "./subpages/Outils/Outils.jsx";
import ExpressionEditor from "./subpages/ExpressionEditor/ExpressionEditor.jsx";
import ExpressionDocumentation from "./subpages/Documentation/ParserDocumentation/ExpressionDocumentation.jsx";
import Roles from "./subpages/Roles/Roles.jsx";

// Hooks
import { useApi } from "../../hooks/useApi";
import i18next from "i18next";
export default function GameCreationEnvironnement() {
  const navigate = useNavigate();
  const { subpage, id } = useParams();
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const { result, loading, error, fetchData } = useApi();
  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  const {
    saveNewGameInStorage,
    pushModification,
    deleteGameSaved,
    getGameInStorage,
    getGame,
    uploadFileForGameEdition,
    currentEvent,
    currentTrigger,
    currentWithValueEvent,
    setCurrentEvent,
    getCards,
    setCurrentWithValueEvent,
    setCurrentTrigger,
  } = useGameContext();
  const { deleteLocalHistory } = useHistoryContext();
  const { fetchUser, editUser } = useUserContext();

  const [gameImageUploadedUrl, setGameImageUploadedUrl] = useState();
  const { t } = useTranslation();
  const { setAlerts, alertList, canDisplayError, setCanDisplayError } =
    useNotificationContext();
  const [restaurationLoading, setRestaurationLoading] = useState(false);

  useEffect(() => {
    const initGame = async () => {
      const stored = getGameInStorage(id);

      if (stored && String(stored.id) === String(id)) {
        if (stored && stored.id == id) {
          setGame(stored);
          setAlerts(loadAlertListFormGame(stored, canDisplayError));
        }
      } else {
        const result = await getGame(id);
        if (result) {
          setAlerts(loadAlertListFormGame(result, canDisplayError));
          setGame(result);

          deleteLocalHistory(id);
          setCurrentEvent(null);
          setCurrentTrigger(null);
          setCurrentWithValueEvent(null);
          setCanDisplayError(result.displayErrors);
        }
      }
    };
    const initUser = async () => {
      const res = await fetchUser();
      if (res) {
        setUser(res);
        i18next.changeLanguage(res.lang);
        setCanDisplayError(res.displayErrors);
      }
    };

    if (id && !game) {
      initGame();
    }
    if (!user) {
      initUser();
    }
  }, []);

  if (false) {
    console.log("game :", game);
    console.log("user :", user);
  }

  // =========== SUGGESTION DYNAMIQUE FOR ALL APP ============

  let suggestions = useDynamicEntitySuggestions(
    game?.globalValue,
    game?.playerGlobalValue,
    game?.assets?.gains,
  );
  // =========== DETECTION DE MODIFICATION ET SAUVEGARDE AUTOMATIQUE============
  useEffect(() => {
    if (!game || !playerHasEdit) return;
    const delayDebounceFn = setTimeout(() => {
      console.log("Sauvegarde automatique dans le stockage local...");

      saveNewGameInStorage(game);
      setAlerts(loadAlertListFormGame(game, canDisplayError));
      setPlayerHasEdit(false);
    }, 2000);

    setAlerts(loadAlertListFormGame(game, canDisplayError));
    return () => clearTimeout(delayDebounceFn);
  }, [game, playerHasEdit]);

  // ============ GESTION DES ERREURS
  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error}</p>;
  if (!game) return <Loader />;
  if (!user) return <Loader />;

  // =========== UPDATE GAME OBJECT ============
  const updateGameValueHandler = (path, value, type) => {
    setGame((prev) => updateElementValue(path, prev, value, type));
    setPlayerHasEdit(true);
  };

  const updateGameValueArrayHandler = (path, value, type = "multiple") => {
    setGame((prev) => updateValueArray(path, prev, value, type));
    setPlayerHasEdit(true);
  };

  // =========== GAME SAVES ============
  const saveGame = async () => {
    let newGame = await pushModification(game);
    setGame(newGame);
  };
  const restoreGameFromDb = async () => {
    const result = await getGame(id);
    if (result) {
      setGame(result);
      setRestaurationLoading(true);
      setTimeout(() => {
        setRestaurationLoading(false);
        window.location.href = "/game/dashboard/" + result.id;
      }, 3000);
      setPlayerHasEdit(true);
      setAlerts(loadAlertListFormGame(result, canDisplayError));
      setCanDisplayError(result.displayErrors);
      deleteGameSaved(id);
    }
  };

  // ======= CARD STUDIO ==========
  const getCardsFromDb = async () => {
    const result = await getCards(id);
    if (result) {
      setGame((prev) => ({
        ...prev,
        assets: { ...prev.assets, cards: result },
      }));
    }
  };

  // =========== EVENTS ===========
  const getEventFromIdAndType = (id, type) => {
    if (!game || !game.events) return null;
    switch (type) {
      case "event":
        return game.events.events.find((event) => event.id === id);
      case "trigger":
        return game.events.triggers.find((trigger) => trigger.id === id);
      case "withValueEvent":
        return game.events.withValueEvent.find(
          (withValueEvent) => withValueEvent.id === id,
        );
      case "globalValue":
        return game.events.globalValue[id];

      default:
        return null;
    }
  };
  // =========== UPDLOAD IMAGE GAME OBJECT ============
  const uploadFileForGameEditionHandler = (file) => {
    uploadFileForGameEdition(file, game.id);
  };
  const editUserHandler = async (userEdited) => {
    const result = await editUser(userEdited);

    if (result && result.message === "ok") {
      i18next.changeLanguage(userEdited.lang);
      setUser((prev) => ({ ...prev, ...userEdited }));
    }
  };
  // ============ CARD STUDIO TESTER COMMUNICATION ============
  // declare globally if card studio is refreshed
  listenToCardStudioTester(navigate);

  // ============ CARD STUDIO TESTER COMMUNICATION ============
  // declare globally if card studio is refreshed
  const restoreDefaultParamsGame = () => { 
    const game2 = applyDefaultGameSettings(game); 
    setGame(game2);
      saveNewGameInStorage(game2);
       setRestaurationLoading(true);
      setTimeout(() => {
        setRestaurationLoading(false);
        window.location.href = "/game/dashboard/" + game2.id;
      }, 3000);
  };

  // ====================================================
  if (restaurationLoading) {
    return <LoadingRestorGame />;
  }
  console.log(game);
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
                    description: game.description,
                    id: game.id,
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
                    soloMode:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.soloMode
                        : false,
                    playersCanJoin:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.playersCanJoin
                        : false,
                    allowSpectator:
                      game.params && game.params.globalGame
                        ? game.params.globalGame.allowSpectator
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
                        : "./assets/images/template-game.png",
                    isPublic: game.isPublic,
                  }}
                  uploadFileForGameEditionHandler={
                    uploadFileForGameEditionHandler
                  }
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                  restoreGameFromDb={restoreGameFromDb}
                  restoreDefaultParamsGame={restoreDefaultParamsGame}
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
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "displays":
              return (
                <DisplayPage
                  gameData={{
                    id: game.id,
                    params: game.params,
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
                    gameId: game.id,
                    tours: game.params.tours,
                    actions:
                      game.params.tours && game.params.tours.actions
                        ? game.params.tours.actions.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    manches: game.params.manches,
                    globalGame: game.params.globalGame,
                    withValueEvents: game.events.withValueEvent,
                    events:
                      game.events && game.events.events
                        ? game.events.events
                        : [],
                    cardParams: game.params.cards ? game.params.cards : {},
                  }}
                  suggestions={suggestions}
                  getEventFromIdAndType={getEventFromIdAndType}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                />
              );
            case "visualisation":
              return (
                <VisualisationPage
                  gameData={{
                    events:
                      game.events && game.events.events
                        ? game.events.events.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    triggers:
                      game.events && game.events.triggers
                        ? game.events.triggers.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    withValueEvents:
                      game.events && game.events.withValueEvent
                        ? game.events.withValueEvent.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    actions:
                      game.params.tours && game.params.tours.actions
                        ? game.params.tours.actions.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],

                    globalValue: game.globalValue,
                    playerGlobalValue: game.playerGlobalValue,
                    globalValueStatic: game.globalValueStatic ?? {},
                  }}
                  getEventFromIdAndType={getEventFromIdAndType}
                />
              );
            case "logic":
              return (
                <Logic
                  gameData={{
                    id: game.id,
                    winParams: game.events.win,
                    suggestions: suggestions,
                    actions: game.params.tours && game.params.tours.actions,

                    events:
                      game.events && game.events.events
                        ? game.events.events.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    triggers:
                      game.events && game.events.triggers
                        ? game.events.triggers.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    gains:
                      game.assets && game.assets.gains
                        ? game.assets.gains.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    withValueEvents:
                      game.events && game.events.withValueEvent
                        ? game.events.withValueEvent.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    actions:
                      game.params.tours && game.params.tours.actions
                        ? game.params.tours.actions.sort((a, b) => {
                            return Number(a.id) - Number(b.id);
                          })
                        : [],
                    globalValue: game.globalValue,
                    playerGlobalValue: game.playerGlobalValue,
                    globalValueStatic: game.globalValueStatic ?? {},
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                  getEventFromIdAndType={getEventFromIdAndType}
                />
              );
            case "cards":
              return (
                <CardManagement
                  gameData={{
                    actions: game.params.tours.actions,
                    rendering: game.params.rendering,
                    params: game.params,
                    cards: game.assets.cards,
                    id: game.id,
                    cardParams: game.params.cards ? game.params.cards : {},
                  }}
                  getCardsFromDb={getCardsFromDb}
                  updateGameValueArray={updateGameValueArrayHandler}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploadedUrl={setGameImageUploadedUrl} 
                />
              );
            case "prizes":
              return (
                <Gains
                  gameData={{
                    gains: game.assets.gains,

                    id: game.id,
                    cardParams: game.params.gains ? game.params.gains : {},
                  }}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "help-and-settings":
              return (
                <HelpAndSettings
                  gameData={{}}
                  user={user}
                  editUserHandler={editUserHandler}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                />
              );
            case "activity-log":
              return (
                <ActivityLog
                  game={game}
                  user={user}
                  editUcardsCountserHandler={editUserHandler}
                  updateGameValue={updateGameValueHandler}
                  updateGameValueArray={updateGameValueArrayHandler}
                />
              );
            case "tools":
              return (
                <Outils
                  gameData={{
                    id: game.id,
                    suggestions: suggestions,
                  }}
                />
              );
            case "roles":
              return (
                <Roles
                  gameData={{ 
                    roles: game.assets.roles,
                  }}
                />
              );
            case "expressionEditor":
              return (
                <ExpressionEditor
                  gameData={{
                    suggestions: suggestions,
                    playerGlobalValue: game.playerGlobalValue,
                  }}
                />
              );
            case "expression-documentation":
              return <ExpressionDocumentation gameData={{}} />;
            default:
              return (
                <Dashboard
                  gameData={{
                    id: game.id,
                    cardsCount:
                      game.assets && game.assets.cards
                        ? Object.keys(game.assets.cards).length
                        : [],
                    triggersCount:
                      game.events && game.events.triggers
                        ? game.events.triggers.length
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
