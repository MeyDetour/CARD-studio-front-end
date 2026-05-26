import SelectCard from "../../../../../components/SelectCard/SelectCard";
export default function GamePlayTable({ gameData, getGridDimensions }) {
  return (
    <div className="gamePlay">
      <div className="table"> 
          {gameData?.rendering?.middleCards?.template && gameData.rendering.game.displayMiddleCards&&
          typeof gameData?.rendering?.middleCards?.template === "string" &&
          gameData?.rendering?.middleCards?.template.includes("grid")
            ? getGridDimensions(gameData, "middleCardsRendering")
            : null}
          {"linear" === gameData?.rendering?.middleCards?.template &&gameData.rendering.game.displayMiddleCards&& (
            <div className="cardAgencement cardAgencementLinear middleCardsRendering">
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
              <div className="card" style={{ width: 100 / 6 + "%" }}>
                
              </div>
            </div>
          )} 
      </div>
      {gameData?.rendering?.playerHand?.template && gameData.rendering.game.displayHandDeck&&
      typeof gameData?.rendering?.playerHand?.template === "string" &&
      gameData?.rendering?.playerHand?.template.includes("grid")
        ? getGridDimensions(gameData, "playerHandDeckRendering")
        : null}
      {"linear" === gameData?.rendering?.playerHand?.template &&  gameData.rendering.game.displayHandDeck&&(
        <div className="cardAgencement cardAgencementLinear playerHandDeckRendering">
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
          <div className="card" style={{ width: 100 / 6 + "%" , marginLeft: gameData.rendering.playerHand.overlapping ? -5 + "%" : 0 }}>
            {" "}
          </div>
        </div>
      )}
    </div>
  );
}
