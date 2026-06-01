import "./App.css";
import { GameProvider } from "./context/GameContext.jsx";
import { DeckProvider } from "./context/DeckContext.jsx";
import { HistoryProvider } from "./context/HistoryContext.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import LoginAndRegisterPage from "./pages/Forms/LoginAndRegister.jsx";
import Header from "./components/Header/Header";
import SelectGame from "./pages/SelectGame/SelectGame.jsx";
import GameCreationEnvironnement from "./pages/GameCreationEnvironnement/GameCreationEnvironnement.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import DeckCreation from "./pages/DeckCreationEnvironnement/DeckCreation.jsx";
import Account from "./pages/Account/Account.jsx";
import SettingsAndHelp from "./pages/GameCreationEnvironnement/subpages/HelpAndSettings/HelpAndSettings.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <NotificationProvider>
          <TokenProvider>
            <UserProvider>
              <HistoryProvider>
              <GameProvider>
              <DeckProvider>
                <Header></Header>
                <Routes>
                  <Route path={"login"} element={<LoginAndRegisterPage />} />

                  <Route
                    path={"game/:subpage/:id"}
                    element={<GameCreationEnvironnement />}
                  />   <Route
                    path={"deck/:id"}
                    element={<DeckCreation />}
                  />
                  <Route
                    path={"game/"}
                    element={<GameCreationEnvironnement />}
                  />
                  <Route
                    path={"account"}
                    element={<Account />}
                  />
                  <Route path={"/"} element={<SelectGame />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DeckProvider>
              </GameProvider>
              </HistoryProvider>
            </UserProvider>
          </TokenProvider>
        </NotificationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
