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
import Input from "../../../components/input/input";
export default function EditGameoard({
  gameData,
  setGame,
  setGameImageUploaded,
  setGameImageUploadedUrl,
}) {
  const { token } = useUserContext();
  const { result, loading, error, fetchData } = useApi();

  const navigate = useNavigate();

  if (!gameData) return;
  return (
    <div className={" editGameSubpage"}>
      <div className="header">
        <TitleContainer
          title={gameData.name}
          description="instanceConfiguration"
        />
        <div className="buttonContainer">
          <Button
            icon="play-white"
            text="testGame"
            type="violetButton"
            action={() => {}}
          ></Button>
        </div>
      </div>

      {/* First section with name */}
      <div className="basicContainer globalIfonSection">
        {/* Left part */}
        <div className="content">
          <TitleSecondContainer
            title={"generalInformation"}
            description={"instanceConfiguration"}
          ></TitleSecondContainer>
          <div className="row">
            <Input title="gameName" description="gameName" />
            <Input title="gameType" placeholder="gameType" />
          </div>
          <Input
            title="description"
            description="description"
            inputType="textarea"
            placeholder="gameDescription"
          />
        </div>

        {/* Right image of game */}
        {gameData.image && (
          <div className="imageContainer">
            <img src={gameData.image} alt="" />
            <div className="imageUploadContainer">
              <Button
                icon="star"
                action={() => {}}
                type="whiteWithBordure"
                text="uploadImage"
              />
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setGameImageUploaded(selectedFile);
                  setGameImageUploadedUrl(URL.createObjectURL(selectedFile));
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="basicContainer visibilitySection">
        <TitleSecondContainer
          title={"visibility"}
          description={"wantToSwitchGameToVisible"}
        ></TitleSecondContainer>
          <Input
            title="publicVisibility"
            description="publicVisibilityHelperText"
            inputType="toggle" 
            dedefaultValuefault="false"
          />
      </div>
    </div>
  );
}
