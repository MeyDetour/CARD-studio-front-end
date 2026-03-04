import { useState } from "react";
import { useTranslation } from "react-i18next";
import { typePlayerChoices } from "../../ChoicePanel/elements.js";
import InputSelect from "../../../inputSelect/InputSelect.jsx";
import TitleContainer from "../../../TitleContainer/TitleContainer.jsx";
export default function WinBlock({
  element,
  globalstructure,updateBlock,
  setGlobalstructure,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [playerConcerned, setPlayerConcerned] = useState([]);
  const [subpage, setSubpage] = useState(null);
  const { t } = useTranslation();
  const updateGameValueArray = (path, value) => {
    setPlayerConcerned([value]); 
    
  };
  function updateElementInGlobalStructure() {
    updateBlock({
      ...element,
      event:{
            for:playerConcerned[0] === "currentPlayer" || playerConcerned[0] === "allPlayersInGame"  ? "{"+playerConcerned[0]+"}" : playerConcerned
        } }
  
    ); 
  } 
  return (
    <>
      <div
        className={"elementInExpressionBuilder winBlock "}
        onClick={() => setIsOpen(true)}
      >
        <TitleContainer type="h2" title={element.name} description="victory-trigger-description"></TitleContainer>
        
            <span className="littleMention">Type : Action</span>
        {isOpen && (
          <div className="elementOptions">
            <InputSelect
              title={"players-concerned"}
              updateValueArray={(path,value)=>{updateGameValueArray(path,value); updateElementInGlobalStructure()}}
              closeAfterSelect={true}
              selected={playerConcerned ? playerConcerned : []}
              items={typePlayerChoices}
            />
            <div className="completionOfOption">
              {playerConcerned &&
                (() => {
                  switch (playerConcerned[0]) {
                  }
                })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
