import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext.jsx";
import Alert from "../../Alert/Alert.jsx";
import { useGameContext } from "../../../context/GameContext.jsx";
import Icon from "../../Icon/Icon.jsx";
export default function TriggerCard({
  action,
  trigger,
  isSelected,
  alertMessages,
  displayIcons = false,
  actionOnAdd,
  actionOnRemove,
  children,
}) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const { setCurrentTrigger, setCurrentSubpageOfEvents } = useGameContext();
  if (!trigger) return;

  return (
    <div
      onClick={action}
      className={`triggerCard ${isSelected ? "Selected" : ""}`}
    >
         {children}
      {alertMessages && (
        <Alert messages={alertMessages} alertList={alertList} />
      )}

      <h3>{trigger.name ? trigger.name : "Untitled"}</h3>
   
    </div>
  );
}
