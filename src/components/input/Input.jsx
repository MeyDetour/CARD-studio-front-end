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
  hint,
  onChangeFunction,
  suggestions = [],
}) {
  const { t } = useTranslation();
  let inputNumber = useRef(null);
  const [focused, setFocused] = useState(false);

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

  return (
    <div style={type=="input" && hint ?{marginBottom: "20px"} :null} className={`input ${type} ${disabled ? "disabled" : ""}`}>
      <span className="normalText">{t(title)}</span>
      {(() => {
        switch (inputType) {
          case "input":
            return (
              <>
                <input
                  disabled={disabled}
          readOnly={disabled}
                  onChange={(e) =>
                    !disabled &&
                    (pathInObject
                      ? onChangeFunction(pathInObject, e.target.value)
                      : onChangeFunction(e.target.value))
                  }
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  value={defaultValue ?? ""}
                  type="text"
                  placeholder={t(placeholder)}
                />
                {hint && <span className="hint">{t(hint)}</span>}
                {(() => {
                  let newSuggestions = suggestions.filter(
                    (suggestion) =>
                      (defaultValue == "" ||
                        suggestion.label
                          .toLowerCase()
                          .includes(defaultValue ? defaultValue.toString().toLowerCase() : "")) &&
                      suggestion.label != defaultValue,
                  );

                  if (newSuggestions.length === 0) return null;
                  return (
                    <div
                      className="suggestion"
                      style={{ display: focused ? "flex" : "none" }}
                    >
                      {newSuggestions.map((suggestion, index) => {
                        return (
                          <span
                            onMouseDown={() => {
                              console.log(suggestion);
                              pathInObject
                                ? onChangeFunction(
                                    pathInObject,
                                    suggestion.label,
                                  )
                                : onChangeFunction(suggestion.label);
                            }}
                            key={index}
                          >
                            {suggestion.label}
                          </span>
                        );
                      })}
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
                    : 0 ;
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
