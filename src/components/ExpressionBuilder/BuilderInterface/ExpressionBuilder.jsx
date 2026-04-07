import { useTranslation } from "react-i18next";
import "./style.css";
import { useEffect, useState } from "react"; 
import { v4 as uuidv4 } from "uuid"; 
import Icon from "../../Icon/Icon.jsx";
import ChoicePanel from "../ChoicePanel/ChoicePanel.jsx"; 
import BlockRenderer from "../BlockRender/BlockRenderer.jsx";

export default function ExpressionBuilder({
  context,
  setCloseExpressionBuilder,
}) {
  const [globalstructure, setGlobalstructure] = useState([]);
  const [elementOfStructureOpen, setElementOfStructureOpen] = useState(null);
 
  const { t } = useTranslation();

  function addToStructure(element) {
    const newStructure = [...globalstructure, { ...element, id: uuidv4() }];
    setGlobalstructure(newStructure);
  }
  function updateBlock(updatedElement) {
    const newStructure = globalstructure.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    setGlobalstructure(newStructure);
  }
  useEffect(() => {
    if (
      context === "eventCreation" &&
      (!globalstructure || globalstructure.length === 0)
    ) {
      setGlobalstructure([
        {
          name: "when-event-triggered",
          type: "default",
          hasChildren: "true",
          className: "trigger",
          id: uuidv4(),
        },
      ]);
    }
  
  }, []); 
  return (
    <div className="expressionBuilderContainer">
      <div className="expressionBuilder basicContainer">
        <div className="expressionBuilderHeader">
          <Icon
            callback={() => setCloseExpressionBuilder(false)}
            name="close"
          ></Icon>
        </div>

        {!globalstructure || globalstructure.length === 0 ? (
          <ChoicePanel 
            context={context}
            globalstructure={globalstructure} 
            addToStructure={addToStructure}
            updateBlock={updateBlock}
          ></ChoicePanel>
        ) : (
          <BlockRenderer globalstructure={globalstructure} updateBlock={updateBlock}  addToStructure={addToStructure}/>
        )}
      </div>
    </div>
  );
}
