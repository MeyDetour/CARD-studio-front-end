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
  suggestions,
  winParams,
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

  return (
    <div className={"winSubPagefdemonsAndDeclencheurSubpage"}>
      <TitleContainer
        title={"winCondition"}
        description={"hereYouCanConfigureWhenWinAppendAndVictoryCondition"}
        type="h2"
      ></TitleContainer>
      <div className="basicContainer">

         {/*======== FIN DE PARTIE GLOBALES OU ASYNCHRONE  ============*/}
          
        <Input
          title="winApplyOnAllPlayers"
          description="winApplyOnAllPlayersDescription"
          defaultValue={winParams?.applyOnAllPlayers ?? true}
          inputType="toggle"
          pathInObject="events.win.applyOnAllPlayers"
          onChangeFunction={updateGameValue}
        />
         {/*======== PLUSIEURS VAINQUEURS  ============*/}
          
        <Input
          title="manyPlayersCanBeWinner"
          description="manyPlayersCanBeWinnerDescription"
          defaultValue={winParams?.manyPlayersCanBeWinner ?? false}
          inputType="toggle"
          pathInObject="events.win.manyPlayersCanBeWinner"
          onChangeFunction={updateGameValue}
        />
        {/*======== BOUCLE  ============*/}
          
        <InputSelect
          title="loop"
          description="winConditionLoopDescription"
          pathObject="events.win.boucle"
          items={["{allPlayersInGame}"]}
          closeAfterSelect={true}
          selected={winParams?.boucle ? [winParams?.boucle] : []}
          updateValueArray={(path, value) => {
            updateGameValue(path, value === winParams?.boucle ? null : value);
          }}
        ></InputSelect>
         {/*======== VICTOIRE COLLECTIVE  ============*/}
          
        {winParams?.boucle && (
          <Input
            title="allElementOfBoucleMustSatisyCondition"
            description="allElementOfBoucleMustSatisyConditionDescription"
            defaultValue={
              winParams?.allElementOfBoucleMustSatisyCondition ?? false
            }
            inputType="toggle"
            pathInObject="events.win.allElementOfBoucleMustSatisyCondition"
            onChangeFunction={(path, value) => {
              updateGameValue(path, value);
              updateGameValue("events.win.manyPlayersCanBeWinner", true);
            }}
          />
        )}
         {/*======== CONDITION DE VICTOIRE  ============*/}
          
        <Input
          title="winCondition"
          description="conditionToSatisfyDescription"
          defaultValue={winParams?.condition ?? ""}
          pathInObject="events.win.condition"
          suggestions={
            winParams?.boucle
              ? suggestions
              : suggestions.filter((s) => !s.label.includes("{playerBoucle"))
          }
          onChangeFunction={updateGameValue}
        />
      </div>
      <div className="basicContainer">

         {/*======== AFFICHER DES POINTS A LA VICTOIRE  ============*/}
          
        <Input
          title="countPoints"
          description="countPointsDescription"
          defaultValue={winParams?.displayPoints?.activation ?? false}
          inputType="toggle"
          pathInObject="events.win.displayPoints.activation"
          onChangeFunction={updateGameValue}
        />

        {winParams?.displayPoints?.activation && (
          
          <>

             {/*======== PLAYERS POUR QUI ONT AFFICHE LES POINTS  ============*/}
          
            <InputSelect
              title="playerWichWeDisplayPoints"
              description="playerWichWeDisplayPointsDescription"
              pathObject="events.win.displayPoints.pointsToDisplayFor"
              items={[
                "{allPlayersInGame}",
                "{allPlayersWinners}",
                "{allPlayersLoosers}",
              ]}
              closeAfterSelect={true}
              selected={
                winParams?.displayPoints?.pointsToDisplayFor
                  ? [winParams?.displayPoints?.pointsToDisplayFor]
                  : []
              }
              updateValueArray={(path, value) => {
                updateGameValue(
                  path,
                  value === winParams?.displayPoints.pointsToDisplayFor
                    ? null
                    : value,
                );
              }}
            ></InputSelect>

            {/*======== ELEMENT/POINT OF PLAYER TO DISPLAY  ============*/}
            <InputSelect
              title="valueToBaseCountOfPoints"
              description="valueToBaseCountOfPointsDescription"
              pathObject="events.win.displayPoints.elementToDisplay"
              items={suggestions.filter((s) =>
                s.label.includes("playerBoucle"),
              )}
              closeAfterSelect={true}
              selected={
                winParams?.displayPoints.elementToDisplay
                  ? [winParams?.displayPoints.elementToDisplay]
                  : []
              }
              updateValueArray={(path, value) => {
                updateGameValue(
                  path,
                  value === winParams?.displayPoints.elementToDisplay
                    ? null
                    : value,
                );
              }}
              itemsDisplayFields={["label"]}
            ></InputSelect>
          </>
        )}
      </div>
    </div>
  );
}
