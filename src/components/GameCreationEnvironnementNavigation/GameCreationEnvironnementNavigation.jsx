import "./style.css";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
export default function GameCreationEnvironnementNavigation({ currentPage }) {
 
   const { t } = useTranslation();
  return (
    <nav className="gameCreationEnvironnementNavigationSideBar">
      <div className="sidebar-section">
        <ul>
          <li>
            <Button
              text={t("dashboard")}
              
              to="/newgame/dashboard"
              type={currentPage=="dashboard"?"navbar active":"navbar"}
              icon={currentPage === "dashboard" ? "dashboard-white" : "dashboard"}
            />
          </li>
          <li>
            <Button
              text={t("gameEdition")}
              to="/newgame/edit"
              type={currentPage=="edit"?"navbar active":"navbar"}
              icon={currentPage === "edit" ? "pen-white" : "pen"}
            />
          </li>
          <li>
            <Button
              text={t("assetLibrary")}
              to="/newgame/assets"
              type={currentPage=="assets"?"navbar active":"navbar"}
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
              to="/newgame/cards"
              type={currentPage=="cards"?"navbar active":"navbar"}
                icon={currentPage === "cards" ? "layer-white" : "layer"}
            />
          </li>
          <li>
            <Button
              text={t("prizesManagement")}
              to="/newgame/prizes"
              type={currentPage=="prizes"?"navbar active":"navbar"}
             icon={currentPage === "prizes" ? "success-white" : "success"}
            />
          </li>
          <li>
            <Button
              text={t("roleCreation")}
              to="/newgame/roles"
              type={currentPage=="roles"?"navbar active":"navbar"}
              icon={currentPage === "roles" ? "profile-settings-white" : "profile-settings"}
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
              to="/newgame/displays"
              type={currentPage=="displays"?"navbar active":"navbar"}
                icon={currentPage === "displays" ? "screen-white" : "screen"}
            />
          </li>
          <li>
            <Button
              text={t("gameFlow")}
              to="/newgame/flow"
              type={currentPage=="flow"?"navbar active":"navbar"}
             icon={currentPage === "flow" ? "play-white" : "play"}
            />
          </li>
          <li>
            <Button
              text={t("turnAndRoundManagement")}
              to="/newgame/rounds"
              type={currentPage=="rounds"?"navbar active":"navbar"}
              icon={currentPage === "rounds" ? "clock-white" : "clock"}
            />
          </li>
          <li>
            <Button
              text={t("events")}
              to="/newgame/events"
              type={currentPage=="events"?"navbar active":"navbar"}
             icon={currentPage === "events" ? "energy-white" : "energy"}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
