import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import TitleContainer from "../../../TitleContainer/TitleContainer.jsx";
import VerticalInputSelect from "../../../VerticalInputSelection/VerticalInputSelection.jsx";
export default function ExpressionBlock({
  element,
  globalstructure,
  addToStructure,
  updateBlock
}) { 
  const [operationSelected, setOperationSelected] = useState("or");
  const { t } = useTranslation();
  function constructExpression() {
   updateBlock({
            ...element,
            event: {
              
            },
          } )
  }
  return (
    <>
      <div
        className={"elementInExpressionBuilder expressionBlock "} 
      >
        <div className="leftExpression">
          <ChoicePanel 
            context={context}
            globalstructure={globalstructure} 
            addToStructure={addToStructure}
          ></ChoicePanel>
        </div>
        <div>
          <VerticalInputSelect
            selected={operationSelected}
            items={["or", "and"]}
            setSelected={(value) => setOperationSelected(value)}
          />
        </div>
        <div className="rightExpression"></div>
      </div>
    </>
  );
}
