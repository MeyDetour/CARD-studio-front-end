// External libraries
import { useEffect, useState, useMemo, act } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../../context/GameContext";
import { useDeckContext } from "../../../../../context/DeckContext";
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
import { useNavigate } from "react-router";
// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import Alert from "../../../../../components/Alert/Alert";
import CardEdition from "../../../../../components/CardEdition/CardEdition";
import DefaultCard from "../../../../../components/DefaultCard/DefaultCard";
import ImageUploadFileContainer from "../../../../../components/ImageUploadFileContainer/ImageUploadFileContainer";

import { set } from "react-hook-form";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import CardSelectionArea from "../../../../../components/CardSelectionArea/CardSelectionArea";
import SelectCard from "../../../../../components/SelectCard/SelectCard";
import CardListReadOnly from "../../../../../components/CardListReadOnly/CardListReadOnly";
export default function CardsLibrairy({
  gameData,
  updateGameValue,
  currentCard,
  getCardsFromDb,
  setCurrentCard,
}) {
  const { t } = useTranslation();
  const { createNewDeck, getDecks, getDecksPublic, useDeckWithUniqueId } =
    useDeckContext();
  const [personalDecks, setPersonalDecks] = useState([]);
  const [publicDecksPagination, setPublicDecksPagination] = useState(1)
  const [publicDecks, setPublicDecks] = useState([]);
  const { displayError } = useNotificationContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentCard) {
      updateGameValue("assets.cards." + currentCard.id, currentCard);
      addItem(
        gameData.id,
        createHistoryElement("card", "edit", { id: currentCard.id }),
      );
    }
  }, [currentCard]);

  useEffect(() => {
    async function getData() {
      const resultDeck = await getDecks();
      const resultDecksPublic = await getDecksPublic();

      if (resultDeck && Array.isArray(resultDeck)) {
        setPersonalDecks(resultDeck);
      }
      if (resultDecksPublic && Array.isArray(resultDecksPublic)) {
        setPublicDecks(resultDecksPublic);
      }
    }

    getData();
  }, []);

  async function newDeck() {
    const resultDeck = await createNewDeck();
    if (resultDeck) {
      navigate("/deck/" + resultDeck.id);
    }
  }
  async function useDeck(deck) {
    const resultDeck = await useDeckWithUniqueId(gameData.id, deck.uniqueId);
    if (resultDeck.message == "ok") {
      updateGameValue("params.cards.assetsCardsTemplate", deck.uniqueId);
      updateGameValue("assets.cards", {});
    }
  }
  let currentDeck = personalDecks.find(deck => deck.uniqueId == gameData.cardParams.assetsCardsTemplate) || publicDecks.find(deck => deck.uniqueId == gameData.cardParams.assetsCardsTemplate);
 
  return (
    <>
      <div className="cardLibrairy-MultipleActions basicContainer">
        <TitleContainer
          title="cardLibrary"
          type="h1"
          description="hereYouCanSeeAllTheCardsYouHaveCreatedAndPublicsDecksCards"
        ></TitleContainer>

        <div className="rowButtons">
          <Button
            text="createADeck"
            action={newDeck}
            type="grey"
            icon="new-white"
          ></Button>
        </div>
      </div>
      {currentDeck && (
        <div className="basicContainer">
          <p>{t("propertiesOfCurrentDeck")}</p>
          <ul> 
            {Object.keys(currentDeck.addedAttributs ?? {}).map((key) => (
              <li key={key}>
                 {key}
              </li>
            ))}
          </ul>
        </div> 
      )}
      <div className="wrapperCardsLibrairy">
        {personalDecks.length > 0 &&
        personalDecks.map(
            (deck) =>
              deck.cards &&
              Object.keys(deck.cards).length > 0 && (
                <SelectCard
                  title={deck.name}
                  description={
                    deck.authorName ? `youCreatedThisDeck` : "noAuthor"
                  }
                  selected={
                    gameData.cardParams.assetsCardsTemplate == deck.uniqueId
                  }
                  action={() => {
                    useDeck(deck);
                  }}
                >
                  <CardListReadOnly
                    cards={deck.cards}
                    cardParams={deck.params}
                  />
                </SelectCard>
              ),
          )}
      </div>

      <div class="wrapper">
        {publicDecks.length > 0 &&
          [...publicDecks].splice(0, publicDecksPagination).map(
            (deck) =>
              deck.cards &&
              Object.keys(deck.cards).length > 0 && (
                <SelectCard
                  title={deck.name}
                  description={
                    deck.authorName ? `by ${deck.authorName}` : "noAuthor"
                  }
                  selected={
                    gameData.cardParams.assetsCardsTemplate == deck.uniqueId
                  }
                  action={() => {
                    useDeck(deck);
                  }}
                >
                  <CardListReadOnly
                    cards={deck.cards}
                    cardParams={deck.params}
                  />
                </SelectCard>
              ),
          )}
          <Button
            text="loadMore"
            action={() => setPublicDecksPagination(publicDecksPagination + 10)}
            type="withoutBorder"
            icon="add"
          ></Button>
      </div>
    </>
  );
}
