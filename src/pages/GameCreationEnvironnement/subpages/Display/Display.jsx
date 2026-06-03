// CSS
import "./style.css";

// External libraries
import { useState } from "react";

// Contexts
import { useHistoryContext } from "../../../../context/HistoryContext";

// Helpers
import { createHistoryElement } from "../../../../helpers/historyObject";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import Input from "../../../../components/Input/Input";
import InputSelect from "../../../../components/InputSelect/InputSelect";
import TileContainer from "../../../../components/TitleContainer/TitleContainer";
import CardRendering from "./Supages/CardRendering";
import GamePlayTable from "./Supages/Gameplay";
// Subpages
import SelectCard from "../../../../components/SelectCard/SelectCard";

export default function DisplayPage({ gameData, updateGameValue }) {
  const { addItem } = useHistoryContext();
  if (!gameData) return;

  return (
    <div className={" displaySubpage"}>
      <TitleContainer
        title="display"
        description="display-management"
      ></TitleContainer>
      <GamePlayTable
        gameData={gameData}
        getGridDimensions={getGridDimensions}
      />
      <CardRendering
        getGridDimensions={getGridDimensions}
        gameData={gameData}
        updateGameValue={updateGameValue}
      />

      <div className="basicContainer">
        <TitleContainer
          title="visibility-display"
          description="visibility-display-description"
        ></TitleContainer>
        <Input
          title="display-handDeck"
          description="display-handDeck-description"
          defaultValue={gameData.rendering.game.displayHandDeck ?? true}
          inputType="toggle"
          pathInObject="params.rendering.game.displayHandDeck"
          onChangeFunction={(path, value) => {
            updateGameValue(path, value);
            addItem(
              gameData.id,
              createHistoryElement("gameElement", "edit", {
                field: path,
              }),
            );
          }}
        />{" "}
        <Input
          title="display-middleCards"
          description="display-middleCards-description"
          defaultValue={gameData.rendering.game.displayMiddleCards ?? false}
          inputType="toggle"
          pathInObject="params.rendering.game.displayMiddleCards"
          onChangeFunction={(path, value) => {
            updateGameValue(path, value);

            // la défaisse ne peut pas etre au milieu si les cartes du milieu sont activé
            if (gameData.params.cards.discard.displayInTheMiddle && value) {
              if (
                confirm(
                  t("thisChangeWillResetTheCurrentPositionOfDiscardCards"),
                )
              ) {
                updateGameValue(
                  "params.cards.discard.displayInTheMiddle",
                  false,
                );

                addItem(
                  gameData.id,
                  createHistoryElement("gameElement", "edit", {
                    field: path,
                  }),
                );
              }
            }
          }}
        />
        <Input
          title="display-count-adversary-handdeck"
          description="display-count-adversary-handdeck-description"
          defaultValue={
            gameData.rendering.game.displayCountAdversaryHandDeck ?? false
          }
          inputType="toggle"
          pathInObject="params.rendering.game.displayCountAdversaryHandDeck"
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
        <Input
          title="display-statistics"
          description="display-statistics-description"
          defaultValue={gameData.rendering.game.displayStatistics ?? false}
          inputType="toggle"
          pathInObject="params.rendering.game.displayStatistics"
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
        <Input
          title="display-chat"
          description="display-chat-description"
          defaultValue={gameData.rendering.game.displayChat ?? true}
          inputType="toggle"
          pathInObject="params.rendering.game.displayChat"
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
        <Input
          title="display-history"
          description="display-history-description"
          defaultValue={gameData.rendering.game.displayHistory ?? true}
          inputType="toggle"
          pathInObject="params.rendering.game.displayHistory"
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
        <Input
          title="display-timer"
          disabled={!(gameData.timerActivation ?? false)}
          description="display-timer-description"
          defaultValue={gameData.rendering.game.displayTimer ?? false}
          inputType="toggle"
          pathInObject="params.rendering.game.displayTimer"
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
    </div>
  );
}

const getGridDimensions = (gameData, type) => {
  console.log(type);
  const template =
    gameData?.rendering?.[
      type === "playerHandDeckRendering" ? "playerHand" : "middleCards"
    ]?.template;

  // Valeurs par défaut
  let rows = 2;
  let cols = 4;

  if (typeof template === "string" && template.includes("grid")) {
    const dimensions = template.split("grid")[1];
    const parts = dimensions.split("x");

    const pRows = parseInt(parts[0]);
    const pCols = parseInt(parts[1]);

    if (!isNaN(pRows)) rows = pRows;
    if (!isNaN(pCols)) cols = pCols;
  }

  return (
    <div
      className={`cardAgencementGrid ${type == "playerHandDeckRendering" ? "playerHandDeckRendering" : type == "middleCardsRendering" ? "middleCardsRendering" : "NOTHING"}  cardAgencement`}
    >
      {[...Array(rows)].map((_, rowIndex) => (
        <div className="row" key={`row-${rowIndex}`}>
          {[...Array(cols)].map((_, colIndex) => (
            <div className="card" key={`card-${rowIndex}-${colIndex}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};
