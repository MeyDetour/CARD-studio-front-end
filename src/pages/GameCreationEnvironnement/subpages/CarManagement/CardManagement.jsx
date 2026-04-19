import "./style.css";

// External libraries
import { use, useEffect, useState } from "react"; 
import { useTranslation } from "react-i18next";

// Contexts 
import CardsLibrairy from "./CardsLibrairy/CardsLibrairy";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import CardsManagementSettings from "./CardsManagementSettings/CardsManagementSettings";

export default function CardManagement({
  gameData, 
  getCardsFromDb,
  updateGameValue,
}) {
  const { t } = useTranslation();
  const [subpage, setSubpage] = useState("cardManagement");
   const [currentCard, setCurrentCard] = useState(null);
  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
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
          cardImported: () => {
            setSubpage("cardImported"); 
            setCurrentCard(null);
          },
        }}
        page={subpage}
      />

      {subpage === "cardManagement" && (
        <CardsManagementSettings
          gameData={gameData}
          updateGameValue={updateGameValue}
        />
      )}
      {subpage === "cardImported" && (
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