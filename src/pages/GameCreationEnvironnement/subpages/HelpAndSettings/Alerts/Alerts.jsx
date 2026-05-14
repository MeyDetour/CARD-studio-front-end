// External libraries
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotificationContext } from "../../../../../context/NotificationContext.jsx";

// Components
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer.jsx";
import Separator from "../../../../../components/Separator/Separator.jsx";
import DetailParagraphe from "../../../../../components/DetailParagraphe/DetailParagraphe.jsx";
export default function Alerts() {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  return (
    <>
      {alertList.length === 0 ? (
        <span>{t("noAlerts")}</span>
      ) : (
        <div className="alertsList wrapper">
          {alertList.map((alert, index) => (
            <div
              key={index}
              className={`${
                alert.split("|")[3] === "warning"
                  ? "basicWarningContainer"
                  : alert.split("|")[3] === "alert"
                    ? "basicRedContainer"
                    : ""
              } basicContainer`}
            >
              {" "}
              <span>
                <b>{alert.split("|")[1]}</b>
              </span>{" "}
              <span>Id : {alert.split("|")[0]}</span>
              <p>{t(alert.split("|")[2])}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
