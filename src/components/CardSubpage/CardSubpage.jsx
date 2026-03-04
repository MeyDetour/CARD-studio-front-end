import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import Alert from "../Alert/Alert";
import { useNotificationContext } from "../../context/NotificationContext.jsx";
import TitleContainer from "../TitleContainer/TitleContainer";
export default function CardSubpage({ title, icon, description , displayAlertOfType,action }) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  return (
    <div className="cardSubpage basicContainer" onClick={action} >
      <TitleContainer
        type="h2"
        icon={icon}
        title={title} 
        description={description}
      />
         <Alert
                      alertList={alertList}   
                      displayAlertOfType={displayAlertOfType}
                    ></Alert>
    </div>
  );
}
