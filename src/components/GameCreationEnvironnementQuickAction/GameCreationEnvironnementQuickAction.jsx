import { useTranslation } from "react-i18next";
import "./style.css"; 

export default function GameCreationEnvironnementQuickAction({
 icon, 
 text
}) {
  const { t } = useTranslation();
  return (
    <div action="" className={"lightContainer gameCreationEnvironnementQuickActionElement " }>
        <img src={"/src/assets/icon/"+icon+".svg"}  alt="" />
       <span className="littleTitle">{t(text)}</span>
      
    </div>
  );
}
