// External libraries
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectionArea } from "@viselect/react";

// Contexts
import { useGameContext } from "../../../../../context/GameContext";
import { useNotificationContext } from "../../../../../context/NotificationContext";
import { useHistoryContext } from "../../../../../context/HistoryContext";
import { useTokenContext } from "../../../../../context/TokenContext";

// Hooks
import { useApi } from "../../../../../hooks/useApi";

// Helpers
import { updateElementValue } from "../../../../../helpers/objectManagement";
import { createHistoryElement } from "../../../../../helpers/historyObject";

// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/input/Input";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import Alert from "../../../../../components/Alert/Alert";
import CardEditionPage from "./CardEditionPage/CardEditionPage";
import DefaultCard from "./DefaultCard/DefaultCard";
import ImageUploadFileContainer from "../../../../../components/ImageUploadFileContainer/ImageUploadFileContainer";
import CustomCard from "./CustomCard/CustomCard";

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
  const [selected, setSelected] = useState(new Set());
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
                value: 1,
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
      <SelectionArea
        selectionConfig={{
          className: "selection-area", // La classe du rectangle bleu qui va apparaître
        }}
        features={{
          touch: false, // Désactive le touch si tu es sur PC pour éviter les bugs
          range: true, // Permet la sélection par zone
        }}
        selectables=".selectable"
        className="basicContainer cardLibrary"
        onClick={() => {
          setSelected(new Set());
        }}
        onStart={({ event, selection }) => {
          if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            setSelected(new Set());
          }
        }}
        onMove={({
          store: {
            changed: { added, removed },
          },
        }) => {
          setSelected((prev) => {
            const next = new Set(prev);

            const extractKeys = (els) =>
              els.map((el) => el.getAttribute("data-key")).filter(Boolean);

            extractKeys(added).forEach((key) => next.add(key));
            extractKeys(removed).forEach((key) => next.delete(key));

            return next;
          });
        }}
      >
        <div className="cardWrapper">
          {Object.keys(gameData.cards).map((key) => {
            const card = gameData.cards[key];
            const isSelected = selected.has(String(key));
            // Pour DefaultCard, data-key est déjà bien passé
            if (card.type == "french_standard") {
              return (
                <DefaultCard
                  card={card}
                  key={key}
                  isSelected={isSelected}
                  dataKey={key}
                  classAdded={`selectable ${isSelected ? "selected" : ""}`}
                  setCurrentCard={setCurrentCard}
                >
                  <Alert
                    alertList={alertList}
                    displayAlertStartWith={card.id + "|card|"}
                  ></Alert>
                </DefaultCard>
              );
            }
            // resize radius of custom card to fit in the library ( library card are 78px width, but in the edition page they are 200px width, so we need to resize the radius to fit the new size )
            return (
              <CustomCard
                action={() => {
                  setCurrentCard(card);
                }}
                key={key}
                card={card}
                radius={gameData.cardParams.radius*78/200 }
                hoverable={true}
                isSelected={isSelected}
                // On ne passe plus dataKey ici, mais on va le passer dans classAdded pour l'ajouter sur le bon div
                classAdded={`selectable ${isSelected ? "selected" : ""}`}
                dataKey={key}
              >
                <Alert
                  alertList={alertList}
                  displayAlertStartWith={card.id + "|card|"}
                ></Alert>
              </CustomCard>
            );
          })}
        </div>
      </SelectionArea>
      {selected.size > 1 && (
        <div className="cardLibrairy-MultipleActions basicContainer">
          {/*===== multiple edit couleur si tous les elements sont french_standard =====*/}
          {!Object.keys(selected).some(
            (key) => gameData.cards[key].type !== "french_standard",
          ) && (
            <InputSelect
              title="colorOfCard"
              closeAfterSelect={true}
              updateValueArray={(path, value) => {
                for (let key of selected) {
                  updateGameValue(
                    "assets.cards." + key,
                    updateElementValue(path, gameData.cards[key], value),
                  );
                  addItem(
                    gameData.id,
                    createHistoryElement("cards", "edit", {
                      id: key,
                    }),
                  );
                }
              }}
              pathObject="addedAttributs.couleur"
              selected={[]}
              items={["trefle", "coeur", "carreau", "pique"]}
            />
          )}
          {/*===== multiple delete ================ */}

          <div className="basicContainer basicRedContainer rewardsManagementSection">
            <TitleContainer
              title={"deleteSelection"}
              type="h2"
              description={"youDeleteCardWithoutSave"}
            />

            <Button
              text={"deleteSelection"}
              type="redButton"
              action={async () => {
                if (confirm(t("doYouRealyWantToDeleteTheseCards"))) {
                  for (let key of selected) {
                    console.log(key);
                    updateGameValue(
                      "assets.cards." + key,
                      gameData.cards[key],
                      "delete",
                    );
                    addItem(
                      gameData.id,
                      createHistoryElement("cards", "delete", {
                        id: key,
                      }),
                    );
                  }
                }
              }}
            ></Button>
          </div>
        </div>
      )}
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
