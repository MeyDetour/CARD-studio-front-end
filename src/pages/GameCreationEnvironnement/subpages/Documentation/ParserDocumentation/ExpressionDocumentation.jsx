// CSS
import "./style.css";

// External libraries
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {copy} from "../../../../../helpers/text.js";
// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import Icon from "../../../../../components/Icon/Icon";
import Button from "../../../../../components/Button/Button";
import SearchBar from "../../../../../components/SearchBar/SearchBar";

// Data
import { expressionList, expressionListTypes } from "./ExpressionList";
export default function ExpressionDocumentation() {
  const [subpage, setSubpage] = useState("all");
  const [copiedWord, setCopiedWord] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  
  return (
    <div className="expressionDocumentationSubpage">
      <TitleContainer
        title="documentationOfExpressions"
        description="guideComplete"
      ></TitleContainer>
      <div className="basicContainer">
        <TitleContainer
          type="h3"
          title="categories"
          description="filterByExpressionType"
        ></TitleContainer>
        <div className="wrapper wrapperCategories">
          {expressionListTypes.map((type, key) => (
            <div
              className={
                "expressionType" + (subpage == type.name ? " selected" : "")
              }
              key={key}
              onClick={() => setSubpage(type.name)}
            >
              <Icon
                name={
                  type.icon + "_" + (subpage == type.name ? "white" : "grey")
                }
              ></Icon>
              <span>{type.name}</span>
              <span className="value">
                {type.name == "all"
                  ? expressionList.length
                  : expressionList.filter((expr) =>
                      expr.categories.includes(type.name),
                    ).length}
              </span>
            </div>
          ))}
        </div>
      </div>
      <SearchBar
        callback={(value) => {
          setSearchTerm(value);
        }}
        placeholder={"searchFunction"}
        className="searchBarForm"
      ></SearchBar>
      <div className="wrapper wrapperDocElt">
        {expressionList
          .filter(
            (expr) =>
              (subpage == "all" || expr.categories.includes(subpage)) &&
              (searchTerm === "" ||
                JSON.stringify(expr)
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())),
          )
          .map((expression, key) => (
            <div className="expressionCard basicContainer" key={key}>
              <TitleContainer
                type="h3"
                title={expression.nameKey}
                description={expression.descriptionKey}
              ></TitleContainer>

              <span
                onClick={() => {
                  copy(expression.syntax);
                  setCopiedWord(expression.syntax);
                  setTimeout(() => {
                    setCopiedWord("");
                  }, 2000);
                }}
                className="syntax"
              >
                {expression.syntax}
                <Icon
                  name={copiedWord == expression.syntax ? "copy-success" : "copy"}
                  className={
                    "copyIcon " + (copiedWord == expression.syntax ? "copied" : "")
                  }
                ></Icon>
              </span>

              {expression.inputs && (
                <div>
                  <span className="normalText">{t("types")}</span>
                  {expression.inputs.map((input, key) => (
                    <p className="input" key={key}>
                      {input.name} : {input.type}
                    </p>
                  ))}
                </div>
              )}
              <div>
                <span className="normalText">{t("return")}</span>
                <p className="input" key={key}>
                  Type : {expression.returns.type}
                  <br></br>
                  Description : {expression.returns.description}
                </p>
              </div>
              <div>
                <span className="normalText">{t("exemples")}</span>
                {expression.examples.map(
                  (example, key) =>
                    typeof example === "string" && (
                      <p className="input" key={key}>
                        {example}
                      </p>
                    ),
                )}
              </div>
              {expression.notes && (
                <div>
                  <span className="normalText">{t("notes")}</span>
                  {expression.notes.map(
                    (note, key) =>
                      typeof note === "string" && (
                        <p className="input" key={key}>
                          {t(note)}
                        </p>
                      ),
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
function ExpressionDocumentationHeader({ setSubpage }) {
  return (
    <div>
      <Button
        type=""
        icon="left_arrow"
        text={"back"}
        action={() => setSubpage(null)}
      ></Button>
    </div>
  );
}
