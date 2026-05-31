import { SelectionArea } from "@viselect/react";
import { useState, useMemo } from "react";
import {
  updateValueArray,
  updateElementValue,
} from "../../helpers/objectManagement";
import DefaultCard from "../DefaultCard/DefaultCard";
import CustomCard from "../CustomCard/CustomCard";
import Alert from "../Alert/Alert";
import { useTranslation } from "react-i18next";
import { createHistoryElement } from "../../helpers/historyObject";
import TitleContainer from "../TitleContainer/TitleContainer";
import SearchBar from "../SearchBar/SearchBar";
import InputSelect from "../InputSelect/InputSelect";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { sortCardsKeyInOrder } from "../../helpers/cards.js";
import { createNewORderForCard } from "../../helpers/cards.js";
import "./style.css";
export default function CardSelectionArea({
  addedAttributs,
  // gameData contient les données du jeu
  cards,
  // setCurrentCard est la fonction pour définir la carte actuelle
  setCurrentCard,
  // alertList est la liste des alertes
  alertList,
  // envoie un element d'historique avec le detail de l'action
  // pour le journal de modification
  // (elementDetail)=>
  addLog,
  // cardParams contient les paramètres des cartes, comme le radius
  cardParams,
  // updateGameValue est la fonction pour mettre à jour les données du jeu
  // elle prend en paramètre le chemin de la valeur à mettre à jour, la nouvelle valeur, et le type d'opération (edit, delete, add)
  // (ex: (id,newValue,type)=>updateGameValue("assets.cards." + id, newValue, type))
  updateCardValue,
  // function qui met à jour les cartes dans le composant parent, elle prend en paramètre les nouvelles cartes
  updateCards,
}) {
  // selected est un Set qui contient les clés des cartes sélectionnées
  const [selected, setSelected] = useState(new Set());
  // filters est un objet qui contient les filtres appliqués, par exemple { type: ["custom"], quantity: [2, 3], addedAttributs: { couleur: ["coeur"] } }
  const [filters, setFilters] = useState({});
  // Permet de mettre à jour les modifications multiples
  // multipleEdit est un objet qui contient les modifications à appliquer à tous les éléments sélectionnés
  // en même temps, il est défini lorsque l'utilisateur souhaite modifier plusieurs cartes en même temps,
  // et il est réinitialisé lorsque l'utilisateur commence une nouvelle sélection
  const [multipleEdit, setMultipleEdit] = useState({});
  const [displayMultipleEdit, setDisplayMultipleEdit] = useState(false);
  const { t } = useTranslation();
  // searchTerm est la valeur de l'entrée de recherche, elle est utilisée pour filtrer les cartes dans
  // la bibliothèque
  const [searchTerm, setSearchTerm] = useState("");

  // suggestionsForAttributs est un objet qui contient les différentes valeurs possibles pour les attributs ajoutés,
  const suggestionsForAttributs = useMemo(() => {
    const result = {};
    Object.keys(addedAttributs || {}).forEach((attrKey) => {
      const values = new Set();
      Object.values(cards).forEach((card) => {
        const val = card.addedAttributs?.[attrKey];
        if (val) values.add(val);
      });
      values.add("none");
      result[attrKey] = Array.from(values);
    });
    let values = new Set();
    Object.values(cards).forEach((card) => {
      const val = card.quantity;
      if (val) values.add(val);
    });
    values.add("none");
    result["quantity"] = Array.from(values);
    return result;
  }, [cards, addedAttributs]);
  return (
    <>
      <SelectionArea
        selectionConfig={{
          className: "selection-area", // La classe du rectangle bleu qui va apparaître
        }}
        features={{
          touch: false, // Désactive le touch si tu es sur PC pour éviter les bugs
          range: true, // Permet la sélection par zone
        }}
        selectables=".selectable"
        className="basicContainer cardLibrarySelectionArea"
        onClick={() => {
          setSelected(new Set());
        }}
        onStart={({ event, selection }) => {
          if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            setSelected(new Set());
            setMultipleEdit({});
          }
        }}
        onStop={() => {
          setDisplayMultipleEdit(true);
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
        <TitleContainer title="filterCards" type="h2"></TitleContainer>
        <div className="row filterCardsInput">
          <SearchBar
            callback={(value) => {
              setSearchTerm(value);
            }}
            placeholder="searchInLibraryPlaceholder"
          />

          <InputSelect
            title="type"
            closeAfterSelect={true}
            updateValueArray={(path, value) => {
              setFilters((prev) => updateValueArray(path, prev, value));
            }}
            pathObject="type"
            selected={filters.type ?? []}
            items={["french_standard", "custom"]}
          />
          <InputSelect
            title="quantity"
            closeAfterSelect={true}
            updateValueArray={(path, value) => {
              setFilters((prev) => updateValueArray(path, prev, value));
            }}
            pathObject="quantity"
            selected={filters.quantity ?? []}
            items={
              suggestionsForAttributs
                ? suggestionsForAttributs["quantity"] || []
                : []
            }
          />
          {addedAttributs &&
            Object.keys(addedAttributs).map((attributKey, key) => (
              <InputSelect
                title={attributKey}
                closeAfterSelect={true}
                updateValueArray={(path, value) => {
                  setFilters((prev) =>
                    updateValueArray(path, prev, value, "multiple"),
                  );
                }}
                pathObject={"addedAttributs." + attributKey}
                selected={
                  filters.addedAttributs && filters.addedAttributs[attributKey]
                    ? filters.addedAttributs[attributKey]
                    : []
                }
                items={
                  suggestionsForAttributs
                    ? suggestionsForAttributs[attributKey] || []
                    : []
                }
              />
            ))}
        </div>
        <div className="cardWrapper">
          {sortCardsKeyInOrder(cards).map((key) => {
            const card = cards[key];
            let isHidden = false;

            if (searchTerm && !JSON.stringify(card).includes(searchTerm)) {
              isHidden = true;
            }
            // verifier les filtres
            for (let filterKey of Object.keys(filters)) {
              const activeFilters = filters[filterKey];

              // filtres simple comme type=custom
              if (
                !activeFilters ||
                (Array.isArray(activeFilters) && activeFilters.length === 0)
              )
                continue;

              if (filterKey === "type") {
                if (!activeFilters.includes(card.type)) {
                  isHidden = true;
                  break;
                }
              }
              if (filterKey === "quantity" && !isHidden) {
                // si la quantité n'est pas requise, ou si il y a une correspondance entre la quantité de la carte et les filtres actifs, on ne cache pas la carte
                if (
                  (!activeFilters.includes(card.quantity) &&
                    card.quantity != null) ||
                  (card.quantity == null && !activeFilters.includes("none"))
                ) {
                  isHidden = true;
                  break;
                }
              }

              //filtres sur les attributs comme addedAttributs.couleur=pique
              if (filterKey === "addedAttributs" && !isHidden) {
                for (let attrKey of Object.keys(activeFilters)) {
                  const selectedValues = activeFilters[attrKey];

                  // Si aucun filtre n'est coché pour cet attribut, on ne bloque pas la carte
                  if (!selectedValues || selectedValues.length === 0) continue;

                  const cardValue = card.addedAttributs?.[attrKey];

                  // On vérifie si la valeur de la carte correspond à une des options sélectionnées
                  // (Soit la valeur exacte, soit "none" si la carte n'a pas de valeur)
                  const matchesValue =
                    cardValue && selectedValues.includes(cardValue);
                  const matchesNone =
                    !cardValue && selectedValues.includes("none");

                  // Si la carte ne remplit aucune des deux conditions, on la cache
                  if (!matchesValue && !matchesNone) {
                    isHidden = true;
                    break;
                  }
                }
              }
            }
            if (selected.size > 0 && selected.has(String(key))) {
              isHidden = false;
            }
            if (isHidden) return null;

            const isSelected = selected.has(String(key));
            // Pour DefaultCard, data-key est déjà bien passé
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
                  {alertList && (
                    <Alert
                      alertList={alertList}
                      displayAlertStartWith={card.id + "|card|"}
                    ></Alert>
                  )}
                </DefaultCard>
              );
            }
            // resize radius of custom card to fit in the library ( library card are 78px width, but in the edition page they are 200px width, so we need to resize the radius to fit the new size )
            return (
              <CustomCard
                action={() => {
                  setCurrentCard(card);
                }}
                key={key}
                card={card}
                radius={cardParams.radius * 80}
                aspectRatio={cardParams.ratio ?? "0.67/1"}
                hoverable={true}
                isSelected={isSelected}
                // On ne passe plus dataKey ici, mais on va le passer dans classAdded pour l'ajouter sur le bon div
                classAdded={`selectable ${isSelected ? "selected" : ""}`}
                dataKey={key}
              >
                {alertList && (
                  <Alert
                    alertList={alertList}
                    displayAlertStartWith={card.id + "|card|"}
                  ></Alert>
                )}
              </CustomCard>
            );
          })}
        </div>
      </SelectionArea>
      {displayMultipleEdit && (
        <div className="cardLibrairy-MultipleActions basicContainer">
          {/*===== multiple edit couleur si tous les elements sont french_standard =====*/}
          {!Array.from(selected).some(
            (key) => cards[key]?.type !== "french_standard",
          ) && (
            <InputSelect
              title="colorOfCard"
              closeAfterSelect={true}
              disabled={selected.size === 0}
              updateValueArray={(path, value) => {
                for (let key of selected) {
                  updateCardValue(
                    key,
                    updateElementValue(path, cards[key], value),
                  );
                  if (addLog) {
                    addLog(
                      createHistoryElement("cards", "edit", {
                        id: key,
                      }),
                    );
                  }
                }
              }}
              pathObject="addedAttributs.couleur"
              selected={
                selected.size == 1
                  ? [
                      cards[Array.from(selected)[0]]?.addedAttributs?.couleur ??
                        "",
                    ]
                  : [multipleEdit?.couleur ?? ""]
              }
              items={["trefle", "coeur", "carreau", "pique"]}
            />
          )}
          {selected.size == 1 && (
            <Input
              type="number"
              title="order"
              defaultValue={cards[Array.from(selected)[0]]?.order != null ? cards[Array.from(selected)[0]]?.order : ""}
              pathInObject="order"
              onChangeFunction={(path, value) => { 
                console.log(value);
                if (value==1 || value=="1"){
                  value =0
                }
                let card = cards[String(Array.from(selected)[0])];
                let newCard = updateElementValue(path, card, value==="" ? "" : parseInt(value,10));
                console.log(newCard);
                if (value==="") {
                  
                  updateCardValue(
                    card.id,
                   newCard
                  );
                } else {
                  updateCards(
                    createNewORderForCard(
                      updateElementValue(
                        String(card.id),
                        cards, 
                        newCard
                      ),
                    ),
                  );
                }
              }}
            />
          )}{" "}
          <Input
            type="number"
            title="quantity"
            disabled={selected.size === 0}
            defaultValue={
              selected.size == 1
                ? (cards[Array.from(selected)[0]]?.quantity ?? "")
                : (multipleEdit?.quantity ?? "")
            }
            pathInObject="quantity"
            onChangeFunction={(path, value) => {
              for (let key of selected) {
                updateCardValue(
                  key,
                  updateElementValue(path, cards[key], value),
                );
                if (addLog) {
                  addLog(
                    createHistoryElement("cards", "edit", {
                      id: key,
                    }),
                  );
                }
              }
              setMultipleEdit((prev) => ({
                ...prev,
                quantity: value,
              }));
            }}
          />
          {/* ===========added attributes======= */}
          {addedAttributs &&
            Object.keys(addedAttributs).map((attributKey, key) => (
              <Input
                title={attributKey}
                disabled={selected.size === 0}
                defaultValue={
                  selected.size == 1
                    ? (cards[Array.from(selected)[0]]?.addedAttributs?.[
                        attributKey
                      ] ?? "")
                    : (multipleEdit?.[attributKey] ?? "")
                }
                pathInObject={
                  attributKey ? "addedAttributs." + attributKey : null
                }
                onChangeFunction={(path, value) => {
                  for (let key of selected) {
                    updateCardValue(
                      key,
                      updateElementValue(path, cards[key], value),
                    );
                    if (addLog) {
                      addLog(
                        createHistoryElement("cards", "edit", {
                          id: key,
                        }),
                      );
                    }
                  }
                  setMultipleEdit((prev) => ({
                    ...prev,
                    [attributKey]: value,
                  }));
                }}
                placeholder="enterValue"
              />
            ))}
          {/*===== multiple delete ================ */}
          <div className="basicContainer basicWarningContainer rewardsManagementSection">
            <TitleContainer
              title={"deleteSelection"}
              type="h2"
              description={"youDeleteCardWithoutSave"}
            />

            <Button
              text={"deleteSelection"}
              type="whiteWithBordure"
              action={async () => {
                if (confirm(t("doYouRealyWantToDeleteTheseCards"))) {
                  for (let key of selected) {
                    updateCardValue(key, cards[key], "delete");
                    if (addLog) {
                      addLog(
                        createHistoryElement("cards", "delete", {
                          id: key,
                        }),
                      );
                    }
                  }
                }
                setSelected(new Set());
              }}
            ></Button>
          </div>
        </div>
      )}
    </>
  );
}
