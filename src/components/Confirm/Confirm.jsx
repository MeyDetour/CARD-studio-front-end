import Button from "../Button/Button";
import "./style.css";
import { useTranslation } from "react-i18next";

export default function Confirm({ children, actionOnCancel, actionOnConfirm }) {
  const { t } = useTranslation();
  return (
    <div className="confirmContainer">
      <div className="confirmContent">
        <div className="topContent">{children}</div>
        <div className="buttonsContainer">
          <Button
            type="greyButton"
            text={t("cancel")}
            action={actionOnCancel}
          />
          <Button
            type="redButton"
            text={t("confirm")}
            action={actionOnConfirm}
          />
        </div>
      </div>
    </div>
  );
}
