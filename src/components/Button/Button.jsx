import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";

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
          {icon && (
            <img
              className={"icon"}
              src={"/src/assets/icon/" + icon + ".svg"}
              alt=""
            />
          )}
          {iconHover && (
            <img
              className={"iconHover"}
              src={"/src/assets/icon/" + icon}
              alt=""
            />
          )}
          <span>{t(text)}</span>
        </Link>
      )}
      {action && (
        <button onClick={clickable?  action : null} className={"button " + type}>
          {icon && (
            <img
              className={"icon"}
              src={"/src/assets/icon/" + icon + ".svg"}
              alt=""
            />
          )}
          {iconHover && (
            <img
              className={"iconHover"}
              src={"/src/assets/icon/" + icon}
              alt=""
            />
          )}
          <span>{t(text)}</span>
        </button>
      )}
    </>
  );
}
