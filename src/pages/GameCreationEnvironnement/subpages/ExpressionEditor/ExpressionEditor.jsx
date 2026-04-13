import "./style.css";
import { useState } from "react";
import Input from "../../../../components/input/Input";
import { getSugggestionForPlayer } from "../../../../helpers/suggestions";
// External libraries
import { useNavigate } from "react-router"; 
import { useTranslation } from "react-i18next";
// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import {
  parserGetTypeTextual,
  parserGetType,
  parserGetPartsOfExpression,
  parserGetPartsOfComparaison,
  parserGetPartsOfVariable,
  parserGetTypeReturn
} from "./parser.js";

export default function ExpressionEditor({ gameData }) {
  const [expression, setExpression] = useState(
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
          }}
        />
      </div>
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
  const { t } = useTranslation();
  let returnType = parserGetTypeReturn(exp);

  return (
    /*html*/ <div
      className={`decompositionNode ${depth === 0 ? "noMargin" : ""}`}
    >
      <span>{parserGetTypeTextual(exp)}</span>
      {(() => {
        switch (parserGetType(exp)) {
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
                  <span className="letter">{t("object")} : </span>
                  {partsVariable[0]}
                </span>
                {partsVariable.map(
                  (attr, index) =>
                    index != "0" && (
                      <span className="part-label">
                        <span className="letter">
                          {t("Attributs")} {index} :{" "}
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
