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
  const { restoreCards, createNewDeck, getDecks, getDecksPublic } =
    useGameContext();
  const [personalDecks, setPersonalDecks] = useState([]);
  const [publicDecks, setPublicDecks] = useState([]);
  const { displayError } = useNotificationContext();
  const { navigate } = useNavigate();
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
  console.log(gameData.cardParams.assetsCardsTemplate);
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
                    updateGameValue(
                      "params.cards.assetsCardsTemplate",
                      deck.uniqueId,
                    );
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
        publicDecks.map(
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
                  updateGameValue(
                    "params.cards.assetsCardsTemplate",
                    deck.uniqueId,
                  );
                }}
              >
                <CardListReadOnly cards={deck.cards} cardParams={deck.params} />
              </SelectCard>
            ),
        )}
      </div>
    </>
  );
}
