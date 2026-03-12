import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../context/GameContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";

// Hooks
import { useApi } from "../../../../hooks/useApi";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import GameCreationEnvironnementQuickAction from "../../../../components/GameCreationEnvironnementQuickAction/GameCreationEnvironnementQuickAction";
import GameCreationEnvironnementStatDashboard from "../../../../components/GameCreationEnvironnementStatDashboard/GameCreationEnvironnementStatDashboard";
import Separator from "../../../../components/Separator/Separator";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/input/Input";
import InputSelect from "../../../../components/inputSelect/InputSelect";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
export default function EditGame({
  gameData,
  updateGameValueArray,
  updateGameValue,
  setGameImageUploaded,
  setGameImageUploadedUrl,
  uploadFileForGameEditionHandler
}) {
  const { t } = useTranslation();
  const { deleteGame } = useGameContext();
  const navigate = useNavigate();
  const { alertList } = useNotificationContext();
  if (!gameData) return;

  return (
    <div className={" editGameSubpage"}>
      <div className="header">
        <TitleContainer
          title={gameData.name}
          type="h1"
          icon="pen-violet-background"
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
      <div className="basicContainer globalSection">
        <Alert
          alertList={alertList}
          message={"name|data|missingValue|alert"}
        ></Alert>

        {/* Left part */}
        <div className="content">
          <TitleContainer
            type="h2"
            title={"generalInformation"}
            description={"instanceConfiguration"}
          ></TitleContainer>
          <div className="row">
            <Input
              title="gameName"
              defaultValue={gameData.name}
              description="gameName"
              onChangeFunction={updateGameValue}
              pathInObject={"name"}
            />
            <InputSelect
              title="gameType"
              updateValueArray={updateGameValueArray}
              pathObject="type"
              selected={gameData.types ?? []}
              items={[
                "strategy",
                "luck",
                "battle",
                "cooperative",
                "handManagement",
                "trickTaking",
                "shedding",
                "setCollection",
                "deckBuilding",
                "bluffing",
                "memory",
                "speed",
                "bidding",
                "rolePlaying",
                "solitaire",
                "puzzle",
                "educational",
                "trading",
                "betting",
                "race",
              ]}
            />
          </div>
          <Input
            title="description"
            description="description"
            pathInObject="description"
            onChangeFunction={updateGameValue}
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
                  console.log(selectedFile);
                  if (selectedFile.type == "image/jpeg" || selectedFile.type === "image/png") {
                    setGameImageUploaded(selectedFile);
                    setGameImageUploadedUrl(URL.createObjectURL(selectedFile));
                    uploadFileForGameEditionHandler(selectedFile)
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="basicContainer visibilitySection">
        <TitleContainer
          title={"visibility"}
          icon="eye"
          type="h2"
          description={"wantToSwitchGameToVisible"}
        ></TitleContainer>
        <Input
          title="publicVisibility"
          description="publicVisibilityHelperText"
          inputType="toggle"
          pathInObject="isPublic"
          onChangeFunction={updateGameValue}
          defaultValue="false"
        />
      </div>
      <div className="basicContainer playerConfigurationSection">
        <TitleContainer
          title={"playerSettings"}
          icon="settings"
          type="h2"
          description={"playerConfiguration_hint"}
        ></TitleContainer>
        <div className="row">
          <Input
            title="minPlayers"
            defaultValue={gameData.minPlayer}
            onChangeFunction={(path, value) => {
              const minVal = parseInt(value) || 0;
              console.log(minVal);
              console.log(minVal + 1);
              console.log(gameData.maxPlayer);
              console.log(minVal >= gameData.maxPlayer);
              if (minVal >= gameData.maxPlayer) {
                console.log("updateMaxPlayer");
                updateGameValue("params.globalGame.maxPlayer", minVal + 1);
              }
              updateGameValue(path, minVal);
            }}
            inputType="number"
            pathInObject={"params.globalGame.minPlayer"}
          />
          <Input
            title="maxPlayers"
            defaultValue={gameData.maxPlayer ? gameData.maxPlayer : 0}
            inputType="number"
            onChangeFunction={(path, value) => {
              const maxVal = parseInt(value) || 0;
              if (maxVal <= gameData.minPlayer) {
                updateGameValue(
                  "params.globalGame.minPlayer",
                  maxVal == 0 ? 0 : maxVal - 1,
                );
              }
              updateGameValue(path, maxVal);
            }}
            pathInObject={"params.globalGame.maxPlayer"}
          />
        </div>
        <Input
          title="soloMode"
          description="soloMode_description"
          defaultValue={gameData.jeuSolo}
          inputType="toggle"
          pathInObject="params.globalGame.jeuSolo"
          onChangeFunction={updateGameValue}
        />
        <Input
          title="playerParticipation"
          description="playerParticipation_description"
          defaultValue={gameData.playersCanJoin}
          inputType="toggle"
          pathInObject="params.globalGame.playersCanJoin"
          onChangeFunction={updateGameValue}
        />
        <Input
          title="allowSpectators"
          description="allowSpectators_description"
          defaultValue={gameData.autoriseSpectator}
          inputType="toggle"
          pathInObject="params.globalGame.autoriseSpectator"
          onChangeFunction={updateGameValue}
        />
      </div>
      <div className="basicContainer tourManagementSection">
        <TitleContainer
          title={"tourManagementTitle"}
          icon="repeat-settings"
          type="h2"
          description={"tourManagementDescription"}
        />
        <Input
          title="enableTourManagement"
          defaultValue={gameData.tourActivation}
          inputType="toggle"
          pathInObject="params.tours.activation"
          onChangeFunction={updateGameValue}
        />
      </div>
      <div className="basicContainer roleManagementSection">
        <TitleContainer
          title={"roleManagementTitle"}
          icon="profile-settings"
          type="h2"
          description={"roleManagementDescription"}
        />
        <Input
          title="enableRoleManagement"
          defaultValue={gameData.roleActivation}
          inputType="toggle"
          pathInObject="params.roles.activation"
          onChangeFunction={updateGameValue}
        />
      </div>
      <div className="basicContainer rewardsManagementSection">
        <TitleContainer
          title={"rewardsManagementTitle"}
          icon="success"
          type="h2"
          description={"rewardsDefinitionDescription"}
        />
        <Input
          title="enableRewardsManagement"
          defaultValue={gameData.gainActivation}
          inputType="toggle"
          pathInObject="params.gains.activation"
          onChangeFunction={updateGameValue}
        />
      </div>
      <div className="basicContainer basicRedContainer deleteManagementSection">
        <TitleContainer
          title={"deleteGameTitle"}
          type="h2"
          description={"youDeleteINtegralGameWithoutSave"}
        />

        <Button
          text={"delete"}
          action={async () => {
            if (confirm(t("doYouRealyWantToDeleteGame"))) {
              let result = await deleteGame();
              console.log(result);
              if (result && result.message === "ok") {
                navigate("/");
              }
            }
          }}
        ></Button>
      </div>
    </div>
  );
}
