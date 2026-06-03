// External libraries
import { useTranslation } from "react-i18next";

// Contexts
import { useHistoryContext } from "../../../../../context/HistoryContext";

// Helpers
import { createHistoryElement } from "../../../../../helpers/historyObject";

// Components
import Input from "../../../../../components/Input/Input";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import InputRange from "../../../../../components/inputRange/inputRange";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import Button from "../../../../../components/Button/Button";
import Icon from "../../../../../components/Icon/Icon";
import AttributsManagement from "../../../../../components/AttributsManagement/AttributsManagement";

export default function CardsManagementSettings({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) {
  const { t } = useTranslation();
  const { addItem } = useHistoryContext();
  return (
    <>
      <div className="basicContainer">
        {/* ======DECK======= */}
        <TitleContainer title="deck"></TitleContainer>
        <Input
          title="deck"
          description="deckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
          defaultValue={gameData.cardParams?.deck?.activation ?? true}
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
      </div>

      <div className="basicContainer">
        {/* ======DISCARD======= */}
        <TitleContainer title="discardDeck"></TitleContainer>
        <Input
          title="discardDeck"
          description="discardDeckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
          defaultValue={gameData.cardParams?.discard?.activation ?? true}
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
        <Input
          title="setTheDiscardOnTheMiddleOfTable"
          description="setTheDiscardOnTheMiddleOfTableDescription"
          defaultValue={
            gameData.cardParams?.discard?.displayInTheMiddle ?? false
          }
          disabled={!(gameData.cardParams?.discard?.activation ?? true)}
          inputType="toggle"
          pathInObject="params.cards.discard.displayInTheMiddle"
          onChangeFunction={(path, value) => {
            updateGameValue(path, value);

            // les cartes du milieu ne peuvent pas etre activé si la défaisse est au milieu
            if (gameData.rendering.game.displayMiddleCards && value) {
              if (
                confirm(t("thisChangeWillResetTheCurrentPositionOfMiddleCards"))
              ) {
                updateGameValue(
                  "params.rendering.game.displayMiddleCards",
                  false,
                );
                addItem(
                  gameData.id,
                  createHistoryElement("gameElement", "edit", {
                    field: path,
                  }),
                );
              }
            }
          }}
        />
      </div>
      <div className="basicContainer">
        {/* ======PLAYER HAND======= */}

        <TitleContainer title="playerHand"></TitleContainer>
        <Input
          title="playerHand"
          description="activatePlayerHandDescription"
          defaultValue={gameData.cardParams?.hand?.activation ?? true}
          inputType="toggle"
          pathInObject="params.cards.hand.activation"
          onChangeFunction={(path, value) => {
            for (let a of gameData.actions) {
              if (a.actionOnHand) {
                updateGameValueArray("params.tours.actions", {
                  ...a,
                  actionOnHand: false,
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
          title="renderAllHandCards"
          description="playerHandIfThisSettingsIsTrueAllPlayerCanSeeYouHandCards"
          defaultValue={gameData.cardParams?.hand?.renderAllHandCards ?? false}
          inputType="toggle"
          disabled={!(gameData.cardParams?.hand?.activation ?? false)}
          pathInObject="params.cards.hand.renderAllHandCards"
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

      {/* ==========RENDERING OF CARDS======== */}
      <div className="basicContainer renderingOfCardContainer">
        <TitleContainer
          title="renderingOfCard"
          type="h2"
          description="renderingOfCardDescription"
        ></TitleContainer>
        <Input
          title="overlappingOfCard"
          description="overlappingOfCardDescription"
          defaultValue={gameData.rendering?.playerHand?.overlapping ?? false}
          inputType="toggle"
          pathInObject="params.rendering.playerHand.overlapping"
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
        <div className="innerContainer">
          <div className="left">
            {/* ICI : La carte d'exemple fait 200px de large. // Le rayon max
            pour un cercle est de 100px (200 / 2). // On multiplie ce rayon max
            par le ratio (0 à 1) pour avoir le rendu exact en pixels.
             */}
            <CustomCard
              radius={(gameData.cardParams?.radius ?? 0) * 100}
              aspectRatio={gameData.cardParams?.ratio ?? 1}
              card={
                gameData.cards
                  ? gameData.cards[
                      Object.keys(gameData.cards).find((key) => {
                        return gameData.cards[key].type === "custom";
                      })
                    ]
                  : null
              }
            ></CustomCard>
          </div>

          <div className="right">
            <span className="normalText">
              {t("maxNumberOfMance")} :
              {Math.round((gameData.cardParams?.radius ?? 0) * 100)} %
            </span>
            <InputRange
              type="range"
              min={0}
              max={30}
              maxValue={(gameData.cardParams?.radius ?? 0) * 100}
              setMaxValue={(value) => {
                value = parseFloat((value / 100).toFixed(2));

                updateGameValue("params.cards.radius", value);
                addItem(
                  gameData.id,
                  createHistoryElement("gameElement", "edit", {
                    field: "params.cards.radius",
                  }),
                );
              }}
            ></InputRange>
            <span className="normalText">
              {t("aspectRatio")} :{gameData.cardParams?.ratio ?? "1/1"}
            </span>
            <InputRange
              type="range"
              min={20}
              minValue={20}
              max={80}
              maxValue={gameData.cardParams?.ratioValue ?? 0}
              setMaxValue={(value) => {
                console.log(value);
                let ratio = "0.62/1";
                if (value <= 50) {
                  ratio = "1/" + value / 50;
                } else {
                  ratio = (50 - (value - 50)) / 50 + "/1";
                }

                updateGameValue("params.cards.ratio", ratio);
                updateGameValue("params.cards.ratioValue", value);
                addItem(
                  gameData.id,
                  createHistoryElement("gameElement", "edit", {
                    field: "params.cards.ratio",
                  }),
                );
              }}
            ></InputRange>
          </div>
        </div>
      </div>
      {/* ==========END OF RENDERING OF CARDS======== */}
      {/* ==========ADDED ATTRIBUTS TO CARDS======== */}
      <div className="basicContainer renderingOfAttributsContainer">
        <div className="row rowOfAttributsHeader">
          <TitleContainer
            title="attributsOfCards"
            type="h2"
            description="attributsOfCardsDescription"
          ></TitleContainer>
          <Button
            icon="add-white"
            text="addAttribut"
            type="violetButton"
            action={() => {
              let addedAttributs = gameData.cardParams.addedAttributs ?? {};

              const newKey = `new_attribut_${Date.now()}`;
              const updatedAttributs = { ...addedAttributs, [newKey]: "" };
              updateGameValue("params.cards.addedAttributs", updatedAttributs);
              addItem(
                gameData.id,
                createHistoryElement("card", "add", {
                  id: currentCard.id,
                  action: "addAttribut",
                }),
              );
            }}
          ></Button>
        </div>
        <AttributsManagement
          attributs={gameData.cardParams.addedAttributs}
          updateAttributs={(newAttributs) => {
            updateGameValue("params.cards.addedAttributs", newAttributs);
          }}
          cards={gameData.cards}
          updateCards={(newCards) => {
            updateGameValue("assets.cards", newCards);
          }}
        ></AttributsManagement>
      </div>
    </>
  );
}
