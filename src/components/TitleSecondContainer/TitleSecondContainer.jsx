import { useTranslation } from "react-i18next";
import "./style.css";  

export default function TitleSecondContainer({
  title,description
}) {
  const { t } = useTranslation();
  return (
    <div className="titleContainer">
      <h2>{t(title)}</h2>
      <p>{t(description)}</p>
    </div>
  );
}
