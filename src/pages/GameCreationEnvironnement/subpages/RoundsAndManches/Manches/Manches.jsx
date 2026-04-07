 
import { useTranslation } from "react-i18next";
 
import Input from "../../../../../components/input/Input";
import InputRange from "../../../../../components/inputRange/inputRange";
import InputSelect from "../../../../../components/InputSelect/InputSelect"; 
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import { useHistoryContext } from "../../../../../context/HistoryContext";
import { createHistoryElement } from "../../../../../helpers/historyObject";

 export default function Manches({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) { 
  const { t } = useTranslation();  
  const {addItem} = useHistoryContext();

  return    <>
      <div className="basicContainer">
        <TitleContainer
          title="roundsManagement"
          description="globalManagementForTours"
        ></TitleContainer>

        <div className="innerContainer">
          <span className="normalText">
            {t("maxNumberOfMance")} : {gameData.manches.max??0}
          </span>
          <InputRange
            type="range"
            min={0}
            max={100}
            maxValue={gameData.manches.max??0}
            setMaxValue={(value) => {
              updateGameValue("params.manches.max", value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: "params.manches.max",
                }),
              );
            }}
          ></InputRange>
        </div>
 
          <InputSelect
            title="orderOfManches"
            updateValueArray={(path, value) => {
              updateGameValue(path, value);
              addItem(
                gameData.id,
                createHistoryElement("gameElement", "edit", {
                  field: path,
                }),
              );
            }}
            pathObject="params.manches.sens"
            selected={gameData.manches.sens ? [gameData.manches.sens] : []}
            items={["incrementation", "decrementation"]}
            closeAfterSelect={true}
          />
      
        <Input
          title="numberOfTheFirstManche"
          defaultValue={gameData.manches.startNumber}
          onChangeFunction={(path, value) => {
            updateGameValue(path, value);
            addItem(
              gameData.id,
              createHistoryElement("gameElement", "edit", {
                field: path,
              }),
            );
          }}
          inputType="number"
          pathInObject={"params.manches.startNumber"}
        />
        
      </div>
      
     
 </>
}