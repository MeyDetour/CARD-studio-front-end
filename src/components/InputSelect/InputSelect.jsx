import { useTranslation } from "react-i18next";
import "./style.css";
import Icon from "../Icon/Icon";
import { useState } from "react";
export default function InputSelect({
  title,
  description,
  items,
  pathObject = "",
  customClass = "",
  placeholder = "",
  selected,
  disabled,
  closeAfterSelect = false,
  updateValueArray,
  itemsDisplayFields = [],
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (!Array.isArray(selected)) {
    console.warn("Selected is not array for input title : " + title + " got :");
    console.warn(selected);
  }
  return (
    <div className={"inputSelect " + customClass + " "+(disabled ? "disabled" : "")}>
      <span className="normalText">{t(title)}</span>
      {description && <p>{t(description)}</p>}
      <div className="itemSelected" onClick={() => {if (!disabled) setIsOpen(!isOpen)}}>
        <p>
          {!selected || selected.length === 0
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
            //  si aucun element selectionné alors isSelected = false
            // sinon si l'item est dans selected alors isSelected = true
            // si items -> item (object) et que selected est un array de
            // string alors on regarde si item[itemsDisplayFields[0]] est dans selected
            //
            // exemple : items = [{id:1, name:"toto"}, {id:2, name:"titi"}] ,
            // itemsDisplayFields = ["name"] et selected = ["toto"] alors isSelected sera true 
            // pour item {id:1, name:"toto"} et false pour item {id:2, name:"titi"}
            //
            const isSelected =
              !selected || selected.length === 0
                ? false
                : selected.includes(item) || itemsDisplayFields[0]
                  ? selected.includes(item[itemsDisplayFields[0]])
                  : false || itemsDisplayFields[1]
                    ? selected.includes(item[itemsDisplayFields[1]])
                    : false || itemsDisplayFields[2]
                      ? selected.includes(item[itemsDisplayFields[2]])
                      : false;
            return (
              <span
                key={index}
                className={isSelected ? "select" : ""}
                onClick={() => {
                  pathObject
                    ? updateValueArray(pathObject, item)
                    : updateValueArray(item);
                  if (closeAfterSelect) setIsOpen(false);
                }}
              >
                {itemsDisplayFields.length > 0
                  ? t(item[itemsDisplayFields[0]]) +
                    (itemsDisplayFields[1]
                      ? " - " + t(item[itemsDisplayFields[1]])
                      : "") +
                    (itemsDisplayFields[2]
                      ? " - " + t(item[itemsDisplayFields[2]])
                      : "") +
                    (itemsDisplayFields[3]
                      ? " - " + t(item[itemsDisplayFields[3]])
                      : "")
                  : t(item)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
