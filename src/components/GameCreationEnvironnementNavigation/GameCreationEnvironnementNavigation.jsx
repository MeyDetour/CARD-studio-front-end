import "./style.css";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { useNotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router";
import { useGameContext } from "../../context/GameContext";
import Alert from "../Alert/Alert";
import { useTokenContext } from "../../context/TokenContext";
import { sendMessageToCardStudioTester } from "../../helpers/browserMessageWithCardStudioTester.js";

export default function GameCreationEnvironnementNavigation({
  saveGame,
  currentPage,
  game,
  id,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCurrentSubpageOfEvents, getGameInStorage } = useGameContext();
  const { alertList } = useNotificationContext();
  const { getToken } = useTokenContext();
  const [gameInStorage, setGameInStorage] = useState(getGameInStorage(id));
  useEffect(() => {
    setGameInStorage(getGameInStorage(id));
  }, [game, id, saveGame]);

  return (
    <nav className="gameCreationEnvironnementNavigationSideBar">
      <div className="sidebar-section">
        <ul>
          <li>
            <Button
              text={t("dashboard")}
              action={() => navigate("/game/dashboard/" + id)}
              type={currentPage == "dashboard" ? "navbar active" : "navbar"}
              icon={
                currentPage === "dashboard" ? "dashboard-white" : "dashboard"
              }
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType={"data"}></Alert>
            <Button
              text={t("gameEdition")}
              action={() => navigate("/game/edit/" + id)}
              type={currentPage == "edit" ? "navbar active" : "navbar"}
              icon={currentPage === "edit" ? "pen-white" : "pen"}
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType="assets"></Alert>
            <Button
              text={t("assetLibrary")}
              action={() => navigate("/game/assets/" + id)}
              type={currentPage == "assets" ? "navbar active" : "navbar"}
              icon={currentPage === "assets" ? "bookshelf-white" : "bookshelf"}
            />
          </li>
        </ul>
      </div>

      <div className="sidebar-separator"></div>

      <div className="sidebar-section">
        <h4 className="section-title">{t("elementManagement")}</h4>
        <ul>
          <li>
            <Alert alertList={alertList} displayAlertOfType="card"></Alert>
            <Button
              text={t("cardManagement")}
              action={() => navigate("/game/cards/" + id)}
              type={currentPage == "cards" ? "navbar active" : "navbar"}
              icon={currentPage === "cards" ? "layer-white" : "layer"}
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType="gains"></Alert>
            <Button
              clickable={
                game &&
                game.params &&
                game.params.gains &&
                game.params.gains.activation
              }
              text={t("prizesManagement")}
              action={() => navigate("/game/prizes/" + id)}
              type={
                currentPage == "prizes"
                  ? "navbar active"
                  : "navbar " +
                    (game &&
                    game.params &&
                    game.params.gains &&
                    game.params.gains.activation
                      ? ""
                      : "disabled")
              }
              icon={
                game &&
                game.params &&
                game.params.gains &&
                game.params.gains.activation
                  ? currentPage === "prizes"
                    ? "success-white"
                    : "success"
                  : "success-grey"
              }
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType="roles"></Alert>
            <Button
              clickable={
                game &&
                game.params &&
                game.params.roles &&
                game.params.roles.activation
              }
              text={t("roleCreation")}
              action={() => navigate("/game/roles/" + id)}
              type={
                currentPage == "roles"
                  ? "navbar active"
                  : "navbar " +
                    (game &&
                    game.params &&
                    game.params.roles &&
                    game.params.roles.activation
                      ? ""
                      : "disabled")
              }
              icon={
                game &&
                game.params &&
                game.params.roles &&
                game.params.roles.activation
                  ? currentPage === "roles"
                    ? "profile-settings-white"
                    : "profile-settings"
                  : "profile-settings-grey"
              }
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType="display"></Alert>
            <Button
              text={t("manageDisplays")}
              action={() => navigate("/game/displays/" + id)}
              type={currentPage == "displays" ? "navbar active" : "navbar"}
              icon={currentPage === "displays" ? "screen-white" : "screen"}
            />
          </li>
          <li>
            <Alert
              alertList={alertList}
              displayAlertOfType={"event|withValueEvent|demon"}
            ></Alert>
            <Button
              text={t("events")}
              action={() => {
                navigate("/game/events/" + id);
                setCurrentSubpageOfEvents(null);
              }}
              type={currentPage == "events" ? "navbar active" : "navbar"}
              icon={currentPage === "events" ? "energy-white" : "energy"}
            />
          </li>
        </ul>
      </div>

      <div className="sidebar-separator"></div>

      <div className="sidebar-section">
        <h4 className="section-title">{t("others")}</h4>
        <ul>
          <li>
            <Alert alertList={alertList}></Alert>
            <Button
              text={t("gameFlow")}
              action={() => navigate("/game/flow/" + id)}
              type={currentPage == "flow" ? "navbar active" : "navbar"}
              icon={currentPage === "flow" ? "play-white" : "play"}
            />
          </li>
          <li>
            <Alert alertList={alertList} displayAlertOfType={"action"}></Alert>
            <Button
              clickable={
                game &&
                game.params &&
                game.params.tours &&
                game.params.tours.activation
              }
              text={t("turnAndRoundManagement")}
              action={() => navigate("/game/rounds/" + id)}
              type={
                currentPage == "rounds"
                  ? "navbar active"
                  : "navbar " +
                    (game &&
                    game.params &&
                    game.params.tours &&
                    game.params.tours.activation
                      ? ""
                      : "disabled")
              }
              icon={
                game &&
                game.params &&
                game.params.tours &&
                game.params.tours.activation
                  ? currentPage === "rounds"
                    ? "rounds-white"
                    : "rounds"
                  : "rounds-grey"
              }
            />
          </li>
          <li>
            <Button
              text={t("visualisation")}
              action={() => {
                navigate("/game/visualisation/" + id);
                setCurrentSubpageOfEvents(null);
              }}
              type={currentPage == "visualisation" ? "navbar active" : "navbar"}
              icon={
                currentPage === "visualisation"
                  ? "visualisation-white"
                  : "visualisation"
              }
            />
          </li>
          <li>
            <Button
              text={t("activityLog")}
              action={() => {
                navigate("/game/activity-log/" + id);
                setCurrentSubpageOfEvents(null);
              }}
              type={currentPage == "activity-log" ? "navbar active" : "navbar"}
              icon={
                currentPage === "activity-log"
                  ? "activity-log-white"
                  : "activity-log"
              }
            />
          </li>
          <li>
            <Button
              text={t("tools")}
              action={() => {
                navigate("/game/tools/" + id);
                setCurrentSubpageOfEvents(null);
              }}
              type={currentPage == "tools" ? "navbar active" : "navbar"}
              icon={
                currentPage === "tools"
                  ? "tools-white"
                  : "tools"
              }
            />
          </li>
          <li>
            <Button
              text={t("helpAndSettings")}
              action={() => {
                navigate("/game/help-and-settings/" + id);
                setCurrentSubpageOfEvents(null);
              }}
              type={
                currentPage == "help-and-settings" ? "navbar active" : "navbar"
              }
              icon={currentPage === "help-and-settings" ? "help-white" : "help"}
            />
          </li>
        </ul>
      </div>

      <div className="buttonContainer">
        <Button
          icon="save"
          text="save"
          clickable={gameInStorage ? true : false}
          type={
            gameInStorage ? "whiteWithBordure" : "whiteWithBordure-Disabled"
          }
          action={() => saveGame()}
        ></Button>
        <Button
          icon="play-white"
          text="testGame"
          type="violetButton"
          action={() => {
        sendMessageToCardStudioTester( { token: getToken(), gameId: id })
               }}
        ></Button>
      </div>
    </nav>
  );
}
