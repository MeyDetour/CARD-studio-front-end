import "./style.css";
import { useTranslation } from "react-i18next";
import Icon from "../../../../../components/Icon/Icon";
export default function EditionLogElement({ item }) {
  const { t } = useTranslation();
  if (!item) return; 
  let association = [];
  getAssociationKey(association, item.oldValue, item.newValue, null,item.action);
 
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
        {association.length > 0 && (
          <div className="modificationDetail">
            <span>
              {item.action == "edit" || item.action == "add"
                ? t("editionLogChangeDetail")
                : t("editionLogDeletionDetail")}{" "}
              :
            </span>
            <div className="modificationList">
              {association.map((assoc, index) => (
                <div key={index}>
                  <span>
                    {String(assoc.name)} :{" "}
                    {assoc.oldValue ? String(assoc.oldValue) : ""}
                    {assoc.oldValue && assoc.newValue ? " -> " : ""}
                    {assoc.newValue ? String(assoc.newValue) : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function getAssociationKey(association, oldObj = {}, newObj = {}, parentKey = "", action) {
 
if (action === "delete") {
    if (typeof oldObj !== "object" || oldObj === null) {
      association.push({
        name: parentKey || "valeur",
        oldValue: String(oldObj),
        newValue: null,
      });
      return;
    }

    Object.keys(oldObj || {}).forEach((key) => {
      const val = oldObj[key];
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof val === "object" && val !== null) {
        getAssociationKey(association, val, null, currentPath, action);
      } else {
        association.push({
          name: key,
          oldValue: String(val),
          newValue: null,
        });
      }
    });
    return;
  }

 if (typeof newObj !== "object" || newObj === null) {
    if (oldObj !== newObj) {
      association.push({
        name: parentKey ? parentKey : "value",
        oldValue: oldObj === undefined || oldObj === null ? null : String(oldObj),
        newValue: newObj === undefined || newObj === null ? null : String(newObj),
      });
    }
    return;
  }
  const allKeys = new Set([
    ...Object.keys(oldObj || {}),
    ...Object.keys(newObj || {}),
  ]);

  allKeys.forEach((key) => {
    console.log(key);
    const oldVal = oldObj ? oldObj[key] : undefined;
    const newVal = newObj ? newObj[key] : undefined;

    if (typeof newVal === "object" || typeof oldVal === "object") {
      getAssociationKey(association, oldVal, newVal, key ? key : parentKey, action);
    } else {
      association.push({
        name: key ? key:"value",
        oldValue: oldVal === undefined ? null : String(oldVal),
        newValue: newVal === undefined ? null : String(newVal),
      });
    }
  });
}
