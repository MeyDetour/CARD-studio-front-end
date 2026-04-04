import {
  act,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react"; 
import {  getElementWithPath } from "../helpers/objectManagement.js";
import { useTranslation } from "react-i18next"; 
const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const {t}= useTranslation(); 
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
      console.log("ELEMENT NON PR2SENT");
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
            (e) => e.action === "edit" && e.id === item.id,
          );
        }
      }
    }
    storeHistrory(id, history);
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
  const getDetailledHistory = (game,currentGame) => {
    // Si valeur est la meme ne rien affiché
    const detailedHistory = [];
    if (!game) return [];
    const history = getHistory(game.id);
    return history.map((item) => {
      console.log(item);
      if (item.action === "edit" && item.field == "name") {
      return {
          name: t("changeNameOFGame"),
          oldValue : game.name,
          newValue : currentGame.name,
          action: item.action,
          type: item.type,
        };
      }
      if(item.field){
        return {
          oldValue : getElementWithPath(item.field,game),
          newValue : getElementWithPath(item.field,currentGame),
          action: item.action,
          type: item.type,
        };
      }
      if (item.id != "undefined" && item.id != null && (item.type != "globalValue" || item.type != "globalValueStatic"  || item.type!="playerGlobalValue")) {

        return {
          name : t("editionLogChange"+item.type) + " : "+  getElementWithPath("events."+item.type,currentGame,item.id)?.name ,
          oldValue : getElementWithPath("events."+item.type,game,item.id),
          newValue : getElementWithPath("events."+item.type,currentGame,item.id),
          action: item.action,
          type: item.type,
        };
      }
      if(item.type == "globalValue" || item.type == "globalValueStatic"  || item.type=="playerGlobalValue"){
          return {
            name : t("editionLogChangeWithValueEvents") + " : " + getElementWithPath(item.type,currentGame)?.find((e) => e.id == item.id)?.name,
            oldValue : getElementWithPath(item.type,game)?.find((e) => e.id == item.id),
            newValue : getElementWithPath(item.type,currentGame)?.find((e) => e.id == item.id),
            action: item.action,
            type: item.type,
          };
      }
      return {
        name : item.type,
        oldValue : null,
        newValue : null,
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
      value={{ addItem, getHistory, storeHistrory, deleteLocalHistory, getDetailledHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
export function useHistoryContext() {
  return useContext(HistoryContext);
}
