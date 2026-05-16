import { useTranslation } from "react-i18next";
import "./style.css";
import Icon from "../Icon/Icon";

export default function TitleContainer({
  title,
  description,
  deactivateTitleTranslation = false,
  deactivateDescriptionTranslation = false,
  icon,
  type = "h1",
  number = null,
}) {
  const { t } = useTranslation();

  if (type == "h1") {
    return (
      <div className="titleContainer titleContainer-h1">
        <Icon name={icon}></Icon>
        <div>
          <h1>
            {number
              ? `${number}. ${deactivateTitleTranslation ? title : t(title)}`
              : deactivateTitleTranslation
                ? title
                : t(title)}
          </h1>

          <p>{deactivateDescriptionTranslation ? description : t(description)}</p>
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
              return <h1>{number ? `${number}. ${deactivateTitleTranslation ? title : t(title)}` : deactivateTitleTranslation ? title : t(title)}</h1>;
            case "h2":
              return <h2>{number ? `${number}. ${deactivateTitleTranslation ? title : t(title)}` : deactivateTitleTranslation ? title : t(title)}</h2>;
            case "h3":
              return <h3>{number ? `${number}. ${deactivateTitleTranslation ? title : t(title)}` : deactivateTitleTranslation ? title : t(title)}</h3>;
            case "normalText":
              return (
                <span className="normalText">
                  {number ? `${number}. ${deactivateTitleTranslation ? title : t(title)}` : deactivateTitleTranslation ? title : t(title)}
                </span>
              );
          }
        })()}
      </div>

      <p>{deactivateDescriptionTranslation ? description : t(description)}</p>
    </div>
  );
}
