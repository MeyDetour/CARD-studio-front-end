// External libraries
import { useEffect, useState } from "react";

// Contexts
import { useUserContext } from "../../../../context/UserContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";
import { useApi } from "../../../../hooks/useApi";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar"; 
import Settings from "./Settings/Settings.jsx";
import Help from "./Help copy/Help.jsx";

export default function HelpAndSettings({
  gameData,
  user,
  editUserHandler,
  updateGameValueArray,
  updateGameValue,
}) {
   const [subPage, setSubpage] = useState("settings");


  return (
    <div className="helpAndSettingsSubpage">
      <TitleContainer
        title="helpAndSettings"
        description="onThisPageYouWillFindAllSettingsToConfigureRoundsAndManches"
      ></TitleContainer>

      <SubNavigationBar
        buttons={{
          settings: () => setSubpage("settings"),
          help: () => setSubpage("help"),
        }}
        page={subPage}
      />

      {subPage === "settings" && <Settings user={user} editUserHandler={editUserHandler} />}
      {subPage === "help" && <Help/>}

      
    </div>
  );
}
