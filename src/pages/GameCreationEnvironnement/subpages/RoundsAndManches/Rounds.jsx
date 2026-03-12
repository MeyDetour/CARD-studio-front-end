 
import "./style.css";

// External libraries
import { useEffect, useState } from "react";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

// Subpages
import RoundsPage from "./Rounds/Rounds";
import ManchesPage from "./Manches/Manches";

export default function RoundsAndManches({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) {
  const [subpage, setSubpage] = useState("rounds");
 
  return (
    <div className={" roundsSubpage"}>
      <TitleContainer
        title="roundsAndMancheConfiguration"
        description="rounds-management"
      ></TitleContainer>

      <SubNavigationBar
        buttons={{
          rounds: () => setSubpage("rounds"),
          manches: () => setSubpage("manches"),
        }}
        page={subpage}
      />

      {subpage === "rounds" && (
        <RoundsPage
          gameData={gameData}
          updateGameValue={updateGameValue}
          updateGameValueArray={updateGameValueArray}
        />
      )}   {subpage === "manches" && (
        <ManchesPage
          gameData={gameData}
          updateGameValue={updateGameValue}
          updateGameValueArray={updateGameValueArray}
        />
      )}
    </div>
  );
}
