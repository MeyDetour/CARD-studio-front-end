import ExpressionBlock from "../blocks/ExpressionBlock/ExpressionBlock.jsx";
import WhenEventTriggeredBlock from "../defaultBlock/WhenEventTriggeredBlock/WhenEventTriggeredBlock.jsx";
import WinBlock from "../blocks/WinBlock/WinBlock.jsx";
import ChoicePanel from "../ChoicePanel/ChoicePanel.jsx";
import DefaultBlock from "../blocks/DefaultBlock/DefaultBlock.jsx";
import ConditionBlock from "../blocks/ConditionBlock/ConditionBlock.jsx";

export default function BlockRenderer({
  globalstructure,
  addToStructure,
  updateBlock,
}) {
  return (
    <>
      {globalstructure.map((element, index) => (
        <>
          {(() => {
            switch (element.name) {
              case "when-event-triggered":
                return <WhenEventTriggeredBlock />;
              case "win":
                return (
                  <WinBlock
                    globalstructure={globalstructure}
                    addToStructure={addToStructure}
                    updateBlock={updateBlock}
                    element={element}
                  />
                );
              case "operation-expression":
                return (
                  <ExpressionBlock
                    globalstructure={globalstructure}
                    addToStructure={addToStructure}
                    updateBlock={updateBlock}
                    element={element}
                  />
                );
              case "trigger-condition":
                return (
                  <ConditionBlock
                    globalstructure={globalstructure}
                    addToStructure={addToStructure}
                    updateBlock={updateBlock}
                    element={element}
                  />
                );
              default:
                return (
                  <DefaultBlock
                    title={element.name}
                    description={element.description ?? ""}
                  />
                );
            }
          })()}

          {element.hasChildren && (
            <>
              <div className="bottomArrow"></div>
              {index === globalstructure.length - 1 && (
                <ChoicePanel
                  context={context}
                  globalstructure={globalstructure}
                  addToStructure={addToStructure}
                  updateBlock={updateBlock}
                ></ChoicePanel>
              )}
            </>
          )}
        </>
      ))}
    </>
  );
}
