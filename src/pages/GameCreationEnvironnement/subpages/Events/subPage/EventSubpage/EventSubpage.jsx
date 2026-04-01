import "./style.css";
import { useState, useEffect } from "react";
import Button from "../../../../../../components/Button/Button";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
import WithValueEventCard from "../../../../../../components/Cards/WithValueEventCard/WithValueEventCard.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer";
import Input from "../../../../../../components/input/Input.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";
import { useNotificationContext } from "../../../../../../context/NotificationContext.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import DemonCard from "../../../../../../components/Cards/DemonCard/DemonCard.jsx";
import DetailContainer from "../../../../../../components/DetailContainer/DetailContainer.jsx";
import { eventActions } from "../../../../../../../data/eventActions.js";
import { getDynamicValueForEvent } from "../../../../../../helpers/withValueEventManager.js";
import Confirm from "../../../../../../components/Confirm/Confirm.jsx";

export default function EventSubpage({
  events,
  demons,
  gains,
  suggestions,
  withValueEvents,
  updateGameValueArray,
  addACtionOnEvent,
  getEventFromIdAndType,
  loadDisabledFields,
  currentEvent,
  setCurrentEvent,
}) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const [disabledFields, setDisabledFields] = useState(null);
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  // setByDefault the first event if there is no current event
  useEffect(() => {
    if (events && !currentEvent) {
      setCurrentEvent(events[0]);

      setDisabledFields(loadDisabledFields(events[0]));
    }
  }, [events]);

  useEffect(() => {
    if (currentEvent) {
      setDisabledFields(loadDisabledFields(currentEvent));
    }
  }, [currentEvent, events]);

  if (!events) return;

  return (
    <div className={" eventSubPageOfEventsAndDeclencheurSubpage"}>
      <div className="left">
        <div className="headerEvent">
          <h2>{t("events")}</h2>
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
                  give: null,
                  action: null,
                  value: null,
                },
              };

              updateGameValueArray("events.events", newEvent, "new");
              setCurrentEvent(newEvent);

              setDisabledFields(loadDisabledFields(newEvent));
            }}
          />
        </div>
        <div className="wrapperEvents">
          {events &&
            events.map((event, index) => (
              <EventCard
                key={index}
                action={() => setCurrentEvent(event)}
                event={event}
                isSelected={currentEvent && event.id === currentEvent.id}
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={event.id + "|event|"}
                ></Alert>
              </EventCard>
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
                messages={[
                  currentEvent.id + "|event|invalidAction|warning",
                  currentEvent.id + "|event|eventNameCannotBeEmpty|alert",
                ]}
                alertList={alertList}
              ></Alert>

              <TitleContainer
                title="eventConfigurationTitle"
                description="eventConfigurationDescription"
              />
              {/* ========== NOM ============== */}
              <Input
                title="eventNameLabel"
                defaultValue={currentEvent.name ?? ""}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
              {/* ========== CONDITION ============== */}
              <Input
                title="activationCondition"
                description="activationConditionDescription"
                defaultValue={currentEvent.condition ?? ""}
                pathInObject="condition"
                suggestions={suggestions.filter(
                  (s) => !s.label.includes("{playerBoucle"),
                )}
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
              {/* ========== MESSAGE DE CHARGEMENT  ============== */}
              <Input
                title="loadMessage"
                description="loadMessageDescription"
                defaultValue={currentEvent.loadMessage ?? ""}
                pathInObject="loadMessage"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>

            {/* ========== BOUCLE ============== */}

            <div className="basicContainer">
              <InputSelect
                title="loop"
                pathObject="boucle"
                disabled={disabledFields && disabledFields.boucle}
                items={["{allPlayersInGame}"]}
                closeAfterSelect={true}
                selected={currentEvent.boucle ? [currentEvent.boucle] : []}
                updateValueArray={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(
                      path,
                      currentEvent,
                      value === currentEvent.boucle ? null : value,
                    ),
                  );
                }}
              ></InputSelect>
              <Input
                title="condition"
                disabled={disabledFields && disabledFields.condition}
                description="condition-in-boucle-description"
                defaultValue={currentEvent.event.condition ?? ""}
                pathInObject="event.condition"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>

            {/* ========== FROM ET FOR ============== */}

            <div className="basicContainer">
              <Alert
                messages={[
                  currentEvent.id +
                    "|event|eventHaveFromElementButNoFor|warning",
                ]}
                alertList={alertList}
              ></Alert>
              <Input
                title="entity-concerned"
                description="entity-concerned-description"
                defaultValue={currentEvent.event.from ?? ""}
                pathInObject="event.from"
                disabled={disabledFields && disabledFields.from}
                suggestions={
                  currentEvent.boucle
                    ? suggestions
                    : suggestions.filter(
                        (s) => !s.label.includes("{playerBoucle"),
                      )
                }
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />

              <Input
                title="entity-target"
                description="entity-target-description"
                defaultValue={currentEvent.event.for ?? ""}
                disabled={disabledFields && disabledFields.for}
                suggestions={(() => {
                  // on récupere l'element sélectionné et on récupère son type
                  // afin que les deux soient du même type

                  const fromElementSelected = suggestions.find(
                    (s) => s.label === currentEvent.event.from,
                  );

                  const typeOfFrom = fromElementSelected?.type;

                  let filtered = typeOfFrom
                    ? suggestions.filter((s) => s.types.includes(typeOfFrom))
                    : suggestions;

                  if (!currentEvent.boucle) {
                    filtered = filtered.filter(
                      (s) => !s.label.includes("{playerBoucle"),
                    );
                  }

                  return filtered;
                })()}
                pathInObject="event.for"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>

            {/* ========== GIVE ELEMENT ============== */}
            <div className="basicContainer">
              <Alert
                messages={[
                  currentEvent.id +
                    "|event|elementsGivesButNoFromAndFor|warning",
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
                    <Input
                      title={
                        gain.nom.charAt(0).toUpperCase() +
                        String(gain.nom).slice(1)
                      }
                      disabled={disabledFields && disabledFields.give}
                      defaultValue={
                        currentEvent.event.give
                          ? currentEvent.event.give["{gain#" + gain.id + "}"]
                            ? currentEvent.event.give["{gain#" + gain.id + "}"]
                            : ""
                          : ""
                      }
                      suggestions={
                        currentEvent.boucle
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
                        setCurrentEvent(
                          updateElementValue(path, currentEvent, value),
                        );
                      }}
                    />
                  </div>
                ))}
              <div>
                <Input
                  title="cards"
                  disabled={disabledFields && disabledFields.give}
                  defaultValue={
                    currentEvent.event.give
                      ? currentEvent.event.give["{cards}"]
                        ? currentEvent.event.give["{cards}"]
                        : ""
                      : ""
                  }
                  inputType="number"
                  suggestions={
                    currentEvent.boucle
                      ? suggestions.filter((s) => s.type === "number")
                      : suggestions.filter(
                          (s) =>
                            !s.label.includes("{playerBoucle") &&
                            s.type === "number",
                        )
                  }
                  pathInObject={"event.give.{cards}"}
                  onChangeFunction={(path, value) => {
                    setCurrentEvent(
                      updateElementValue(path, currentEvent, value),
                    );
                  }}
                />
              </div>
            </div>

            {/* ========== ACTION ============== */}
            <div className="basicContainer">
              <InputSelect
                title="eventAction"
                items={eventActions.filter((a) => a.label !== "askPlayer")}
                itemsDisplayFields={["label", "tooltip"]}
                closeAfterSelect={true}
                selected={
                  currentEvent.event.action ? [currentEvent.event.action] : []
                }
                updateValueArray={(value) => {
                  addACtionOnEvent(
                    currentEvent,
                    currentEvent.event.action == value.label ? null : value,
                    "event",
                  );

                  setDisabledFields(
                    loadDisabledFields({
                      event: {
                        action: value.label,
                      },
                    }),
                  );
                }}
                description={"eventActionDescription"}
              ></InputSelect>

              <Input
                disabled={disabledFields && disabledFields.value}
                title="eventValue"
                description="eventValueDescription"
                defaultValue={currentEvent.event.value ?? ""}
                pathInObject="event.value"
                onChangeFunction={(path, value) => {
                  setCurrentEvent(
                    updateElementValue(path, currentEvent, value),
                  );
                }}
              />
            </div>
            {/* ========== DEMONS ============== */}
            <DetailContainer
              title={"demonsWichExecuteThisEvent"}
              className="demonsAssociatedContainer"
              description="hereIsAllDemonWichCallThisEvent"
            >
              <div className="wrapperSelection">
                {demons &&
                  demons.map((demon, index) => (
                    <DemonCard
                      alertMessage={demon.id + "|demon|"}
                      key={index}
                      action={() => {
                        updateGameValueArray(
                          "events.demons",
                          updateValueArray("events", demon, currentEvent.id),
                        );
                      }}
                      demon={demon}
                      displayIcons={true}
                      isSelected={
                        demon.events && demon.events.includes(currentEvent.id)
                      }
                    />
                  ))}
              </div>
              {demons && demons.length === 0 && (
                <span className="normalText">{t("noDemonInGame")}</span>
              )}
            </DetailContainer>
            {/* ========== WithValueEvents ============== */}

            <DetailContainer
              title={"withValueEvent"}
              description={
                "withValueEventWichBeExecutedWhenThisEventIsTriggered"
              }
              className="demonsAssociatedContainer"
              topAlert={
                <Alert
                  messages={[
                    currentEvent.id +
                      "|event|callNonExistingWithValueEvent|alert",
                    currentEvent.id + "|event|missingValueForKey",
                    currentEvent.id +
                      "|event|eventCannotCallWithValueEventWithCurrentPlayer|alert",
                  ]}
                  alertList={alertList}
                ></Alert>
              }
            >
              <InputSelect
                title={"useWithValueEvent"}
                updateValueArray={(value) => {
                  setCurrentEvent(
                    updateValueArray(
                      "event.withValue",
                      currentEvent,
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
              {currentEvent.event.withValue &&
              currentEvent.event.withValue.length > 0 ? (
                currentEvent.event.withValue.map(
                  (withValueEventInputs, index) => {
                    let withValueEvent = getEventFromIdAndType(
                      withValueEventInputs.id,
                      "withValueEvent",
                    );
                    let keyInputInwithValueEvent =
                      getDynamicValueForEvent(withValueEvent);
                    function remove() {
                      console.log(withValueEventInputs.componentId);
                      setCurrentEvent(
                        updateValueArray(
                          "event.withValue",
                          currentEvent,
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
                          currentEvent.id +
                            "|event|eventCannotCallWithValueEventWithCurrentPlayer|alert",
                        ]}
                        className="withValueEventEdition"
                        withValueEventInputs={withValueEventInputs}
                        withValueEventKeys={keyInputInwithValueEvent}
                        modifyKeyValue={(path, value) => {
                          setCurrentEvent(
                            updateValueArray(
                              "event.withValue",
                              currentEvent,
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

            {/* ========== METADATA ============== */}
            <div className="basicContainer">
              <TitleContainer title={"metadata"}></TitleContainer>

              <span>
                {t("uniqueId")} : {currentEvent.id}
              </span>
              <span>
                {t("demonsWichExecuteThisEvent")} :
                {
                  demons.filter((demon) =>
                    demon.events.includes(currentEvent.id),
                  ).length
                }
              </span>
              <span>
                {t("callTheseWithValueEvent")} :
                {currentEvent.event.withValue
                  ? currentEvent.event.withValue.length
                  : 0}
              </span>
            </div>

            {/* ========== DELETE ============== */}
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              <TitleContainer
                title={"deleteEvent"}
                type="h2"
                description={"youDeleteEventWithoutSave"}
              />
              {displayDeleteConfirmation &&
                (() => {
                  let appearInDemons = demons.filter((demon) =>
                    demon.events.includes(currentEvent.id),
                  )

                  return (
                    <Confirm
                      actionOnCancel={() => {
                        setDisplayDeleteConfirmation(false);
                      }}
                      actionOnConfirm={() => {
                        for (let demon of demons) {
                          if (
                            demon.events?.some((id) => id == currentEvent.id)
                          ) {
                            let newDemon = structuredClone(demon);
                            newDemon.events = newDemon.events.filter(
                              (id) => id !== currentEvent.id,
                            );
                            updateGameValueArray("events.demons", newDemon);
                          }
                        }
                        updateGameValueArray(
                          "events.events",
                          currentEvent,
                          "delete",
                        );
                        setCurrentEvent(null);

                        setDisplayDeleteConfirmation(false);
                      }}
                    >
                      <TitleContainer
                      title={"doYouRealyWantToDeleteEvent"}
                      description={"youDeleteEventWithoutSave"}
                      ></TitleContainer> 
                      <p>{t("thisActionHasConsequences")}</p>
                      <ul>
                        <li>
                          {t("demons")} ({appearInDemons.length }) {appearInDemons.length > 0 && appearInDemons.map((d) => d.name).join(", ")}
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
