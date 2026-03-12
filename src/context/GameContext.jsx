import { useNotificationContext } from "./NotificationContext";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useTokenContext } from "./TokenContext";
import { useApi } from "../../src/hooks/useApi";
import { useTranslation } from "react-i18next";
const GameContext = createContext();

export function GameProvider({ children }) {
  const { result, fetchData } = useApi();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentDemon, setCurrentDemon] = useState(null);
  const [currentWithValueEvent, setCurrentWithValueEvent] = useState(null);
  const [currentSubpageOfEvents, setCurrentSubpageOfEvents] = useState(null);
  const { getToken } = useTokenContext();
  const { displayError } = useNotificationContext();
  const { t } = useTranslation();

  const deleteGameSaved = (id) => {
    localStorage.removeItem("gamesSaved" + id);
  };
  const saveNewGameInStorage = (newGame) => {
    console.log("save game in storage");
    localStorage.setItem("gamesSaved" + newGame.id, JSON.stringify(newGame));
  };
  const getGameInStorage = (id) => {
    console.log("get game in storage");
    console.log(id);
    try {
      let raw = localStorage.getItem("gamesSaved" + id);

      if (!raw) return null;
      raw = JSON.parse(raw);
      console.log(raw);
      return raw;
    } catch (e) {
      console.error("Failed to parse gamesSaved from localStorage", e);
      return null;
    }
  };
  const getGames = async () => {
    const resultGames = await fetchData("api/my/games", null, {
      token: getToken(),
    });
    if (!resultGames) {
      displayError(t("FailedToRetrieveGames"));
    }
    return resultGames;
  };

  const createNewGame = async () => {
    const resultGame = await fetchData("api/new/game", null, {
      token: getToken(),
    });
    if (!resultGame) {
      displayError(t("FailedToCreateGame"));
    }
    return resultGame;
  };
  const uploadFileForGameEdition = async (file, gameId) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/game/upload-image/" + gameId,
      null,
      {
        token: getToken(),
        methode: "POST",
      },
      formData,
    );
    if (!result) {
      displayError(t("FailedToUploadImage"));
    }
    return result;
  };

  const pushModification = async (game) => {
    console.log("Send request to save :");

    let newObj = JSON.parse(JSON.stringify(game));
    console.log(newObj);
    newObj.EventDemons = newObj.events.demons;

    delete newObj.events.demons;

    newObj.EventEvents = newObj.events.events;
    delete newObj.events.events;

    newObj.EventWithValueEvents = newObj.events.withValueEvent;
    delete newObj.events.withValueEvent;

    delete newObj.events;

    newObj.assetsCard = newObj.assets.cards;
    delete newObj.assets.cards;

    newObj.assetsGain = newObj.assets.gains;
    delete newObj.assets.gains;

    newObj.roles = newObj.assets.roles;
    delete newObj.assets.roles;
    delete newObj.assets;
    const result = await fetchData("api/game/edit/" + newObj.id, newObj, {
      token: getToken(),
    });
    if (!result) {
      displayError(t("FailedToUpdateGame"));
    } else {
      deleteGameSaved(newObj.id);
    }
  };
  const deleteGame = async () => {
    const result = await fetchData("api/game/remove/" + game.id, null, {
      token: getToken(),
      methode: "DELETE",
    });
    if (!result) {
      displayError(t("FailedToDeleteGame"));
    }
    return result;
  };
  const getGame = async (id) => {
    console.log("fetch game");
    const resultGames = await fetchData("api/game/" + id, null, {
      token: getToken(),
    });
    if (!resultGames) {
      displayError(t("FailedToRetrieveGame"));
    }
    return resultGames;
  };

  return (
    <GameContext.Provider
      value={{
        getGame,
        deleteGameSaved,
        createNewGame,
        deleteGame,
        saveNewGameInStorage,
        currentSubpageOfEvents,
        setCurrentWithValueEvent,
        getGameInStorage,
        setCurrentSubpageOfEvents,
        currentWithValueEvent,
        currentDemon,
        currentEvent,
        setCurrentDemon,
        setCurrentEvent,
        getGames,
        pushModification,
        uploadFileForGameEdition,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export function useGameContext() {
  return useContext(GameContext);
}
