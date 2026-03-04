import { useTranslation } from "react-i18next";
import "./style.css"; 
import Icon from "../Icon/Icon.jsx";

export default function GameCreationEnvironnementQuickAction({
 icon, 
 text,
 action
}) {
  const { t } = useTranslation();
  return (
    <div onClick={action} className={"lightContainer gameCreationEnvironnementQuickActionElement " }>
       <Icon name={icon}></Icon>
       <span className="littleTitle">{t(text)}</span>
      
    </div>
  );
}
