import { useState } from "react";
// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../../components/SubNavigationBar/SubNavigationBar";
import Input from "../../../../../components/input/Input";
import InputSelect from "../../../../../components/InputSelect/InputSelect";
import TileContainer from "../../../../../components/TitleContainer/TitleContainer";

// Subpages
import SelectCard from "../../../../../components/SelectCard/SelectCard";
export default function CardRendering({
  gameData,
  updateGameValue,
  getGridDimensions,
}) {
  const [subpage, setSubpage] = useState("middleCardsRendering");


  const navigationButtons = {  };
  if (gameData.rendering.game.displayHandDeck) {
    navigationButtons.playerHandDeckRendering = () =>
      setSubpage("playerHandDeckRendering");
  }
  if (gameData.rendering.game.displayMiddleCards) {
    navigationButtons.middleCardsRendering = () =>
      setSubpage("middleCardsRendering");
  }

  if (Object.keys(navigationButtons).length === 0) return null;

  return (
    <div className="menu-rendering basicContainer">
      <SubNavigationBar buttons={navigationButtons} page={subpage} />

      <div className="menu-rendering-wrapper">
        <SelectCard
          title="linear"
          description="card-hand-linear-description"
          selected={"linear" === gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template}
          action={() =>{
            if (subpage === "playerHandDeckRendering") {
            updateGameValue("params.rendering.playerHand.template", "linear")
            } else if (subpage === "middleCardsRendering") {
              updateGameValue("params.rendering.middleCards.template", "linear")
            }
          }}
        >
          <div className="cardAgencement cardAgencementLinear ">
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
            <div className="card" style={{ width: 100 / 6 + "%" }}></div>
          </div>
        </SelectCard>
        <SelectCard
          title="grid"
          description="card-hand-grid-description"
          selected={
            gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template &&
            typeof gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template === "string"
              ? gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template?.includes("grid")
              : false
          }
          action={() =>
            updateGameValue(
              `params.rendering.${subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"}.template`,
              gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template &&
                typeof gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template === "string" &&
                gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template.includes("grid")
                ? gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template
                : "grid2x4",
            )
          }
        >
          <div className="row">
            {/* Select number of rows and columns  */}
            <div onClick={(e) => e.stopPropagation()}>
              <InputSelect
                title="row"
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                selected={
                  gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template &&
                  typeof gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template ===
                    "string" &&
                  gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template.includes("grid")
                    ? [
                        parseInt(
                          gameData.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template
                            .split("grid")[1]
                            .split("x")[0],
                        ),
                      ]
                    : [2]
                }
                pathObject={`params.rendering.${subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"}.template`}
                closeAfterSelect={true}
                updateValueArray={(path, value) => {
                  console.log("Path:", path, "Value:", value);
                  const currentTemplate =
                    gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template || "";
                  const cols = currentTemplate.includes("grid")
                    ? parseInt(currentTemplate.split("x")[1])
                    : 4;
                  console.log("cols :", cols);
                  updateGameValue(path, `grid${value}x${cols}`);
                }}
              />
              <InputSelect
                title="cols"
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                selected={
                  gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template &&
                  typeof gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template ===
                    "string" &&
                  gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template.includes("grid")
                    ? [
                        parseInt(
                          gameData.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template
                            .split("grid")[1]
                            .split("x")[1],
                        ),
                      ]
                    : [4]
                }
                closeAfterSelect={true}
                pathObject={`params.rendering.${subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"}.template`}
                updateValueArray={(path, value) => {
                  console.log("Path:", path, "Value:", value);
                  const currentTemplate =
                    gameData?.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template || "";
                  const rows = currentTemplate.includes("grid")
                    ? parseInt(currentTemplate.split("grid")[1].split("x")[0])
                    : 2;
                  console.log("rows :", rows);

                  updateGameValue(path, `grid${rows}x${value}`);
                }}
              />
            </div>
            {/* Display a grid with the selected number of rows and columns */}
            {getGridDimensions(gameData)}
          </div>
        </SelectCard>
        <SelectCard
          title="personnalised"
          description="card-hand-personnalised-description"
          selected={"edited" === gameData.rendering?.[subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"]?.template}
          action={() =>
            updateGameValue(`params.rendering.${subpage === "playerHandDeckRendering" ? "playerHand" : "middleCards"}.template`, "edited")
          }
        >
          <div className="cardAgencement">
            <div className="card"></div>
          </div>
        </SelectCard>
      </div>
    </div>
  );
}
