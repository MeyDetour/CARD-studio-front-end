// External libraries
import { useEffect, useState, useMemo, act } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../../context/GameContext";
import { useNotificationContext } from "../../../../../context/NotificationContext";
import { useHistoryContext } from "../../../../../context/HistoryContext";
import { useTokenContext } from "../../../../../context/TokenContext";

// Hooks
import { useApi } from "../../../../../hooks/useApi";

// Helpers
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../helpers/objectManagement";
import { createHistoryElement } from "../../../../../helpers/historyObject";

// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import Alert from "../../../../../components/Alert/Alert";
import CardEditionPage from "./CardEditionPage/CardEditionPage";
import DefaultCard from "../../../../../components/DefaultCard/DefaultCard";
import ImageUploadFileContainer from "../../../../../components/ImageUploadFileContainer/ImageUploadFileContainer";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import { set } from "react-hook-form";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import CardSelectionArea from "../../../../../components/CardSelectionArea/CardSelectionArea";
export default function CardsLibrairy({
  gameData,
  updateGameValue,
  currentCard,
  getCardsFromDb,
  setCurrentCard,
}) {
  const { fetchData } = useApi();
  const { t } = useTranslation();
  const { addItem } = useHistoryContext();
  const { getToken } = useTokenContext();
  const { alertList } = useNotificationContext();
  const { restoreCards } = useGameContext();

  const { displayError } = useNotificationContext();
  useEffect(() => {
    if (currentCard) {
      updateGameValue("assets.cards." + currentCard.id, currentCard);
      addItem(
        gameData.id,
        createHistoryElement("card", "edit", { id: currentCard.id }),
      );
    }
  }, [currentCard]);

  async function uploadZipOfCards(file) {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/game/" + gameData.id + "/cards/uploadZip",
      null,
      {
        token: getToken(),
        method: "POST",
      },
      formData,
    );
    if (!result) {
      displayError(t("FailedToUploadFileZip"));
    }
    updateGameValue("assets.cards", result);
  }

  if (currentCard) {
    return (
      <CardEditionPage
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        gameData={{ id: gameData.id, ...gameData }}
        updateGameValue={updateGameValue}
      />
    );
  }
  return (
    <>
      <div className="cardLibrairy-MultipleActions basicContainer">
        <TitleContainer
          title="cardLibrary"
          type="h1"
          description="hereYouCanSeeAllTheCardsYouHaveCreated"
        ></TitleContainer>

        <div className="rowButtons">
          <ImageUploadFileContainer
            buttonText={"uploadZipOfCards"}
            actionOnFileChange={(e) => {
              const selectedFile = e.target.files[0];
              console.log(selectedFile.type);
              if (selectedFile.type != "application/zip") {
                displayError(t("onlyZipFileAllowed"));
                return;
              } else {
                uploadZipOfCards(selectedFile);
              }
            }}
          />
          <Button
            icon="add-white"
            text="newCard"
            type="violetButton"
            action={() => {
              let id = Date.now();
              let newCard = {
                id: id,
                quantity: 1,
                name: t("newCard"),
                type: "french_standard",
                addedAttributs: {
                  couleur: "pique",
                },
              };

              updateGameValue("assets.cards." + newCard.id, newCard, "new");
              setCurrentCard(newCard);
              addItem(
                gameData.id,
                createHistoryElement("card", "add", { id: newCard.id }),
              );
            }}
          ></Button>
        </div>
      </div>
      <CardSelectionArea
        cards={gameData.cards}
        addedAttributs={gameData.cardParams.addedAttributs}
        cardParams={gameData.cardParams}
        addLog={(element)=>addItem(gameData.id, element)}
        setCurrentCard={setCurrentCard}
        updateCardsValue={(id, value,type)=>updateGameValue("assets.cards." + id, value,type)}
        alertList={alertList}
      />

      <div className="basicContainer basicWarningContainer  ">
        <TitleContainer
          title={"fixBrokenCards"}
          type="h2"
          description={"fixYouBrokenCardByDeleteThem"}
        />

        <Button
          text={"fix"}
          type={"redButton"}
          action={async () => {
            if (confirm(t("doYouRealyWantToDeleteBrokenCards"))) {
              let newCards = { ...gameData.cards };
              for (let cardId of Object.keys(gameData.cards)) {
                let card = gameData.cards[cardId];
                if (!card || !card.id || !card.type || !card.url) {
                  delete newCards[cardId];
                }
              }
              console.log(newCards);
              updateGameValue("assets.cards", newCards);
              addItem(
                gameData.id,
                createHistoryElement("cards", "delete", {
                  id: Object.keys(newCards).join(","),
                }),
              );
            }
          }}
        ></Button>
      </div>
      <div className="basicContainer basicRedContainer  ">
        <TitleContainer
          title={"restoreCards"}
          type="h2"
          description={"allYoursCardsWillBeRestoredToDefaultCardsPack"}
        />

        <Button
          text={"restoreCards"}
          type={"redButton"}
          action={async () => {
            if (confirm(t("doYouRealyWantToRestore"))) {
              let result = await restoreCards(gameData.id);
              if (result && result.message === "ok") {
                getCardsFromDb();
              }
            }
          }}
        ></Button>
      </div>
    </>
  );
}
