import { useTranslation } from "react-i18next";
import "./style.css"; 

export default function StatElement({
 icon,
 number,
 className = "",
 text
}) {
  const { t } = useTranslation();
  return (
    <div action="" className={"statElement "+className }>
        <img src={"/src/assets/icon/"+icon+".svg"}  alt="" />
        <div >
          <span>{number}</span>  <span>{t(text)}</span>
        </div>
    
      
    </div>
  );
}
