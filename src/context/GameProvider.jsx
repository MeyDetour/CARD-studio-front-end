import {createContext, useContext, useState} from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
const [game, setGame] = useState(null);
    return <GameContext.Provider value={{game,setGame}}>{children}</GameContext.Provider>;

}
export function useGameProvider() {
    return useContext(GameContext);
}
