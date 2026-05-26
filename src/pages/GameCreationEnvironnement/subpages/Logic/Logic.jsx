// CSS
import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../context/GameContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";
import { useHistoryContext } from "../../../../context/HistoryContext.jsx";

// Hooks
import { useApi } from "../../../../hooks/useApi.js";

// Helpers
import { createHistoryElement } from "../../../../helpers/historyObject.js";

// Data
import { eventActions } from "../../../../../data/eventActions.js";

// Components
import CardSubpage from "../../../../components/CardSubpage/CardSubpage.jsx";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer.jsx";
import Alert from "../../../../components/Alert/Alert.jsx";

// Subpages
import TriggerSubpage from "./subPage/TriggerSubpage/TriggerSubpage.jsx";
import EventSubpage from "./subPage/EventSubpage/EventSubpage.jsx";
import CurrentWithValueEventSubpage from "./subPage/EventWithValueSubpage/EventWithValueSubpage.jsx";
import VariableSubpage from "./subPage/VariableSubpage/VariableSubpage.jsx";
import WinSubpage from "./subPage/WinSubpage/WinSubpage.jsx";

export default function Logic({
  gameData,
  updateGameValueArray,
  updateGameValue,
  getEventFromIdAndType,
}) {
  const { result, loading, error, fetchData } = useApi();
  const {
    currentSubpageOfEvents,
    setCurrentSubpageOfEvents,
    currentEvent,
    setCurrentEvent,
    currentTrigger,
    setCurrentTrigger,
    currentWithValueEvent,
    setCurrentWithValueEvent,
  } = useGameContext();   
  const navigate = useNavigate();
  const t = useTranslation();
  const { alertList } = useNotificationContext();
  const { addItem } = useHistoryContext();


  return (
    <div className="eventsAndDeclencheurSubpage">
      {(() => {
        switch (currentSubpageOfEvents) {
          case "event":
            return (
              <EventSubpage
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                events={gameData.events}
                actions={gameData.actions}
                suggestions={gameData.suggestions}
                triggers={gameData.triggers}
                globalValue={gameData.globalValue}
                globalPlayerValue={gameData.playerGlobalValue}  
                gains={gameData.gains}
                gameId={gameData.id} 
                getEventFromIdAndType={getEventFromIdAndType}
              />
            );
          case "trigger":
            return (
              <TriggerSubpage
                globalPlayerValue={gameData.playerGlobalValue}
                suggestions={gameData.suggestions}
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                gameId={gameData.id}
                triggers={gameData.triggers} 
                events={gameData.events}
                getEventFromIdAndType={getEventFromIdAndType}
              />
            );
           
          case "globalValue":
            return (
              <VariableSubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                globalValue={gameData.globalValue}
                globalValueStatic={gameData.globalValueStatic}
                gameId={gameData.id}
                playerGlobalValue={gameData.playerGlobalValue}
                getEventFromIdAndType={getEventFromIdAndType}
              />
            );
          case "winCondition":
            return (
              <WinSubpage
                suggestions={gameData.suggestions}
                winParams={gameData.winParams}
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                globalValue={gameData.globalValue}
                gameId={gameData.id}
                globalValueStatic={gameData.globalValueStatic}
                playerGlobalValue={gameData.playerGlobalValue}
                getEventFromIdAndType={getEventFromIdAndType}
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
                      name: "triggerTitle", 
                      description: "triggerDescription",
                      onclickEvent: () => setCurrentSubpageOfEvents("trigger"),
                    },
                     
                    {
                      name: "globalValue",
                      description: "globalValueDescription",
                      onclickEvent: () =>
                        setCurrentSubpageOfEvents("globalValue"),
                    },
                    {
                      name: "winCondition",
                      description:
                        "hereYouCanConfigureWhenWinAppendAndVictoryCondition",
                      onclickEvent: () =>
                        setCurrentSubpageOfEvents("winCondition"),
                    },
                  ].map((section, key) => (
                    <>
                      <CardSubpage
                        key={key}
                        displayAlertOfType={
                          section.name === "eventTitle"
                            ? "event"
                            : section.name === "triggerTitle"
                              ? "trigger"
                              : section.name === "withValueEventTitle"
                                ? "eventWithValue"
                                : section.name === "winCondition"
                                  ? "winCondition"
                                  : "globalValue"
                        }
                        className={"cardSubpage" + key}
                        title={section.name}
                        icon={section.icon}
                        action={() => {
                          if (currentEvent) {
                            setCurrentEvent(null);
                          }
                          if (currentTrigger) {
                            setCurrentTrigger(null);
                          }
                          if (currentWithValueEvent) {
                            setCurrentWithValueEvent(null);
                          }
                          section.onclickEvent();
                        }}
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
