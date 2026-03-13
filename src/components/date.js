import { useTranslation } from "react-i18next";

export function formatSmartDate(dateString) {
  const { t } = useTranslation(); 
  const date = new Date(dateString); 
  // Sécurité absolue
  if (isNaN(date.getTime())) {
    return "DATE INVALID"; // ou "Date invalide"
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (!Number.isFinite(diffInSeconds)) {
    return "NUMBER IS INFIITE";
  }

  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (Math.abs(diffInDays) >= 30) {
    return (
      t("lastEditIs") + " " + new Intl.DateTimeFormat("fr-FR").format(date)
    );
  }

  const rtf = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });

  if (Math.abs(diffInDays) >= 1) {
    return rtf.format(-diffInDays, "day");
  }

  const diffInHours = Math.floor(diffInSeconds / 3600);
  if (Math.abs(diffInHours) >= 1) {
    return rtf.format(-diffInHours, "hour");
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  return rtf.format(-diffInMinutes, "minute");
}
