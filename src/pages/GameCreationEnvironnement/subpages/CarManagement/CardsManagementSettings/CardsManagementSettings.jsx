// External libraries
import { useTranslation } from "react-i18next";

// Contexts
import { useHistoryContext } from "../../../../../context/HistoryContext";

// Helpers
import { createHistoryElement } from "../../../../../helpers/historyObject";

// Components
import Input from "../../../../../components/input/Input";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import InputRange from "../../../../../components/inputRange/inputRange";
import CustomCard from "../CardsLibrairy/CustomCard/CustomCard";

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
      {Object.keys(gameData.cards).find((key) => {
        return gameData.cards[key].type === "custom";
      }) ? (
        <div className="basicContainer renderingOfCardContainer">
          <TitleContainer
            title="renderingOfCard"
            description="renderingOfCardDescription"
          ></TitleContainer>
          <div className="innerContainer">
            <div className="left">
              <CustomCard
                radius={gameData.cardParams.radius}
                card={
                  gameData.cards
                    ? gameData.cards[Object.keys(gameData.cards).find((key) => {
                        return gameData.cards[key].type === "custom";
                      })]
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
      ) : (
        ""
      )}
    </>
  );
}
