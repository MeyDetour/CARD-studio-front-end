import { useTranslation } from "react-i18next";
export default function WhenEventTriggeredBlock({ element }) {
  const { t } = useTranslation();
  return (
    <>
      <div 
        className={"elementInExpressionBuilder trigger "  }
      >
        <span>{t("when-event-triggered")}</span>
      </div>
    </>
  );
}
