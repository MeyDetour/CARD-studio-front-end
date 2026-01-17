import "./App.css";
import { GameProvider } from "./context/GameContext.jsx";

import { BrowserRouter, Route, Router, Routes } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import LoginAndRegisterPage from "./pages/Forms/LoginAndRegister.jsx";
import Header from "./components/Header/Header";
import SelectGame from "./pages/SelectGame/SelectGame.jsx";
import GameCreationEnvironnement from "./pages/GameCreationEnvironnement/GameCreationEnvironnement.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <NotificationProvider>
            <UserProvider>
          <GameProvider>
              <Header></Header>
              <Routes>
                <Route index element={<SelectGame />} />

                <Route path={"login"} element={<LoginAndRegisterPage />} />
                <Route
                  path={"newGame/:subpage"}
                  element={<GameCreationEnvironnement />}
                />
              </Routes>
          </GameProvider>
            </UserProvider>
        </NotificationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
