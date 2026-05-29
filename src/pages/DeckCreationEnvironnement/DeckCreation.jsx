import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/GameContext";
import { useApi } from "../../hooks/useApi";
import Loader from "../../components/Loader/Loader";
import TitleContainer from "../../components/TitleContainer/TitleContainer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ImageUploadFileContainer from "../../components/ImageUploadFileContainer/ImageUploadFileContainer";
import StatElement from "../../components/StatElement/StatElement";
import Icon from "../../components/Icon/Icon";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import {
  updateElementValue,
  updateValueArray,
} from "../../helpers/objectManagement.js";
export default function DeckCreation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [deck, setDeck] = useState(null);

  const { result, loading, error, fetchData } = useApi();
  const { getDeckInStorage, getDeck, pushDeckModification } = useGameContext();

  const [deckInStorage, setDeckInStorage] = useState(getDeckInStorage(id));

  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  useEffect(() => {
    setDeckInStorage(getDeckInStorage(id));
  }, [deck, id]);
  useEffect(() => {
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

    if (id && !deck) {
      initGame();
    }
  }, []);

  useEffect(() => {
    if (!deck || !playerHasEdit) return;
    const delayDebounceFn = setTimeout(() => {
      console.log("Sauvegarde automatique sur le serveur...");

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
    let newDeck = await pushDeckModification(deck);
    setDeck(newDeck);
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
    updateDeckValueHandler("assets.cards", result);
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
        {/* ATTRIBUTS */}
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
                let addedAttributs = deck.params.addedAttributs ?? {};

                const newKey = `new_attribut_${Date.now()}`;
                const updatedAttributs = { ...addedAttributs, [newKey]: "" };
                updateDeckValueHandler(
                  "params.addedAttributs",
                  updatedAttributs
                ); 
              }}
            ></Button>
          </div>
          {deck.params.addedAttributs &&
            Object.keys(deck.params.addedAttributs).map(
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
                          ...(deck.params.addedAttributs ?? {}),
                        };
                        if (attributKey in newAttributs) {
                          delete newAttributs[attributKey];
                        }
                        let newAssetCards = { ...deck.cards };

                        for (let cardKey of Object.keys(newAssetCards)) {
                          let card = newAssetCards[cardKey];
                          if (
                            card &&
                            card.addedAttributs &&
                            attributKey in card.addedAttributs
                          ) {
                            delete card.addedAttributs[attributKey];
                          }
                        }
                        updateDeckValueHandler(
                          "params.addedAttributs",
                          newAttributs,
                        );
                        updateDeckValueHandler("assets.cards", newAssetCards);
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
                        ...(deck.params.addedAttributs ?? {}),
                      };
                      const existingValue =
                        deck.params.addedAttributs?.[attributKey] ?? "";
                      newAttributs[value] = existingValue;
                      if (attributKey in newAttributs) {
                        delete newAttributs[attributKey];
                      }
                      let newAssetCards = { ...deck.cards };

                      for (let cardKey of Object.keys(newAssetCards)) {
                        let card = newAssetCards[cardKey];
                        if (card && card.addedAttributs?.[attributKey]) {
                          card.addedAttributs[value] = String(
                            card.addedAttributs[attributKey],
                          );
                          delete card.addedAttributs[attributKey];
                        }
                      }
                      updateDeckValueHandler(
                        "params.addedAttributs",
                        newAttributs,
                      );
                      updateDeckValueHandler("assets.cards", newAssetCards);
                    }}
                  />
                  {/* ===========Valeur======= */}
                  <Input
                    title="attributValue"
                    defaultValue={
                      deck.params.addedAttributs[attributKey] ?? ""
                    }
                    pathInObject={
                      attributKey ? "addedAttributs." + attributKey : null
                    }
                    onChangeFunction={(path, value) => {
                      let newAssetCards = { ...deck.cards };

                      updateDeckValueHandler(
                        "params.addedAttributs." + attributKey,
                        value,
                      );
                    }}
                    placeholder="enterValue"
                  />
                </div>
              ),
            )}
        </div>
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
              {/* END OF CARDS TITLE */}
      </div>
    </div>
  );
}
