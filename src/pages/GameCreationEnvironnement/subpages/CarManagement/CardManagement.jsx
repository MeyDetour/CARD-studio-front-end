// CSS
import "./style.css";

// External libraries
import { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

// Subpages
import CardsLibrairy from "./CardsLibrairy/CardsLibrairy";
import CardsManagementSettings from "./CardsManagementSettings/CardsManagementSettings";

export default function CardManagement({
  gameData, 
  getCardsFromDb,
  updateGameValue,
  updateGameValueArray,
}) {
  const { t } = useTranslation();
  const [subpage, setSubpage] = useState("cardManagement");
   const [currentCard, setCurrentCard] = useState(null);
  if (!gameData) return;
  return (
    <div className={" cardManagementSubpage"}>
      <TitleContainer
        title={"cardManagement"}
        type="h1"
        description="hereYouCanManageAllSettingsConcernedCardAndDecks"
      />

      <SubNavigationBar
        buttons={{
          cardManagement: () => {
            setSubpage("cardManagement"); 
            setCurrentCard(null);
          },
          cards: () => {
            setSubpage("cards"); 
            setCurrentCard(null);
          },
        }}
        page={subpage}
      />

      {subpage === "cardManagement" && (
        <CardsManagementSettings
          gameData={gameData}
          updateGameValueArray={updateGameValueArray}
          updateGameValue={updateGameValue}
        />
      )}
      {subpage === "cards" && (
        <CardsLibrairy
          gameData={gameData}
          getCardsFromDb={getCardsFromDb}
          updateGameValue={updateGameValue}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      )}
    </div>
  );
} 