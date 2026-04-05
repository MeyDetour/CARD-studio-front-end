import "./style.css";

// External libraries
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button/Button";

import { updateElementValue } from "../../../../helpers/objectManagement";

// Contexts
import { useHistoryContext } from "../../../../context/HistoryContext";
// Hooks
import { createHistoryElement } from "../../../../helpers/historyObject";

// Components
import Input from "../../../../components/input/Input";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import CardEditionPage from "./CardEditionPage/CardEditionPage";
import DefaultCard from "./DefaultCard/DefaultCard";

export default function CardManagement({
  gameData,
  updateGameValueArray,
  updateGameValue, 
}) {
  const { t } = useTranslation();
  const [subpage, setSubpage] = useState("cardManagement");
  const [currentCard, setCurrentCard] = useState(null);
  const { addItem } = useHistoryContext();

  if (!gameData) return;
  useEffect(() => {
    if (currentCard) {
      updateGameValue("assets.cards." + currentCard.id, currentCard);
      addItem(
        gameData.id,
        createHistoryElement("card", "edit", { id: currentCard.id }),
      );
    }
  }, [currentCard]);
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"cardManagement"}
        type="h1"
        description="hereYouCanManageAllSettingsConcernedCardAndDecks"
      />

      <SubNavigationBar
        buttons={{
          cardManagement: () => {setSubpage("cardManagement");setCurrentCard(null)},
          cardImported: () => {setSubpage("cardImported");setCurrentCard(null)},
        }}
        page={subpage}
      />

      {subpage === "cardManagement" && (
        <div className="basicContainer">
          {/* ======DECK======= */}
          <Input
            title="deck"
            description="deckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
            defaultValue={gameData.cardParams?.deck?.activation ?? false}
            inputType="toggle"
            pathInObject="params.cards.deck.activation"
            onChangeFunction={(path, value) => {
              for (let a of gameData.actions) {
                if (a.actionOnDeck) {
                  updateGameValueArray("params.tours.actions", {
                    ...a,
                    actionOnDeck: false,
                  });
                }
              }

              updateGameValue(path, value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: path,
                }),
              );
            }}
          />
          <Input
            title="renderTheNextDeckCard"
            description="renderTheNextDeckCardDescription"
            defaultValue={
              gameData.cardParams?.deck?.renderTheNextDeckCard ?? false
            }
            disabled={!(gameData.cardParams?.deck?.activation ?? false)}
            inputType="toggle"
            pathInObject="params.cards.deck.renderTheNextDeckCard"
            onChangeFunction={(path, value) => {
              updateGameValue(path, value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: path,
                }),
              );
            }}
          />
          {/* ======DISCARD======= */}
          <Input
            title="discardDeck"
            description="discardDeckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
            defaultValue={gameData.cardParams?.discard?.activation ?? false}
            inputType="toggle"
            pathInObject="params.cards.discard.activation"
            onChangeFunction={(path, value) => {
              for (let a of gameData.actions) {
                if (a.actionOnDiscardDeck) {
                  updateGameValueArray("params.tours.actions", {
                    ...a,
                    actionOnDiscardDeck: false,
                  });
                }
              }

              updateGameValue(path, value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: path,
                }),
              );
            }}
          />
          <Input
            title="renderTheLastDiscardedCard"
            description="renderTheLastDiscardedCardDescription"
            defaultValue={
              gameData.cardParams?.discard?.renderTheLastDiscardedCard ?? false
            }
            inputType="toggle"
            disabled={!(gameData.cardParams?.discard?.activation ?? false)}
            pathInObject="params.cards.discard.renderTheLastDiscardedCard"
            onChangeFunction={(path, value) => {
              updateGameValue(path, value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: path,
                }),
              );
            }}
          />
        </div>
      )}
      {subpage === "cardImported" &&
        (currentCard ? (
          <CardEditionPage
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            gameData={{ id: gameData.id }}
            updateGameValue={updateGameValue}
          />
        ) : (
          <>
            <div className="header">
              <SearchBar placeholder="searchInLibraryPlaceholder" />
              <Button
                icon="add-white"
                text="newCard"
                type="violetButton"
                action={() => {
                  let id = Date.now();
                  let newCard = {
                    id: id,
                    value:1,
                    name: t("newCard"),
                    type:"french_standard",
                    addedAttributs:{
                      couleur:"pique"
                    }
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

            <div className="basicContainer cardLibrary">
              <div className="cardWrapper">
              {Object.keys(gameData.cards).map((key) => {
                const card = gameData.cards[key];
                if (card.type =="french_standard"){
                  return <DefaultCard card={card} key={key} setCurrentCard={setCurrentCard} />;
                } 
                return (
                  <div
                    key={key}
                    className="cardInLibrary"
                    onClick={() => setCurrentCard(card)}
                  >
                    {card.image ? <img src={card.image} alt={card.name} /> : <span>{card.name}</span>}
                  </div>
                );
              })}
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
