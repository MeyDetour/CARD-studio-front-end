import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

export default function Button({
  text,
  to = null,
  action = null,
  type = "", //whiteWithBordure ,  navbar ,  violetButton , withoutBorder
  icon,
  iconHover,
  clickable=true
}) {
  const { t } = useTranslation();
  return (
    <>
      {to && (
        <Link to={to} className={"button " + type}>
          <Icon name={icon||iconHover}></Icon>
          <span>{t(text)}</span>
        </Link>
      )}
      {action && (
        <button onClick={clickable?  action : null} className={"button " + type}>
          <Icon name={icon||iconHover}></Icon>
          <span>{t(text)}</span>
        </button>
      )}
    </>
  );
}
