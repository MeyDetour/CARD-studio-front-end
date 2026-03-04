import { useTranslation } from "react-i18next";
import "./style.css";
import Icon from "../Icon/Icon";
import { useState } from "react";
export default function InputSelect({
  title,
  items,
  pathObject = "",
  customClass = "",
  placeholder = "",
  selected,
  closeAfterSelect = false,
  updateValueArray,
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (Array.isArray( selected) ){
    console.warn("Selected is not array")
  }
  return (
    <div className={"inputSelect " + customClass}>
      <span className="normalText">{t(title)}</span>
      <div className="itemSelected" onClick={() => setIsOpen(!isOpen)}>
        <p>
          {(!selected || selected.length === 0)
            ? t(placeholder)
            : selected.map((e, index) => (
                <>
                  <span key={index}>{e ? t(e) : ""}</span>
                  {selected.length - 1 != index && <span>, </span>}
                </>
              ))}
        </p>
        <Icon name="arrow-to-back-grey"></Icon>
      </div>
      {isOpen && items && items.length > 0 && (
        <div className="choices">
          {items.map((item, index) => {
            const isSelected =
              !selected || selected.length === 0
                ? false
                : selected.includes(item);
            return (
              <span
                key={index}
                className={isSelected ? "select" : ""}
                onClick={() => {
                  updateValueArray(pathObject, item);
                  if (closeAfterSelect) setIsOpen(false);
                }}
              >
                {t(item)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
