import { useTranslation } from "react-i18next";
import "./style.css";
import Icon from "../Icon/Icon";

export default function TitleContainer({
  title,
  description,
  icon,
  type = "h1",
}) {
  const { t } = useTranslation();

  if (type == "h1") {
    return (
      <div className="titleContainer titleContainer-h1"> 
        <Icon name={icon}></Icon>
        <div>
          <h1>{t(title)}</h1>

          <p>{t(description)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="titleContainer">
      <div>
        <Icon name={icon}></Icon>

        {(() => {
          switch (type) {
            case "h1":
              return <h1>{t(title)}</h1>;
            case "h2":
              return <h2>{t(title)}</h2>;
            case "h3":
              return <h3>{t(title)}</h3>;
            case "normalText":
              return <span className="normalText">{t(title)}</span>;
          }
        })()}
      </div>

      <p>{t(description)}</p>
    </div>
  );
}
