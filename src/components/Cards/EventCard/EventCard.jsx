import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import { useNotificationContext }  from "../../../context/NotificationContext.jsx";
import Alert from "../../Alert/Alert.jsx";
import { useGameContext } from "../../../context/GameContext.jsx";
import Icon from "../../Icon/Icon.jsx";


export default function EventCard({ action, event, isSelected ,alertMessage, displayIcons = false, actionOnAdd, actionOnRemove,children}) {
  const { t } = useTranslation(); 
  const { alertList } = useNotificationContext();
  const { setCurrentEvent, setCurrentSubpageOfEvents } = useGameContext();
  if (!event) return;
  const type = event.event.give
    ? "Give"
    : event.event.action === "askPlayer"
      ? "Interaction"
      : event.event.action
        ? "Action"
        : "unknown"; 
  return (
    <div
      onClick={action}
      className={`eventCard ${isSelected ? "Selected" : ""}`}
    >
      {children}
      {alertMessage && <Alert message={alertMessage}  alertList={alertList} />}
      <h3>{event.name ? event.name : "No name"}</h3>
      
    </div>
  );
}
