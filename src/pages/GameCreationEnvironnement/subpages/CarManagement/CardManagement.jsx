import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";


// Contexts


// Hooks


// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

export default function CardManagement({
  gameData,
  updateGameValueArray,
  updateGameValue,
  setGameImageUploaded,
  setGameImageUploadedUrl,
}) { 
  const {t} = useTranslation();

  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"assetLibraryTitle"}
        type="h1"
        description="assetLibraryDescription"
      />
      <SearchBar placeholder="searchInLibraryPlaceholder" />
 
      <p>{t("ifThereIsNoCardConfigurationAllCardWillBeInTheDeckByDefault")}</p>
    </div>
  );
}
