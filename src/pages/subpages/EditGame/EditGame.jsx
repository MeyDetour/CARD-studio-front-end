import "./style.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router";
import { useApi } from "../../../hooks/useApi";
import TitleContainer from "../../../components/TitleContainer/TitleContainer";
import GameCreationEnvironnementQuickAction from "../../../components/GameCreationEnvironnementQuickAction/GameCreationEnvironnementQuickAction";
import TitleSecondContainer from "../../../components/TitleSecondContainer/TitleSecondContainer";
import GameCreationEnvironnementStatDashboard from "../../../components/GameCreationEnvironnementStatDashboard/GameCreationEnvironnementStatDashboard";
import Separator from "../../../components/Separator/Separator";
import Button from "../../../components/Button/Button";
export default function DashbEditGameoard({
  gameData,
  playerHasEdit,
  setPlayerHasEdit,
}) {
  const { token } = useUserContext();
  const { result, loading, error, fetchData } = useApi();

  const navigate = useNavigate();

 if (!gameData)return
  return (
    <div className={" editGameSubpage"}>
      <div className="header">
        <TitleContainer title={gameData.name} description="instanceConfiguration" />
        <div className="buttonContainer">
        
          <Button
            icon="play-white"
            text="testGame"
            type="violetButton"
            action={() => {}}
          ></Button>
        </div>
      </div>
      <div className="basicContainer globalIfonSection">
        <div className="content">
          <TitleSecondContainer
            title={"generalInformation"}
            description={"instanceConfiguration"}
          ></TitleSecondContainer>
          <div className="row"></div>
        </div>
        {gameData.image && (
          <div className="imageContainer">
            <img src={gameData.image} alt="" />
            <Button
              icon="star"
              action={() => {}}
              type="whiteWithBordure"
              text="uploadImage"
            />
          </div>
        )}
      </div>
    </div>
  );
}
