import { eventActions } from "../../data/eventActions.js";
export function loadAlertListFormGame(gameData) {
  if (
    !gameData ||
    !gameData.params.tours ||
    !gameData.params.tours ||
    !gameData.params.tours.actions ||
    !gameData.events.events ||
    !gameData.events.demons ||
    !gameData.events.withValueEvent
  ) {
    console.warn("Game data is incomplete, cannot load alerts.");
    return [];
  }
 
  let alertList = [];

  // Check  actions
  gameData.params.tours.actions.forEach((action) => {
    // Check for missing action name
    if (!action.name.trim(" ")) {
      alertList.push(action.id + "|action|actionNameCannotBeEmpty|alert");
    }
    // Check for missing events associated with the action
    if (!action.withValue.lenght == 0) {
      alertList.push(
        action.id + "|action|pleaseProvideEventsForAction|warning",
      );
    }
  });

  // Check for missing game name
  if (!gameData.name.trim(" ")) {
    alertList.push("name|data|missingValue|alert");
  }

  let eventsWithCurrentValueInput = []
 // Check for missing eventWithValue name
  gameData.events.withValueEvent.forEach((event) => {
    if (!event.name.trim(" ")) {
      alertList.push(
        event.id + "|eventWithValue|eventWithValueNameCannotBeEmpty|alert",
      );
    }
    if (event.event.from && !event.event.for) {
      alertList.push(
        event.id + "|eventWithValue|eventHaveFromElementButNoFor|warning",
      );
    }
    if (
      event.event.action &&
      !eventActions.some((action) => action.label === event.event.action)
    ) {
      alertList.push(event.id + "|eventWithValue|invalidAction|warning");
    }
       if (
      event.event.give &&
      Object.values(event.event.give).some(
        (val) => val !== 0 && val !== null && val !== "",
      ) &&
      !event.event.for
    ) {
      alertList.push(event.id + "|eventWithValue|elementsGivesButNoFor|warning");
    }
    if(JSON.stringify(event).includes('currentPlayer')){
      eventsWithCurrentValueInput.push(event.id)
    }
  }); 

  // Check for missing event name
  gameData.events.events.forEach((event) => {
    if (!event.name || !event.name.trim(" ")) {
      alertList.push(event.id + "|event|eventNameCannotBeEmpty|alert");
    }
    if (event.event.from && !event.event.for) {
      alertList.push(event.id + "|event|eventHaveFromElementButNoFor|warning");
    }
    if (
      event.event.action &&
      !eventActions.some((action) => action.label === event.event.action)
    ) {
      alertList.push(event.id + "|event|invalidAction|warning");
    } 
    if (
      event.event.give &&
      Object.values(event.event.give).some(
        (val) => val !== 0 && val !== null && val !== "",
      ) &&
      !event.event.for
    ) {
      alertList.push(event.id + "|event|elementsGivesButNoFor|warning");
    }
    if (event.event.withValue?.some((withValueEvent) =>
      eventsWithCurrentValueInput.includes(withValueEvent.id)
    )) {
      alertList.push(
        event.id + "|event|eventCannotCallWithValueEventWithCurrentPlayer|error",
      );
    }
  }); // Check for missing demon name
  gameData.events.demons.forEach((demon) => {
    if (!demon.name || !demon.name.trim(" ")) {
      alertList.push(demon.id + "|demon|demonNameCannotBeEmpty|alert");
    }
    if (!demon.condition.trim(" ")) {
      alertList.push(demon.id + "|demon|demonConditionMustNotBeEmpty|alert");
    }
    if (demon.events.length === 0) {
      alertList.push(demon.id + "|demon|demonEventsMustNotBeEmpty|warning");
    }
  });
 
  return alertList;
}
