import { useTranslation } from "react-i18next";
import "./style.css";
import Input from "../../input/Input.jsx";
import { useNotificationContext } from "../../../context/NotificationContext.jsx";
import Alert from "../../Alert/Alert.jsx";
import { useGameContext } from "../../../context/GameContext.jsx";
import Button from "../../Button/Button.jsx";

/*
Render a card for an event that requires input values. It displays 
the event's name and renders input fields for each required key 
in the withValueEventKeys array. When the card is clicked, it 
executes the provided action function.

@param {function} action - Function to execute on card click
@param {object} withValueEventInputs - Object containing the current input values for the event it contains {id,inputBool,inputNumber...}
@param {object} withValueEvent - The event object containing details about the event, its structure should be {name,description,event{for,from...}}
@param {boolean} isSelected - Indicates if the card is currently selected
@param {string} alertMessage - Message to display in an alert, if any
@param {string} className - Additional CSS class for styling
@param {function} modifyKeyValue - Function to modify the value of a specific key in the withValueEventInputs object
@param {array} withValueEventKeys - Array of keys that are required for the withValueEvent
@param {array} suggestions - Array of suggestions for input values, if applicable

USED : EventSubpage.jsx
*/

export default function WithValueEventCard({
  action,
  withValueEventInputs = {},
  withValueEvent,
  isSelected = false,
  alertMessage,
  className = "",
  modifyKeyValue,
  withValueEventKeys,
  suggestions,
  actionOnRemove,
  children
}) {
  const { t } = useTranslation();
  const { alertList } = useNotificationContext();
  const { setCurrentEvent, setCurrentSubpageOfEvents } = useGameContext();
  if (!withValueEvent) return;

  return (
    <div
      onClick={action}
      className={`eventCard ${isSelected ? "Selected" : ""} basicContainer ${className}`}
    >

      {children}
      {alertMessage && <Alert message={alertMessage} alertList={alertList} />}
      <h2>{withValueEvent.name ? withValueEvent.name : "No name"}</h2>
      {withValueEventKeys.map((necessitedKey, key) => (
        <div key={key}>
          <span>{necessitedKey} :</span>
          <Input
            defaultValue={withValueEventInputs[necessitedKey] ?? ""}
            pathInObject={necessitedKey}
            suggestions={suggestions}
            onChangeFunction={(path, value) => {
              modifyKeyValue(path, value);
            }}
          />
        </div>
      ))}
      {withValueEvent && (
        <Button action={actionOnRemove} type="redButton" text="remove"></Button>
      )}
    </div>
  );
}
