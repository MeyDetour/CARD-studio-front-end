 
import "./style.css";
import Button from "../../components/Button/Button.jsx"; 
import { useTranslation } from "react-i18next";  
export default function NotFound() { 
  const { t } = useTranslation();
  
  return (
    <div className="notFoundPage"> 
      <img src="/src/assets/images/spooky-404.png"></img>
      <p>{ t("pageNotFound")}</p>
      <Button to="/" type="violetButton" text={"backToHome"}></Button>
    </div>
  );
}
