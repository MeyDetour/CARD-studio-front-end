// CSS
import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../../../context/GameContext.jsx";

// Components
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Icon from "../../../../../../components/Icon/Icon.jsx";
import InputSelect from "../../../../../../components/InputSelect/InputSelect.jsx";
import SubNavigationBar from "../../../../../../components/SubNavigationBar/SubNavigationBar.jsx";
import Button from "../../../../../../components/Button/Button.jsx";
import Input from "../../../../../../components/Input/Input.jsx";

export default function LooseVariableSubpage({
  suggestions,
  looseParams, // Adapté de winParams
  globalValue,
  playerGlobalValue,
  gameId,
  updateGameValue,
  globalValueStatic,
  updateGameValueArray,
  getEventFromIdAndType,
}) {
  const { t } = useTranslation();

  const [subPage, setSubpage] = useState("globalValue");
  const [editedObject, setEditedObject] = useState({});

  return (
    <div className={"looseSubPageftriggersAndDeclencheurSubpage"}>
      <TitleContainer
        title={"looseCondition"}
        description={"hereYouCanConfigureWhenLooseAppendAndDefeatCondition"}
        type="h2"
      ></TitleContainer>
      <div className="basicContainer">

         {/*======== FIN DE PARTIE GLOBALES OU ASYNCHRONE  ============*/}
        <Input
          title="looseApplyOnAllPlayers"
          description="looseApplyOnAllPlayersDescription"
          defaultValue={looseParams?.applyOnAllPlayers ?? true}
          inputType="toggle"
          pathInObject="events.loose.applyOnAllPlayers"
          onChangeFunction={updateGameValue}
        />

         {/*======== PLUSIEURS PERDANTS  ============*/}
        <Input
          title="manyPlayersCanBeLoser"
          description="manyPlayersCanBeLoserDescription"
          defaultValue={looseParams?.manyPlayersCanBeLoser ?? false} // Conserve la cohérence de ta structure
          inputType="toggle"
          pathInObject="events.loose.manyPlayersCanBeLoser"
          onChangeFunction={updateGameValue}
        />

        {/*======== BOUCLE  ============*/}
        <InputSelect
          title="loop"
          description="looseConditionLoopDescription"
          pathObject="events.loose.boucle"
          items={["{allPlayersInGame}"]}
          closeAfterSelect={true}
          selected={looseParams?.boucle ? [looseParams?.boucle] : []}
          updateValueArray={(path, value) => {
            updateGameValue(path, value === looseParams?.boucle ? null : value);
          }}
        ></InputSelect>

         {/*======== DÉFAITE COLLECTIVE / TOUS LES ÉLÉMENTS  ============*/}
        {looseParams?.boucle && (
          <Input
            title="allElementOfBoucleMustSatisyCondition"
            description="allElementOfBoucleMustSatisyConditionDescription"
            defaultValue={
              looseParams?.allElementOfBoucleMustSatisyCondition ?? false
            }
            inputType="toggle"
            pathInObject="events.loose.allElementOfBoucleMustSatisyCondition"
            onChangeFunction={(path, value) => {
              updateGameValue(path, value);
              updateGameValue("events.loose.manyPlayersCanBeLoser", true);
            }}
          />
        )}

         {/*======== CONDITION DE DÉFAITE  ============*/}
        <Input
          title="looseCondition"
          description="conditionToSatisfyDescription"
          defaultValue={looseParams?.condition ?? ""}
          pathInObject="events.loose.condition"
          suggestions={
            looseParams?.boucle
              ? suggestions
              : suggestions.filter((s) => !s.label.includes("{playerBoucle"))
          }
          onChangeFunction={updateGameValue}
        />
      </div>

      <div className="basicContainer">

         {/*======== AFFICHER DES POINTS A LA DÉFAITE  ============*/}
        <Input
          title="countPoints"
          description="countPointsDescription"
          defaultValue={looseParams?.displayPoints?.activation ?? false}
          inputType="toggle"
          pathInObject="events.loose.displayPoints.activation"
          onChangeFunction={updateGameValue}
        />

        {looseParams?.displayPoints?.activation && (
          <>
             {/*======== PLAYERS POUR QUI ON AFFICHE LES POINTS  ============*/}
            <InputSelect
              title="playerWichWeDisplayPoints"
              description="playerWichWeDisplayPointsDescription"
              disabled={!looseParams?.displayPoints?.activation}
              pathObject="events.loose.displayPoints.pointsToDisplayFor"
              items={[
                "{allPlayersInGame}",
                "{allPlayersWinners}",
                "{allPlayersLoosers}",
              ]}
              closeAfterSelect={true}
              selected={
                looseParams?.displayPoints?.pointsToDisplayFor
                  ? [looseParams?.displayPoints?.pointsToDisplayFor]
                  : []
              }
              updateValueArray={(path, value) => {
                updateGameValue(
                  path,
                  value === looseParams?.displayPoints.pointsToDisplayFor
                    ? null
                    : value,
                );
              }}
            ></InputSelect>

            {/*======== ELEMENT/POINT OF PLAYER TO DISPLAY  ============*/}
            <InputSelect
              title="valueToBaseCountOfPoints"
              description="valueToBaseCountOfPointsDescription"
              pathObject="events.loose.displayPoints.elementToDisplay"
              items={suggestions.filter((s) =>
                s.label.includes("playerBoucle"),
              )}
              closeAfterSelect={true}
              selected={
                looseParams?.displayPoints.elementToDisplay
                  ? [looseParams?.displayPoints.elementToDisplay]
                  : []
              }
              updateValueArray={(path, value) => {
                updateGameValue(
                  path,
                  value.label === looseParams?.displayPoints.elementToDisplay
                    ? null
                    : value.label,
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