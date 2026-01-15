import "./style.css";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { useNotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router";
export default function GameCreationEnvironnementNavigation({
  playerHasEdit,
  currentPage,
}) {
  const { setWarning, setActionOnYes } = useNotificationContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  function showSaveWarning(text, actionOnYes) {
    setActionOnYes(actionOnYes);
    setWarning(text);
  }

  return (
    <nav className="gameCreationEnvironnementNavigationSideBar">
      <div className="sidebar-section">
        <ul>
          <li>
            <Button
              text={t("dashboard")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/dashboard")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/dashboard")
                    )
              }
              type={currentPage == "dashboard" ? "navbar active" : "navbar"}
              icon={
                currentPage === "dashboard" ? "dashboard-white" : "dashboard"
              }
            />
          </li>
          <li>
            <Button
              text={t("gameEdition")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/edit")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/edit")
                    )
              }
              type={currentPage == "edit" ? "navbar active" : "navbar"}
              icon={currentPage === "edit" ? "pen-white" : "pen"}
            />
          </li>
          <li>
            <Button
              text={t("assetLibrary")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/assets")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/assets")
                    )
              }
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
            <Button
              text={t("cardManagement")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/cards")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/cards")
                    )
              }
              type={currentPage == "cards" ? "navbar active" : "navbar"}
              icon={currentPage === "cards" ? "layer-white" : "layer"}
            />
          </li>
          <li>
            <Button
              text={t("prizesManagement")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/prizes")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/prizes")
                    )
              }
              type={currentPage == "prizes" ? "navbar active" : "navbar"}
              icon={currentPage === "prizes" ? "success-white" : "success"}
            />
          </li>
          <li>
            <Button
              text={t("roleCreation")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/roles")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/roles")
                    )
              }
              type={currentPage == "roles" ? "navbar active" : "navbar"}
              icon={
                currentPage === "roles"
                  ? "profile-settings-white"
                  : "profile-settings"
              }
            />
          </li>
        </ul>
      </div>

      <div className="sidebar-separator"></div>

      <div className="sidebar-section">
        <h4 className="section-title">{t("others")}</h4>
        <ul>
          <li>
            <Button
              text={t("manageDisplays")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/displays")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/displays")
                    )
              }
              type={currentPage == "displays" ? "navbar active" : "navbar"}
              icon={currentPage === "displays" ? "screen-white" : "screen"}
            />
          </li>
          <li>
            <Button
              text={t("gameFlow")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/flow")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/flow")
                    )
              }
              type={currentPage == "flow" ? "navbar active" : "navbar"}
              icon={currentPage === "flow" ? "play-white" : "play"}
            />
          </li>
          <li>
            <Button
              text={t("turnAndRoundManagement")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/rounds")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/rounds")
                    )
              }
              type={currentPage == "rounds" ? "navbar active" : "navbar"}
              icon={currentPage === "rounds" ? "clock-white" : "clock"}
            />
          </li>
          <li>
            <Button
              text={t("events")}
              action={() =>
                playerHasEdit
                  ? navigate("/newgame/events")
                  : showSaveWarning(
                      "unsavedChangesWarning",
                      navigate("/newgame/events")
                    )
              }
              type={currentPage == "events" ? "navbar active" : "navbar"}
              icon={currentPage === "events" ? "energy-white" : "energy"}
            />
          </li>
        </ul>
      </div>
        <Button
                  icon="save"
                  text="save"
                  clickable={!playerHasEdit}
                  type={
                    playerHasEdit ? "whiteWithBordure" : "whiteWithBordure-Disabled"
                  }
                  action={() => {}}
                ></Button>
    </nav>
  );
}
