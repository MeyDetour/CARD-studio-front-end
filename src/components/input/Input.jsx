import { useTranslation } from "react-i18next";
import "./style.css";
import { useRef, useState } from "react";
import { Link } from "react-router";
import TitleContainer from "../TitleContainer/TitleContainer";
export default function Input({
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
  onChangeFunction,
  suggestions = [],
  searchbar = true,
}) {
  const { t } = useTranslation();
  let inputNumber = useRef(null);
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [searchInSuggestion, setSearchInSuggestion] = useState("");

  if (inputType === "toggle") {
    return (
      <div className={`inputRow ${disabled ? "disabled" : ""}`}>
        <TitleContainer
          type="normalText"
          title={title}
          description={description}
        />

        <label className="switch">
          <input
            readOnly={disabled}
            disabled={disabled} // Ajout ici
            onChange={(e) =>
              !disabled &&
              (pathInObject
                ? onChangeFunction(pathInObject, e.target.checked)
                : onChangeFunction(e.target.checked))
            }
            type="checkbox"
            checked={!!defaultValue}
          />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }

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
 
  return (
    <div
      style={type == "input" && hint ? { marginBottom: "20px" } : null}
      className={`input ${type} ${disabled ? "disabled" : ""}`}
    >
      <span className="normalText">{t(title)}</span>
      {(() => {
        switch (inputType) {
          case "input":
            return (
              <>
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
                          !e.currentTarget.parentNode.parentNode.contains(
                            e.relatedTarget,
                          )
                        ) {
                          setFocused(false);
                        }
                      }}
                    >
                      <input
                        onClick={() => setFocused(true)}
                        onChange={(e) => {
                          let search = e.target.value;
                          console.log("search " + search);
                          setSearchInSuggestion(search);
                        }}
                        type="text"
                        placeholder={t("searchExpression")}
                      />
                    
                        <div className="wrapperSuggestion">
                          {newSuggestions.map((suggestion, index) => {
                            return (
                              <span
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  console.log(suggestion);
                                  const newValue = insertTextAtCursor(
                                    suggestion.label,
                                  );
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
              </>
            );
          case "number":
            return (
              <input
                ref={inputNumber}
                disabled={disabled}
                readOnly={disabled}
                onChange={(e) => {
                  if (disabled) return;
                  let myString = e.target.value;

                  let cleanedValue = myString.replace(/\D/g, "");
                  cleanedValue = parseInt(cleanedValue)
                    ? parseInt(cleanedValue)
                    : 0;

                  if (min && cleanedValue < min) {
                    cleanedValue = min;
                  }
                  if (max && cleanedValue > max) {
                    cleanedValue = max;
                  }

                  pathInObject
                    ? onChangeFunction(pathInObject, cleanedValue)
                    : onChangeFunction(cleanedValue);
                }}
                value={defaultValue ?? ""}
                type="text"
                placeholder={t(placeholder)}
              />
            );

          case "textarea":
            return (
              <textarea
                disabled={disabled}
                readOnly={disabled}
                onChange={(e) =>
                  !disabled &&
                  (pathInObject
                    ? onChangeFunction(pathInObject, e.target.value)
                    : onChangeFunction(e.target.value))
                }
                value={defaultValue ? defaultValue : t(placeholder)}
                id="story"
                name="story"
                rows="5"
                cols="33"
              ></textarea>
            );
        }
      })()}
    </div>
  );
}
