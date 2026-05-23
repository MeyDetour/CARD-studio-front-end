// CSS
import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
}) {  
  const [subPage, setSubpage] = useState("palettesTab");
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
          palettesTab: () => setSubpage("palettesTab"),
          templatesTab: () => setSubpage("templatesTab"),
        }}
        page={subPage}
      />
      
       {subPage == "palettesTab" && (
        <div className="wrapper">
           {gameData.colors &&
           gameData.colors.map((palette, index) => 
              (
                <div className="card" key={index}>
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
