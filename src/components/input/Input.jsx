import { useTranslation } from "react-i18next";
import "./style.css";
import { useRef } from "react";
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
  onChangeFunction,
}) {
  const { t } = useTranslation();
  let inputNumber = useRef(null);

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
    <div className={`input ${type} ${disabled ? "disabled" : ""}`}>
      <span className="normalText">{t(title)}</span>
      {(() => {
        switch (inputType) {
          case "input":
            return (
              <input
                disabled={disabled}
                onChange={(e) =>
                  !disabled &&
                  (pathInObject
                    ? onChangeFunction(pathInObject, e.target.value)
                    : onChangeFunction(e.target.value))
                }
                value={defaultValue ?? ""}
                type="text"
                placeholder={t(placeholder)}
              />
            );
          case "number":
            return (
              <input
                ref={inputNumber}
                disabled={disabled}
                onChange={(e) => {
                  if (disabled) return;
                  let myString = e.target.value;

                  let cleanedValue = myString.replace(/\D/g, "");
                  cleanedValue = parseInt(cleanedValue)
                    ? parseInt(cleanedValue)
                    : 0;
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
