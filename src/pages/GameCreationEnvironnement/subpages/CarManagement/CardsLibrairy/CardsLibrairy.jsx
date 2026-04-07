import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../../../components/input/Input";
import { createHistoryElement } from "../../../../../helpers/historyObject";
import { useHistoryContext } from "../../../../../context/HistoryContext";
import Button from "../../../../../components/Button/Button";
import CardEditionPage from "./CardEditionPage/CardEditionPage";
import DefaultCard from "./DefaultCard/DefaultCard";
import { SelectionArea } from "@viselect/react";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import { updateElementValue } from "../../../../../helpers/objectManagement";
import { useNotificationContext } from "../../../../../context/NotificationContext";
import Alert from "../../../../../components/Alert/Alert";


export default function CardsLibrairy({
  gameData,
  updateGameValue,
  currentCard,
  setCurrentCard,
}) {
  const { t } = useTranslation();
  const { addItem } = useHistoryContext();
  const [selected, setSelected] = useState(new Set());
  const { alertList } = useNotificationContext();
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
        gameData={{ id: gameData.id }}
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
                    <Alert alertList={alertList} displayAlertStartWith={card.id+"|card|"}></Alert>
                </DefaultCard>
              );
            }
            return (
              <div
                key={key}
                data-key={key}
                className={`cardInLibrary selectable ${isSelected ? "selected" : ""}`}
                onClick={() => !isSelected && setCurrentCard(card)}
              >
                 <Alert alertList={alertList} displayAlertStartWith={card.id+"|card|"}></Alert>
              
                {card.image ? (
                  <img draggable={false} src={card.image} alt={card.name} />
                ) : (
                  <span>{card.name}</span>
                )}
              </div>
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
    </>
  );
}
