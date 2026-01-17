import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { useApi } from "../../src/hooks/useApi";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [game, setGame] = useState(localStorage.getItem("gameInCreation"));
  const { result, loading, error, fetchData } = useApi();
  const { token } = useUserContext();

  const resetNewGame = () => {
    localStorage.removeItem("gameInCreation");
  };
  const saveNewGameInStorage = (newGame) => {
    localStorage.setItem("gameInCreation", newGame);
    setGame(newGame);
  };
  const saveGameInDB = (newGame) => {};
  function updateGameObject() {}
  return (
    <GameContext.Provider
      value={{ game, resetNewGame, saveNewGameInStorage, saveGameInDB }}
    >
      {children}
    </GameContext.Provider>
  );
}
export function useGameContext() {
  return useContext(GameContext);
}
