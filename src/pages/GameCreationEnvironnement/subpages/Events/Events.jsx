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
import CurrentWithValueEventSubpage from "./subPage/EventWithValueSubpage/EventWithValueSubpage.jsx";
import VariableSubpage from "./subPage/VariableSubpage/VariableSubpage.jsx";
import WinSubpage from "./subPage/WinSubpage/WinSubpage.jsx";
import { eventActions } from "../../../../../data/eventActions.js";

export default function Events({
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
    currentDemon,
    setCurrentDemon,
    currentWithValueEvent,
    setCurrentWithValueEvent,
  } = useGameContext();
  const [selectedType, setSelectedType] = useState([]);
  const [isOpenExpressionBuilder, setIsOpenExpressionBuilder] = useState(false);
  const navigate = useNavigate();
  const t = useTranslation();
  const { alertList } = useNotificationContext();

  function addACtionOnEvent(event, action, type) {
    let newEvent = { ...event };
    console.log(event,action,type);
    if (action) {
      console.log(action);
      if (action.lonelyField) {
        newEvent.event.for = null;
        newEvent.event.from = null;
        newEvent.event.value = null;
        newEvent.event.condition = null;
        newEvent.event.give = null;
        newEvent.event.boucle = null;
      }
      if (!action.necessiteValue) {
        newEvent.event.value = null;
      }
      if (!action.necessiteFor) {
        newEvent.event.for = null;
      }
      if (!action.necessiteFrom) {
        newEvent.event.from = null;
      }
      if (!action.necessiteCondition) {
        newEvent.event.condition = null;
      }
      if (!action.necessiteGive) {
        newEvent.event.give = null;
      }
      if (!action.necessiteBoucle) {
        newEvent.event.boucle = null;
      }
      if (!action.necessiteRequiresInput) {
        newEvent.event.requiresInput = null;
      }
      newEvent.event.action = action.label;
    } else {
      newEvent.event.action = null;
    }
    console.log(newEvent);

    if (type === "event") {
      setCurrentEvent(newEvent);
      updateGameValueArray("events.events", newEvent);
    }
    if (type === "withValue") {
      setCurrentWithValueEvent(newEvent);
      updateGameValueArray("events.withValueEvent", newEvent);
    }
  }
  function getActionObj(action) {
    return eventActions.find((actionItem) => actionItem.label === action);
  }
  function loadDisabledFields(event) {
    if (!event.event?.action) return {};

    let action = getActionObj(event.event.action);
    if (!action) {
      console.warn("Cant find action " + event.event.action);
      console.warn(event);
      return {};
    }
    let obj = {};

    if (action.lonelyField) {
      obj.for = true;
      obj.from = true;
      obj.value = true;
      obj.condition = true;
      obj.give = true;
      obj.boucle = true;
    }

    if (!action.necessiteValue) {
      obj.value = true;
    }
    if (!action.necessiteFor) {
      obj.for = true;
    }
    if (!action.necessiteFrom) {
      obj.from = true;
    }
    if (!action.necessiteCondition) {
      obj.condition = true;
    }
    if (!action.necessiteGive) {
      obj.give = true;
    }
    if (!action.necessiteBoucle) {
      obj.boucle = true;
    }
    if (!action.necessiteRequiresInput) {
      obj.requiresInput = true;
    } 
    return obj;
  }

// Met à jour le contexte du jeu lors de la modification d’un événement courant.
// Ces fonctions sont placées ici (et non dans les pages) car elles modifient directement les variables currentEvent et currentWithValueEvent.
// Cela permet aux sous-composants de détecter les changements, même si les modifications sont effectuées en dehors de leur propre composant.
// Les fonctions sont spécifiques aux événements et withValueEvents, et reçoivent les variables concernées en paramètre pour garantir la réactivité des champs.
  useEffect(() => {
    if (currentWithValueEvent)
      updateGameValueArray("events.withValueEvent", currentWithValueEvent);
  }, [currentWithValueEvent]);

  useEffect(() => {
    if (currentEvent) updateGameValueArray("events.events", currentEvent);
  }, [currentEvent]);
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
                suggestions={gameData.suggestions}
                demons={gameData.demons}
                globalValue={gameData.globalValue}
                globalPlayerValue={gameData.playerGlobalValue}
                withValueEvents={gameData.withValueEvents}
                loadDisabledFields={loadDisabledFields}
                gains={gameData.gains}
                addACtionOnEvent={addACtionOnEvent}
                getEventFromIdAndType={getEventFromIdAndType}
              />
            );
          case "demon":
            return (
              <DemonSubpage
                globalPlayerValue={gameData.playerGlobalValue}
                suggestions={gameData.suggestions}
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                demons={gameData.demons}
                withValueEvents={gameData.withValueEvents}
                events={gameData.events}
                getEventFromIdAndType={getEventFromIdAndType}
              />
            );
          case "withValueEvent":
            return (
              <CurrentWithValueEventSubpage
                currentWithValueEvent={currentWithValueEvent}
                setCurrentWithValueEvent={setCurrentWithValueEvent}
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                demons={gameData.demons}
                events={gameData.events}
                globalPlayerValue={gameData.playerGlobalValue}
                actions={gameData.actions}
                getEventFromIdAndType={getEventFromIdAndType}
                addACtionOnEvent={addACtionOnEvent}
                suggestions={gameData.suggestions}
                loadDisabledFields={loadDisabledFields}
                withValueEvents={gameData.withValueEvents} 
              />
            );
          case "globalValue":
            return (
              <VariableSubpage
                updateGameValueArray={updateGameValueArray}
                updateGameValue={updateGameValue}
                globalValue={gameData.globalValue}
                globalValueStatic={gameData.globalValueStatic}
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
                            : section.name === "demonTitle"
                              ? "demon"
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
                          if (currentDemon) {
                            setCurrentDemon(null);
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
