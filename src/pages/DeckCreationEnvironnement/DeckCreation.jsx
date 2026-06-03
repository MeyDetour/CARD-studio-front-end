import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/GameContext";
import { useDeckContext } from "../../context/DeckContext";
import { useApi } from "../../hooks/useApi";
import Loader from "../../components/Loader/Loader";
import TitleContainer from "../../components/TitleContainer/TitleContainer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ImageUploadFileContainer from "../../components/ImageUploadFileContainer/ImageUploadFileContainer";
import StatElement from "../../components/StatElement/StatElement";
import Icon from "../../components/Icon/Icon";
import { useTokenContext } from "../../context/TokenContext";
import InputRange from "../../components/inputRange/inputRange";
import CardSelectionArea from "../../components/CardSelectionArea/CardSelectionArea";
import DetailContainer from "../../components/DetailContainer/DetailContainer";
import AttributsManagement from "../../components/AttributsManagement/AttributsManagement";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import {
  updateElementValue,
  updateValueArray,
} from "../../helpers/objectManagement.js";
import CustomCard from "../../components/CustomCard/CustomCard.jsx";
import DefaultCard from "../../components/DefaultCard/DefaultCard.jsx";
import CardEdition from "../../components/CardEdition/CardEdition.jsx";
import CardEditionPage from "../../components/CardEdition/CardEdition.jsx";
import { createNewORderForCard } from "../../helpers/cards.js"; 
export default function DeckCreation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const { result, loading, error, fetchData } = useApi();
  const {
    getDeckInStorage,
    getDeck,
    deleteDeck,
    pushDeckModification,
    saveNewDeckInStorage,
    restoreCardsDeck,
  } = useDeckContext();
  const { getToken } = useTokenContext();
  const [deckInStorage, setDeckInStorage] = useState(getDeckInStorage(id));
  const [playerHasEdit, setPlayerHasEdit] = useState(false);

  useEffect(() => {
    setDeckInStorage(getDeckInStorage(id));
  }, [deck, id, playerHasEdit, setDeck]);
  const initGame = async () => {
    const stored = getDeckInStorage(id);

    if (stored && String(stored.id) === String(id)) {
      if (stored && stored.id == id) {
        setDeck(stored);
      }
    } else {
      const result = await getDeck(id);
      if (result) {
        setDeck(result);
      }
    }
  };

  useEffect(() => {
    if (id && !deck) {
      initGame();
    }
  }, []);
  useEffect(() => {
    if (currentCard) {
      updateDeckValueHandler("cards." + currentCard.id, currentCard);
    }
  }, [currentCard]);
  useEffect(() => {
    if (!deck || !playerHasEdit) return;
    const delayDebounceFn = setTimeout(() => {
      console.log("Sauvegarde automatique dans le stockage local...");

      saveNewDeckInStorage(deck);
      setPlayerHasEdit(false);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [deck, playerHasEdit]);

  if (loading) return <Loader />;
  if (error) return <p>Erreur : {error}</p>;
  if (!deck) return <Loader />; 

  // =========== UPDATE DECK OBJECT ============
  const updateDeckValueHandler = (path, value, type) => {
    setDeck((prev) => updateElementValue(path, prev, value, type));
    setPlayerHasEdit(true);
  };

  const updateDeckValueArrayHandler = (path, value, type = "multiple") => {
    setDeck((prev) => updateValueArray(path, prev, value, type));
    setPlayerHasEdit(true);
  };
  // =========== DECK SAVES ============
  const saveDeck = async () => {
    console.log(deck);
    let newDeck = await pushDeckModification(deck);
    setDeck(newDeck);
    setDeckInStorage(getDeckInStorage(id));
  };
  // =========== SAVE DECK IN STORAGE ============
  async function uploadZipOfCards(file) {
    const formData = new FormData();
    formData.append("file", file);

    const result = await fetchData(
      "api/deck/" + deck.id + "/cards/uploadZip",
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
    updateDeckValueHandler("cards", result);
  }
  if (currentCard) {
    return (
      <div className={" deckCreationEnvironnementPage"}>
        <GameCreationEnvironnementHeader name={deck.name} />
        <div className="content">
          <Button
            text="seeAllCards"
            icon="left_arrow"
            type="whiteWithBordure"
            action={() => {
              setCurrentCard(null);
            }}
          ></Button>
          <CardEdition
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            linkToUploadImage={"api/deck/" + deck.id + "/card/uploadImage"}
            cardParams={deck.params}
            updateElementValue={(id, element) =>
              updateDeckValueHandler("cards." + id, element)
            }
            reArangeCardOrder={(card) => {
              console.log(card);
              let newCards = createNewORderForCard(
                updateElementValue(String(card.id), deck.cards, card),
              );

              updateDeckValueHandler("cards", newCards);
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={" deckCreationEnvironnementPage"}>
      <GameCreationEnvironnementHeader name={deck.name} />
      <div className="content">
        {/* HEADER */}
        <div className="row headerRow">
          <TitleContainer
            title={deck.name}
            deactivateTitleTranslation="true"
          ></TitleContainer>
          <div className="buttonContainer">
            <Button
              icon="save"
              text="save"
              clickable={deckInStorage ? true : false}
              disabled={!deckInStorage}
              type={
                deckInStorage ? "whiteWithBordure" : "whiteWithBordure-Disabled"
              }
              action={() => saveDeck()}
            ></Button>
          </div>
        </div>
        {/*STATISTIQUES */}
        <div className="row">
          <StatElement
            icon="layer-violet-background"
            number={deck.usageCount}
            text="uses"
          />
        </div>
        {/* IDENTITY */}
        <div className="row rowIdentity">
        <div className="basicContainer">
          <Input
            title="name"
            pathInObject="name"
            onChangeFunction={(path, value) => {
              updateDeckValueHandler(path, value);
            }}
            defaultValue={deck.name}
          />
          <Input
            title="nameOfAuthorToRender"
            description="nameOfAuthorToRenderDescription"
            pathInObject="authorName"
            onChangeFunction={(path, value) => {
              updateDeckValueHandler(path, value);
            }}
            defaultValue={deck.authorName}
          />
          <Input
            title="usableForOtherPeople"
            description="usableForOtherPeopleDescription"
            defaultValue={deck.isPublished}
            inputType="toggle"
            pathInObject="params.globalGame.jeuSolo"
            onChangeFunction={(path, value) => {
              updateDeckValueHandler(path, value);
            }}
          />
        </div>
        {/* ==========RENDERING OF CARDS======== */}
        {Object.keys(deck.cards).some((key) => {
          return deck.cards[key].type === "custom";
        }) && (
          <div className="basicContainer renderingOfCardContainer">
            <TitleContainer
              title="renderingOfCard"
              type="h2"
              description="renderingOfCardDescription"
            ></TitleContainer>

            <div className="innerContainer">
              <div className="left">
                {/* ICI : La carte d'exemple fait 200px de large. // Le rayon max
                    pour un cercle est de 100px (200 / 2). // On multiplie ce rayon max
                    par le ratio (0 à 1) pour avoir le rendu exact en pixels.
                     */}
                <CustomCard
                  radius={(deck.params?.radius ?? 0) * 100}
                  aspectRatio={deck.params?.ratio ?? 1}
                  card={
                    deck.cards
                      ? deck.cards[
                          Object.keys(deck.cards).find((key) => {
                            return deck.cards[key].type === "custom";
                          })
                        ]
                      : null
                  }
                ></CustomCard>
              </div>

              <div className="right">
                <span className="normalText">
                  {t("maxNumberOfMance")} :
                  {Math.round((deck.params?.radius ?? 0) * 100)} %
                </span>
                <InputRange
                  type="range"
                  min={0}
                  max={30}
                  maxValue={(deck.params?.radius ?? 0) * 100}
                  setMaxValue={(value) => {
                    value = parseFloat((value / 100).toFixed(2));

                    updateDeckValueHandler("params.radius", value);
                  }}
                ></InputRange>
                <span className="normalText">
                  {t("aspectRatio")} :{deck.params?.ratio ?? "1/1"}
                </span>
                <InputRange
                  type="range"
                  min={20}
                  max={80}
                  minValue={20}
                  maxValue={deck.params?.ratioValue ?? 0}
                  setMaxValue={(value) => {
                    console.log(value);
                    let ratio = "0.62/1";
                    if (value <= 50) {
                      ratio = "1/" + value / 50;
                    } else {
                      ratio = (50 - (value - 50)) / 50 + "/1";
                    }

                    console.log(ratio);

                    updateDeckValueHandler("params.ratioValue", value);
                    updateDeckValueHandler("params.ratio", ratio);
                  }}
                ></InputRange>
              </div>
            </div>
          </div>
        )}
        </div>
        {/* ==========END OF RENDERING OF CARDS======== */}
        {/* ATTRIBUTS */}
        <AttributsManagement
          attributs={deck.params.addedAttributs}
          updateAttributs={(newAttributs) => {
            updateDeckValueHandler("params.addedAttributs", newAttributs);
          }}
          cards={deck.cards}
          updateCards={(newCards) => {
            updateDeckValueHandler("cards", newCards);
          }}
        ></AttributsManagement>
        {/* END OF ATTRIBUTS */}
        {/* CARDS TITLE */}
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
                  order: Object.keys(deck.cards).length + 1,
                };

                updateDeckValueHandler("cards." + newCard.id, newCard, "new");
                setCurrentCard(newCard);
              }}
            ></Button>
          </div>
        </div>
        {/* END OF CARDS TITLE */}
        {/* CARDS LIBRAIRY */}
        <CardSelectionArea
          cards={deck.cards}
          addedAttributs={deck.params.addedAttributs}
          cardParams={deck.params}
          setCurrentCard={setCurrentCard}
          updateCardValue={(id, value, type) =>
            updateDeckValueHandler("cards." + id, value, type)
          }
          updateCards={(newCards) => updateDeckValueHandler("cards", newCards)}
        />
        {/* ADVANCED OPTIONS FOR DECK */}
        <DetailContainer
          title={t("advancedOptionForDeck")}
          description={t("advancedOptionForDeckDescription")}
        >
          {" "}
          <div className="row " style={{ alignItems: "center" }}>
            <TitleContainer
              title={"fixBrokenCards"}
              type="h2"
              description={"fixYouBrokenCardByDeleteThem"}
            />

            <Button
              text={"fix"}
              type={"grey  fit-content"}
              addActionConfirmation={true}
              action={async () => {
                if (confirm(t("doYouRealyWantToDeleteBrokenCards"))) {
                  let newCards = { ...deck.cards };
                  for (let cardId of Object.keys(deck.cards)) {
                    let card = deck.cards[cardId];
                    if (!card || !card.id || !card.type || !card.url) {
                      delete newCards[cardId];
                    }
                  }
                  console.log(newCards);

                  updateDeckValueHandler("cards", newCards);
                  if (addLog)
                    addLog(
                      createHistoryElement("cards", "delete", {
                        id: Object.keys(newCards).join(","),
                      }),
                    );
                }
              }}
            ></Button>
          </div>
          <div className="row " style={{ alignItems: "center" }}>
            <TitleContainer
              title={"restoreCards"}
              type="h2"
              description={"allYoursCardsWillBeRestoredToDefaultCardsPack"}
            />

            <Button
              text={"restoreCards"}
              type={"grey fit-content"}
              addActionConfirmation={true}
              action={async () => {
                if (confirm(t("doYouRealyWantToRestore"))) {
                  let result = await restoreCardsDeck(deck.id);
                  if (result && result.message === "ok") {
                    initGame();
                  }
                }
              }}
            ></Button>
          </div>
          <div className="row " style={{ alignItems: "center" }}>
            <TitleContainer
              title={"reorderCards"}
              type="h2"
              description={
                "thisOptionWillOnlyCorrigeOrderOfCardsYouCanAlsoReorderCardsByDragAndDropThemInTheLibrary"
              }
            />

            <Button
              text={"reorderCards"}
              type={"grey fit-content"}
              addActionConfirmation={true}
              action={async () => {
                updateDeckValueHandler(
                  "cards",
                  createNewORderForCard(deck.cards),
                );
              }}
            ></Button>
          </div>
          <div className="row " style={{ alignItems: "center" }}>
            <TitleContainer
              title={"restoreLastSavedVersion"}
              type="h2"
              description={
                "thisOptionWillRestoreTheLastSavedVersionOfYourDeckIfYouHaveMadeChangesSinceTheLastSaveAndYouDontWantToKeepThem"
              }
            />

            <Button
              text={"restoreLastSavedVersion"}
              type={"grey fit-content"}
              addActionConfirmation={true}
              action={async () => {
                const result = await getDeck(id);
                if (result) {
                  setDeck(result);
                  saveNewDeckInStorage(result);
                }
              }}
            ></Button>
          </div>
        </DetailContainer>
         {/*END OF ADVANCED OPTIONS CONTAINER */}
        {/* DELETE DECK */}
        <div className="basicContainer basicRedContainer rewardsManagementSection">
          <TitleContainer
            title={"deleteDeck"}
            type="h2"
            description={"ifYouPressDeleteYouWillDeleteAllCardsAndDeck"}
          />

          <Button
            text={"deleteDeck"}
            type="redButton"
            action={async () => {
              if (confirm(t("doYouRealyWantToDeleteDeck"))) {
                let result = await deleteDeck(deck.id);
                if (result && result.message === "ok") {
                  navigate("/");
                }
              }
            }}
          ></Button>
        </div>
        {/* END OF CARDS LIBRAIRY */}
      </div>
    </div>
  );
}
