import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useHistoryContext } from "../../../../context/HistoryContext";
// Hooks
import { createHistoryElement } from "../../../../helpers/historyObject";

// Components
import Input from "../../../../components/input/Input";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

export default function CardManagement({
  gameData,
  updateGameValueArray,
  updateGameValue,
  setGameImageUploaded,
  setGameImageUploadedUrl,
}) {
  const { t } = useTranslation();
  const [subpage, setSubpage] = useState("cardManagement");
  const { addItem } = useHistoryContext();
  
  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"cardManagement"}
        type="h1"
        description="hereYouCanManageAllSettingsConcernedCardAndDecks"
      />
      <SearchBar placeholder="searchInLibraryPlaceholder" />

      <SubNavigationBar
        buttons={{
          cardManagement: () => setSubpage("cardManagement"),
          cardImported: () => setSubpage("cardImported"),
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
      {subpage === "cardImported" && (
        <div className="basicContainer">
          <p>
            {t("ifThereIsNoCardConfigurationAllCardWillBeInTheDeckByDefault")}
          </p>
        </div>
      )}
    </div>
  );
}
