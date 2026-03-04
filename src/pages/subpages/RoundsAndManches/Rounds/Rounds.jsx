 
import { useTranslation } from "react-i18next";
import { splitText } from "../../../../helpers/text";
import Button from "../../../../components/Button/Button"; 
import Icon from "../../../../components/Icon/Icon";
import { useState,useEffect } from "react";
import Input from "../../../../components/input/Input";
import InputRange from "../../../../components/inputRange/inputRange";
import InputSelect from "../../../../components/inputSelect/InputSelect";
import Alert from "../../../../components/Alert/Alert";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import { useNotificationContext } from "../../../../context/NotificationContext";
export default function RoundsPage({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) { 
  const { t } = useTranslation();
  const [currentElementToEdit, setCurrentElementToEdit] = useState(null);
  const { removeAlert, setAlert, alertList, getAlert } =
    useNotificationContext(); 

  useEffect(() => {
    if (currentElementToEdit !== null && gameData) {
      updateGameValueArray("params.tours.actions", currentElementToEdit);
    }
  }, [currentElementToEdit]);

  return    <>
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
              {t("positionOfPlayerWhoHasToPlay")} :{" "}
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
        <InputSelect
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
        />
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
            {currentElementToEdit !== null &&
              (() => {
                let alertMessageName =
                  currentElementToEdit.id +
                  "|action|actionNameCannotBeEmpty|alert";
                let alertMessageCondition =
                  currentElementToEdit.id +
                  "|action|pleaseProvideConditionForAction|warning";

                return (
                  <div className="actionEdition">
                    <Alert
                      alertList={alertList}
                      message={currentElementToEdit.id + "|action|"}
                    ></Alert>

                    <div
                      className="close"
                      onClick={() => setCurrentElementToEdit(null)}
                    >
                      <Icon name="close"></Icon>
                    </div>
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

                    <div className="innerContainer">
                      <TitleContainer title="events" />
                      <div className="wrapperSelection">
                        {gameData.events &&
                          gameData.events.map((event, index) => (
                            <EventCard
                              alertMessage={event.id + "|event|"}
                              key={index}
                              action={() => {
                                setCurrentElementToEdit(
                                  updateValueArray(
                                    "withValue",
                                    currentElementToEdit,
                                    value,
                                    "multiple",
                                  ),
                                );
                              }}
                              event={event}
                              isSelected={
                                currentElementToEdit.withValue &&
                                currentElementToEdit.withValue.includes(
                                  event.id,
                                )
                              }
                            />
                          ))}
                      </div>
                      {gameData.events && gameData.events.length === 0 && (
                        <span className="normalText">{t("noEventInGame")}</span>
                      )}
                    </div>
                    <div className="basicContainer basicRedContainer ">
                      <TitleContainer
                        title={"deleteActionInTour"}
                        type="h2"
                        description={"youDeleteActionWithoutSave"}
                      />

                      <Button
                        text={"delete"}
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
            {gameData.tours.actions.map((action, index) => {
              let alertMessage = action.id + "|action";
              return (
                <div
                  className={`action ${currentElementToEdit && currentElementToEdit.id == action.id ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    setCurrentElementToEdit(action);
                  }}
                >
                  <Alert message={alertMessage} alertList={alertList}></Alert>
                  <span>{splitText(action.name, 20)}</span>
                </div>
              );
            })}
            <div
              className="action"
              onClick={() => {
                let name = "Name of action";
                for (let i = 0; i < gameData.tours.actions.length; i++) {
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
}
