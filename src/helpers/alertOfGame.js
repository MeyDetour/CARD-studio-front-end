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
  );
  let eventIds = gameData.events.events.map((event) => event.id);
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
  if (gameData.params.tours.actions.filter((action) => action.actionOnHand).length > 1) {
    alertList.push(
      "global|action|onlyOneActionCanBeOnHand|alert",
    );
  } if (gameData.params.tours.actions.filter((action) => action.actionOnDeck).length > 1) {
    alertList.push(
      "global|action|onlyOneActionCanBeOnDeck|alert",
    );
  } if (gameData.params.tours.actions.filter((action) => action.actionOnDiscardDeck).length > 1) {
    alertList.push(
      "global|action|onlyOneActionCanBeOnDiscardDeck|alert",
    );
  }

  // ============= GAME DATA
  if (!gameData.name.trim(" ")) {
    alertList.push("name|data|missingValue|alert");
  }

  // ============= CARDS PARAMS

  let handActivation = gameData?.params.cards.hand?.activation;
  let deckActivation = gameData?.params.cards.deck?.activation;
  let discardActivation = gameData?.params.cards.discard?.activation;
  // verify if events, with value and demons that use handDeck but hand is not activated
  // these conditions arent verifies in respective sections because we want to check all
  // the occurences of handDeck in events, withValueEvent and demons to give all the alerts
  // at once to the user

  // ============= Check events with value
  let eventsWithCurrentValueInput = [];
  gameData.events.withValueEvent.forEach((event) => {
    let eventString = JSON.stringify(event);
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
      eventString.includes("currentPlayer") &&
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
    if (
      eventString.includes("handDeck") &&
      !event.name.includes("handDeck") &&
      !event.loadMessage?.includes("handDeck") &&
      !handActivation
    )
      alertList.push(
        event.id + "|eventWithValue|callHandDeckButHandNotActivated|alert",
      );
    if (
      eventString.includes("{deck}") &&
      !event.name.includes("{deck}") &&
      !event.loadMessage?.includes("{deck}") &&
      !deckActivation
    )
      alertList.push(
        event.id + "|eventWithValue|callDeckButDeckNotActivated|alert",
      );
    if (
      eventString.includes("{discardDeck}") &&
      !event.name.includes("{discardDeck}") &&
      !event.loadMessage?.includes("{discardDeck}") &&
      !discardActivation
    )
      alertList.push(
        event.id +
          "|eventWithValue|callDiscardDeckButDiscardNotActivated|alert",
      );
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
    let eventString = JSON.stringify(event);
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

    if (
      eventString.includes("handDeck") &&
      !event.name.includes("handDeck") &&
      !event.loadMessage?.includes("handDeck") &&
      !handActivation
    ) {
      alertList.push(event.id + "|event|callHandDeckButHandNotActivated|alert");
    }
       if (
      eventString.includes("{deck}") &&
      !event.name.includes("{deck}") &&
      !event.loadMessage?.includes("{deck}") &&
      !deckActivation
    )
      alertList.push(
        event.id + "|event|callDeckButDeckNotActivated|alert",
      );
    if (
      eventString.includes("{discardDeck}") &&
      !event.name.includes("{discardDeck}") &&
      !event.loadMessage?.includes("{discardDeck}") &&
      !discardActivation
    )
      alertList.push(
        event.id +
          "|event|callDiscardDeckButDiscardNotActivated|alert",
      );
    // itreter dans ses with value event
    event.event.withValue?.forEach((wve) => {
      // verifier si ca existe pas
      if (!withValueEventIds.includes(wve.id)) {
        alertList.push(event.id + "|event|callNonExistingWithValueEvent|alert");
      } else {
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
  // ============= Check for demon
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
    if (demon.boucle && !demon.condition.includes("Boucle")) {
      alertList.push(demon.id + "|demon|demonCallBoucleButDontUseIt|alert");
    }
    if (JSON.stringify(demon).includes("handDeck") && !handActivation) {
      alertList.push(demon.id + "|demon|callHandDeckButHandNotActivated|alert");
    }
    if (JSON.stringify(demon).includes("{deck}") && !deckActivation) {
      alertList.push(demon.id + "|demon|callDeckButDeckNotActivated|alert");
    }
    if (JSON.stringify(demon).includes("{discardDeck}") && !discardActivation) {
      alertList.push(demon.id + "|demon|callDiscardDeckButDiscardNotActivated|alert");
    }
  });

  // ============= Check for cards
  Object.keys(gameData.assets.cards).forEach((cardId) => {
    const card = gameData.assets.cards[cardId];
    if (!card.type || !card.type?.trim(" ")) {
      alertList.push(card.id + "|card|cardTypeCannotBeEmpty|alert");
    }
    if (!card.name || !card.name?.trim(" ")) {
      alertList.push(card.id + "|card|cardNameMustNotBeEmpty|warning");
    }
  });

  // ============= Check for gains
  gameData.assets.gains.forEach((gain) => {
    if (!gain.name || !gain.name.trim(" ")) {
      alertList.push(gain.id + "|gain|gainNameCannotBeEmpty|alert");
    }
    if (
      gameData.assets.gains.some((g) => g.name == gain.name && g.id != gain.id)
    ) {
      alertList.push(gain.id + "|gain|gainsCannotHaveSameName|alert");
    }
  });
//console.log(alertList);
  return alertList;
}
