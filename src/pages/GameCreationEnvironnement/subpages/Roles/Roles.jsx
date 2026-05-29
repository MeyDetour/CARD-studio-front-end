// CSS
import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useGameContext } from "../../../../context/GameContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";
import { useHistoryContext } from "../../../../context/HistoryContext.jsx";
import { useTokenContext } from "../../../../context/TokenContext.jsx";

// Hooks
import { useApi } from "../../../../hooks/useApi.js";

// Helpers
import { updateElementValue } from "../../../../helpers/objectManagement.js";
import { createHistoryElement } from "../../../../helpers/historyObject.js";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer.jsx";
import Button from "../../../../components/Button/Button.jsx";
import Input from "../../../../components/Input/Input.jsx";
import InputSelect from "../../../../components/InputSelect/InputSelect.jsx";
import SearchBar from "../../../../components/SearchBar/SearchBar.jsx";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar.jsx";
import GainCard from "../../../../components/Cards/GainCard/GainCard.jsx";
import Alert from "../../../../components/Alert/Alert.jsx";
import Confirm from "../../../../components/Confirm/Confirm.jsx";
import Separator from "../../../../components/Separator/Separator.jsx";

export default function Roles({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) {
  return (
    <div className={" rolesSubpage"}>
      <TitleContainer title={"roles"} type="h1" description="configureRoles" />
      <div className="row">
      <SearchBar placeholder="searchInLibraryPlaceholder" />
      <Button action={()=>{
        updateGameValueArray("assets.roles", {id: Date.now(), name: "new role"});
      }} icon="add-white"  type="violetButton" text="new"></Button>
      </div>
      <div className="wrapper">
        {gameData.roles &&
          gameData.roles.map((role, index) => (
            <div className="card" key={index}>
              <span>{role.name}</span>
             </div>
          ))}
      </div>
    </div>
  );
}
