 
import { useTranslation } from "react-i18next";
 
import Input from "../../../../../components/input/Input";
import InputRange from "../../../../../components/inputRange/inputRange";
import InputSelect from "../../../../../components/inputSelect/InputSelect"; 
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
 
 export default function Manches({
  gameData,
  updateGameValueArray,
  updateGameValue,
}) { 
  const { t } = useTranslation();  

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
            setMaxValue={(value) =>
              updateGameValue("params.manches.max", value)
            }
          ></InputRange>
        </div>
 
          <InputSelect
            title="orderOfManches"
            updateValueArray={updateGameValue}
            pathObject="params.manches.sens"
            selected={gameData.manches.sens ? [gameData.manches.sens] : []}
            items={["incrementation", "decrementation"]}
            closeAfterSelect={true}
          />
      
        <Input
          title="numberOfTheFirstManche"
          defaultValue={gameData.manches.startNumber}
          onChangeFunction={updateGameValue}
          inputType="number"
          pathInObject={"params.manches.startNumber"}
        />
        
      </div>
      
     
 </>
}