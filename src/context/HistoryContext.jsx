import {
  act,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { getElementWithPath } from "../helpers/objectManagement.js";
import { useTranslation } from "react-i18next";
const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const { t } = useTranslation();
  const addItem = (id, item) => {
    console.log(item);
    let history = getHistory(id) || [];

    if (
      item.field &&
      item.type == "gameElement" &&
      item.action === "edit" &&
      !history.some(
        (e) =>
          e.action === item.action &&
          e.field === item.field &&
          item.type === e.type,
      )
    ) {
      history.push(item);
    }

    // pour les events et les demons, on regarde si il y a deja une
    // action pour cet id dans la liste, si oui on ne l'ajoute pas
    // (pour éviter les doublons), sauf si c'est une action de
    // suppression, auquel cas on supprime les actions d'ajout
    // ou de modification pour cet id
    if (
      item.id !== null &&
      item.id !== undefined &&
      !history.some(
        (e) =>
          e.action === item.action && e.id === item.id && item.type === e.type,
      )
    ) {
      history.push(item);
      if (item.action === "delete") {
        // si il a été ajouté dans cette session, on le supprime de la liste au lieu d'ajouter une action de suppression
        if (history.some((e) => e.id === item.id && e.action === "add")) {
          history = history.filter(
            (e) =>
              !(
                e.id === item.id &&
                (e.action === "add" ||
                  e.action === "edit" ||
                  e.action === "delete")
              ),
          );
        } else {
          // si il existait deja
          history = history.filter(
            (e) =>
              e.action !== "edit" && e.id === item.id && e.type === item.type,
          );
        }
      }
    }
    storeHistrory(id, history);
  };
  const isInHistory = (item) => { 
    let history = getHistory(item.gameId) || [];
    
    let result = history.some(
      (e) =>
        e.action == item.action && item.type == e.type && item.id == e.id,
    ); 
    return result;
  };
  const deleteItemHistoryRelatedTo = (item) => {
 
      let history = getHistory(item.gameId) || [];
 
    storeHistrory(item.gameId, history.filter(
      (e) =>
        !(e.type == item.type && e.id == item.id),
    )); 
  };

  const getHistory = (id) => {
    const localHistory = localStorage.getItem("gameHistory" + id);
    if (localHistory) {
      return JSON.parse(localHistory);
    }
    return [];
  };
  const storeHistrory = (id, history) => {
    localStorage.setItem("gameHistory" + id, JSON.stringify(history));
  };
  const deleteLocalHistory = (id) => {
    localStorage.removeItem("gameHistory" + id);
  };
  const getDetailledHistory = (game, currentGame) => {
    // Si valeur est la meme ne rien affiché
    const detailedHistory = [];
    if (!game) return [];
    const history = getHistory(game.id);
    return history.map((item) => {
      console.log(item);
      if (item.action === "edit" && item.field == "name") {
        return {
          name: t("changeNameOFGame"),
          oldValue: game.name,
          newValue: currentGame.name,
          action: item.action,
          type: item.type,
        };
      }
      if (item.field) {
        let previous = getElementWithPath(item.field, game);
        let current = getElementWithPath(item.field, currentGame);
        if (previous == current) return null;
        return {
          name: t("editionLogChangeMetaData") + " : " + t(item.field),
          oldValue: previous,
          newValue: current,
          action: item.action,
          type: item.type,
          field: item.field,
        };
      }
      if (
        item.id != "undefined" &&
        item.id != null &&
        (item.type != "globalValue" ||
          item.type != "globalValueStatic" ||
          item.type != "playerGlobalValue")
      ) {
        return {
          name:
            t(
              (item.action == "edit"
                ? "editionLogChange"
                : item.action == "delete"
                  ? "editionLogDeletion"
                  : "editionLogAdd") + item.type,
            ) +
            " : " +
            (
              getElementWithPath("events." + item.type, currentGame, item.id) ||
              getElementWithPath("events." + item.type, game, item.id)
            )?.name,
          oldValue: getElementWithPath("events." + item.type, game, item.id),
          newValue: getElementWithPath(
            "events." + item.type,
            currentGame,
            item.id,
          ),
          action: item.action,
          type: item.type,
        };
      }
      if (
        item.type == "globalValue" ||
        item.type == "globalValueStatic" ||
        item.type == "playerGlobalValue"
      ) {
        return {
          name:
            t("editionLogChangeWithValueEvents") +
            " : " +
            getElementWithPath(item.type, currentGame)?.find(
              (e) => e.id == item.id,
            )?.name,
          oldValue: getElementWithPath(item.type, game)?.find(
            (e) => e.id == item.id,
          ),
          newValue: getElementWithPath(item.type, currentGame)?.find(
            (e) => e.id == item.id,
          ),
          action: item.action,
          type: item.type,
        };
      }
      return {
        name: item.type,
        oldValue: null,
        newValue: null,
        action: item.action,
        type: item.type,
      };
    });
  };

  const getDetailledTextHistory = (id) => {
    // Si valeur est la meme ne rien affiché

    const history = getHistory(id);
    return history.map((item) => {});
  };
  return (
    <HistoryContext.Provider
      value={{
        addItem,
        getHistory,
        isInHistory,
        storeHistrory,
        deleteLocalHistory,deleteItemHistoryRelatedTo,
        getDetailledHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
export function useHistoryContext() {
  return useContext(HistoryContext);
}
