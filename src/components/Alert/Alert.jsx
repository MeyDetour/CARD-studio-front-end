import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../../context/NotificationContext";

export default function Alert({
  messages = [],
  alertList,
  displayAlertOfType = "", // Nouveau : filtre par type (ex: "action")
  displayAlertStartWith = "",
}) {
  const { t } = useTranslation();
  const { getAlerts, getAlertOfType, canDisplayError } =
    useNotificationContext();
  const [alertMessages, setAlertMessages] = useState([]);
  const [alertTypesToDisplay, setAlertTypesToDisplay] = useState({
    alert: false,
    warning: false,
  });

  useEffect(() => {
    if (!canDisplayError) return;

    let newAlerts = [];
    let hasAlert = false;
    let hasWarning = false;

    if (displayAlertOfType) {
      const types = displayAlertOfType.split("|");
      types.forEach((type) => {
        getAlertOfType(type).forEach((alert) => {
          const severity = alert.split("|")[3] || "alert";
          if (severity === "alert") hasAlert = true;
          if (severity === "warning") hasWarning = true;
        });
      });
    } else if (displayAlertStartWith) {
      const alerts = getAlerts(displayAlertStartWith);
      alerts.forEach((alert) => {
        const severity = alert.split("|")[3] || "alert";
        if (severity === "alert") hasAlert = true;
        if (severity === "warning") hasWarning = true;
      });
    } else if (messages?.length > 0) {
      messages.forEach((msg) => {
        newAlerts = [...newAlerts, ...getAlerts(msg)];
      });
    }
    setAlertTypesToDisplay((prev) => {
      if (prev.alert === hasAlert && prev.warning === hasWarning) return prev;
      return { alert: hasAlert, warning: hasWarning };
    });
    setAlertMessages((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newAlerts)) return prev;
      return newAlerts;
    });
  }, [
    messages,
    displayAlertOfType,
    displayAlertStartWith,
    canDisplayError,
    getAlerts,
    getAlertOfType,
  ]);
  if (!canDisplayError) return null;

  // Affichage des icônes d'alerte ou warning si demandé par type
  if (
    (displayAlertOfType || displayAlertStartWith) &&
    (alertTypesToDisplay.alert || alertTypesToDisplay.warning)
  ) {
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

  if (!alertMessages || alertMessages.length === 0) return null;

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
