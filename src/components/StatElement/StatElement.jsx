import { useTranslation } from "react-i18next";
import "./style.css"; 
import Icon from "../Icon/Icon.jsx";
export default function StatElement({
 icon,
 number,
 className = "",
 text
}) {
  const { t } = useTranslation();
  return (
    <div action="" className={"statElement "+className }>
        <Icon className="iconBig" name={icon}></Icon>
        <div >
          <span>{number}</span>  <span>{t(text)}</span>
        </div>
    
      
    </div>
  );
}
