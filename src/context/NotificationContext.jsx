import { createContext, useContext, useState } from "react";
import { get } from "react-hook-form";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [errorList, setErrorList] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [canDisplayError, setCanDisplayError] = useState(true);
  function displayError(message) {
    setErrorList((prev) => [...prev, message]);
    setTimeout(() => {
      setErrorList((prev) => prev.slice(1));
    }, 5000);
  }
  function setAlerts(messages) {
    setAlertList(messages);
  }
  function setAlert(message) {
    if (get(alertList, message)) return;
    setAlertList((prev) => [...prev, message]);
  }
  function removeAlert(message) { 
    setAlertList((prev) => prev.filter((alert) => alert !== message));
  }
  function getAlerts(message) {
    return alertList.filter((alert) => alert.includes(message));
  }
  function getAlertOfType(type) {
    let result = alertList.filter((alert) => alert.split("|")[1] === type);
    return result;
  }
 
  return (
    <NotificationContext.Provider
      value={{
        displayError,
        setAlert,
        setAlerts,
        canDisplayError,setCanDisplayError,
        removeAlert,
        getAlerts,
        getAlertOfType,
        alertList,
      }}
    >
      {errorList.map((error, index) => (
        <div className="errorNotification" key={index}>{error}</div>
      ))}
      {children}
    </NotificationContext.Provider>
  );
}
export function useNotificationContext() {
  return useContext(NotificationContext);
}
