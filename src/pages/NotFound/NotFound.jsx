// CSS
import "./style.css";

// External libraries
import { useTranslation } from "react-i18next";

// Components
import Button from "../../components/Button/Button.jsx";
export default function NotFound() { 
  const { t } = useTranslation();
  
  return (
    <div className="notFoundPage"> 
      <img src="/./assets/images/spooky-404.png"></img>
      <p>{ t("pageNotFound")}</p>
      <Button to="/" type="violetButton" text={"backToHome"}></Button>
    </div>
  );
}
