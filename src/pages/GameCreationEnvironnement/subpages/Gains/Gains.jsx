import "./style.css";
import { useTranslation } from "react-i18next";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { updateElementValue } from "../../../../helpers/objectManagement";
// Contexts
import { useNotificationContext } from "../../../../context/NotificationContext";
import { useHistoryContext } from "../../../../context/HistoryContext.jsx";
// Hooks

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/input/Input";
import InputSelect from "../../../../components/InputSelect/InputSelect";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import GainCard from "../../../../components/Cards/GainCard/GainCard";
import Alert from "../../../../components/Alert/Alert";
import { createHistoryElement } from "../../../../helpers/historyObject";
import Confirm from "../../../../components/Confirm/Confirm";
import Separator from "../../../../components/Separator/Separator";
import { useGameContext } from "../../../../context/GameContext.jsx";
import { useTokenContext } from "../../../../context/TokenContext";
import { useApi } from "../../../../hooks/useApi";

export default function Gains({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) {

  const { getToken } = useTokenContext();
    const { fetchData } = useApi();
  const [currentGain, setCurrentGain] = useState(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const { addItem, deleteItemHistoryRelatedTo, isInHistory } =
    useHistoryContext();
  const { alertList } = useNotificationContext();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const { pushGainModification } = useGameContext();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentGain) {
      setCurrentGain(gameData.gains[0]);
    }
  }, [gameData]);

  useEffect(() => {
    if (currentGain && isFirstSelection) {
      setIsFirstSelection(false);
    }
    if (currentGain && !isFirstSelection) {
      updateGameValueArray("assets.gains", currentGain);
    }
  }, [currentGain]);

  async function uploadImageOfGain(file) {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/game/" + gameData.id + "/gain/" + currentGain.id + "/uploadImage",
      null,
      {
        token: getToken(),
        method: "POST",
      },
      formData,
    );
    if (!result) {
      displayError(t("FailedToUploadImage"));
    }
    const serverImageUrl = result.url;
    setCurrentGain((prev) => updateElementValue("image", prev, serverImageUrl));
    return result;
  }
  if (!gameData) return;
  return (
    <div className={" gainsSubpage"}>
      <TitleContainer
        title={"gains"}
        type="h1"
        description="configureRewards"
      />
      <Separator></Separator>
      <div className="row">
        {/*=========LEFT SELECTION ============== */}
        <div className="left">
          <div className="header">
            <TitleContainer title={"gainsCreated"} type="h2" />
            <Button
              text={"new"}
              icon="add-white"
              type="violetButton"
              action={() => {
                let id = Date.now();
                let newGain = {
                  id,
                  name: "New Gain",
                };
                updateGameValueArray("assets.gains", newGain, "add");
                setCurrentGain(newGain);
                addItem(
                  gameData.id,
                  createHistoryElement("gains", "add", { id: id }),
                );
              }}
            />
          </div>

          {gameData.gains &&
            gameData.gains.map((gain, index) => (
              <GainCard
                key={index}
                gain={gain}
                isSelected={currentGain ? currentGain.id === gain.id : false}
                actionOnClick={() => {
                  setCurrentGain(gain);
                }}
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={gain.id + "|gain|"}
                ></Alert>
              </GainCard>
            ))}
        </div>
        {/*=========END OF  SELECTION ============== */}

        {/*=========RIGHT CONFIGURATION ============== */}
        {currentGain && (
          <div className="right">
            <div className="basicContainer">
              <Alert
                alertList={alertList}
                messages={[
                  currentGain.id + "|gain|gainNameCannotBeEmpty|alert",

                  currentGain.id + "|gain|gainsCannotHaveSameName|alert"
                ]}
              ></Alert>
              <TitleContainer
                title="gainConfigurationTitle"
                description="gainConfigurationDescription"
              />
              {/* ========== NAME ============== */}
              <Input
                title="gainNameLabel"
                defaultValue={currentGain.name}
                hint={"caractereMax75"}
                pathInObject="name"
                onChangeFunction={(path, value) => {
                  if (value.length > 75) {
                    value = value.slice(0, 75);
                  }
                  setCurrentGain(updateElementValue(path, currentGain, value));
                }}
              />

              {/* ========== FILE ============== */}
              <div className="inputUploadSection">
                <span className="normalText">
                  {t("gainConfigurationTitle")}
                </span>
                <p>{t("gainConfigurationDescription")}</p>

              

                <div className="imageUploadContainer">
                  {(() => {
                    const isInHistoryAdd = isInHistory({
                      type: "gains",
                      action: "add",
                      id: currentGain.id,
                      gameId: gameData.id,
                    });
                    return (
                      <>
                        <Button
                          icon={isInHistoryAdd ? null : "star"}
                          action={() => { 
                          }}
                          type="whiteWithBordure"
                          text={
                            isInHistoryAdd
                              ? "saveTheGameOrSaveGainBeforeUploadingImage"
                              : "uploadImage"
                          }
                        />
                        {isInHistoryAdd ? null : (
                        <input
                          type="file"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (
                              selectedFile.type == "image/jpeg" ||
                              selectedFile.type === "image/png"
                            ) {
                              uploadImageOfGain(selectedFile);
                            } else {
                              displayError(t("onlyJpgOrPngAllowed"));
                            }
                          }}

                        />
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* ========== METADATA ============== */}
            <div className="basicContainer">
              <TitleContainer title={"metadata"}></TitleContainer>
              <span>
                {t("uniqueId")} : {currentGain.id}
              </span>
            </div>
            {/* ========== DELETE ============== */}
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              <TitleContainer
                title={"deleteGain"}
                type="h2"
                description={"youDeleteGainWithoutSave"}
              />
              {displayDeleteConfirmation &&
                (() => {
                  return (
                    <Confirm
                      actionOnCancel={() => {
                        setDisplayDeleteConfirmation(false);
                      }}
                      actionOnConfirm={() => {
                        updateGameValueArray(
                          "assets.gains",
                          currentGain,
                          "delete",
                        );
                        addItem(
                          gameData.id,
                          createHistoryElement("gains", "delete", {
                            id: currentGain.id,
                          }),
                        );
                        setDisplayDeleteConfirmation(false);
                        setCurrentGain(null);
                      }}
                    >
                      <TitleContainer
                        title={"doYouRealyWantToDeleteGain"}
                        description={"youDeleteGainWithoutSave"}
                      ></TitleContainer>
                      <p>{t("thisActionHasConsequences")}</p>
                      <ul>
                        <li> </li>
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

            {/* ========== SAUVEGARDE ============== */}

            <div className="basicContainer basicGreenContainer ">
              <TitleContainer
                title={"saveGain"}
                type="h2"
                description={"saveGainDescription"}
              />

              <Button
                text={"saveGain"}
                clickable={saveDisabled}
                type="greenButton"
                action={async () => {
                  updateGameValueArray("assets.gains", currentGain);
                  pushGainModification(gameData.id, currentGain);
                  deleteItemHistoryRelatedTo({
                    type: "gains",
                    id: currentGain.id,
                    gameId: gameData.id,
                  });
                  setSaveDisabled(false);
                  setTimeout(() => {
                    setSaveDisabled(true);
                  }, 2000);
                }}
              ></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
