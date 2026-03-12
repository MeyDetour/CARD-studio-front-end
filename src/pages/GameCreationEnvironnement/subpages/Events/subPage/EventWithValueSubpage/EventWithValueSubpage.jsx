import "./style.css";
import { useState, useEffect } from "react";
import Button from "../../../../../../components/Button/Button.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Input from "../../../../../../components/input/Input.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/inputSelect/InputSelect.jsx";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";

export default function CurrentWithValueEventubpage({
  withValueEvents,
  demons,
  events,
  gains,
  updateGameValue,
  updateGameValueArray,
}) {
  const {
    currentWithValueEvent,
    setCurrentWithValueEvent,
    setCurrentDemon,
    setCurrentSubpageOfcurrentWithValueEvent,
  } = useGameContext();
  const [ConditionExpressionBuilder, setConditionExpressionBuilder] =
    useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (withValueEvents && !currentWithValueEvent) {
      setCurrentWithValueEvent(withValueEvents[0]);
    }
  }, [withValueEvents]);

  console.log(currentWithValueEvent);
  return (
    <div
      className={
        " currentWithValueEventubPageOfcurrentWithValueEventAndDeclencheurSubpage"
      }
    >
      <div className="left">
        <div className="headerEvent">
          <h2>{t("withValueEvent")}</h2>
          <Button
            text={"new"}
            icon={"add-white"}
            type="grey"
            action={() =>
              updateGameValueArray(
                "events.withValueEvent",
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
        <div className="wrappercurrentWithValueEvent">
          {withValueEvents &&
            withValueEvents.map((event, index) => (
              <EventCard
                key={index}
                action={() => setCurrentWithValueEvent(event)}
                event={event}
                isSelected={
                  currentWithValueEvent && event.id === currentWithValueEvent.id
                }
              />
            ))}
        </div>
      </div>

      <div className="right">
        <div className="headerRight">
          <TitleContainer
            title="withValueEvent"
            description="withValueEventDescription"
          />
        </div>

        {currentWithValueEvent ? (
          <>
            <div className="basicContainer">
              <TitleContainer
                title="eventConfigurationTitle"
                description="eventConfigurationDescription"
              />
              <Input
                title="eventNameLabel"
                defaultValue={currentWithValueEvent.name}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
            </div>
            <div className="basicContainer">
              <Input
                title="activationCondition"
                description="activationConditionDescription"
                defaultValue={currentWithValueEvent.condition}
                pathInObject="condition"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
            </div>
            <div className="basicContainer">
              <Input
                title="loadMessage"
                description="loadMessageDescription"
                defaultValue={currentWithValueEvent.loadMessage}
                pathInObject="loadMessage"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
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
                selected={currentWithValueEvent.boucle ? [currentWithValueEvent.boucle] : []}
                updateValueArray={(path, value) => {
                  setCurrentWithValueEvent(
                    updateValueArray(
                      path,
                      currentWithValueEvent,
                      value,
                      "unique",
                    ),
                  );
                }}
              ></InputSelect>
              <Input
                title="condition"
                description="condition-in-boucle-description"
                defaultValue={currentWithValueEvent.event.condition}
                pathInObject="event.condition"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
            </div>
            <div className="basicContainer">
              <Input
                title="player-concerned"
                description="player-concerned-description"
                defaultValue={currentWithValueEvent.event.for}
                pathInObject="event.for"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
              <Input
                title="player-target"
                description="player-target-description"
                defaultValue={currentWithValueEvent.event.from}
                pathInObject="event.from"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
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
                    <span>{gain.nom}</span>

                    <Input
                      defaultValue={
                        currentWithValueEvent.event.give
                          ? currentWithValueEvent.event.give[
                              "{gain#" + gain.id + "}"
                            ]
                            ? currentWithValueEvent.event.give[
                                "{gain#" + gain.id + "}"
                              ]
                            : 0
                          : 0
                      }
                      inputType="input"
                      pathInObject={"event.give.{gain#" + gain.id + "}"}
                      onChangeFunction={(path, value) => {
                        setCurrentWithValueEvent(
                          updateElementValue(
                            path,
                            currentWithValueEvent,
                            value,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
              <div>
                <span>Cards</span>
                <Input
                  defaultValue={
                    currentWithValueEvent.event.give
                      ? currentWithValueEvent.event.give["{cards}"]
                        ? currentWithValueEvent.event.give["{cards}"]
                        : 0
                      : 0
                  }
                  inputType="number"
                  pathInObject={"event.give.{cards}"}
                  onChangeFunction={(path, value) => {
                    setCurrentWithValueEvent(
                      updateElementValue(path, currentWithValueEvent, value),
                    );
                  }}
                />
              </div>
            </div>
            <div className="basicContainer">
              <Input
                title="eventAction"
                description="eventActionDescription"
                defaultValue={currentWithValueEvent.event.action}
                pathInObject="event.action"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
              <Input
                title="eventValue"
                description="eventValueDescription"
                defaultValue={currentWithValueEvent.event.value}
                pathInObject="event.value"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
            </div>

            <div className="basicContainer">
              <TitleContainer
                title="require-input"
                description="hereIsAllDemonWichCallThisEvent"
              />
              <div className="wrapperRequiresInput">
                {currentWithValueEvent.event.requiresInput && (
                  <>
                    <Input
                      title="label"
                      description="label"
                      defaultValue={
                        currentWithValueEvent.event.requiresInput.label
                      }
                      pathInObject="event.requiresInput.label"
                      onChangeFunction={(path, value) => {
                        setCurrentWithValueEvent(
                          updateElementValue(
                            path,
                            currentWithValueEvent,
                            value,
                          ),
                        );
                      }}
                    />
                    <InputSelect
                      title="type"
                      description="type"
                      pathObject="event.requiresInput.type"
                      items={["number", "text"]}
                      selected={
                        currentWithValueEvent.event.type
                          ? [currentWithValueEvent.event.type]
                          : []
                      }
                      updateValueArray={(path, value) => {
                        setCurrentWithValueEvent(
                          updateValueArray(
                            path,
                            currentWithValueEvent,
                            value,
                            "unique",
                          ),
                        );
                      }}
                    ></InputSelect>
                    <Input
                      title="min"
                      description="min"
                      defaultValue={
                        currentWithValueEvent.event.requiresInput.min
                      }
                      type="input"
                      pathInObject="event.requiresInput.min"
                      onChangeFunction={(path, value) => {
                        setCurrentWithValueEvent(
                          updateElementValue(
                            path,
                            currentWithValueEvent,
                            value,
                          ),
                        );
                      }}
                    />
                    <Input
                      title="max"
                      description="max"
                      defaultValue={
                        currentWithValueEvent.event.requiresInput.max
                      }
                      type="input"
                      pathInObject="event.requiresInput.max"
                      onChangeFunction={(path, value) => {
                        setCurrentWithValueEvent(
                          updateElementValue(
                            path,
                            currentWithValueEvent,
                            value,
                          ),
                        );
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="basicContainer">
              <TitleContainer
                title="events-wich-execute-this-event"
                description="hereIsAllEventWichCallThisEvent"
              />
              <div className="wrapperSelection">
                {events &&
                  events.map((event, index) => (
                    <EventCard
                      alertMessage={event.id + "|withValueEvent|"}
                      key={index}
                      action={() => {
                        setCurrentWithValueEvent(
                          updateValueArray(
                            "events",
                            currentWithValueEvent,
                            event.id,
                          ),
                        );
                        setOpenPanelToAddEvent(false);
                      }}
                      event={event}
                      isSelected={
                        event.id &&
                        event.event &&
                        event.event.withValue &&
                        event.event.withValue.find(
                          (elt) => elt.id === currentWithValueEvent.id,
                        )
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="basicContainer">
              <TitleContainer
                title="withValue-wich-execute-this-event"
                description="hereIsAllWithValueWichCallThisEvent"
              />
              <div className="wrapperSelection">
                {withValueEvents &&
                  withValueEvents.map(
                    (withValue, index) =>
                      withValue.id != currentWithValueEvent.id && (
                        <EventCard
                          alertMessage={withValue.id + "|withValueEvent|"}
                          key={index}
                          action={() => {
                            setCurrentWithValueEvent(
                              updateValueArray(
                                "events",
                                currentWithValueEvent,
                                withValue.id,
                              ),
                            );
                            setOpenPanelToAddEvent(false);
                          }}
                          event={withValue}
                          isSelected={
                            withValue.id &&
                            withValue.event &&
                            withValue.event.withValue &&
                            withValue.event.withValue.find(
                              (elt) => elt.id === currentWithValueEvent.id,
                            )
                          }
                        />
                      ),
                  )}
              </div>
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
