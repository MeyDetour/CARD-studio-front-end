export function loadAlertListFormGame(gameData) {
  console.log("loads alerts");
  console.log(gameData);
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

  // Check for missing event name
  gameData.events.events.forEach((event) => {
    if (!event.name  ||  !event.name.trim(" ")) {
      alertList.push(event.id + "|event|eventNameCannotBeEmpty|alert");
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
  // Check for missing eventWithValue name
  gameData.events.withValueEvent.forEach((event) => {
    if (!event.name.trim(" ")) {
      alertList.push(
        event.id + "|eventWithValue|eventWithValueNameCannotBeEmpty|alert",
      );
    }
  });
  console.log("alertList");
  console.log(alertList);
  return alertList;
}
