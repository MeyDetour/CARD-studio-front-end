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
  let withValueEventCalledInActions = [];

  // ========== Check  actions
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
    // collect withValueEvent id called in actions
    // sert à vérifier que les événements à valeur dynamique qui utilisent
    // le joueur actuel comme variable sont bien appelés par une action,
    // sinon le joueur actuel peut être indéfini dans ces événements à valeur dynamique
    withValueEventCalledInActions = withValueEventCalledInActions.concat(
      action.withValue.map((event) => event.id),
    );
  });

  // ============= GAME DATA
  if (!gameData.name.trim(" ")) {
    alertList.push("name|data|missingValue|alert");
  }

  // ============= Check events with value
  let eventsWithCurrentValueInput = [];
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
      alertList.push(
        event.id + "|eventWithValue|elementsGivesButNoFor|warning",
      );
    }
    if (
      JSON.stringify(event).includes("currentPlayer") &&
      !event.name.includes("currentPlayer") &&
      !event.loadMessage?.includes("currentPlayer")
    ) {
      eventsWithCurrentValueInput.push(event.id);
      if (!withValueEventCalledInActions.includes(event.id)) {
        alertList.push(
          event.id +
            "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotColledInAction|alert",
        );
      }
    }
  });

  // ============= Check for missing event name
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
    if (
      event.event.withValue?.some((withValueEvent) =>
        eventsWithCurrentValueInput.includes(withValueEvent.id),
      )
    ) {
      alertList.push(
        event.id +
          "|event|eventCannotCallWithValueEventWithCurrentPlayer|alert",
      );
    }
  });
  // ============= Check for missing demon name
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
