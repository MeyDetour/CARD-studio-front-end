import "./App.css";
import { GameProvider } from "./context/GameContext.jsx";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import LoginAndRegisterPage from "./pages/Forms/LoginAndRegister.jsx";
import Header from "./components/Header/Header";
import SelectGame from "./pages/SelectGame/SelectGame.jsx";
import GameCreationEnvironnement from "./pages/GameCreationEnvironnement/GameCreationEnvironnement.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import SettingsAndHelp from "./pages/GameCreationEnvironnement/subpages/HelpAndSettings/HelpAndSettings.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <NotificationProvider>
          <TokenProvider>
          <UserProvider>
            <GameProvider>
              <Header></Header>
              <Routes>
                <Route index element={<SelectGame />} />

                <Route path={"login"} element={<LoginAndRegisterPage />} />

                <Route
                  path={"game/:subpage/:id"}
                  element={<GameCreationEnvironnement />}
                />
                <Route
                  path={"game/"}
                  element={<GameCreationEnvironnement />}
                /><Route
                  path={"help-and-settings"}
                  element={<SettingsAndHelp />}
                />
              </Routes>
            </GameProvider>
          </UserProvider>
          </TokenProvider>
        </NotificationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
