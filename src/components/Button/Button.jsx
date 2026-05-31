import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import { useState } from "react";

export default function Button({
  text,
  to = null,
  action = null,
  type = "", //whiteWithBordure ,  navbar ,  violetButton , withoutBorder
  icon,
  iconHover,
  clickable = true,
  addActionConfirmation = false,
}) {
  const { t } = useTranslation();
  const [confirmation, setConfirmation] = useState(false);
  return (
    <>
      {to && (
        <Link to={to} className={"button " + type}>
          <Icon name={icon || iconHover}></Icon>
          <span>{t(text)}</span>
        </Link>
      )}
      {action && (
        <button
          onClick={
            clickable
              ? () => {
                  if (!confirmation) {
                    action();
                  }
                  if (addActionConfirmation) {
                    setConfirmation(true);
                    setTimeout(() => {
                      setConfirmation(false);
                    }, 2000);
                  }
                }
              : null
          }
          className={
            "button " + type + (confirmation ? " greenButtonConfirm" : "")
          }
        >
          <Icon name={confirmation ? "check-white" : icon || iconHover}></Icon>
          <span>{confirmation ? t("actionExecuted") : t(text)}</span>
        </button>
      )}
    </>
  );
}
