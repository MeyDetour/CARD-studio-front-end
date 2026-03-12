import "./style.css";
import { useState, useEffect } from "react";
import Button from "../../../../../../components/Button/Button";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer";
import Input from "../../../../../../components/input/Input.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/inputSelect/InputSelect.jsx";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";
import { actions } from "../elements.js";
import { useNotificationContext } from "../../../../../../context/NotificationContext.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import DemonCard from "../../../../../../components/Cards/DemonCard/DemonCard.jsx";


export default function EventSubpage({
  events,
  demons,
  gains,
  withValueEvents,
  updateGameValue,
  updateGameValueArray,
}) {
  const {
    currentEvent,
    setCurrentEvent,
    setCurrentDemon,
    setCurrentSubpageOfEvents,
  } = useGameContext();
  const [ConditionExpressionBuilder, setConditionExpressionBuilder] =
    useState(false);
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
 
  if (!events) return;

  useEffect(() => {
    if (events && !currentEvent) {
      setCurrentEvent(events[0]);
    }
  }, [events]);

  // update game context when we update current event
  useEffect(() => {
    if (currentEvent) updateGameValueArray("events.events", currentEvent);
  }, [currentEvent]);

  return (
    <div className={" eventSubPageOfEventsAndDeclencheurSubpage"}>
      <div className="left">
        <div className="headerEvent">
          <h2>{t("events")}</h2>
          <Button
            text={"new"}
            icon={"add-white"}
            type="grey"
            action={() =>
              updateGameValueArray(
                "events.events",
                {
                  id: Date.now(),
                  name: "Dafault name",
                  condition: "",
                  event: {
                    for: "",
                    give: null,
                    attachedEventForTour: null,
                    action: "",
                    value: null,
                  },
                },
                "new",
              )
            }
          />
        </div>
        <div className="wrapperEvents">
          {events &&
            events.map((event, index) => (
              <EventCard
                alertMessage={event.id + "|event|"}
                key={index}
                action={() => setCurrentEvent(event)}
                event={event}
                isSelected={currentEvent && event.id === currentEvent.id}
              />
            ))}
        </div>
      </div>

      <div className="right">
        <div className="headerRight">
          <TitleContainer title="events" description="eventDescription" />
        </div>

        {currentEvent ? (
          <>
            <div className="basicContainer">
              <Alert
                message={
                  currentEvent.id + "|event|eventNameCannotBeEmpty|alert"
                }
                alertList={alertList}
              ></Alert>

              <TitleContainer
                title="eventConfigurationTitle"
                description="eventConfigurationDescription"
              />
              <Input
                title="eventNameLabel"
                defaultValue={currentEvent.name}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
              <Input
                title="activationCondition"
                description="activationConditionDescription"
                defaultValue={currentEvent.condition}
                pathInObject="condition"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
              <Input
                title="loadMessage"
                description="loadMessageDescription"
                defaultValue={currentEvent.loadMessage}
                pathInObject="loadMessage"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>

            <div className="basicContainer">
              <InputSelect
                title="loop"
                pathObject="boucle"
                items={["{allPlayersInGame}"]}
                closeAfterSelect={true}
                selected={currentEvent.boucle ? [currentEvent.boucle] : []}
                updateValueArray={(path, value) => {
                  setCurrentEvent(
                    updateValueArray(path, currentEvent, value, "unique"),
                  );
                }}
              ></InputSelect>
              <Input
                title="condition"
                description="condition-in-boucle-description"
                defaultValue={currentEvent.event.condition}
                pathInObject="event.condition"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>

            <div className="basicContainer">
              <Input
                title="player-concerned"
                description="player-concerned-description"
                defaultValue={currentEvent.event.for}
                pathInObject="event.for"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />

              <Input
                title="player-target"
                description="player-target-description"
                defaultValue={currentEvent.event.from}
                pathInObject="event.from"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>
            <div className="basicContainer">
              <TitleContainer
                title="give-ressources-to-players"
                description="give-ressources-to-players-description"
              />
              {gains &&
                gains.map((gain) => (
                  <div>
                    <span>
                      {gain.nom.charAt(0).toUpperCase() +
                        String(gain.nom).slice(1)}
                    </span>

                    <Input
                      defaultValue={
                        currentEvent.event.give
                          ? currentEvent.event.give["{gain#" + gain.id + "}"]
                            ? currentEvent.event.give["{gain#" + gain.id + "}"]
                            : 0
                          : 0
                      }
                      inputType="input"
                      pathInObject={"event.give.{gain#" + gain.id + "}"}
                      onChangeFunction={(path, value) => {
                        setCurrentEvent(
                          updateElementValue(path, currentEvent, value),
                        );
                      }}
                    />
                  </div>
                ))}
              <div>
                <span>Cards</span>
                <Input
                  defaultValue={
                    currentEvent.event.give
                      ? currentEvent.event.give["{cards}"]
                        ? currentEvent.event.give["{cards}"]
                        : 0
                      : 0
                  }
                  inputType="number"
                  pathInObject={"event.give.{cards}"}
                  onChangeFunction={(path, value) => {
                    setCurrentEvent(
                      updateElementValue(path, currentEvent, value),
                    );
                  }}
                />
              </div>
            </div>

            <div className="basicContainer">
              <InputSelect
                title="eventAction"
                pathObject="event.action"
                items={actions}
                closeAfterSelect={true}
                selected={
                  currentEvent.event.action ? [currentEvent.event.action] : []
                }
                updateValueArray={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              ></InputSelect>
              {(currentEvent.event.action == "updateGlobalValue" ||
                currentEvent.event.action == "changeStartingPlayer") && (
                <Input
                  title="eventValue"
                  description="eventValueDescription"
                  defaultValue={currentEvent.event.value}
                  pathInObject="event.value"
                  onChangeFunction={(path, value) => {
                    setCurrentEvent(
                      updateElementValue(path, currentEvent, value),
                    );
                  }}
                />
              )}
            </div>
            <div className="basicContainer demonsAssociatedContainer">
              <TitleContainer
                title="demonsWichExecuteThisEvent"
                description="hereIsAllDemonWichCallThisEvent"
              />
             
                  <div className="wrapperSelection">
                    {demons &&
                      demons.map((demon, index) => (
                        <DemonCard
                          alertMessage={demon.id + "|demon|"}
                          key={index}
                          action={() => {
                            updateGameValueArray(
                              "events.demons",
                              updateValueArray(
                                "events",
                                demon,
                                currentEvent.id,
                              )
                            );
                            setOpenPanelToAddDemon(false);
                          }}
                          demon={demon}
                          displayIcons={true}
                          isSelected={demon.events && demon.events.includes(currentEvent.id)}
                        />
                      ))}
                  </div>
                   {demons && demons.length === 0 && (
                          <span className="normalText">{t("noDemonInGame")}</span>
                        )}
                 
            </div>
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              <TitleContainer
                title={"deleteEvent"}
                type="h2"
                description={"youDeleteEventWithoutSave"}
              />

              <Button
                text={"delete"}
                action={async () => {
                  if (confirm(t("doYouRealyWantToDeleteEvent"))) {
                    updateGameValueArray(
                      "events.events",
                      currentEvent,
                      "delete",
                    );
                    setCurrentEvent(null);
                  }
                }}
              ></Button>
            </div>
          </>
        ) : (
          <span>{t("noEventSelected")}</span>
        )}
        {/*Declencheurs : listes les elements qui l'appellent*/}
      </div>
    </div>
  );
}
