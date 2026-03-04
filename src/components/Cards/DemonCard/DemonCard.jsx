import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext.jsx";
import Alert from "../../Alert/Alert.jsx";
import { useGameContext } from "../../../context/GameContext.jsx";
import Icon from "../../Icon/Icon.jsx";
export default function EventCard({
  action,
  demon,
  isSelected,
  alertMessage,
  displayIcons = false,
  actionOnAdd,
  actionOnRemove,
}) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const { setCurrentDemon, setCurrentSubpageOfEvents } = useGameContext();
  if (!demon) return;

  return (
    <div
      onClick={action}
      className={`demonCard ${isSelected ? "Selected" : ""}`}
    >
      {alertMessage && <Alert message={alertMessage} alertList={alertList} />}

      <h3>{demon.name ? demon.name : "Untitled"}</h3>

 
    </div>
  );
}
