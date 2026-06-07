export function applyDefaultGameSettings(game) {
    const game2 = {...game};
  if (!game2) {
    game2 = {};
  }

  game2.isPublic = true;

  game2.params = {
    globalGame: {
      maxPlayers: 5,
      minPlayers: 2,
      soloMode: false,
      playersCanJoin: true,
      allowSpectator: true,
    },
    manches:{
      activation: true,
      maxTour: 0,
      sens: "incrementation",

    },
    tours: {
      activation: true,
      maxTour: 0,
      sens: "incrementation",
      firstPlayer: "",
      firstPlayerValue: "",
      firstPlayerExpression: "",
      startNumber: "",
      timerActivation: false,
      duration: 0,
      actionOnlyAtPlayerTour: false,
      actions: [],
    },
    roles: {
      activation: true,
    },
    gains: {
      activation: true,
    },
    rendering: {
      game: {
        displayHandDeck: true,
        displayMiddleCards: false,
        displayCountAdversaryHandDeck: false,
        displayStatistics: false,
        displayChat: true,
        displayHistory: true,
        displayTimer: false,
      },
      playerHand: {
        overlapping: false,
        template: "",
      },
      middleCards: {
        template: "",
      },
    },

    cards: {
      radius: 0,
      ratio: 0,
      ratioValue: 0,
      assetsCardsTemplate: "6a1b23321d4b16a1b23321d4b2",
      addedAttributs: {},
      hand: {
        activation: true,
        renderAllHandCards: false,
      },
      deck: {
        activation: true,
        renderTheNextDeckCard: false,
      },
      discard: {
        activation: true,
        renderTheLastDiscardedCard: false,
        displayInTheMiddle: false,
      },
    },
  };
  game2.globalValue = {};
  game2.globalValueStatic = {};
  game2.playerGlobalValue = {};
  game2.events = {
    events: [],
    triggers: [],
    win: {
      applyOnAllPlayers: true,
      manyPlayersCanBeWinner: false,
      condition: null,
      allElementOfBoucleMustSatisyCondition: null,
      displayPoints: {
        activation: false,
        pointsToDisplayFor: "",
        elementToDisplay: "",
      },
    },
  };
  game2.assets = {
    roles: [],
    gains: [],
    cards: {},
  };
  return game2
}
