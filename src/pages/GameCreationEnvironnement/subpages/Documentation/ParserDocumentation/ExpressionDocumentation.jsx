import "./style.css";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
export default function ExpressionDocumentation() {
  return (
    <div className="expressionDocumentationSubpage">
      <div className="wrapper">
        {[
          {
            topValue: "exp(a&&b)",
            name: "expression",
            description: "expressionDescription",
          },
          {
            topValue: "comp(a;comparator;b)",
            name: "comparaison",
            description: "comparaisonDescription",
          },
          {
            topValue: "function(a)",
            name: "function",
            description: "functionsDescription",
          },
        ].map((section, key) => (
          <div key={key} className="expressionType  basicContainer">
            <div className="top">{section.topValue}</div>
            <div className="bottom">
              <TitleContainer
                type="h2"
                title={section.name}
                description={section.description}
              ></TitleContainer>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
