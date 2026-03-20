import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// Contexts


// Hooks



// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import GameCreationEnvironnementQuickAction from "../../../../components/GameCreationEnvironnementQuickAction/GameCreationEnvironnementQuickAction";
import GameCreationEnvironnementStatDashboard from "../../../../components/GameCreationEnvironnementStatDashboard/GameCreationEnvironnementStatDashboard";
import Separator from "../../../../components/Separator/Separator";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/input/Input";
import InputSelect from "../../../../components/InputSelect/InputSelect";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

export default function AssetsBookshelf({
  gameData,
  updateGameValueArray,
  updateGameValue,
  setGameImageUploaded,
  setGameImageUploadedUrl,
}) {  
  const [subPage, setSubpage] = useState("cardsTab");
  const [selectedType, setSelectedType] = useState([]);
  const navigate = useNavigate();

  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"assetLibraryTitle"}
        type="h1"
        icon="color-violet-background"
        description="assetLibraryDescription"
      />
      <SearchBar placeholder="searchInLibraryPlaceholder" />

      <SubNavigationBar
        buttons={{
          cardsTab: () => setSubpage("cardsTab"),
          palettesTab: () => setSubpage("palettesTab"),
          templatesTab: () => setSubpage("templatesTab"),
        }}
        page={subPage}
      />
      {subPage == "cardsTab" && (
        <div>
          {gameData.cards &&
            Object.keys(gameData.cards).map((id) => {
              let card = gameData.cards[id];
              return (
                <div className="card">
                  {card.name && <span>{card.name}</span>}
                </div>
              );
            })}
        </div>
      )}
       {subPage == "palettesTab" && (
        <div className="wrapper">
           {gameData.colors &&
           gameData.colors.map((palette) => 
              (
                <div className="card">
                   <div style={{fill:palette.code}}></div>
                   <span>{palette.name}</span>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}
