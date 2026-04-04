import "./style.css";

// External libraries
import { createHistoryElement } from "../../../../helpers/historyObject";
import { useHistoryContext } from "../../../../context/HistoryContext";
import { useState } from "react";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import Input from "../../../../components/input/Input";

export default function DisplayPage({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) {
  const [subpage, setSubpage] = useState("visibility");
  const {addItem} = useHistoryContext();
  if (!gameData) return;

  return (
    <div className={" displaySubpage"}>
      <TitleContainer
        title="display"
        description="display-management"
      ></TitleContainer>
      <SubNavigationBar
        buttons={{
          disposition: () => setSubpage("disposition"),
          visibility: () => setSubpage("visibility"),
          advanced: () => setSubpage("advanced"),
        }}
        page={subpage}
      />
      {subpage === "disposition" && (
        <div className="menu-rendering">
          <div
            className="basicContainer"
            onClick={() => updateGameValue("params.rendering.menu.template", 1)}
          >
            <div
              className={
                1 === gameData.rendering.menu.template
                  ? "selected selectRound"
                  : "selectRound"
              }
            ></div>
          </div>
          <div
            className="basicContainer"
            onClick={() => updateGameValue("params.rendering.menu.template", 2)}
          >
            <div
              className={
                2 === gameData.rendering.menu.template
                  ? "selected selectRound"
                  : "selectRound"
              }
            ></div>
          </div>
          <div
            className="basicContainer"
            onClick={() => updateGameValue("params.rendering.menu.template", 3)}
          >
            <div
              className={
                3 === gameData.rendering.menu.template
                  ? "selected selectRound"
                  : "selectRound"
              }
            ></div>
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
