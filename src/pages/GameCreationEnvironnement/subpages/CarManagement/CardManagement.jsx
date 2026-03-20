import "./style.css";

// External libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

// Contexts

// Hooks

// Components
import Input from "../../../../components/input/Input";
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
  const { t } = useTranslation();

  if (!gameData) return;
  return (
    <div className={" assetsBookshelfSubpage"}>
      <TitleContainer
        title={"cardManagement"}
        type="h1"
        description="hereYouCanManageAllSettingsConcernedCardAndDecks"
      />
      <SearchBar placeholder="searchInLibraryPlaceholder" />

      <p>{t("ifThereIsNoCardConfigurationAllCardWillBeInTheDeckByDefault")}</p>

      <div className="basicContainer">

        {/* ======DECK======= */}
        <Input
          title="deck"
          description="deckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
          defaultValue={gameData.cardParams?.deck?.activation ?? false}
          inputType="toggle"
          pathInObject="params.cards.deck.activation"
          onChangeFunction={(path,value)=>{
            for (let a of gameData.actions){
              if(a.actionOnDeck){
                updateGameValueArray("params.tours.actions",{...a,actionOnDeck:false})
              }
            }

            updateGameValue(path,value)
            
          }}
        />
        <Input
          title="renderTheNextDeckCard"
          description="renderTheNextDeckCardDescription"
          defaultValue={
            gameData.cardParams?.deck?.renderTheNextDeckCard ?? false
          }
          disabled={!(gameData.cardParams?.deck?.activation??false)}
          inputType="toggle"
          pathInObject="params.cards.deck.renderTheNextDeckCard"
          onChangeFunction={updateGameValue}
        />
        {/* ======DISCARD======= */}
        <Input
          title="discardDeck"
          description="discardDeckifThisSettingsIsTrueYouCanAccessToMultipleOFSettings"
          defaultValue={gameData.cardParams?.discard?.activation ?? false}
          inputType="toggle"
          pathInObject="params.cards.discard.activation"
          onChangeFunction={(path,value)=>{
            for (let a of gameData.actions){
              if(a.actionOnDiscardDeck){
                updateGameValueArray("params.tours.actions",{...a,actionOnDiscardDeck:false})
              }
            }

            updateGameValue(path,value)
            
          }}
        />
        <Input
          title="renderTheLastDiscardedCard"
          description="renderTheLastDiscardedCardDescription"
          defaultValue={
            gameData.cardParams?.discard?.renderTheLastDiscardedCard ?? false
          }
          inputType="toggle"
          disabled={!(gameData.cardParams?.discard?.activation??false)}
          pathInObject="params.cards.discard.renderTheLastDiscardedCard"
          onChangeFunction={updateGameValue}
        />

      </div>
        
    </div>
  );
}
