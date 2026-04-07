import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css"; 
import InputSelect from "../../../inputSelect/InputSelect.jsx";
export default function ConditionBlock({
  element,
  globalstructure,
  addToStructure,
  updateBlock,
}) {
  const [conditionSelected, setconditionSelected] = useState(["operation-comparaison"]);
  const { t } = useTranslation();
  function constructExpression() {
    updateBlock({
      ...element,
      event: {},
    });
  }
  return (
    <>
      <div className={"elementInExpressionBuilder expressionBlock "}>
       
                  <InputSelect
                    title={"condition-type"}
                    updateValueArray={(path,value)=>{setconditionSelected(path,value); updateBlock()}}
                    closeAfterSelect={true}
                    selected={conditionSelected ? conditionSelected : []}
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
    </>
  );
}
