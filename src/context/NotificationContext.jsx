import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [warnnig, setWarning] = useState(null);
  const [actionOnYes, setActionOnYes] = useState(null);

  const { t } = useTranslation();
  function resetWArning() {
    setWarning(null);
    setActionOnYes(null);
  }
  return (
    <NotificationContext.Provider value={{ setWarning, setActionOnYes }}>
      {warnnig && actionOnYes && actionOnNO && (
        <div>
          <p>{t(warnnig)}</p>
          <Button text="yes" action={actionOnYes} />
          <Button text="no" action={resetWArning} />
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
}
export function useNotificationContext() {
  return useContext(NotificationContext);
}
