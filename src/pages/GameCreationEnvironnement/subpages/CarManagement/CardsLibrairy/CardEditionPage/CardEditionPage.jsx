// CSS
import "./style.css";

// External libraries
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../../../context/GameContext";
import { useNotificationContext } from "../../../../../../context/NotificationContext";
import { useHistoryContext } from "../../../../../../context/HistoryContext";
import { useTokenContext } from "../../../../../../context/TokenContext";

// Hooks
import { useApi } from "../../../../../../hooks/useApi";

// Helpers
import { updateElementValue } from "../../../../../../helpers/objectManagement";
import { createHistoryElement } from "../../../../../../helpers/historyObject";

// Components
import ImageUploadFileContainer from "../../../../../../components/ImageUploadFileContainer/ImageUploadFileContainer";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer";
import Button from "../../../../../../components/Button/Button";
import Input from "../../../../../../components/Input/Input";
import InputSelect from "../../../../../../components/InputSelect/InputSelect";
import Alert from "../../../../../../components/Alert/Alert";
import DefaultCard from "../../../../../../components/DefaultCard/DefaultCard";
import CustomCard from "../../../../../../components/CustomCard/CustomCard";

export default function CardEditionPage({
  currentCard,
  setCurrentCard,
  gameData,
  updateGameValue,
}) {
  const { fetchData } = useApi();
  const { getToken } = useTokenContext();
  const { pushCardModification } = useGameContext();
  const { isInHistory, deleteItemHistoryRelatedTo, addItem } =
    useHistoryContext();
  const { t } = useTranslation();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const { alertList, displayError } = useNotificationContext();

  async function uploadImageOfCard(file) {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/game/" + gameData.id + "/card/" + currentCard.id + "/uploadImage",
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
    setCurrentCard(result);
    return result;
  }
  return (
    <>
      <div className="row cardEditionPage">
        {/*=========CARD PREVIEW======= */}
        <div className="basicContainer cardPreview">
          <TitleContainer title="cardPreview" type="h2"></TitleContainer>
          {/*=========IF CARD IS DEFAULT======= */}
          {currentCard.type === "french_standard" ? (
            <DefaultCard card={currentCard} />
          ) : (
            <>
              <Alert
                alertList={alertList}
                messages={[currentCard.id + "|card|"]}
              />

              {/*=========IF CARD IS CUSTOM======= */}
              {/*User can only add image if card is saved in
             db because request is send when user uplaod image */}
              {isInHistory({
                type: "card",
                action: "add",
                id: currentCard.id,
                gameId: gameData.id,
              }) ? (
                <div className="customCard">
                  <span className="warningText">
                    {t("saveTheGameOrSaveCardBeforeUploadingImage")}
                  </span>
                </div>
              ) : (
                <>
                  <CustomCard
                    card={currentCard}
                    uploadImageOfCard
                    radius={gameData.cardParams.radius}
                    hoverable={true}
                  />
                  <ImageUploadFileContainer
                    buttonText="uploadImage"
                    actionOnFileChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (
                        selectedFile.type == "image/jpeg" ||
                        selectedFile.type === "image/png"
                      ) {
                        uploadImageOfCard(selectedFile);
                      } else {
                        displayError(t("onlyJpgOrPngAllowed"));
                      }
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>

        {/*=========CARD CONFIGURATION======= */}
        <div className="basicContainer">
          <Alert
            alertList={alertList}
            messages={[currentCard.id + "|card|cardNameMustNotBeEmpty"]}
          />
          {/* ===========NAME======= */}
          <Input
            title="cardName"
            defaultValue={currentCard.name ?? ""}
            pathInObject="name"
            onChangeFunction={(path, value) => {
              setCurrentCard(updateElementValue(path, currentCard, value));
            }}
          />
          {/* ===========DESCRIPTION======= */}
          <Input
            title="description"
            defaultValue={currentCard.description ?? ""}
            pathInObject="description"
            onChangeFunction={(path, value) => {
              setCurrentCard(updateElementValue(path, currentCard, value));
            }}
            inputType="textarea"
            placeholder="cardDescriptionPlaceholder"
          />
        </div>
      </div>

      {/* ===========ADDED ATTRIBUTS ======= */}
      <div className="basicContainer"> 
          <TitleContainer
            title={"addedAttributs"}
            description={"hereYouCanSeeAllAttributsAddedToThisCard"}
            type="h2"
          ></TitleContainer>
        
        {gameData.cardParams.addedAttributs &&
          Object.keys(gameData.cardParams.addedAttributs).map(
            (attributKey, key) => (
             
                <Input
                  title={attributKey}
                  deactivateTitleTranslation={true}
                  defaultValue={
                    currentCard.addedAttributs?.[attributKey] ??
                    gameData.cardParams.addedAttributs?.[attributKey] ??
                    ""
                  }
                  pathInObject={
                    attributKey ? "addedAttributs." + attributKey : null
                  }
                  onChangeFunction={(path, value) => {
                    const newAttributs = { ...currentCard.addedAttributs };
                    newAttributs[attributKey] = value;
                    setCurrentCard(
                      updateElementValue(
                        "addedAttributs",
                        currentCard,
                        newAttributs,
                      ),
                    );
                  }}
                  placeholder="enterValue"
                />
               
            ),
          )}
      </div>

      <div className="basicContainer">
     
        {/* ===========TYPE======= */}
        <InputSelect
          title="typeCard"
          closeAfterSelect={true}
          updateValueArray={(path, value) => {
            let newCard = updateElementValue(path, currentCard, value);
            if (value == "custom") {
              newCard = updateElementValue(
                "addedAttributs.couleur",
                newCard,
                null,
              ); 
            }
            if (
              newCard.type == "french_standard" &&
              newCard.addedAttributs?.couleur == null
            ) {
              newCard = updateElementValue(
                "addedAttributs.couleur",
                newCard,
                "pique",
              ); 
            }
            setCurrentCard(newCard);
          }}
          pathObject="type"
          selected={currentCard.type ? [currentCard.type] : []}
          items={["french_standard", "custom"]}
        />

        {/* ===========Couleur si card basique======= */}
        {currentCard.type === "french_standard" && (
          <InputSelect
            title="colorOfCard"
            closeAfterSelect={true}
            updateValueArray={(path, value) => {
              setCurrentCard(updateElementValue(path, currentCard, value));
            }}
            pathObject="addedAttributs.couleur"
            selected={
              currentCard.addedAttributs.couleur
                ? [currentCard.addedAttributs.couleur]
                : []
            }
            items={["trefle", "coeur", "carreau", "pique"]}
          />
        )}   {/* ===========QUANTITY======= */}
        <Input
          type="number"
          title="quantity"
          defaultValue={currentCard.quantity ?? ""}
          pathInObject="quantity"
          onChangeFunction={(path, value) => {
            setCurrentCard(updateElementValue(path, currentCard, value));
          }}
        />
      </div>
      {/* ========== METADATA ============== */}
      <div className="basicContainer">
        <TitleContainer title={"metadata"}></TitleContainer>

        <span>
          {t("uniqueId")} : {currentCard.id}
        </span>
      </div>
      {/* ========== SUPPRESSION ============== */}

      <div className="basicContainer basicRedContainer rewardsManagementSection">
        <TitleContainer
          title={"deleteCard"}
          type="h2"
          description={"ifYouPressDeleteYouWillDeleteAllSelectedCards"}
        />

        <Button
          text={"deleteCard"}
          type="redButton"
          action={async () => {
            if (confirm(t("doYouRealyWantToDeleteCard"))) {
              updateGameValue(
                "assets.cards." + currentCard.id,
                currentCard,
                "delete",
              );
              addItem(
                gameData.id,
                createHistoryElement("cards", "delete", {
                  id: currentCard.id,
                }),
              );
              setCurrentCard(null);
            }
          }}
        ></Button>
      </div>
      {/* ========== SAUVEGARDE ============== */}

      <div className="basicContainer basicGreenContainer ">
        <TitleContainer
          title={"saveCard"}
          type="h2"
          description={"saveCardDescription"}
        />

        <Button
          text={"saveCard"}
          clickable={saveDisabled}
          type="greenButton"
          action={async () => {
            updateGameValue("assets.cards." + currentCard.id, currentCard);
            pushCardModification(gameData.id, currentCard);
            deleteItemHistoryRelatedTo({
              type: "card",
              id: currentCard.id,
              gameId: gameData.id,
            });
            setSaveDisabled(false);
            setTimeout(() => {
              setSaveDisabled(true);
            }, 2000);
          }}
        ></Button>
      </div>
    </>
  );
}
