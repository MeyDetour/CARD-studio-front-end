import "./style.css";
import { useEffect, useState } from "react";
import Input from "../../../../../../components/input/Input.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Icon from "../../../../../../components/Icon/Icon.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import SubNavigationBar from "../../../../../../components/SubNavigationBar/SubNavigationBar.jsx";
import Button from "../../../../../../components/Button/Button.jsx";
export default function VariableSubpage({
  globalValue,
  playerGlobalValue,
  updateGameValue,
  globalValueStatic,
  updateGameValueArray,
  getEventFromIdAndType,
}) {
  const { t } = useTranslation();

  const [subPage, setSubpage] = useState("globalValue");
  const [editedObject, setEditedObject] = useState({});

  const currentData =
    subPage === "globalValue"
      ? globalValue
      : subPage === "globalValueStatic"
        ? globalValueStatic
        : playerGlobalValue;

  function save() {
    let newCurrentData = { ...currentData };

    if (editedObject.name !== editedObject.oldName) {
      delete newCurrentData[editedObject.oldName];
    }
    delete editedObject.oldName;
    let name = editedObject.name;
    delete editedObject.name;

    newCurrentData[name] = editedObject;
    setEditedObject(null);
    updateGameValue(subPage, newCurrentData);
  }
  function removeVariable(name) {
    let newCurrentData = { ...currentData };

    delete newCurrentData[name];

    setEditedObject(null);
    updateGameValue(subPage, newCurrentData);
  }
  useEffect(() => {
    setEditedObject(null);
  }, [subPage]);
 

  return (
    <div className={" globalValuesubPageOfdemonsAndDeclencheurSubpage"}>
      {/* ========== NAVIGATION ENTRE TYPES DE VARIABLES ============== */}

      <SubNavigationBar
        buttons={{
          globalValue: () => {
            setSubpage("globalValue");
          },
          globalValueStatic: () => {
            setSubpage("globalValueStatic");
          },
          playerGlobalValue: () => {
            setSubpage("playerGlobalValue");
          },
        }}
        page={subPage}
      />
      <div className="titleRow">
        {/* ========== TITRE ET BOUTON NOUVELLE VARIABLE ============== */}
        <TitleContainer
          title={subPage}
          description={subPage + "Description"}
        ></TitleContainer>
        <Button
          text={"new"}
          icon={"add-white"}
          type="grey"
          action={() => {
            let newName = "newVariable_" + new Date().getTime();
            updateGameValue(
              subPage + "." + newName,
              {
                name: newName,
                type: "number",

                defaultValue: 0,
                display: subPage === "globalValueStatic" ? true : false,
              },
              "new",
            );
          }}
        />
      </div>
        {/* ========== INFORMATIONS IMPORTANTES ============== */}

        {subPage == "globalValue" &&
      <div className="informationContainer basicContainer">
            <p>
              Note importante : Certaines variables ne doivent pas être créées
              manuellement. Pour y accéder et les configurer, rendez-vous sur la
              page concernée ; ne les recréez pas ici. Vous pouvez utiliser ces
              variables directement dans vos formules.
              <br />
              Voici les variables concernées :
            </p>
            <ul>
              <li>
                <strong>players :</strong> Liste des joueurs.
              </li>
              <li>
                <strong>messages :</strong> Messages traités et envoyés.
              </li>
              <li>
                <strong>logs :</strong> Historique des logs du jeu.
              </li>
              <li>
                <strong>state :</strong> État actuel de la partie.
              </li>
              <li>
                <strong>boardCard :</strong> Cartes posées sur le plateau.
              </li>
              <li>
                <strong>allPlayersHasPlayed :</strong> État de jeu de l'ensemble
                des joueurs.
              </li>
              <li>
                <strong>winners :</strong> Liste des vainqueurs (la victoire est
                gérée dans l'onglet "Déroulement").
              </li>
              <li>
                <strong>currentPlayerPosition :</strong> Position du joueur dont
                c'est le tour.
              </li>
              <li>
                <strong>tour :</strong> Numéro du tour actuel.
              </li>
              <li>
                <strong>manche :</strong> Numéro de la manche actuelle.
              </li>
              <li>
                <strong>gain (global) :</strong> Pot commun des gains.
              </li>
            </ul>
          </div>
          }

        {subPage == "playerGlobalValue" && 
      <div className="informationContainer basicContainer">
            <p>
              Note importante : Certaines variables ne doivent pas être créées
              manuellement. Pour y accéder et les configurer, rendez-vous sur la
              page concernée ; ne les recréez pas ici. Vous pouvez utiliser ces
              variables directement dans vos formules.
              <br></br>
              Voici les variables concernées :
            </p>
            <ul>
              <li>
                <strong>gain (joueur) :</strong> Gains accumulés par le joueur.
              </li>
              <li>
                <strong>handDeck :</strong> Cartes actuellement en main.
              </li>
              <li>
                <strong>personalHandDeck :</strong> Deck personnel du joueur (si
                applicable).
              </li>
              <li>
                <strong>personalHandDiscard :</strong> Défausse personnelle du
                joueur (si applicable).
              </li>
              <li>
                <strong>hasPlayed :</strong> Indique si le joueur a déjà
                effectué son action.
              </li>
              <li>
                <strong>hasWin :</strong> Indique si le joueur a gagné.
              </li>
              <li>
                <strong>actions :</strong> Actions disponibles ou effectuées par
                le joueur ce tour-ci.
              </li>
              <li>
                <strong>roles :</strong> Rôles attribués au joueur.
              </li>
              <li>
                <strong>attachedEventForTour :</strong> Événement temporaire
                associé au joueur (ex : "Passer son tour").
              </li>
            </ul>
         </div>}
      

      {/* ========== LISTE DES VARIABLES ============== */}
      {currentData &&
        Object.keys(currentData)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => {
            const isEditing = editedObject && key === editedObject.oldName;
            const item = currentData[key];
            return isEditing ? (
              <div key={key} className="basicContainer globalValueElementForm">
                {/* ========== NOM============== */}
                <Input
                  title="name"
                  inputType="input"
                  placeholder="enterName"
                  defaultValue={editedObject.name}
                  onChangeFunction={(value) => {
                    console.log(value);
                    let existing;
                    let newValue = value;
                    if (subPage === "globalValue") {
                      existing = globalValue[newValue];
                    }
                    if (subPage === "playerGlobalValue") {
                      existing = playerGlobalValue[newValue];
                    }
                    if (existing) {
                      newValue =
                        value + "(copy" + Math.floor(Math.random() * 100) + ")";
                    }
                    setEditedObject((prev) => ({ ...prev, name: newValue }));
                  }}
                />
                {/* ========== TYPE ============== */}
                <div className="row">
                  <InputSelect
                    title="typeOfVariable"
                    items={[
                      "cardList",
                      "list",
                      "number",
                      "string",
                      "gainObject",
                      "object",
                    ]}
                    selected={editedObject?.type ? [editedObject.type] : []}
                    closeAfterSelect={true}
                    updateValueArray={(value) => {
                      setEditedObject((prev) => ({ ...prev, type: value }));
                    }}
                  />
                  {/* ========== DEFAULT VALUE FOR GLOBAL VALUE AND PLAYER GLOBAL VALUE ============== */}
                  {(subPage === "globalValue" ||
                    subPage === "playerGlobalValue") && (
                    <Input
                      title="defaultValue"
                      inputType="input"
                      placeholder="enterValue"
                      defaultValue={editedObject.defaultValue}
                      onChangeFunction={(value) => {
                        setEditedObject((prev) => ({
                          ...prev,
                          defaultValue: value,
                        }));
                      }}
                    />
                  )}
                  {subPage === "globalValueStatic" && (
                    <Input
                      title="caclulatedValue"
                      inputType="input"
                      placeholder="enterValue"
                      defaultValue={editedObject.value}
                      onChangeFunction={(value) => {
                        setEditedObject((prev) => ({
                          ...prev,
                          value: value,
                        }));
                      }}
                    />
                  )}
                </div>
                {/* ========== VISIBILITY ============== */}
                <Input
                  title="visibility"
                  description="thisElementWillBeVisibleInGame"
                  defaultValue={editedObject.display}
                  inputType="toggle"
                  onChangeFunction={(value) => {
                    setEditedObject((prev) => ({ ...prev, display: value }));
                  }}
                />
                {/* ========== SAVE ============== */}
                <Button
                  text={"save"}
                  type="violetButton"
                  action={save}
                ></Button>
                {/* ========== DELETE============== */}
                <Button
                  text={"delete"}
                  type="redButton"
                  action={() => {
                    if (confirm(t("doYouRealyWantToDelete"))) {
                      removeVariable(key);
                    }
                  }}
                ></Button>
              </div>
            ) : 
            (
              <div key={key} className="basicContainer globalValueElement">

             {/* AFFICHAGE D'UNE VARIABLE */}
                <div className="elementHeader">
                  <h3>{key}</h3>
                  <Icon
                    name="pen"
                    callback={() => {
                      setEditedObject({
                        name: key,
                        oldName: key,
                        type: item.type,
                        defaultValue: item.defaultValue,
                        value: item.value,
                        display: item.display ? item.display : false,
                      });
                    }}
                  />
                </div>

                <p>Type : {item.type}</p>
                <p>Visible : {t(item.display ? "yes" : "no")}</p>
                {subPage !== "globalValueStatic" &&  <p>{t('defaultValue')} : {item.defaultValue ?? t("none")}</p> }
                {subPage == "globalValueStatic" &&  <p>{t('valueLabel')} : {item.value ?? t("none")}</p> }
              </div>
            );
          })}
    </div>
  );
}
