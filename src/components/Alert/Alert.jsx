import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../../context/NotificationContext";
export default function Alert({
  message,
  alertList,
  displayAlertOfType = "", // Nouveau : filtre par type (ex: "action")
  displayAlertStartWith = "",  
}) {
  const { t } = useTranslation();
  const [alertMessages, setAlertMessage] = useState([]);
  const { getAlerts, getAlertOfType, canDisplayError } = useNotificationContext();
  const [alertTypesToDisplay, setAlertTypesToDisplay] = useState({});
  useEffect(() => {
    let alerts = [];

    if (displayAlertOfType ) {
      displayAlertOfType = displayAlertOfType.split("|");
      let obj = {
        warning: false,
        alert: false,
      };
      for (let type of displayAlertOfType) {
        const alertsOfType = getAlertOfType(type);

        for (let alert of alertsOfType) {
          const parts = alert.split("|");
          const severity = parts[3] || "alert";
          if (severity === "alert") {
            obj.alert = true;
          } else if (severity === "warning") {
            obj.warning = true;
          }
        }
      }
      setAlertTypesToDisplay(obj);
    } else if (message) {
      alerts = getAlerts(message);
    } else if (displayAlertStartWith ) {
      alerts = getAlerts(displayAlertStartWith); 
      let obj = {
        warning: false,
        alert: false,
      };
      for (let alert of alerts) { 
 
          const parts = alert.split("|");
          const severity = parts[3] || "alert";
          if (severity === "alert") {
            obj.alert = true;
          } else if (severity === "warning") {
            obj.warning = true;
          } 
      }
      alerts=[]
      setAlertTypesToDisplay(obj);
    } 

    setAlertMessage(alerts || []);
  }, [message, alertList, displayAlertOfType, getAlerts]);


  if (!canDisplayError) return null;
 

  // Si pas d'alertes, on ne rend rien
  if ((displayAlertOfType || displayAlertStartWith) && (alertTypesToDisplay.alert || alertTypesToDisplay.warning)) {
    return (
      <div className="alertContainer">
        {alertTypesToDisplay.alert && (
          <img src={`/src/assets/icon/alert.svg`} alt={`alert Icon`} />
        )}
        {alertTypesToDisplay.warning && (
          <img src={`/src/assets/icon/warning.svg`} alt={`warning Icon`} />
        )}
      </div>
    );
  }
   if (alertMessages.length === 0) return null;
 

  return (
    <div className="alertContainer">
      {alertMessages.map((alertString, index) => {
        const parts = alertString.split("|");
        const severity = parts[3] || "alert";
        const translationKey = parts[2]; 
        return (
          <div key={index} className={`alertItem ${severity}Case`}>
            <img
              src={`/src/assets/icon/${severity === "alert" ? "alert.svg" : "warning.svg"}`}
              alt={`${severity} Icon`}
            />
            {translationKey && <p>{t(translationKey)}</p>}
          </div>
        );
      })}
    </div>
  );
}
