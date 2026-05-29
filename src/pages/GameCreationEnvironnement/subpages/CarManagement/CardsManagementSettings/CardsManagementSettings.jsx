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
      </div>

      <div className="basicContainer">
        {/* ======DISCARD======= */}

        <TitleContainer title="discardDeck"></TitleContainer>
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
      <div className="basicContainer">
        {/* ======PLAYER HAND======= */}

        <TitleContainer title="playerHand"></TitleContainer>
        <Input
          title="playerHand"
          description="activatePlayerHandDescription"
          defaultValue={gameData.cardParams?.hand?.activation ?? false}
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
            <CustomCard
              radius={gameData.cardParams.radius}
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
              {t("maxNumberOfMance")} : {gameData.cardParams?.radius ?? 0}
            </span>
            <InputRange
              type="range"
              min={0}
              max={50}
              maxValue={gameData.cardParams?.radius ?? 0}
              setMaxValue={(value) => {
                updateGameValue("params.cards.radius", value);
                addItem(
                  gameData.id,
                  createHistoryElement("gameElement", "edit", {
                    field: "params.cards.radius",
                  }),
                );
              }}
            ></InputRange>
          </div>
        </div>
      </div>
      <div className="basicContainer renderingOfAttributsContainer">
        <div className="row rowOfAttributsHeader">
          <TitleContainer
            title="attributsOfCards"
            type="h2"
            description="renderingOfCardDescription"
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
        {gameData.cardParams.addedAttributs &&
          Object.keys(gameData.cardParams.addedAttributs).map(
            (attributKey, key) => (
              <div className="row">
                <Icon
                  name="close"
                  callback={() => {
                    if (
                      window.confirm(
                        t("areYouSureToRemoveThisAttributsToAllCArds"),
                      )
                    ) {
                      const newAttributs = {
                        ...(gameData.cardParams.addedAttributs ?? {}),
                      };  if (attributKey in newAttributs) {
                        delete newAttributs[attributKey];
                      }
                      let newAssetCards = { ...gameData.cards };

                      for (let cardKey of Object.keys(newAssetCards)) {
                        let card = newAssetCards[cardKey];
                        if (card && card.addedAttributs && attributKey in card.addedAttributs) {
                          delete card.addedAttributs[attributKey];
                        }
                      }
                      updateGameValue(
                        "params.cards.addedAttributs",
                        newAttributs,
                      );
                      updateGameValue("assets.cards", newAssetCards);
                    }
                  }}
                ></Icon>
                {/* ===========Clé======= */}
                <Input
                  title="attributKey"
                  defaultValue={attributKey}
                  pathInObject={
                    attributKey ? "addedAttributs." + attributKey : null
                  }
                  onChangeFunction={(path, value) => {
                    value = value.replaceAll(" ", "_");
                    const newAttributs = {
                      ...(gameData.cardParams.addedAttributs ?? {}),
                    };
                    const existingValue =
                      gameData.cardParams.addedAttributs?.[attributKey] ?? "";
                    newAttributs[value] = existingValue;
                    if (attributKey in newAttributs) {
                      delete newAttributs[attributKey];
                    }
                    let newAssetCards = { ...gameData.cards };

                    for (let cardKey of Object.keys(newAssetCards)) {
                      let card = newAssetCards[cardKey];
                      if (card && card.addedAttributs?.[attributKey]) {
                        card.addedAttributs[value] = String(
                          card.addedAttributs[attributKey],
                        );
                        delete card.addedAttributs[attributKey];
                      }
                    }
                    updateGameValue(
                      "params.cards.addedAttributs",
                      newAttributs,
                    );
                    updateGameValue("assets.cards", newAssetCards);
                  }}
                />
                {/* ===========Valeur======= */}
                <Input
                  title="attributValue"
                  defaultValue={
                    gameData.cardParams.addedAttributs[attributKey] ?? ""
                  }
                  pathInObject={
                    attributKey ? "addedAttributs." + attributKey : null
                  }
                  onChangeFunction={(path, value) => {
                    let newAssetCards = { ...gameData.cards };

                    updateGameValue(
                      "params.cards.addedAttributs." + attributKey,
                      value,
                    );
                  }}
                  placeholder="enterValue"
                />
              </div>
            ),
          )}
      </div>
    </>
  );
}
