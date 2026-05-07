import "./style.css";

// External libraries
import { createHistoryElement } from "../../../../helpers/historyObject";
import { useHistoryContext } from "../../../../context/HistoryContext";
import { useState } from "react";
import SelectCard from "./SelectCard/SelectCard";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import Input from "../../../../components/input/Input";
import InputSelect from "../../../../components/InputSelect/InputSelect";
import TileContainer from "../../../../components/TitleContainer/TitleContainer";

export default function DisplayPage({
  gameData, 
  updateGameValue,
}) {
  const [subpage, setSubpage] = useState("rendering");
  const { addItem } = useHistoryContext();
  if (!gameData) return;

  return (
    <div className={" displaySubpage"}>
      <TitleContainer
        title="display"
        description="display-management"
      ></TitleContainer>
      <SubNavigationBar
        buttons={{
          rendering: () => setSubpage("rendering"),
          visibility: () => setSubpage("visibility"),
          advanced: () => setSubpage("advanced"),
        }}
        page={subpage}
      />
      {subpage === "rendering" && (
        <div className="menu-rendering">
          <TitleContainer
            title="playerHandDeckRendering"
            type="h2"
          ></TitleContainer>
          <div className="menu-rendering-wrapper">
            <SelectCard
              title="linear"
              description="card-hand-linear-description"
              selected={"linear" === gameData?.rendering?.playerHand?.template}
              action={() =>
                updateGameValue(
                  "params.rendering.playerHand.template",
                  "linear",
                )
              }
            >
              <div className="cardAgencement cardAgencementLinear ">
                <div className="card" style={{width:100/6+ "%"}}> </div>
                <div className="card" style={{width:100/6+ "%"}}> </div>
                <div className="card" style={{width:100/6+ "%"}}> </div>
                <div className="card" style={{width:100/6+ "%"}}> </div>
                <div className="card" style={{width:100/6+ "%"}}> </div>
                <div className="card" style={{width:100/6+ "%"}}> </div> 
                <div className="card" style={{width:100/6+ "%"}}> </div>
              </div>
            </SelectCard>
            <SelectCard
              title="grid"
              description="card-hand-grid-description"
              selected={
                gameData?.rendering?.playerHand?.template &&
                typeof gameData?.rendering?.playerHand?.template === "string"
                  ? gameData?.rendering?.playerHand?.template?.includes("grid")
                  : false
              }
              action={() =>
                updateGameValue(
                  "params.rendering.playerHand.template",
                    gameData?.rendering?.playerHand?.template &&
                  typeof gameData?.rendering?.playerHand?.template ===
                    "string" &&
                  gameData?.rendering?.playerHand?.template.includes("grid")
                  ? gameData?.rendering?.playerHand?.template
                  : "grid2x4",
                )
              }
            >
              {/* Select number of rows and columns  */}
              <div onClick={(e) => e.stopPropagation()}>
              <InputSelect
                title="row"
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                selected={
                  gameData?.rendering?.playerHand?.template &&
                  typeof gameData?.rendering?.playerHand?.template ===
                    "string" &&
                  gameData?.rendering?.playerHand?.template.includes("grid")
                    ? [
                        parseInt(
                          gameData.rendering?.playerHand.template
                            .split("grid")[1]
                            .split("x")[0],
                        ),
                      ]
                    : [2]
                }
                pathObject={"params.rendering.playerHand.template"}
                closeAfterSelect={true}
                updateValueArray={(path, value) => {
                  
                  console.log("Path:", path, "Value:", value);
                  const currentTemplate =
                    gameData?.rendering?.playerHand?.template || "";
                  const cols = currentTemplate.includes("grid")
                    ? parseInt(currentTemplate.split("x")[1])
                    : 4;
                    console.log("cols :",cols);
                  updateGameValue(path, `grid${value}x${cols}`);
                }}
              />
              <InputSelect
                title="cols"
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                selected={
                  gameData?.rendering?.playerHand?.template &&
                  typeof gameData?.rendering?.playerHand?.template ===
                    "string" &&
                  gameData?.rendering?.playerHand?.template.includes("grid")
                    ? [
                        parseInt(
                          gameData.rendering?.playerHand.template
                            .split("grid")[1]
                            .split("x")[1],
                        ),
                      ]
                    : [4]
                }
                closeAfterSelect={true}
                pathObject={"params.rendering.playerHand.template"}
                updateValueArray={(path, value) => {
                  console.log("Path:", path, "Value:", value);
                  const currentTemplate =
                    gameData?.rendering?.playerHand?.template || "";
                  const rows = currentTemplate.includes("grid")
                    ? parseInt(currentTemplate.split("grid")[1].split("x")[0])
                    : 2;  
                  console.log("rows :",rows);

                  updateGameValue(path, `grid${rows}x${value}`);
                }}
              /> 
              </div>
              {/* Display a grid with the selected number of rows and columns */}
              {getGridDimensions(gameData)}
            </SelectCard>
            <SelectCard
              title="personnalised"
              description="card-hand-personnalised-description"
              selected={"edited" === gameData.rendering?.playerHand?.template}
              action={() =>
                updateGameValue(
                  "params.rendering.playerHand.template",
                  "edited",
                )
              }
            >
              <div className="cardAgencement">
                <div className="card"></div>
              </div>
            </SelectCard>
          </div>
        </div>
      )}
      {subpage === "visibility" && (
        <div className="basicContainer">
          <TitleContainer
            title="visibility-display"
            description="visibility-display-description"
          ></TitleContainer>
          <Input
            title="display-handDeck"
            description="display-handDeck-description"
            defaultValue={gameData.rendering.game.displayHandDeck ?? false}
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
            defaultValue={gameData.rendering.game.displayChat ?? false}
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
            defaultValue={gameData.rendering.game.displayHistory ?? false}
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
      )}
    </div>
  );
}

const getGridDimensions = (gameData) => {
  const template = gameData?.rendering?.playerHand?.template;

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
    <div className="cardAgencementGrid cardAgencement">
      {[...Array(rows)].map((_, rowIndex) => (
        <div className="row" key={`row-${rowIndex}`}>
          {[...Array(cols)].map((_, colIndex) => (
            <div
              className="card"
              key={`card-${rowIndex}-${colIndex}`}
              style={{ width: `${100 / cols}%` }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
