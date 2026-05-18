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
import Input from "../../../../../../components/input/Input.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import DemonCard from "../../../../../../components/Cards/DemonCard/DemonCard.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";
export default function DemonSubpage({
  demons,
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
    currentDemon,
    setCurrentDemon,
    setCurrentEvent,
    setCurrentSubpageOfEvents,
  } = useGameContext();
  const { alertList } = useNotificationContext();
  const { t } = useTranslation();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const { addItem } = useHistoryContext();
  const [firstLoad, setFirstLoad] = useState(true);

  if (!demons) return;

  useEffect(() => {
    if (demons && !currentDemon && firstLoad) {
      setCurrentDemon(demons[0]);
    }
  }, []);

  useEffect(() => {
    if (currentDemon && !firstLoad) {
      updateGameValueArray("events.demons", currentDemon);
      addItem(
        gameId,
        createHistoryElement("demons", "edit", { id: currentDemon.id }),
      );
    }
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [currentDemon]);
  console.log(currentDemon?.events);
  return (
    <div className={" demonsubPageOfdemonsAndDeclencheurSubpage"}>
      <div className="left">
        <div className="headerEvent">
          <h2>{t("demons")}</h2>
          <Button
            text={"new"}
            icon={"add-white"}
            type="grey"
            action={() => {
              let newId = Date.now();
              updateGameValueArray(
                "events.demons",
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
                createHistoryElement("demons", "add", { id: newId }),
              );
            }}
          />
        </div>
        <div className="wrapperdemons">
          {demons &&
            demons.map((demon, index) => (
              <DemonCard
                key={index}
                action={() => setCurrentDemon(demon)}
                demon={demon}
                isSelected={currentDemon && demon == currentDemon}
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={demon.id + "|demon|"}
                ></Alert>
              </DemonCard>
            ))}
        </div>
      </div>

      <div className="right">
        <div className="headerRight">
          <TitleContainer title="demons" description="eventDescription" />
          {playerHasEdit && currentDemon && (
            <Button
              text="save"
              icon="save-white"
              type="violetButton"
              action={() => save(currentDemon)}
            />
          )}
        </div>

        {currentDemon ? (
          <>
            {/* ========== NOM ============== */}
            <div className="basicContainer">
              <Alert
                alertList={alertList}
                messages={[
                  currentDemon.id + "|demon|demonNameCannotBeEmpty|alert",
                ]}
              ></Alert>
              <TitleContainer
                title="demonConfigurationTitle"
                description="demonConfigurationDescription"
              />
              <Input
                title="demonNameLabel"
                defaultValue={currentDemon.name}
                hint={"caractereMax75"}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  if (value.length > 75) {
                    value = value.slice(0, 75);
                  }
                  setCurrentDemon(
                    updateElementValue(path, currentDemon, value),
                  );
                }}
              />
              <InputSelect
                title="loop"
                pathObject="boucle"
                items={["{allPlayersInGame}"]}
                closeAfterSelect={true}
                selected={currentDemon.boucle ? [currentDemon.boucle] : []}
                updateValueArray={(path, value) => {
                  setCurrentDemon(
                    updateElementValue(
                      path,
                      currentDemon,
                      value === currentDemon.boucle ? null : value,
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
                  currentDemon.id + "|demon|demonConditionMustNotBeEmpty|alert",
                ]}
              ></Alert>

              <Input
                  isExpression={true}
                title="condition"
                suggestions={
                  currentDemon.boucle
                    ? suggestions
                    : suggestions.filter(
                        (s) => !s.label.includes("{playerBoucle"),
                      )
                }
                  isExpression={true}
                description="condition"
                defaultValue={currentDemon.condition}
                pathInObject="condition"
                onChangeFunction={(path, value) =>
                  setCurrentDemon(updateElementValue(path, currentDemon, value))
                }
              />
            </div>

            <div className="basicContainer eventAssociatedSection">
              {/* ========== EVENTS ASSOCIÉS ============== */}
              <Alert
                alertList={alertList}
                messages={[
                  currentDemon.id + "|demon|demonEventsMustNotBeEmpty|warning",
                  currentDemon.id + "|demon|demonCallNonExistingEvent|alert",
                ]}
              ></Alert>

              <TitleContainer
                title="events"
                description="demon-event-description"
              />
              <InputSelect
                title={"useWithValueEvent"}
                updateValueArray={(value) => {
                  setCurrentDemon(
                    updateValueArray("events", currentDemon, value.id,"new"),
                  );
                }}
                closeAfterSelect={true}
                selected={[t("selectEventToAssociateWithDemon")]}
                items={events}
                itemsDisplayFields={["id", "name"]}
              />
              {currentDemon.events && (
                <DragAndDropSortList
                 
                  itemsDefault={currentDemon.events.map((eventId) =>
                    events.find((e) => e.id === eventId),
                  )}
                  onChangeItems={(newItems) => { 
                    setCurrentDemon(
                      updateElementValue("events", currentDemon, newItems.map(item => item.id),"replace"),
                    );
                  }}
                  type="Demon"
                />
              )}
            </div>
            {/* ========== METADATA ============== */}
            <div className="basicContainer">
              <TitleContainer title={"metadata"}></TitleContainer>

              <span>
                {t("uniqueId")} : {currentDemon.id}
              </span>

              <span>
                {t("callTheseEvents")} :
                {currentDemon.events ? currentDemon.events.length : 0}
              </span>
            </div>
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              {/* ========== SUPPRESSION ============== */}
              <TitleContainer
                title={"deleteDemon"}
                type="h2"
                description={"youDeleteDemonWithoutSave"}
              />

              <Button
                text={"delete"}
                type="redButton"
                action={async () => {
                  if (confirm(t("doYouRealyWantToDeleteDemon"))) {
                    updateGameValueArray(
                      "events.demons",
                      currentDemon,
                      "delete",
                    );
                    addItem(
                      gameId,
                      createHistoryElement("demons", "delete", {
                        id: currentDemon.id,
                      }),
                    );
                    setCurrentDemon(null);
                  }
                }}
              ></Button>
            </div>
          </>
        ) : (
          <span>{t("noDemonSelected")}</span>
        )}
        {/*Declencheurs : listes les elements qui l'appellent*/}
      </div>
    </div>
  );
}
