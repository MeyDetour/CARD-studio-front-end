// CSS
import "./style.css";

// External libraries
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import { useNotificationContext } from "../../../../../../context/NotificationContext.jsx";
import { useHistoryContext } from "../../../../../../context/HistoryContext.jsx";

// Helpers
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";
import { getDynamicValueForEvent } from "../../../../../../helpers/withValueEventManager.js";
import { createHistoryElement } from "../../../../../../helpers/historyObject.js";

// Data
import { eventActions } from "../../../../../../../data/eventActions.js";

// Components
import DragAndDropSortList from "../../../../../../components/DragAndDropSortList/DragAndDropSortList.jsx";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Button from "../../../../../../components/Button/Button.jsx";
import Input from "../../../../../../components/input/Input.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import Confirm from "../../../../../../components/Confirm/Confirm.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
import WithValueEventCard from "../../../../../../components/Cards/WithValueEventCard/WithValueEventCard.jsx";
import DemonCard from "../../../../../../components/Cards/DemonCard/DemonCard.jsx";
import DetailContainer from "../../../../../../components/DetailContainer/DetailContainer.jsx";

export default function EventSubpage({
  events,
  demons,
  gains,
  actions,
  suggestions,
  updateGameValueArray,
  getEventFromIdAndType,
  currentEvent,
  gameId,
  setCurrentEvent,
}) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const [disabledFields, setDisabledFields] = useState(null);
  const [eventFirstLoad, setEventFirstLoad] = useState(true);
  const [examplesEvents, setExamplesEvents] = useState([
    {
      id: "example1",
      name: "Shuffle cards",
      condition: null,
      event: {
        from: "{discardDeck}",
        for: "{deck}",
        give: { "{cards}": "*" },
        action: "suffle",
      },
    },
  ]);
  const [displayExamplesEvents, setDisplayExamplesEvents] = useState(false);
  const [isInExampleMode, setIsInExampleMode] = useState(false);
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const { addItem } = useHistoryContext();

  function addACtionOnEvent(event, action, type) {
    let newEvent = { ...event };
    console.log(event, action, type);
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
      if (!action.necessiteBoucleCondition) {
        newEvent.event.condition = null;
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
  }
  function getActionObj(action) {
    return eventActions.find((actionItem) => actionItem.label === action);
  }
  function loadDisabledFields(event) {
    if (!event?.event?.action) return {};

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
    if (!action.necessiteBoucleCondition) {
      obj.boucleCondition = true;
    }
    if (!action.necessiteRequiresInput) {
      obj.requiresInput = true;
    }
    if (action.gimmeAClueForValue) {
      obj.gimmeAClueForValue = true;
    }
    return obj;
  }

  // Met à jour le contexte du jeu lors de la modification d’un événement courant.
  // Ces fonctions sont placées ici (et non dans les pages) car elles modifient directement les variables currentEvent et currentWithValueEvent.
  // Cela permet aux sous-composants de détecter les changements, même si les modifications sont effectuées en dehors de leur propre composant.
  // Les fonctions sont spécifiques aux événements et withValueEvents, et reçoivent les variables concernées en paramètre pour garantir la réactivité des champs.

  // Sépare la gestion du premier lancement pour éviter toute modification ou ajout à l'historique

  useEffect(() => {
    if (currentEvent && eventFirstLoad) {
      setEventFirstLoad(false);
      return;
    }
    if (currentEvent && isInExampleMode) {
      return;
    }
    if (currentEvent && !eventFirstLoad) {
      updateGameValueArray("events.events", currentEvent);
      addItem(
        gameId,
        createHistoryElement("events", "edit", { id: currentEvent.id }),
      );
    }
  }, [currentEvent]);
  // setByDefault the first event if there is no current event
  useEffect(() => {
    if (events && !currentEvent) {
      setCurrentEvent(events[0]);
      setDisabledFields(loadDisabledFields(events[0]));
    }
  }, []);

  useEffect(() => {
    if (currentEvent) {
      setDisabledFields(loadDisabledFields(currentEvent));
    }
  }, [currentEvent, events]);

  if (!events) return;

  return (
    <>
      <div className={" eventSubPageOfEventsAndDeclencheurSubpage"}>
        <div className="left">
          <div className="headerEvent">
            <h2>{t("events")}</h2>
            <div className="row">
              <Button
                text={"new"}
                icon={"add-white"}
                type="grey"
                action={() => {
                  let id = Date.now();
                  let newEvent = {
                    id: id,
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
                  addItem(
                    gameId,
                    createHistoryElement("events", "add", { id: id }),
                  );
                  setDisabledFields(loadDisabledFields(newEvent));
                }}
              />
              <Button
                text={"examples"}
                type={"violetButton"}
                action={() => {
                  setDisplayExamplesEvents(!displayExamplesEvents);
                }}
              />
            </div>
          </div>
          <div className="wrapperEvents">
            {displayExamplesEvents &&
              examplesEvents.map((event, index) => (
                <EventCard
                  key={index}
                  action={() => {
                    setCurrentEvent(event);
                    setIsInExampleMode(true);
                  }}
                  event={event}
                  classAdded={"exampleEventCard"}
                  isSelected={currentEvent && event.id === currentEvent.id}
                >
                  <Alert
                    alertList={alertList}
                    displayAlertStartWith={event.id + "|event|"}
                  ></Alert>
                </EventCard>
              ))}{" "}
            {events &&
              events.map((event, index) => (
                <EventCard
                  key={index}
                  action={() => {
                    setCurrentEvent(event);
                    setIsInExampleMode(false);
                  }}
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
                <div className="row">
                  <TitleContainer
                    title="eventConfigurationTitle"
                    description="eventConfigurationDescription"
                  />
                  <Button
                    text={"utiliser"}
                    icon={"add-white"}
                    type="grey"
                    action={() => {
                      let newEvent = { ...currentEvent };
                      newEvent.id = Date.now();
                      setCurrentEvent(newEvent);
                      updateGameValueArray("events.events", newEvent);
                      setIsInExampleMode(false);
                    }}
                  />
                </div>

                {/* ========== NOM ============== */}
                <Input
                  title="eventNameLabel"
                  defaultValue={currentEvent.name ?? ""}
                  disabled={isInExampleMode}
                  pathInObject="name"
                  onChangeFunction={(path, value) => {
                    setCurrentEvent(
                      updateElementValue(path, currentEvent, value),
                    );
                  }}
                />

                {/* ========== VARIABLE DISPONIBLES ============== */}
                {/* Si une action appel cet event, on le précise */}
                {/* on expose les variables disponibles grâce aux actions */}
                {actions.some((a) =>
                  a.withValue.some((wve) => wve.id === currentEvent.id),
                ) && (
                  <div className="basicContainer basicWarningContainer">
                    {actions
                      .filter((a) =>
                        a.withValue.some((wve) => wve.id === currentEvent.id),
                      )
                      .map((a, index) => (
                        <span key={index}>
                          <b>
                            {t("variableAvalaibleThanksActions")} {a.name}
                            <p>
                              {t(
                                "theseVariablesCanBeUndefinedBecauseTheyAreOnlyAvailableInCertainContexts",
                              )}
                            </p>
                            <ul>
                              {a.actionOnHand && (
                                <li>
                                  <span className="variableName">
                                    {"{selectedCards}"}
                                  </span>{" "}
                                  : {t("theCardsOnWhichActionIsApplied")}
                                </li>
                              )}
                              {a.askValueToPlayThisAction && (
                                <li>
                                  <span className="variableName">
                                    {"{insertedValue}"}
                                  </span>
                                  : {t("theValueAskedToPlayerToPlayThisAction")}
                                </li>
                              )}
                            </ul>
                          </b>
                        </span>
                      ))}
                  </div>
                )}
                {/* ========== CONDITION ============== */}
                <Input
                  title="activationCondition"
                  description="activationConditionDescription"
                  defaultValue={currentEvent.condition ?? ""}
                  disabled={isInExampleMode}
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
                  defaultValue={currentEvent.loadMessage ?? ""}
                  pathInObject="loadMessage"
                  disabled={isInExampleMode}
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
                  description="boucleDescription"
                  disabled={
                    (disabledFields && disabledFields.boucle) || isInExampleMode
                  }
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
                  disabled={
                    (disabledFields && disabledFields.condition) ||
                    isInExampleMode
                  }
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
                      "|event|eventHaveFromElementButNoFor|warning", currentEvent.id +
                      "|event|elementsGivesButNoFor",
                  ]}
                  alertList={alertList}
                ></Alert>
                <Input
                  title="entity-concerned"
                  description="entity-concerned-description"
                  defaultValue={currentEvent.event.from ?? ""}
                  pathInObject="event.from"
                  disabled={
                    (disabledFields && disabledFields.from) || isInExampleMode
                  }
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
                  disabled={
                    (disabledFields && disabledFields.for) || isInExampleMode
                  }
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
                          gain.name.charAt(0).toUpperCase() +
                          String(gain.name).slice(1)
                        }
                        disabled={
                          (disabledFields && disabledFields.give) ||
                          isInExampleMode
                        }
                        defaultValue={
                          currentEvent.event.give
                            ? currentEvent.event.give["{gain#" + gain.id + "}"]
                              ? currentEvent.event.give[
                                  "{gain#" + gain.id + "}"
                                ]
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
                    disabled={
                      (disabledFields && disabledFields.give) || isInExampleMode
                    }
                    defaultValue={
                      currentEvent.event.give
                        ? currentEvent.event.give["{cards}"]
                          ? currentEvent.event.give["{cards}"]
                          : ""
                        : ""
                    }
                    placeholder={"e.g. 2, {allPlayersInGame} ,*"}
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
                  disabled={isInExampleMode}
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

                {disabledFields && disabledFields.valueAvailableInEdition && (
                  <InputSelect
                    title="loop"
                    pathInObject="event.value"
                    description={
                      disabledFields.gimmeAClueForValue
                        ? t("gimmeAClueForValue")
                        : ""
                    }
                    disabled={
                      (disabledFields && disabledFields.boucle) ||
                      isInExampleMode
                    }
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
                )}

                <Input
                  disabled={
                    (disabledFields && disabledFields.value) || isInExampleMode
                  }
                  title="eventValue"
                  description={disabledFields?.gimmeAClueForValue ?? ""}
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
              {/*N'apparait pas si c'event est un exemple */}
              {!isInExampleMode && (
                <>
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
                                updateValueArray(
                                  "events",
                                  demon,
                                  currentEvent.id,
                                ),
                              );
                            }}
                            demon={demon}
                            displayIcons={true}
                            isSelected={
                              demon.events &&
                              demon.events.includes(currentEvent.id)
                            }
                          />
                        ))}
                    </div>
                    {demons && demons.length === 0 && (
                      <span className="normalText">
                        {t("noDemonCallThisEvent")}
                      </span>
                    )}
                  </DetailContainer>


                  {/* ========== WithValueEvents ============== */}

                  {/*N'apparait pas si c'event est un exemple */}

                  <DetailContainer
                    title={"withValueEvent"}
                    description={"eventsToEXecuteAfter"}
                    className="demonsAssociatedContainer"
                    topAlert={
                      <Alert
                        messages={[
                          currentEvent.id + "|event|callNonExistingEvent|alert",
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
                      items={events}
                      itemsDisplayFields={["id", "name"]}
                    />
                    {currentEvent.event.withValue &&
                    currentEvent.event.withValue.length > 0 ? (
                      currentEvent.event.withValue.map(
                        (withValueEventInputs, index) => {
                          let originEvent = getEventFromIdAndType(
                            withValueEventInputs.id,
                            "event",
                          );
                          let keyInputInwithValueEvent =
                            getDynamicValueForEvent(originEvent);
                          function remove() {
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
                                if (!originEvent) {
                                  remove();
                                }
                              }}
                              withValueEvent={
                                originEvent
                                  ? originEvent
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
                      <span className="normalText">{t("noEventToCall")}</span>
                    )}
                  </DetailContainer>

                  {/* ========== METADATA ============== */}
                  {/*N'apparait pas si c'event est un exemple */}

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
                  {/*N'apparait pas si c'event est un exemple */}
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
                        );

                        return (
                          <Confirm
                            actionOnCancel={() => {
                              setDisplayDeleteConfirmation(false);
                            }}
                            actionOnConfirm={() => {
                              // Supprimer les appels dans les demons
                              for (let demon of demons) {
                                if (
                                  demon.events?.some(
                                    (id) => id == currentEvent.id,
                                  )
                                ) {
                                  let newDemon = structuredClone(demon);
                                  newDemon.events = newDemon.events.filter(
                                    (id) => id !== currentEvent.id,
                                  );
                                  updateGameValueArray(
                                    "events.demons",
                                    newDemon,
                                  );
                                }
                              }
                              //supprimer les appels dans les autres events
                              for (let event of events) {
                                if (
                                  event?.event?.withValue?.some(
                                    (id) => id == currentEvent.id,
                                  )
                                ) {
                                  let newEvent = structuredClone(event);
                                  newEvent.event.withValue =
                                    newEvent.event.withValue.filter(
                                      (id) => id !== currentEvent.id,
                                    );
                                  updateGameValueArray(
                                    "events.events",
                                    newEvent,
                                  );
                                }
                              }
                              // supprimer l'event
                              updateGameValueArray(
                                "events.events",
                                currentEvent,
                                "delete",
                              );
                              // Ajouter dans l'historique
                              addItem(
                                gameId,
                                createHistoryElement("events", "delete", {
                                  id: currentEvent.id,
                                }),
                              );
                              // reset current event
                              setCurrentEvent(null);

                              // fermer la confirmation
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
                                {t("demons")} ({appearInDemons.length}){" "}
                                {appearInDemons.length > 0 &&
                                  appearInDemons.map((d) => d.name).join(", ")}
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
              )}
            </>
          ) : (
            <span>{t("noEventSelected")}</span>
          )}
          {/*Declencheurs : listes les elements qui l'appellent*/}
        </div>
      </div>
    </>
  );
}
