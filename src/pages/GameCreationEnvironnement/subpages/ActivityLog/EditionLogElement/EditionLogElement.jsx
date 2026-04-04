import "./style.css";
import { useTranslation } from "react-i18next";
import Icon from "../../../../../components/Icon/Icon";
export default function EditionLogElement({ item }) {
  const { t } = useTranslation();
  if (!item) return;
  console.log(item);
  let association = [];
  getAssociationKey(association, item.oldValue, item.newValue);
console.log(association);
  return (
    <div className="editionLogElement">
      <div className="left">
        <div className="bulle">
          {item.action == "add" ? (
            <Icon name="activity-log-add"></Icon>
          ) : item.action == "edit" ? (
            <Icon name="activity-log-edit"></Icon>
          ) : (
            <Icon name="activity-log-deletion"></Icon>
          )}
        </div>
        <div className="trait"></div>
      </div>
      <div className="right">
        <span className="normalText">{item.name}</span>
        <div className="modificationDetail">
          <span>{t("editionLogChangeDetail")} :</span>
          <div className="modificationList">
            {association.map((assoc, index) => (
              <div key={index}>
                <span>{String(assoc.name )} : {String(assoc.oldValue)} -> {String(assoc.newValue)}</span>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function getAssociationKey(
  association,
  oldObj = {},
  newObj = {},
  parentKey = "",
) {
  const allKeys = new Set([
    ...Object.keys(oldObj || {}),
    ...Object.keys(newObj || {}),
  ]);

  allKeys.forEach((key) => {
    console.log(key);
    const oldVal = oldObj ? oldObj[key] : undefined;
    const newVal = newObj ? newObj[key] : undefined;

    if (
      typeof oldVal === "object" &&
      oldVal !== null &&
      typeof newVal === "object" &&
      newVal !== null
    ) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;
      getAssociationKey(association, oldVal, newVal, currentPath);
    } else if (oldVal !== newVal  && newVal != null) {
      association.push({
        name: parentKey ? `${parentKey}.${key}` : key,
        oldValue: oldVal === undefined ? "N/A" : String(oldVal),
        newValue: newVal === undefined ? "Supprimé" : String(newVal),
      });
    }
  });
}
