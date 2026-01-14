import { useTranslation } from "react-i18next";
import "./style.css";  

export default function TitleContainer({
  title,description
}) {
  const { t } = useTranslation();
  return (
    <div className="titleContainer">
      <h1>{t(title)}</h1>
      <p>{t(description)}</p>
    </div>
  );
}
