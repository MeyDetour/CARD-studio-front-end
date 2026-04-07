import { useTranslation } from "react-i18next"; 
export default function LoadingRestorGame() {
  const { t } = useTranslation();
  return (
    <div className="loader">
      <img src="/CARDStudio.svg"></img>
      <div className="loader-shadow"></div>
      <div className="textContainer">
      <h1>{t("restoringGame")}</h1>
      
    </div>
    </div>
  );
}
