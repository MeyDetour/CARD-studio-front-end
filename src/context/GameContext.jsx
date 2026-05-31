import { useNotificationContext } from "./NotificationContext";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useTokenContext } from "./TokenContext";
import { useApi } from "../../src/hooks/useApi";
import { useTranslation } from "react-i18next";
import { useHistoryContext } from "./HistoryContext";
const GameContext = createContext();

export function GameProvider({ children }) {
  const { result, fetchData } = useApi();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentTrigger, setCurrentTrigger] = useState(null);
  const [currentWithValueEvent, setCurrentWithValueEvent] = useState(null);
  const [currentSubpageOfEvents, setCurrentSubpageOfEvents] = useState(null);
  const { getToken } = useTokenContext();
  const { displayError } = useNotificationContext();
  const {deleteLocalHistory, storeHistrory} = useHistoryContext()
  const { t } = useTranslation();

  const deleteGameSaved = (id) => {
    deleteLocalHistory(id);
    localStorage.removeItem("gamesSaved" + id);
  };  const deleteDeckSaved = (id) => { 
    localStorage.removeItem("decksSaved" + id);
  };
  const saveNewGameInStorage = (newGame) => {  
    localStorage.setItem("gamesSaved" + newGame.id, JSON.stringify(newGame));
  }; 
   const saveNewDeckInStorage = (newDeck) => {  
    localStorage.setItem("decksSaved" + newDeck.id, JSON.stringify(newDeck));
  };
  const getGameInStorage = (id) => {  
    try {
      let row = localStorage.getItem("gamesSaved" + id);

      if (!row) return null;
      row = JSON.parse(row); 
      return row;
    } catch (e) {
      console.error("Failed to parse gamesSaved from localStorage", e);
      return null;
    }
  }; const getDeckInStorage = (id) => {  
    try {
      let row = localStorage.getItem("decksSaved" + id);

      if (!row) return null;
      row = JSON.parse(row); 
      return row;
    } catch (e) {
      console.error("Failed to parse decksSaved from localStorage", e);
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
  const getDecks = async () => {
    const resultDecks = await fetchData("api/my/decks", null, {
      token: getToken(),
    });
    if (!resultDecks) {
      displayError(t("FailedToRetrieveDecks"));
    }
    return resultDecks;
  };  const getDecksPublic = async () => {
    const resultDecks = await fetchData("api/get/public/decks", null, {
      token: getToken(),
    });
    if (!resultDecks) {
      displayError(t("FailedToRetrieveDecks"));
    }
    return resultDecks;
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
  const createNewDeck = async () => {
    const resultDeck = await fetchData("api/new/deck", null, {
      token: getToken(),
    });
    if (!resultDeck) {
      displayError(t("FailedToCreateDeck"));
    }
    return resultDeck;
  };
  const uploadFileForGameEdition = async (file, gameId) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/game/upload-image/" + gameId,
      null,
      {
        token: getToken(),
        method: "POST",
      },
      formData,
    );
    if (!result) {
      displayError(t("FailedToUploadImage"));
    }
    return result;
  };

  const pushModification = async (game) => { 

    let newObj = JSON.parse(JSON.stringify(game)); 
    newObj.EventTriggers = newObj.events.triggers;

    delete newObj.events.triggers;

    newObj.EventEvents = newObj.events.events;
    delete newObj.events.events;

    newObj.EventWithValueEvents = newObj.events.withValueEvent;
    delete newObj.events.withValueEvent;

    newObj.EventWin = newObj.events?.win;
    delete newObj.events?.win;

    newObj.EventLoose = newObj.events?.loose;
    delete newObj.events?.loose;

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
      deleteLocalHistory(newObj.id);
    }
    return game
  };
  const pushDeckModification = async (deck) => { 
 
    const result = await fetchData("api/deck/edit/" + deck.id, deck, {
      token: getToken(),
    });
    if (!result) {
      displayError(t("FailedToUpdateDeck"));
    } {
      deleteDeckSaved(deck.id); 
    }
    return deck
  };
  const pushCardModification = async (gameId,card) => { 
 
    const result = await fetchData("api/game/"+gameId+"/edit/card/" + card.id, card, {
      token: getToken(),
    });
    if (!result) {
      displayError(t("FailedToUpdateGame"));
    } else { 
      // TODO
    }
    return result
  };  const pushGainModification = async (gameId,gain) => { 
 
    const result = await fetchData("api/game/"+gameId+"/edit/gain/" + gain.id, gain, {
      token: getToken(),
    });
    if (!result) {
      displayError(t("FailedToUpdateGame"));
    } else { 
      // TODO
    }
    return result
  };
   const restoreCards = async (gameId) => { 
 
    const result = await fetchData(`api/game/${gameId}/restore/cards`, null, {
      token: getToken(),
      method: "PUT",
    });
    if (!result) {
      displayError(t("FailedToUpdateGame"));
    } else { 
      // TODO
    }
    return result
  };const restoreCardsDeck = async (deckId) => { 
 
    const result = await fetchData(`api/deck/${deckId}/restore/cards`, null, {
      token: getToken(),
      method: "PUT",
    });
    if (!result) {
      displayError(t("FailedToUpdateDeck"));
    } else { 
      // TODO
    }
    return result
  };
  const getCards = async (gameId) => { 
 
    const result = await fetchData(`api/game/${gameId}/get/cards`, null, {
      token: getToken(),
      method: "GET",
    });
    if (!result) {
      displayError(t("FailedToUpdateGame"));
    } else { 
      
    }
    return result
  };
  const deleteGame = async (id) => {
    const result = await fetchData("api/game/remove/" + id, null, {
      token: getToken(),
      method: "DELETE",
    });
    deleteLocalHistory(id);
    deleteGameSaved(id);
    if (!result) {
      displayError(t("FailedToDeleteGame"));
    }
    return result;
  };const deleteDeck = async (id) => {
    const result = await fetchData("api/deck/remove/" + id, null, {
      token: getToken(),
      method: "DELETE",
    });
    deleteDeckSaved(id);
    if (!result) {
      displayError(t("FailedToDeleteDeck"));
    }
    return result;
  };
  const getGame = async (id) => { 
    const resultGames = await fetchData("api/game/" + id, null, {
      token: getToken(),
    });
    if (!resultGames) {
      displayError(t("FailedToRetrieveGame"));
    }
    return resultGames;
  };  const getDeck = async (id) => { 
    const resultDeck = await fetchData("api/deck/" + id, null, {
      token: getToken(),
    });
    if (!resultDeck) {
      displayError(t("FailedToRetrieveDeck"));
    }
    return resultDeck;
  };

  return (
    <GameContext.Provider
      value={{
        getGame,
        deleteGameSaved,
        deleteDeckSaved,
        createNewGame,
        deleteGame,deleteDeck,
        saveNewGameInStorage,saveNewDeckInStorage,
        currentSubpageOfEvents,
        setCurrentWithValueEvent,
        getGameInStorage,getDeckInStorage,
        setCurrentSubpageOfEvents,
        currentWithValueEvent,
        currentTrigger,
        getCards,
        currentEvent,
        setCurrentTrigger,
        setCurrentEvent,pushGainModification,
        getGames,createNewDeck,getDecks,getDeck,pushCardModification,
        pushModification,restoreCards,restoreCardsDeck,
        pushDeckModification,getDecksPublic,
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
