// CSS
import "./style.css";

// External libraries
import { useEffect, useState } from "react";
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
import { getSugggestionForPlayer } from "../../../../../../helpers/suggestions.js";
import { createHistoryElement } from "../../../../../../helpers/historyObject.js";

// Components
import DragAndDropSortList from "../../../../../../components/DragAndDropSortList/DragAndDropSortList.jsx";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Button from "../../../../../../components/Button/Button.jsx";
import Input from "../../../../../../components/Input/Input.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import TriggerCard from "../../../../../../components/Cards/TriggerCard/TriggerCard.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
export default function TriggerSubpage({
  triggers,
  events,
  updateGameValue,
  gameId,
  globalPlayerValue,
  updateGameValueArray,
  suggestions,
  getEventFromIdAndType,
}) {
  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  const {
    currentTrigger,
    setCurrentTrigger,
    setCurrentEvent,
    setCurrentSubpageOfEvents,
  } = useGameContext();
  const { alertList } = useNotificationContext();
  const { t } = useTranslation();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const { addItem } = useHistoryContext();
  const [firstLoad, setFirstLoad] = useState(true);

  if (!triggers) return;

  useEffect(() => {
    if (triggers && !currentTrigger && firstLoad) {
      setCurrentTrigger(triggers[0]);
    }
  }, []);

  useEffect(() => {
    if (currentTrigger && !firstLoad) {
      updateGameValueArray("events.triggers", currentTrigger);
      addItem(
        gameId,
        createHistoryElement("triggers", "edit", { id: currentTrigger.id }),
      );
    }
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [currentTrigger]);
  console.log(currentTrigger?.events);
  return (
    <div className={" triggersubPageOftriggersAndDeclencheurSubpage"}>
      <div className="left">
        <div className="headerEvent">
          <h2>{t("triggers")}</h2>
          <Button
            text={"new"}
            icon={"add-white"}
            type="grey"
            action={() => {
              let newId = Date.now();
              updateGameValueArray(
                "events.triggers",
                {
                  id: newId,
                  condition: "",
                  name: "",
                  events: [],
                },
                "new",
              );
              addItem(
                gameId,
                createHistoryElement("triggers", "add", { id: newId }),
              );
            }}
          />
        </div>
        <div className="wrappertriggers">
          {triggers &&
            triggers.map((trigger, index) => (
              <TriggerCard
                key={index}
                action={() => setCurrentTrigger(trigger)}
                trigger={trigger}
                isSelected={currentTrigger && trigger == currentTrigger}
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={trigger.id + "|trigger|"}
                ></Alert>
              </TriggerCard>
            ))}
        </div>
      </div>

      <div className="right">
        <div className="headerRight">
          <TitleContainer title="triggers" description="eventDescription" />
          {playerHasEdit && currentTrigger && (
            <Button
              text="save"
              icon="save-white"
              type="violetButton"
              action={() => save(currentTrigger)}
            />
          )}
        </div>

        {currentTrigger ? (
          <>
            {/* ========== NOM ============== */}
            <div className="basicContainer">
              <Alert
                alertList={alertList}
                messages={[
                  currentTrigger.id + "|trigger|triggerNameCannotBeEmpty|alert",
                ]}
              ></Alert>
              <TitleContainer
                title="triggerConfigurationTitle"
                description="triggerConfigurationDescription"
              />
              <Input
                title="triggerNameLabel"
                defaultValue={currentTrigger.name}
                hint={"caractereMax75"}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  if (value.length > 75) {
                    value = value.slice(0, 75);
                  }
                  setCurrentTrigger(
                    updateElementValue(path, currentTrigger, value),
                  );
                }}
              />
              <InputSelect
                title="loop"
                pathObject="boucle"
                items={["{allPlayersInGame}"]}
                closeAfterSelect={true}
                selected={currentTrigger.boucle ? [currentTrigger.boucle] : []}
                updateValueArray={(path, value) => {
                  setCurrentTrigger(
                    updateElementValue(
                      path,
                      currentTrigger,
                      value === currentTrigger.boucle ? null : value,
                    ),
                  );
                }}
              ></InputSelect>
            </div>

            <div className="basicContainer">
              {/* ========== CONDITION ============== */}
              <Alert
                alertList={alertList}
                messages={[
                  currentTrigger.id + "|trigger|triggerConditionMustNotBeEmpty|alert",
                ]}
              ></Alert>

              <Input
                  isExpression={true}
                title="condition"
                suggestions={
                  currentTrigger.boucle
                    ? suggestions
                    : suggestions.filter(
                        (s) => !s.label.includes("{playerBoucle"),
                      )
                }
                  isExpression={true} 
                defaultValue={currentTrigger.condition}
                pathInObject="condition"
                onChangeFunction={(path, value) =>
                  setCurrentTrigger(updateElementValue(path, currentTrigger, value))
                }
              />
            </div>

            <div className="basicContainer eventAssociatedSection">
              {/* ========== EVENTS ASSOCIÉS ============== */}
              <Alert
                alertList={alertList}
                messages={[
                  currentTrigger.id + "|trigger|triggerEventsMustNotBeEmpty|warning",
                  currentTrigger.id + "|trigger|triggerCallNonExistingEvent|alert",
                ]}
              ></Alert>

              <TitleContainer
                title="events"
                description="trigger-event-description"
              />
              <InputSelect
                title={"useWithValueEvent"}
                updateValueArray={(value) => {
                  setCurrentTrigger(
                    updateValueArray("events", currentTrigger, value.id,"new"),
                  );
                }}
                closeAfterSelect={true}
                selected={[t("selectEventToAssociateWithTrigger")]}
                items={events}
                itemsDisplayFields={["id", "name"]}
              />
              {currentTrigger.events && (
                <DragAndDropSortList
                 
                  itemsDefault={currentTrigger.events.map((eventId) =>
                    events.find((e) => e.id === eventId),
                  )}
                  onChangeItems={(newItems) => { 
                    setCurrentTrigger(
                      updateElementValue("events", currentTrigger, newItems.map(item => item.id),"replace"),
                    );
                  }}
                  type="Trigger"
                />
              )}
            </div>
            {/* ========== METADATA ============== */}
            <div className="basicContainer">
              <TitleContainer title={"metadata"}></TitleContainer>

              <span>
                {t("uniqueId")} : {currentTrigger.id}
              </span>

              <span>
                {t("callTheseEvents")} :
                {currentTrigger.events ? currentTrigger.events.length : 0}
              </span>
            </div>
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              {/* ========== SUPPRESSION ============== */}
              <TitleContainer
                title={"deleteTrigger"}
                type="h2"
                description={"youDeleteTriggerWithoutSave"}
              />

              <Button
                text={"delete"}
                type="redButton"
                action={async () => {
                  if (confirm(t("doYouRealyWantToDeleteTrigger"))) {
                    updateGameValueArray(
                      "events.triggers",
                      currentTrigger,
                      "delete",
                    );
                    addItem(
                      gameId,
                      createHistoryElement("triggers", "delete", {
                        id: currentTrigger.id,
                      }),
                    );
                    setCurrentTrigger(null);
                  }
                }}
              ></Button>
            </div>
          </>
        ) : (
          <span>{t("noTriggerSelected")}</span>
        )}
        {/*Declencheurs : listes les elements qui l'appellent*/}
      </div>
    </div>
  );
}
