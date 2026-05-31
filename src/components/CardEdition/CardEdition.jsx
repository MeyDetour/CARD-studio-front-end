// CSS
import "./style.css";

// External libraries
import { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../context/GameContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useHistoryContext } from "../../context/HistoryContext";
import { useTokenContext } from "../../context/TokenContext";

// Hooks
import { useApi } from "../../hooks/useApi";

// Helpers
import { updateElementValue } from "../../helpers/objectManagement";
import { createHistoryElement } from "../../helpers/historyObject";

// Components
import ImageUploadFileContainer from "../ImageUploadFileContainer/ImageUploadFileContainer";
import TitleContainer from "../TitleContainer/TitleContainer";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputSelect from "../InputSelect/InputSelect";
import Alert from "../Alert/Alert";
import DefaultCard from "../DefaultCard/DefaultCard";
import CustomCard from "../CustomCard/CustomCard";

export default function CardEdition({
  currentCard,
  setCurrentCard,
  // linkToUploadImage is the url to which the request to upload image will be sent,
  // url must be formed like this : "api/???/????/???/" because the card id will be
  pushCardModification,
  linkToUploadImage,
  cardParams,
  addLog,
  // (id,elt)=>
  updateCardValue,
  reArangeCardOrder
}) {
  const { fetchData } = useApi();
  const { getToken } = useTokenContext();
  const { isInHistory, deleteItemHistoryRelatedTo, addItem } =
    useHistoryContext();
  const { t } = useTranslation();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const { alertList, displayError } = useNotificationContext();
 
  async function uploadImageOfCard(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(currentCard));
    const result = await fetchData(
      linkToUploadImage,
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

              <CustomCard
                card={currentCard}
                uploadImageOfCard
                aspectRatio={cardParams.ratio??"0.67/1"}
                radius={cardParams.radius * 200}
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

        {cardParams.addedAttributs &&
          Object.keys(cardParams.addedAttributs).map((attributKey, key) => (
            <Input
              title={attributKey}
              deactivateTitleTranslation={true}
              defaultValue={
                currentCard.addedAttributs?.[attributKey] ??
                cardParams.addedAttributs?.[attributKey] ??
                ""
              }
              pathInObject={
                attributKey ? "addedAttributs." + attributKey : null
              }
              onChangeFunction={(path, value) => {
                if (value){
                  value = value.replaceAll(' ', '_');
                }
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
          ))}
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
        )}
        {/* ===========QUANTITY======= */}
        <Input
          type="number"
          title="quantity"
          defaultValue={currentCard.quantity ?? ""}
          pathInObject="quantity"
          onChangeFunction={(path, value) => {
            setCurrentCard(updateElementValue(path, currentCard, value));
          }}
        />{/* ===========ORDER======= */}
        <Input
          type="number"
          title="order"
          defaultValue={currentCard.order ?? ""}
          pathInObject="order"
          onChangeFunction={(path, value) => { 
            let newValue = value === "" ? "" : parseInt(value);
            reArangeCardOrder(updateElementValue(path, currentCard, newValue));
            setCurrentCard(updateElementValue(path, currentCard, newValue));
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
              updateCardValue(
                currentCard.id,
                currentCard,
                "delete",
              );
              if (addLog) {
                addLog(
                  createHistoryElement("cards", "delete", {
                    id: currentCard.id,
                  }),
                );
              }
              setCurrentCard(null);
            }
          }}
        ></Button>
      </div>
      {/* ========== SAUVEGARDE ============== */}
      {pushCardModification && (
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
              updateCardValue( currentCard.id, currentCard);

              pushCardModification(currentCard);
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
      )}
    </>
  );
}
