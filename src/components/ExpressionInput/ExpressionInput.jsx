import { useTranslation } from "react-i18next";
import "./style.css";
import { useRef, useState } from "react";
import { Link } from "react-router";
import TitleContainer from "../TitleContainer/TitleContainer";
import { get } from "react-hook-form";
import { parserGetColor, parserGetType } from "../../helpers/parser.js";
export default function ExpressionInput({
  title,
  description = "",
  type = "",
  placeholder = "",
  inputType = "input",
  defaultValue,
  disabled = false,
  pathInObject = "",
  max = null,
  min = null,
  hint,
  isExpression = false,
  onChangeFunction,
  suggestions = [],
  deactivateTitleTranslation = false,
}) {
  const { t } = useTranslation();
  let inputNumber = useRef(null);
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [searchInSuggestion, setSearchInSuggestion] = useState("");

  const insertTextAtCursor = (textToInsert) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    let value = input.value.trim();
    value = value.replaceAll(" ", "");
    console.log("cursor start " + start);
    console.log("cursor end " + end);
    console.log("text length " + inputRef.value);
    if (
      textToInsert.includes("(a)") &&
      (end == input.value.length || start == 0)
    ) {
      value = textToInsert.replace("(a)", "(" + value + ")");
    } else if (textToInsert.includes("(a") && end == input.value.length) {
      value = textToInsert.replace("(a", "(" + value);
    } else if (textToInsert.includes("b)") && start == 0) {
      value = textToInsert.replace("b)", value + ")");
    } else {
      value = value.substring(0, start) + textToInsert + value.substring(end);
    }
    return value;
  };
  function getColorationList(str) {
  let text = "";
  let listOfText = [];
  let listOpen = []; // Stocke directement les chaînes de caractères (ex: "function")

  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    let c1 = str[i + 1]; 
    if ((c === "|" && c1 === "|") || (c === "&" && c1 === "&") || (c === ">" && c1 === ">")) {
        if (text.trim() !== "") {
        let type = parserGetType(text);
        listOfText.push({ type: type, color: parserGetColor(type), text: text });
      }
      
       let op = c + c1;
      let typeOp = (c === ">") ? parserGetType(op) : "expression"; 
      listOfText.push({ type: typeOp, color: parserGetColor(typeOp), text: op });
      
      text = "";
      i++;  
      continue;
    }
 
    text += c;
 
    if (c === "(" || c === ";" || c === ")" || c === "," || c === "}") {
      let type = parserGetType(text);
      let color = parserGetColor(type);
 
      if (type === "function" || type === "expression" || type === "comparaison") {
        listOpen.push(type);  
      }
 
      if (c === ")" && listOpen.length > 0) { 
        let elementFermeture = listOpen.pop(); // Récupère la chaîne directement
         type = elementFermeture; // Plus de ".type" obsolète
        color = parserGetColor(type);
      }
 
      listOfText.push({ type: type, color: color, text: text });
      text = "";
    }
  }
 
  if (text.trim() !== "") {
    let type = parserGetType(text);
    listOfText.push({ type: type, color: parserGetColor(type), text: text });
  }

  console.log(listOfText);
  return listOfText;
}
  return (
    <div
      style={type == "input" && hint ? { marginBottom: "20px" } : null}
      className={`input ${type} ${disabled ? "disabled" : ""}`}
    >
      <TitleContainer
        type="normalText"
        title={title}
        description={description}
        deactivateTitleTranslation={deactivateTitleTranslation}
      />
      <input
        ref={inputRef}
        disabled={disabled}
        readOnly={disabled}
        onChange={(e) =>
          !disabled &&
          (pathInObject
            ? onChangeFunction(pathInObject, e.target.value)
            : onChangeFunction(e.target.value))
        }
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (
            e.relatedTarget &&
            e.currentTarget.parentNode.contains(e.relatedTarget)
          ) {
            return;
          }
          setFocused(false);
        }}
        value={defaultValue ?? ""}
        type="text"
        placeholder={t(placeholder)}
      />
      <textarea
        onClick={() => setFocused(true)}
        onChange={(e) => {
          let search = e.target.value;
          console.log("search " + search);
          setSearchInSuggestion(search);
        }}
        type="text"
        placeholder={t("searchExpression")}
      />
      <pre>
        {getColorationList(defaultValue).map((part, index) => {
          return (
            <span style={{ color: part.color }} key={index}>
              {part.text}
            </span>
          );
        })}
      </pre>
      {hint && <span className="hint">{t(hint)}</span>}
      {(() => {
        let newSuggestions = suggestions.filter(
          (suggestion) =>
            suggestion.label
              .toLowerCase()
              .includes(searchInSuggestion.toLowerCase()) ||
            searchInSuggestion === "",
        );
        // on applique la condition sur suggestions et non pas newsuggestions
        // car si newsuggestions est vide alors on affiche pas la box de suggestion
        // alors que peut etre il y a des suggestions mais qui ne match pas avec
        // la recherche dans la suggestion
        if (suggestions.length === 0) return null;
        return (
          <div
            className="suggestion"
            style={{ display: focused ? "flex" : "none" }}
            tabIndex="-1"
            onBlur={(e) => {
              if (
                !e.relatedTarget ||
                !e.currentTarget.parentNode.parentNode.contains(e.relatedTarget)
              ) {
                setFocused(false);
              }
            }}
          >
            <div className="wrapperSuggestion">
              {newSuggestions.map((suggestion, index) => {
                return (
                  <span
                    onMouseDown={(e) => {
                      e.preventDefault();
                      console.log(suggestion);
                      const newValue = insertTextAtCursor(suggestion.label);
                      pathInObject
                        ? onChangeFunction(pathInObject, newValue)
                        : onChangeFunction(newValue);
                    }}
                    key={index}
                  >
                    {suggestion.label}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
