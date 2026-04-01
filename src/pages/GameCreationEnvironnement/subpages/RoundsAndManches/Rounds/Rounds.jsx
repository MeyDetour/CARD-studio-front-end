import { useTranslation } from "react-i18next";
import { splitText } from "../../../../../helpers/text";
import Button from "../../../../../components/Button/Button";
import Icon from "../../../../../components/Icon/Icon";
import { useState, useEffect } from "react";
import Input from "../../../../../components/input/Input";
import InputRange from "../../../../../components/inputRange/inputRange";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import Alert from "../../../../../components/Alert/Alert";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../helpers/objectManagement";
import { useGameContext } from "../../../../../context/GameContext";
import DetailContainer from "../../../../../components/DetailContainer/DetailContainer";
import WithValueEventCard from "../../../../../components/Cards/WithValueEventCard/WithValueEventCard";
import { useNotificationContext } from "../../../../../context/NotificationContext";

import { useNavigate } from "react-router";
import { getDynamicValueForEvent } from "../../../../../helpers/withValueEventManager";

export default function RoundsPage({
  gameData,
  updateGameValueArray,
  updateGameValue,
  getEventFromIdAndType,
}) {
  const { t } = useTranslation();
  const [currentElementToEdit, setCurrentElementToEdit] = useState(null);
  const { removeAlert, setAlert, alertList, getAlert } =
    useNotificationContext();
  const { setCurrentSubpageOfEvents } = useGameContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentElementToEdit !== null && gameData) {
      updateGameValueArray("params.tours.actions", currentElementToEdit);
    }
  }, [currentElementToEdit]);

  return (
    <>
      <div className="basicContainer">
        <TitleContainer
          title="roundsManagement"
          description="globalManagementForTours"
        ></TitleContainer>

        <div className="innerContainer">
          <span className="normalText">
            {t("maxNumberOfToursInGame")} : {gameData.tours.maxTour}
          </span>
          <InputRange
            type="range"
            min={0}
            max={100}
            maxValue={gameData.tours.maxTour}
            setMaxValue={(value) =>
              updateGameValue("params.tours.maxTour", value)
            }
          ></InputRange>
        </div>

        <div className="row">
          <InputSelect
            title="orderOfTours"
            updateValueArray={updateGameValue}
            pathObject="params.tours.sens"
            selected={gameData.tours.sens ? [gameData.tours.sens] : []}
            items={["incrementation", "decrementation"]}
            closeAfterSelect={true}
          />
          <InputSelect
            title="firstPlayer"
            updateValueArray={updateGameValue}
            closeAfterSelect={true}
            pathObject="params.tours.firstPlayer"
            selected={
              gameData.tours.firstPlayer ? [gameData.tours.firstPlayer] : []
            }
            items={["randomPlayer", "definedPlayer", "calculatedPlayer"]}
          />
        </div>
        {gameData.tours && gameData.tours.firstPlayer === "definedPlayer" && (
          <div className="innerContainer">
            <span className="normalText">
              {t("positionOfPlayerWhoHasToPlay")} :
              {gameData.tours.definePlayerWhoHasToPlayFirst}
            </span>
            <InputRange
              type="unique"
              min={1}
              max={
                gameData.globalGame.maxPlayer - gameData.globalGame.minPlayer
              }
              maxValue={
                gameData.tours.firstPlayerValue
                  ? gameData.tours.firstPlayerValue
                  : 1
              }
              setMaxValue={(value) =>
                updateGameValue("params.tours.firstPlayerValue", value)
              }
            ></InputRange>
          </div>
        )}
        {gameData.tours &&
          gameData.tours.firstPlayer === "calculatedPlayer" && (
            <div className="innerContainer">
              <Input
                title="definedPlayerWhoHasToPlayFirst"
                description="writeExpressionToCalculateFirstPlayer"
                defaultValue={gameData.tours.firstPlayerExpression}
                pathInObject="params.tours.firstPlayerExpression"
                onChangeFunction={updateGameValue}
              />
            </div>
          )}
        <Input
          title="numberOfStratingTour"
          defaultValue={gameData.tours.startNumber}
          onChangeFunction={updateGameValue}
          inputType="number"
          pathInObject={"params.tours.startNumber"}
        />
        {/* <InputSelect
          title="conditionToChangeTour"
          updateValueArray={(path, value) => {
            updateGameValueArray(
              "events.events",
              {
                name: "allPlayersHasPlayed/endOfTour",
                condition: "",
                event: [],
              },
              "new",
            );
            updateGameValue(path, value);
          }}
          closeAfterSelect={true}
          pathObject="params.tours.endOfTour"
          selected={gameData.tours.endOfTour}
          items={["allPlayersHasPlayed/endOfTour", "atEndOfTime"]}
        />*/}
      </div>
      <div className="basicContainer">
        <TitleContainer
          title="roundsManagementTimer"
          description="roundsManagementTimerDescription"
        ></TitleContainer>
        <Input
          title="rounds-timer-activation"
          description="rounds-timer-activation-description"
          defaultValue={gameData.tours.timerActivation ?? false}
          inputType="toggle"
          pathInObject="params.tours.timerActivation"
          onChangeFunction={updateGameValue}
        />
        {(gameData.tours.timerActivation ?? false) && (
          <div className="innerContainer">
            <span className="normalText">
              {t("durationTimeOfTourInSecond")} : {gameData.tours.duration ?? 0}
              s
            </span>
            <InputRange
              type="range"
              min={0}
              max={400}
              maxValue={gameData.tours.duration ?? 0}
              setMaxValue={(value) =>
                updateGameValue("params.tours.duration", value)
              }
            ></InputRange>
          </div>
        )}
      </div>
      <div className="basicContainer playerTurnActionSection">
        <TitleContainer
          title={"actionOfPlayerAtTurn"}
          icon="profile-settings"
          type="h2"
          description={"manageActionOfPlayerAtTurn"}
        />
        <Input
          title="actionOfPlayerAtTurn"
          description="playersCanPlayInSameTime"
          defaultValue={gameData.tours.actionOnlyAtPlayerTour}
          inputType="toggle"
          pathInObject="params.tours.actionOnlyAtPlayerTour"
          onChangeFunction={updateGameValue}
        />
        <div className="innerContainer">
          <TitleContainer
            type="normalText"
            title={"actions"}
            description={"actionOfPlayerAtTurnDescription"}
          />
          <div className="wrapperSelection  wrapperSelectionActions">
            {/*===========EDIT ACTION=========== */}

            {currentElementToEdit !== null &&
              (() => {
                return (
                  <div className="actionEdition">
                    <Alert
                      alertList={alertList}
                      messages={[currentElementToEdit.id + "|action|"]}
                    ></Alert>

                    <div
                      className="close"
                      onClick={() => setCurrentElementToEdit(null)}
                    >
                      <Icon name="close"></Icon>
                    </div>

                    {/*===========NAME=========== */}

                    <Input
                      title="name"
                      description="playersCanPlayInSameTime"
                      defaultValue={currentElementToEdit.name || ""}
                      inputType="input"
                      onChangeFunction={(value) => {
                        setCurrentElementToEdit(
                          updateElementValue(
                            "name",
                            currentElementToEdit,
                            value,
                          ),
                        );
                      }}
                    />
                    {/*===========CONDITION=========== */}

                    <Input
                      title="condition"
                      description="condition"
                      defaultValue={currentElementToEdit.condition || ""}
                      inputType="input"
                      onChangeFunction={(value) => {
                        setCurrentElementToEdit(
                          updateElementValue(
                            "condition",
                            currentElementToEdit,
                            value,
                          ),
                        );
                      }}
                    />
                    <DetailContainer title="advancedSettings">
                      {/*===========APPARITION DE L ACTION=========== */}

                      <Input
                        title="actionAppearAtPlayerTurn"
                        description="ifTrueActionWillAppearAtPlayerTurn"
                        defaultValue={currentElementToEdit.appearAtPlayerTurn}
                        inputType="toggle"
                        onChangeFunction={(value) =>
                          setCurrentElementToEdit(
                            updateElementValue(
                              "appearAtPlayerTurn",
                              currentElementToEdit,
                              value,
                            ),
                          )
                        }
                      />

                      {/*===========APPLY ACTION ON  DECK =========== */}
                      {/* appear if discard deck is activated */}
                      {/* could be add in max one action */}

                      <Input
                        title="attachThisActionOnDeck"
                        description="attachThisActionOnDeckDescription"
                        defaultValue={
                          currentElementToEdit.actionOnDeck ?? false
                        }
                        inputType="toggle"
                        disabled={
                          (!gameData.cardParams?.deck?.activation ?? true) ||
                          gameData.actions.some(
                            (action) =>
                              action.actionOnDeck &&
                              action.id != currentElementToEdit.id,
                          )
                        }
                        onChangeFunction={(value) =>
                          setCurrentElementToEdit(
                            updateElementValue(
                              "actionOnDeck",
                              currentElementToEdit,
                              value,
                            ),
                          )
                        }
                      />

                      {/*===========APPLY ACTION ON DISCARD DECK =========== */}
                      {/* appear if discard deck is activated */}
                      {/* could be add in max one action */}

                      <Input
                        title="attachThisActionOnDiscardDeck"
                        description="attachThisActionOnDiscardDeckDescription"
                        defaultValue={
                          currentElementToEdit.actionOnDiscardDeck ?? false
                        }
                        inputType="toggle"
                        disabled={
                          (!gameData.cardParams?.discard?.activation ?? true) ||
                          gameData.actions.some(
                            (action) =>
                              action.actionOnDiscardDeck &&
                              action.id != currentElementToEdit.id,
                          )
                        }
                        onChangeFunction={(value) =>
                          setCurrentElementToEdit(
                            updateElementValue(
                              "actionOnDiscardDeck",
                              currentElementToEdit,
                              value,
                            ),
                          )
                        }
                      />
                    </DetailContainer>
                    {/*===========WITH VALUE EVENT ASSOCIEES=========== */}

                    <DetailContainer
                      title={"withValueEvent"}
                      description={
                        "withValueEventWichBeExecutedWhenThisEventIsTriggered"
                      }
                      className="demonsAssociatedContainer"
                      topAlert={
                        <Alert
                          alertList={alertList}
                          messages={[
                            currentElementToEdit.id +
                              "|action|missingValueForKey",
                            currentElementToEdit.id +
                              "|action|callNonExistingWithValueEvent|alert",
                            currentElementToEdit.id +
                              "|action|pleaseProvideEventsForAction|warning",
                          ]}
                        ></Alert>
                      }
                    >
                      <InputSelect
                        title={"useWithValueEvent"}
                        updateValueArray={(value) => {
                          let newElt = {
                            id: value.id,
                            player: "{currentPlayer}",
                          };
                          for (let key of getDynamicValueForEvent(value)) {
                            newElt[key] = "";
                          }
                          console.log(newElt);
                          setCurrentElementToEdit(
                            updateValueArray(
                              "withValue",
                              currentElementToEdit,
                              newElt,
                              "new",
                            ),
                          );
                        }}
                        closeAfterSelect={true}
                        selected={[t("selectWithValueEvent")]}
                        items={gameData.withValueEvents}
                        itemsDisplayFields={["id", "name"]}
                      />
                      {currentElementToEdit.withValue &&
                      currentElementToEdit.withValue.length > 0 ? (
                        currentElementToEdit.withValue.map(
                          (withValueEventInputs, index) => {
                            let withValueEvent = getEventFromIdAndType(
                              withValueEventInputs.id,
                              "withValueEvent",
                            );
                            let keyInputInwithValueEvent =
                              getDynamicValueForEvent(withValueEvent);

                            function remove() {
                              setCurrentElementToEdit(
                                updateValueArray(
                                  "withValue",
                                  currentElementToEdit,
                                  { id: withValueEventInputs.id },
                                  "delete",
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
                                  currentElementToEdit.id +
                                    "|action|" +
                                    "callNonExistingWithValueEvent|alert",
                                ]}
                                className="withValueEventEdition"
                                withValueEventInputs={withValueEventInputs}
                                withValueEventKeys={keyInputInwithValueEvent}
                                modifyKeyValue={(path, value) => {
                                  setCurrentElementToEdit(
                                    updateValueArray(
                                      "withValue",
                                      currentElementToEdit,
                                      updateElementValue(
                                        path,
                                        withValueEventInputs,
                                        value,
                                      ),
                                    ),
                                  );
                                }}
                                suggestions={gameData.suggestions}
                              ></WithValueEventCard>
                            );
                          },
                        )
                      ) : (
                        <span className="normalText">
                          {t("noWithValueEvent")}
                          <Button
                            type="grey"
                            action={() => {
                              navigate("/game/events/" + gameData.gameId);
                              setCurrentSubpageOfEvents("withValueEvent");
                            }}
                            text="createWithValueEvent"
                          ></Button>
                        </span>
                      )}
                    </DetailContainer>
                    {/*===========SUPPRIMER=========== */}

                    <div className="basicContainer basicRedContainer ">
                      <TitleContainer
                        title={"deleteActionInTour"}
                        type="h2"
                        description={"youDeleteActionWithoutSave"}
                      />

                      <Button
                        text={"delete"}
                        type="redButton"
                        action={async () => {
                          if (confirm(t("doYouReallyWantToDeleteAction"))) {
                            setCurrentElementToEdit(null);
                            updateGameValueArray(
                              "params.tours.actions",
                              currentElementToEdit,
                              "delete",
                            );
                          }
                        }}
                      ></Button>
                    </div>
                  </div>
                );
              })()}
            {/*===========LIST ACTIONS=========== */}

            {gameData.actions.map((action, index) => {
              return (
                <div
                  className={`action ${currentElementToEdit && currentElementToEdit.id == action.id ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    setCurrentElementToEdit(action);
                  }}
                >
                  <Alert
                    messagse={[action.id + "|action"]}
                    alertList={alertList}
                  ></Alert>
                  <span>{splitText(action.name, 20)}</span>
                </div>
              );
            })}
            {/*===========NEW ACTION=========== */}
            <div
              className="action"
              onClick={() => {
                let name = "Name of action";
                for (let i = 0; i < gameData.actions.length; i++) {
                  if (gameData.tours.actions[i].name === name) {
                    name = `Name of action (${i + 1})`;
                  }
                }

                updateGameValueArray(
                  "params.tours.actions",
                  {
                    name: name,
                    id: Date.now(),
                    condition: "",
                    appearAtPlayerTurn: true,
                    withValue: [],
                  },
                  "new",
                );
              }}
            >
              <Icon name="add"></Icon>
              <span>{t("addAction")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
