// CSS
import "./style.css";

// External libraries
import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// Helpers
import { getSugggestionForPlayer } from "../../../../helpers/suggestions";
import { verifyExpressionSyntax } from "../../../../helpers/parser.js";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import Input from "../../../../components/Input/Input.jsx";

// Utils
import {
  parserGetTypeTextual,
  parserGetType,
  parserGetPartsOfExpression,
  parserGetPartsOfComparaison,
  parserGetPartsOfVariable,
  parserGetPartsOfFunction,
  parserGetTypeReturn
} from "../../../../helpers/parser.js";

export default function ExpressionEditor({ gameData }) {
  const {t} = useTranslation();
  const [expression, setExpression] = useState( localStorage.getItem("expressionEditorCurrentExpression") ||
    "exp(comp({playerBoucle#attachedEventForTour};notContain;<<skipPlayerTour>>)&&comp({playerBoucle};differentPlayer;{currentPlayer}))",
  );  
  return (
    <div className={" expressionEditorSubpage"}>
      <div className="basicContainer">
        <TitleContainer
          title="expressionEditor"
          description="expressionEditorDescription"
        ></TitleContainer>
       

        <Input
          title="expression"
          defaultValue={expression}
          suggestions={[
            ...gameData.suggestions,
            ...getSugggestionForPlayer(
              "currentPlayer",
              gameData.playerGlobalValue,
            ),
          ]}
          onChangeFunction={(value) => {
            setExpression(value);
            localStorage.setItem("expressionEditorCurrentExpression", value);
          }}
        />
      </div>
       {!verifyExpressionSyntax(expression)  && (
          <div className="basicContainer basicRedContainer"
          >
            <p>{t("expressionSyntaxIsNotCorrect")}</p>
          </div>
        )}
      <div className="basicContainer">
        
        <TitleContainer title="decompositionOfExpression"></TitleContainer>
        <div className="decompositionContainer">
          {getDecompositionTree(expression, 0)}
        </div>
      </div>
 
    </div>
  );
}
 

function getDecompositionTree(exp, depth = 0) {
  if (!exp) return ""; 
  let returnType = parserGetTypeReturn(exp);

  return (
    /*html*/ <div
      className={`decompositionNode ${depth === 0 ? "noMargin" : ""}`}
    >
      <span>{parserGetTypeTextual(exp)}</span>
      {(() => {
        switch (parserGetType(exp)) {
          case "function":
            let innerContent = parserGetPartsOfFunction(exp);
            return (
              <>
                <span className="part-label">
                  <span className="letter">Argument : </span>
                  {innerContent}
                  </span> 
                   {getDecompositionTree(innerContent, depth + 1)}
               
              </>
            );
             case "expression":
            let partsExpression = parserGetPartsOfExpression(exp);
            return (
              <>
                <span className="part-label">
                  <span className="letter">A : </span>
                  {partsExpression[0]}
                </span>
                {getDecompositionTree(partsExpression[0], depth + 1)}
                <span className="part-label">
                  <span className="letter">B : </span>
                  {partsExpression[2]}
                </span>
                {getDecompositionTree(partsExpression[2], depth + 1)}
                <span className="part-label">
                  <span className="letter">Return : </span>
                  {returnType}
                </span>
              </>
            );
          case "comparaison":
            let partsComparaison = parserGetPartsOfComparaison(exp);
            return (
              <>
                <span className="part-label">
                  <span className="letter">A : </span>
                  {partsComparaison[0]}
                </span>
                {getDecompositionTree(partsComparaison[0], depth + 1)}
                <span className="part-label">
                  <span className="letter">B : </span>
                  {partsComparaison[2]}
                </span>
                {getDecompositionTree(partsComparaison[2], depth + 1)}
                <span className="part-label">
                  <span className="letter">Return : </span>
                  {returnType}
                </span>
              </>
            );
          case "variable":
            let partsVariable = parserGetPartsOfVariable(exp);
            console.log(partsVariable);
            console.log(partsVariable[0]);
            return (
              <>
                <span className="part-label">
                  <span className="letter">Object : </span>
                  {partsVariable[0]}
                  {getDecompositionTree(partsVariable[0], depth + 1)}
                </span>
                {partsVariable.map(
                  (attr, index) =>
                    index != "0" && (
                      <span className="part-label">
                        <span className="letter">
                          Attributs {index} :{" "}
                        </span>
                        {attr}
                      </span>
                    ),
                )}
                <span className="part-label">
                  <span className="letter">Return : </span>
                  {returnType}
                </span>
              </>
            );

          default:
            return (
              <>
                <span className="part-label">
                  <span className="letter">Valeur : </span>
                  {exp}
                </span>
                <span className="part-label">
                  <span className="letter">Return : </span>
                  {returnType}
                </span>
              </>
            );
        }
      })()}
    </div>
  );
}
