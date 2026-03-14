import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../context/GameContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";

// Hooks
import { useApi } from "../../../../hooks/useApi";

// Components
import CardSubpage from "../../../../components/CardSubpage/CardSubpage";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import Alert from "../../../../components/Alert/Alert.jsx";

// Subpages
import DemonSubpage from "./subPage/DemonSubpage/DemonSubpage.jsx";
import EventSubpage from "./subPage/EventSubpage/EventSubpage.jsx";
import CurrentWithValueEventubpage from "./subPage/EventWithValueSubpage/EventWithValueSubpage.jsx";
import VariableSubpage from "./subPage/VariableSubpage/VariableSubpage.jsx";

export default function Events({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) { 
  const { result, loading, error, fetchData } = useApi();
  const { currentSubpageOfEvents, setCurrentSubpageOfEvents } =
    useGameContext();
  const [selectedType, setSelectedType] = useState([]);
  const [isOpenExpressionBuilder, setIsOpenExpressionBuilder] = useState(false);
  const navigate = useNavigate();
  const t = useTranslation();
  const { alertList } = useNotificationContext();

  if (!gameData) return;
  return (
    <div className="eventsAndDeclencheurSubpage">
      {(() => {

       

        switch (currentSubpageOfEvents) {
          case "event":
            return (
              <EventSubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                events={gameData.events}
                suggestions={gameData.suggestions}
                demons={gameData.demons}
                globalValue={gameData.globalValue}
                globalPlayerValue={gameData.playerGlobalValue}
                withValueEvents={gameData.withValueEvents}
                gains={gameData.gains}
              />
            );
          case "demon":
            return (
              <DemonSubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                demons={gameData.demons}
                withValueEvents={gameData.withValueEvents}
                events={gameData.events}
                suggestions={gameData.suggestions}
              />
            );
          case "withValueEvent":
            return (
              <CurrentWithValueEventubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                demons={gameData.demons}
                events={gameData.events}
                suggestions={gameData.suggestions}
                withValueEvents={gameData.withValueEvents}
              />
            );
          case "globalValue":
            return (
              <VariableSubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                globalValue={gameData.globalValue}
                playerGlobalValue={gameData.playerGlobalValue}
              />
            );
          default:
            return (
              <div className="selectMode">
                <TitleContainer
                  title="eventsAndTriggersManagementTitle"
                  description="eventsAndTriggersManagementDescription"
                />
                <div className="wrapper">
                  {[
                    {
                      name: "eventTitle",
                      description: "eventDescription",
                      onclickEvent: () => setCurrentSubpageOfEvents("event"),
                    },
                    {
                      name: "demonTitle",
                      icon: "demon",
                      description: "demonDescription",
                      onclickEvent: () => setCurrentSubpageOfEvents("demon"),
                    },
                    {
                      name: "withValueEventTitle",
                      description: "withValueEventDescription",
                      onclickEvent: () =>
                        setCurrentSubpageOfEvents("withValueEvent"),
                    },
                    {
                      name: "globalValue",
                      description: "globalValueDescription",
                      onclickEvent: () =>
                        setCurrentSubpageOfEvents("globalValue"),
                    },
                  ].map((section) => (
                    <>
                   
                 
                      <CardSubpage
                       displayAlertOfType={section.name === "eventTitle" ? "event" : section.name === "demonTitle" ? "demon" : section.name === "withValueEventTitle" ? "withValueEvent" : "globalValue"}
                  
                        title={section.name}
                        icon={section.icon}
                        action={section.onclickEvent}
                        description={section.description}
                      />
                    </>
                  ))}
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
}
