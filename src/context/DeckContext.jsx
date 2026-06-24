import { useNotificationContext } from "./NotificationContext";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useTokenContext } from "./TokenContext";
import { useApi } from "../hooks/useApi";
import { useTranslation } from "react-i18next";
import { useHistoryContext } from "./HistoryContext";
const DeckContext = createContext();

export function DeckProvider({ children }) {
  const { result, fetchData } = useApi(); 
  const { getToken } = useTokenContext();
  const { displayError } = useNotificationContext(); 
  const { t } = useTranslation();
  const deleteDeckSaved = (id) => { 
    localStorage.removeItem("decksSaved" + id);
  };
 
   const saveNewDeckInStorage = (newDeck) => {  
    localStorage.setItem("decksSaved" + newDeck.id, JSON.stringify(newDeck));
  }; 
   const getDeckInStorage = (id) => {  
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
  const getDecks = async () => {
    const resultDecks = await fetchData("api/my/decks", null, {
      token: getToken(),
    });
    if (!resultDecks) {
      displayError(t("FailedToRetrieveDecks"));
    }
    return resultDecks;
  };
  const useDeckWithUniqueId = async (gameId, deckUniqueId) => {
    const result = await fetchData(`api/game/${gameId}/use/deck/`, {
    uniqueId: deckUniqueId,  
    }, {
      token: getToken(),
    });
    if (!result) {
      displayError(t("FailedToRetrieveDecks"));
    }
    return result;
  };
    const getDecksPublic = async () => {
    const resultDecks = await fetchData("api/get/public/decks", null, {
      token: getToken(),
    });
    if (!resultDecks) {
      displayError(t("FailedToRetrieveDecks"));
    }
    return resultDecks;
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
  const pushDeckModification = async (deck) => { 
 
    const result = await fetchData("api/deck/edit/" + deck.id, deck, {
      token: getToken(),
      method: "PUT",
    });
    if (!result) {
      displayError(t("FailedToUpdateDeck"));
    } {
      deleteDeckSaved(deck.id); 
    }
    return deck
  };
  const restoreCardsDeck = async (deckId) => { 
 
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
  };  const deleteDeck = async (id) => {
    const result = await fetchData("api/deck/remove/" + id, null, {
      token: getToken(),
      method: "DELETE",
    });
    deleteDeckSaved(id);
    if (!result) {
      displayError(t("FailedToDeleteDeck"));
    }
    return result; 
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
    <DeckContext.Provider
      value={{
        getDeck,
        deleteDeckSaved,
        createNewDeck,
        deleteDeck,
        saveNewDeckInStorage,
        getDeckInStorage,
          useDeckWithUniqueId,
        getDecks,
        getDecksPublic,
        pushDeckModification,
        restoreCardsDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}
export function useDeckContext() {
  return useContext(DeckContext);
}
  