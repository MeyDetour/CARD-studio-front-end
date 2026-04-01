import "./style.css";
import { useState, useEffect, use } from "react";
import Button from "../../../../../../components/Button/Button.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Input from "../../../../../../components/input/Input.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";
import { getSugggestionForPlayer } from "../../../../../../helpers/suggestions.js";
import DetailContainer from "../../../../../../components/DetailContainer/DetailContainer.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import { useNotificationContext } from "../../../../../../context/NotificationContext.jsx";
import { eventActions } from "../../../../../../../data/eventActions.js";
import { getDynamicValueForEvent } from "../../../../../../helpers/withValueEventManager.js";
import WithValueEventCard from "../../../../../../components/Cards/WithValueEventCard/WithValueEventCard.jsx";
import Confirm from "../../../../../../components/Confirm/Confirm.jsx";

export default function CurrentWithValueEventSubpage({
  withValueEvents,
  demons,
  events,
  globalPlayerValue,
  suggestions,
  gains,
  actions,
  addACtionOnEvent,
  updateGameValueArray,
  loadDisabledFields,
  currentWithValueEvent,
  setCurrentWithValueEvent,
  getEventFromIdAndType,
}) {
  const [ConditionExpressionBuilder, setConditionExpressionBuilder] =
    useState(false);
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const [disabledFields, setDisabledFields] = useState(null);
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);

  useEffect(() => {
    if (withValueEvents && !currentWithValueEvent) {
      setCurrentWithValueEvent(withValueEvents[0]);
      setDisabledFields(loadDisabledFields(withValueEvents[0]));
    }
  }, [withValueEvents]);

  useEffect(() => {
    if (currentWithValueEvent) {
      setDisabledFields(loadDisabledFields(currentWithValueEvent));
    }
  }, [currentWithValueEvent, withValueEvents]);
  console.log(disabledFields);
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
            action={() => {
              let newEvent = {
                id: Date.now(),
                name: "Default name",
                condition: null,
                event: {
                  for: null,
                  from: null,
                  give: null,
                  action: null,
                  value: null,
                },
              };
              updateGameValueArray("events.withValueEvent", newEvent, "new");
              setCurrentWithValueEvent(newEvent);
              setDisabledFields(loadDisabledFields(newEvent));
            }}
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
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={event.id + "|eventWithValue|"}
                ></Alert>
              </EventCard>
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
              {currentWithValueEvent.condition?.includes("currentPlayer") && (
                <Alert
                  messages={[
                    currentWithValueEvent.id +
                      "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotColledInAction",
                  ]}
                  alertList={alertList}
                ></Alert>
              )}
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
              {currentWithValueEvent.event?.condition?.includes(
                "currentPlayer",
              ) && (
                <Alert
                  messages={[
                    currentWithValueEvent.id +
                      "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotColledInAction",
                  ]}
                  alertList={alertList}
                ></Alert>
              )}
              <InputSelect
                title="loop"
                pathObject="boucle"
                disabled={disabledFields && disabledFields.boucle}
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
                disabled={disabledFields && disabledFields.condition}
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
              <Alert
                messages={[
                  currentWithValueEvent.id +
                    "|eventWithValue|eventHaveFromElementButNoFor|warning",

                  currentWithValueEvent.id +
                    "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotColledInAction",
                ]}
                alertList={alertList}
              ></Alert>

              <Input
                title="entity-concerned"
                description="entity-concerned-description"
                suggestions={
                  currentWithValueEvent.boucle
                    ? [
                        ...suggestions,
                        ...getSugggestionForPlayer(
                          "currentPlayer",
                          globalPlayerValue,
                        ),
                      ]
                    : [
                        ...suggestions.filter(
                          (s) => !s.label.includes("{playerBoucle"),
                        ),
                        ...getSugggestionForPlayer(
                          "currentPlayer",
                          globalPlayerValue,
                        ),
                      ]
                }
                disabled={disabledFields && disabledFields.from}
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
                disabled={disabledFields && disabledFields.for}
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
                    ...getSugggestionForPlayer(
                      "currentPlayer",
                      globalPlayerValue,
                    ),
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
              <Alert
                messages={[
                  currentWithValueEvent.id +
                    "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotColledInAction",
                  currentWithValueEvent.id +
                    "|eventWithValue|elementsGivesButNoFromAndFor|warning",
                ]}
                alertList={alertList}
              ></Alert>

              <TitleContainer
                title="give-ressources-to-players"
                description="give-ressources-to-players-description"
              />
              {gains &&
                gains.map((gain, index) => (
                  <div key={index}>
                    <span>{gain.nom}</span>

                    <Input
                      disabled={disabledFields && disabledFields.give}
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
                <Input
                  title={"cards"}
                  disabled={disabledFields && disabledFields.give}
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
              <Alert
                messages={[
                  currentWithValueEvent.id +
                    "|eventWithValue|invalidAction|warning",
                  currentWithValueEvent.id +
                    "|eventWithValue|elementsGivesButNoFromAndFor|warning",
                ]}
                alertList={alertList}
              ></Alert>

              <InputSelect
                description={"eventActionDescription"}
                title="eventAction"
                items={eventActions}
                itemsDisplayFields={["label", "tooltip"]}
                closeAfterSelect={true}
                selected={
                  currentWithValueEvent.event.action
                    ? [currentWithValueEvent.event.action]
                    : []
                }
                updateValueArray={(value) => {
                  addACtionOnEvent(
                    currentWithValueEvent,
                    currentWithValueEvent.event.action == value.label
                      ? null
                      : value,
                    "withValue",
                  );

                  setDisabledFields(
                    loadDisabledFields({
                      event: {
                        action: value.label,
                      },
                    }),
                  );
                }}
              ></InputSelect>
              <Input
                title="eventValue"
                description="eventValueDescription"
                defaultValue={currentWithValueEvent.event.value}
                disabled={disabledFields && disabledFields.value}
                pathInObject="event.value"
                onChangeFunction={(path, value) => {
                  setCurrentWithValueEvent(
                    updateElementValue(
                      path,
                      currentWithValueEvent,
                      value,
                      "withValue",
                    ),
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

            {/* ========== WithValueEvents ============== */}

            <DetailContainer
              title={"withValueEvent"}
              description={
                "withValueEventWichBeExecutedWhenThisEventIsTriggered"
              }
              className="demonsAssociatedContainer"
              topAlert={
                <>
                  <Alert
                    messages={[
                      currentWithValueEvent.id +
                        "|eventWithValue|callNonExistingWithValueEvent|alert",
                      currentWithValueEvent.id +
                        "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotCalledInAction|alert",
                      currentWithValueEvent.id +
                        "|eventWithValue|missingValueForKey",
                    ]}
                    alertList={alertList}
                  ></Alert>
                </>
              }
            >
              <InputSelect
                title={"useWithValueEvent"}
                updateValueArray={(value) => {
                  setCurrentWithValueEvent(
                    updateValueArray(
                      "event.withValue",
                      currentWithValueEvent,
                      { id: value.id, componentId: new Date().getTime() },
                      "new",
                    ),
                  );
                }}
                closeAfterSelect={true}
                selected={[t("selectWithValueEvent")]}
                items={withValueEvents}
                itemsDisplayFields={["id", "name"]}
              />
              {currentWithValueEvent.event.withValue &&
              currentWithValueEvent.event.withValue.length > 0 ? (
                currentWithValueEvent.event.withValue.map(
                  (withValueEventInputs, index) => {
                    let withValueEvent = getEventFromIdAndType(
                      withValueEventInputs.id,
                      "withValueEvent",
                    );
                    let keyInputInwithValueEvent =
                      getDynamicValueForEvent(withValueEvent);
                    function remove() {
                      setCurrentWithValueEvent(
                        updateValueArray(
                          "event.withValue",
                          currentWithValueEvent,
                          withValueEventInputs,
                          "delete",
                          { newIdKey: "componentId" },
                        ),
                      );
                    }
                    return (
                      <WithValueEventCard
                        key={index}
                        actionOnRemove={remove}
                        action={() => {
                          if (!withValueEvent) {
                            remove();
                          }
                        }}
                        withValueEvent={
                          withValueEvent
                            ? withValueEvent
                            : { name: t("withValueEventDoesnotExist") }
                        }
                        alertMessages={[
                          withValueEventInputs.id +
                            "|withValueEvent|" +
                            "withValueEventDoesnotExist|alert",
                          currentWithValueEvent.id +
                            "|eventWithValue|eventCannotCallWithValueEventWithCurrentPlayer|alert",
                        ]}
                        className="withValueEventEdition"
                        withValueEventInputs={withValueEventInputs}
                        withValueEventKeys={keyInputInwithValueEvent}
                        modifyKeyValue={(path, value) => {
                          setCurrentWithValueEvent(
                            updateValueArray(
                              "event.withValue",
                              currentWithValueEvent,
                              updateElementValue(
                                path,
                                withValueEventInputs,
                                value,
                              ),
                              {
                                newIdKey: "componentId",
                              },
                            ),
                          );
                          let newDynamicValues = getDynamicValueForEvent(value);
                          for (let action of actions) {
                            if (
                              action.withValue?.some(
                                (e) => e.id == currentWithValueEvent.id,
                              )
                            ) {
                              let withValueObj = action.withValue.find(
                                (e) => e.id === currentWithValueEvent.id,
                              );
                              for (let key of newDynamicValues) {
                                if (!withValueObj[key]) {
                                  withValueObj[key] = "";
                                }
                              }
                              updateGameValueArray(
                                "params.tours.actions",

                                // return new action
                                updateValueArray(
                                  "withValue",
                                  action,
                                  withValueObj,
                                  "update",
                                  { newIdKey: "componentId" },
                                ),
                              );
                            }
                          }
                          for (let event of withValueEvents) {
                            if (
                              event.event?.withValue?.some(
                                (e) => e.id == currentWithValueEvent.id,
                              )
                            ) {
                              let withValueObj = event.event?.withValue?.find(
                                (e) => e.id === currentWithValueEvent.id,
                              );
                              for (let key of newDynamicValues) {
                                if (!withValueObj[key]) {
                                  withValueObj[key] = "";
                                }
                              }
                              updateGameValueArray(
                                "events.withValueEvent",

                                // return new action
                                updateValueArray(
                                  "event.withValue",
                                  event,
                                  withValueObj,
                                  "update",
                                  { newIdKey: "componentId" },
                                ),
                              );
                            }
                          }

                          for (let event of events) {
                            if (
                              event.event?.withValue?.some(
                                (e) => e.id == currentWithValueEvent.id,
                              )
                            ) {
                              let withValueObj = event.event?.withValue?.find(
                                (e) => e.id === currentWithValueEvent.id,
                              );
                              for (let key of newDynamicValues) {
                                if (!withValueObj[key]) {
                                  withValueObj[key] = "";
                                }
                              }
                              updateGameValueArray(
                                "events.events",

                                // return new action
                                updateValueArray(
                                  "event.withValue",
                                  event,
                                  withValueObj,
                                  "update",
                                  { newIdKey: "componentId" },
                                ),
                              );
                            }
                          }
                        }}
                        suggestions={suggestions}
                      ></WithValueEventCard>
                    );
                  },
                )
              ) : (
                <span className="normalText">{t("noWithValueEvent")}</span>
              )}
            </DetailContainer>
            
            {/* ========== WITH VALUE EVENTS QUI APPELLENT CETTE WITH VALUE EVENT ============== */}
           {/* 
            <DetailContainer
              title={"calledInTheseWithValueEvent"}
              description="hereIsAllWithValueWichCallThisEvent"
            >
              <div className="wrapperSelection">
                {withValueEvents &&
                  withValueEvents.map(
                    (withValue, index) =>
                      withValue.id != currentWithValueEvent.id && (
                        <EventCard
                          alertMessages={[withValue.id + "|withValueEvent|"]}
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
*/}
            <div className="basicContainer">
              {/* ========== METADONNEES ============== */}
              <TitleContainer title={"metadata"}></TitleContainer>
              <span>
                {t("uniqueId")} : {currentWithValueEvent.id}
              </span>
              <span>
                {t("calledInTheseEvents")} :
                {
                  events.filter((event) =>
                    event.event.withValue
                      ? event.event.withValue.filter(
                          (e) => e.id == currentWithValueEvent.id,
                        ).length > 0
                      : 0,
                  ).length
                }
              </span>
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
              {displayDeleteConfirmation &&
                (() => {
                  let appearInEvents = events.filter((event) =>
                    event.event.withValue
                      ? event.event.withValue.filter(
                          (e) => e.id == currentWithValueEvent.id,
                        ).length > 0
                      : 0,
                  );
                  let appearInwithValueEvents = withValueEvents.filter(
                    (event) =>
                      event.event.withValue
                        ? event.event.withValue.filter(
                            (e) => e.id == currentWithValueEvent.id,
                          ).length > 0
                        : 0,
                  );
                  let appearInActions = actions.filter((action) =>
                    action.withValue
                      ? action.withValue.filter(
                          (e) => e.id == currentWithValueEvent.id,
                        ).length > 0
                      : 0,
                  );

                  return (
                    <Confirm
                      actionOnCancel={() => {
                        setDisplayDeleteConfirmation(false);
                      }}
                      actionOnConfirm={() => {
                        for (let action of actions) {
                          if (
                            action.withValue?.some(
                              (e) => e.id == currentWithValueEvent.id,
                            )
                          ) {
                            let newAction = structuredClone(action);
                            newAction.withValue = newAction.withValue.filter(
                              (e) => e.id !== currentWithValueEvent.id,
                            );
                            updateGameValueArray(
                              "params.tours.actions",
                              newAction,
                            );
                          }
                        }

                        for (let event of withValueEvents) {
                          if (
                            event.event?.withValue?.some(
                              (e) => e.id == currentWithValueEvent.id,
                            )
                          ) {
                            let newEvent = structuredClone(event);
                            newEvent.event.withValue =
                              newEvent.event.withValue.filter(
                                (e) => e.id !== currentWithValueEvent.id,
                              );
                            updateGameValueArray(
                              "events.withValueEvent",
                              newEvent,
                            );
                          }
                        }

                        for (let event of events) {
                          if (
                            event.event?.withValue?.some(
                              (e) => e.id == currentWithValueEvent.id,
                            )
                          ) {
                            let newEvent = structuredClone(event);
                            newEvent.event.withValue =
                              newEvent.event.withValue.filter(
                                (e) => e.id !== currentWithValueEvent.id,
                              );
                            updateGameValueArray("events.events", newEvent);
                          }
                        }

                        updateGameValueArray(
                          "events.withValueEvent",
                          currentWithValueEvent,
                          "delete",
                        );
                        setCurrentWithValueEvent(null);

                        setDisplayDeleteConfirmation(false);
                      }}
                    >
                      <TitleContainer
                        title={"deleteEvent"}
                        description={"doYouRealyWantToDeleteEvent"}
                      ></TitleContainer>
                      <p>{t("thisActionHasConsequences")}</p>
                      <ul>
                        <li>
                          {t("events")} ({appearInEvents.length})
                          {appearInEvents.length > 0 && " : "+
                            appearInEvents.map((e) => e.name).join(", ")}
                        </li>
                        <li>
                          {t("withValueEvents")} (
                          {appearInwithValueEvents.length})
                          {appearInwithValueEvents.length > 0 && " : "+
                            appearInwithValueEvents
                              .map((e) => e.name)
                              .join(", ")}
                        </li>
                        <li>
                          {t("actions")} ({appearInActions.length})
                          {appearInActions.length > 0  && " : "+
                            appearInActions.map((a) => a.name).join(", ")}
                        </li>
                      </ul>
                    </Confirm>
                  );
                })()}
              <Button
                text={"delete"}
                type="redButton"
                action={() => setDisplayDeleteConfirmation(true)}
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
