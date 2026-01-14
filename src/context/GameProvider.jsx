import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [game, setGame] = useState(localStorage.getItem("gameInCreation"));  

    const resetNewGame = () => {
        localStorage.removeItem("gameInCreation")
    }
    const saveNewGameInStorage = (newGame) => {
        localStorage.setItem("gameInCreation", newGame);
        setGame(newGame);
    };  
  return (
    <GameContext.Provider value={{ game, resetNewGame ,saveNewGameInStorage }}>
      {children}
    </GameContext.Provider>
  );
}
export function useGameProvider() {
  return useContext(GameContext);
}
