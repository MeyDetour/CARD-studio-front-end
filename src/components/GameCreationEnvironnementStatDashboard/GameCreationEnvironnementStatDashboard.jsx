import { useParams } from "react-router";
import "./style.css";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import Icon from "../Icon/Icon.jsx";
export default function GameCreationEnvironnementStatDashboard({
  text,
  number,
  icon,
}) {
  const { t } = useTranslation();
  return (
    <div className="gameCreationEnvironnementStatDashboard basicContainer">
      <div>
        <span>{t(text)}</span>
        <span>{number}</span>
      </div>

      <Icon name={icon}></Icon>
    </div>
  );
}
