import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext.jsx";
import Alert from "../../Alert/Alert.jsx";
import { useGameContext } from "../../../context/GameContext.jsx";
import Icon from "../../Icon/Icon.jsx";
export default function GainCard({
  gain,
  isSelected,
  actionOnClick,
  children,
}) {
  if (!gain) return;

  return (
    <div
      onClick={actionOnClick}
      className={`gainCard ${isSelected ? "Selected" : ""}`}
    >
      {children}
      <div className="visuel">
        {gain.image && (
          <img src={gain.image} alt="gain" />
        )}
      </div>
      <h3>{gain.name ? gain.name : "Untitled"}</h3>
    </div>
  );
}
