import "./style.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../../../../components/Icon/Icon";
import Button from "../../../../../components/Button/Button";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import { expressionList, expressionListTypes } from "./ExpressionList";
export default function ExpressionDocumentation() {
  const [subpage, setSubpage] = useState("all");
  const{t} = useTranslation();
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
        <div className="wrapper">
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
                {
                  type.name == "all" ? expressionList.length :
                  expressionList.filter((expr) =>
                    expr.categories.includes(type.name),
                  ).length
                }
              </span>
            </div>
          ))}
        </div>
      </div>
      <SearchBar
        callback={() => {}}
        placeholder={"searchFunction"}
        className="searchBarForm"
      ></SearchBar>
      <div className="wrapper">
        {expressionList
        .filter((expr) => subpage == "all" || expr.categories.includes(subpage))
        .map((expression, key) => (
          <div className="expressionCard basicContainer" key={key}>
            <TitleContainer
            type="h3"
              title={expression.nameKey}
              description={expression.descriptionKey}
            ></TitleContainer>
              <span className="syntax">{expression.syntax}</span>
          
            <div>
              <span className="normalText">{t('syntax')}</span>
              <span className="syntax">{expression.syntax}</span>
            </div>
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
