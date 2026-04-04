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
  let withValueEventIds = gameData.events.withValueEvent.map(
    (event) => event.id,
  );  let eventIds = gameData.events.events.map(
    (event) => event.id,
  );
  let withValueEventAllowToUseCurrentPlayer = [];

  // ========== Check  actions
  gameData.params.tours.actions.forEach((action) => {
    // Check for missing action name
    if (!action.name?.trim(" ")) {
      alertList.push(action.id + "|action|actionNameCannotBeEmpty|alert");
    }
    // Check for missing events associated with the action
    if (action.withValue?.length === 0) {
      alertList.push(
        action.id + "|action|pleaseProvideEventsForAction|warning",
      );
    }
    // collect withValueEvent id called in actions
    // sert à vérifier que les événements à valeur dynamique qui utilisent
    // le joueur actuel comme variable sont bien appelés par une action,
    // sinon le joueur actuel peut être indéfini dans ces événements à valeur dynamique
    withValueEventAllowToUseCurrentPlayer =
      withValueEventAllowToUseCurrentPlayer.concat(
        action.withValue?.map((event) => event.id),
      );

    // parcourir les événements à valeur dynamique appelés par l'action
    action.withValue?.forEach((event) => {
      // si le withValueEvent n'existe pas

      if (!withValueEventIds.includes(event.id)) {
        alertList.push(
          action.id + "|action|callNonExistingWithValueEvent|alert",
        );
      } else {
        // on verifie si toutes les input valeurs sont remplies
        for (let key of Object.keys(event)) {
          if (
            event[key] == undefined ||
            event[key] === null ||
            event[key] === ""
          ) {
            alertList.push(
              action.id + "|action|missingValueForKey-" + key + "|alert",
            );
          }
        }
      }
    });
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
    // si il contient current player
    if (
      JSON.stringify(event).includes("currentPlayer") &&
      !event.name.includes("currentPlayer") &&
      !event.loadMessage?.includes("currentPlayer")
    ) {
      eventsWithCurrentValueInput.push(event.id);
      // si il n'est pas appellé dans une action
      if (!withValueEventAllowToUseCurrentPlayer.includes(event.id)) {
        alertList.push(
          event.id +
            "|eventWithValue|withValueEventCannotUseCurrentPlayerIfItsNotCalledInAction|alert",
        );
      } else {
        // si il est appelé dans une action alors tous ses descendants peuvent avoir la variable currentPlayer
        for (let we of event.event?.withValue || []) {
          if (!withValueEventAllowToUseCurrentPlayer.includes(we.id)) {
            withValueEventAllowToUseCurrentPlayer.push(we.id);
          }
        }
      }
    }
    // iterer dans ses with value event
    event.event.withValue?.forEach((wve) => {
      // verifier si ca existe pas
      if (!withValueEventIds.includes(wve.id)) {
        alertList.push(
          event.id + "|eventWithValue|callNonExistingWithValueEvent|alert",
        );
      } else {
        // si ca existe

        // verifier les clés
        for (let key of Object.keys(event)) {
          if (
            event[key] == undefined ||
            event[key] === null ||
            event[key] === ""
          ) {
            alertList.push(
              event.id + "|eventWithValue|missingValueForKey-" + key + "|alert",
            );
          }
        }
      }
    });
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
    // itreter dans ses with value event
    event.event.withValue?.forEach((wve) => {
      // verifier si ca existe pas
      if (!withValueEventIds.includes(wve.id)) {
        alertList.push(event.id + "|event|callNonExistingWithValueEvent|alert");
      }else{
        // si ca existe

        // verifier les clés
           // verifier les clés
        for (let key of Object.keys(event)) {
          if (
            event[key] == undefined ||
            event[key] === null ||
            event[key] === ""
          ) {
            alertList.push(
              event.id + "|event|missingValueForKey-" + key + "|alert",
            );
          }
        }
      }
    });
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
    if (demon.events.some((eventId) => !eventIds.includes(eventId))) {
      alertList.push(demon.id + "|demon|demonCallNonExistingEvent|alert");
    }
  });
 
  return alertList;
}
