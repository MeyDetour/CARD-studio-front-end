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
import { getSugggestionForCurrentPlayer } from "../../../../../../helpers/suggestions.js";
import DetailContainer from "../../../../../../components/DetailContainer/DetailContainer.jsx";

export default function CurrentWithValueEventubpage({
  withValueEvents,
  demons,
  events,
  globalPlayerValue,
  suggestions,
  gains,
  actions,
  updateGameValue,
  updateGameValueArray,
  getEventFromIdAndType,
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
  useEffect(() => {
    if (currentWithValueEvent)
      updateGameValueArray("events.withValueEvent", currentWithValueEvent);
  }, [currentWithValueEvent]);
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
                  name: "Default name",
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
              {/* ========== NOM ============== */}
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
              {/* ========== CONDITION ============== */}
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
              {/* ========== MESSAGE DE CHARGEMENT  ============== */}
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
              {/* ========== BOUCLE ============== */}
              <InputSelect
                title="loop"
                pathObject="boucle"
                items={["{allPlayersInGame}"]}
                closeAfterSelect={true}
                selected={
                  currentWithValueEvent.boucle
                    ? [currentWithValueEvent.boucle]
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
              {/* ========== FROM ET FOR ============== */}
              <Input
                title="entity-concerned"
                description="entity-concerned-description"
                suggestions={
                  currentWithValueEvent.boucle
                    ? [
                        ...suggestions,
                        ...getSugggestionForCurrentPlayer(globalPlayerValue),
                      ]
                    : [
                        ...suggestions.filter(
                          (s) => !s.label.includes("{playerBoucle"),
                        ),
                        ...getSugggestionForCurrentPlayer(globalPlayerValue),
                      ]
                }
                defaultValue={currentWithValueEvent.event.from}
                pathInObject="event.from"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
              <Input
                title="entity-target"
                description="entity-target-description"
                defaultValue={currentWithValueEvent.event.for}
                pathInObject="event.for"
                // verifier que le recepteur soit du meme type que l'emetteur
                suggestions={(() => {
                  const selectedFrom = suggestions.find(
                    (s) => s.label === currentWithValueEvent.event.from,
                  );
                  const typeOfFrom = selectedFrom?.type;

                  let filtered = typeOfFrom
                    ? suggestions.filter((s) => s.type === typeOfFrom)
                    : suggestions;

                  if (!currentWithValueEvent.boucle) {
                    filtered = filtered.filter(
                      (s) => !s.label.includes("{playerBoucle"),
                    );
                  }
                  filtered = [
                    ...filtered,
                    ...getSugggestionForCurrentPlayer(globalPlayerValue),
                  ];

                  return filtered;
                })()}
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(path, currentWithValueEvent, value),
                  );
                }}
              />
            </div>
            <div className="basicContainer">
              {/* ========== GIVE ELEMENT ============== */}
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
                            : ""
                          : ""
                      }
                      suggestions={
                        currentWithValueEvent.boucle
                          ? suggestions.filter((s) => s.type === "number")
                          : suggestions.filter(
                              (s) =>
                                !s.label.includes("{playerBoucle") &&
                                s.type === "number",
                            )
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
                        : ""
                      : ""
                  }
                  suggestions={
                    currentWithValueEvent.boucle
                      ? suggestions.filter((s) => s.type === "number")
                      : suggestions.filter(
                          (s) =>
                            !s.label.includes("{playerBoucle") &&
                            s.type === "number",
                        )
                  }
                  inputType="input"
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
              {/* ========== ACTION ============== */}
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
              {/* ========== REQUIRE INPUT ============== */}
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
              {/* ========== EVENTS QUI APPELLENT CETTE WITH VALUE EVENT ============== */}
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
            {/* ========== WITH VALUE EVENTS QUI APPELLENT CETTE WITH VALUE EVENT ============== */}
            <DetailContainer
              title={"calledInThisWithValueEventt"}
              description="hereIsAllWithValueWichCallThisEvent"
            >
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
            </DetailContainer>

            <div className="basicContainer">
              {/* ========== METADONNEES ============== */}
              <TitleContainer title={"metadata"}></TitleContainer>
              <span>
                {t("uniqueId")} : {currentWithValueEvent.id}
              </span>
              <span>
                {t("calledInTheseEvents")} :{" "}
                {
                  events.filter((event) =>
                    event.event.withValue
                      ? event.event.withValue.filter(
                          (e) => e.id == currentWithValueEvent.id,
                        ).length > 0
                      : 0,
                  ).length
                }
              </span>{" "}
              <span>
                {t("calledInTheseWithValueEvent")} :
                {
                  withValueEvents.filter((event) =>
                    event.event.withValue
                      ? event.event.withValue.filter(
                          (e) => e.id == currentWithValueEvent.id,
                        ).length > 0
                      : 0,
                  ).length
                }
              </span>
              <span>
                {t("calledInTheseActions")} :
                {
                  actions.filter(
                    (a) =>
                      a.withValue.filter(
                        (e) => e.id == currentWithValueEvent.id,
                      ).length > 0,
                  ).length
                }
              </span>
              <span>
                {t("callTheseWithValueEvent")} :
                {currentWithValueEvent.event.withValue
                  ? currentWithValueEvent.event.withValue.length
                  : 0}
              </span>
            </div>
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              {/* ========== SUPPRESSION ============== */}
              <TitleContainer
                title={"deleteEvent"}
                type="h2"
                description={"youDeleteEventWithoutSave"}
              />

              <Button
                text={"delete"}
                type="redButton"
                action={async () => {
                  if (confirm(t("doYouRealyWantToDeleteEvent"))) {
                    updateGameValueArray(
                      "events.withValueEvent",
                      currentWithValueEvent,
                      "delete",
                    );
                    setCurrentWithValueEvent(null);
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
