import { useTranslation } from "react-i18next";
import "./style.css";

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div className="loader">
      <img src="/CARDStudio.svg"></img>
      <div className="loader-shadow"></div>
      
    </div>
  );
}
