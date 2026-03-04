import "./style.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router";
import { useApi } from "../../../hooks/useApi";
import TitleContainer from "../../../components/TitleContainer/TitleContainer"; 
import SearchBar from "../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../components/SubNavigationBar/SubNavigationBar";

export default function CardManagement({
  gameData,
  updateGameValueArray,
  updateGameValue,
  setGameImageUploaded,
  setGameImageUploadedUrl,
}) {
  const { token } = useUserContext();
  const { result, loading, error, fetchData } = useApi();
  const [subPage, setSubpage] = useState("cardsTab");
  const [selectedType, setSelectedType] = useState([]);
  const navigate = useNavigate();

  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"assetLibraryTitle"}
        type="h1"
        description="assetLibraryDescription"
      />
      <SearchBar placeholder="searchInLibraryPlaceholder" />
 
    
    </div>
  );
}
