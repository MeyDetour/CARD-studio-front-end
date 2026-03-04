export const allElements = {
  "Conditions préfaites": [
    {
      name: "allPlayersHasPlayed/endOfTour",
      hasChildren: false,
      types: ["condition","schemaCreation"], 
    },
  ],
  Actions: [
    {
      name: "win",
      hasChildren: false,
    },
    { name: "lose" },
    { name: "changeManche" },
    { name: "endOfTour" },
    { name: "removeAllAtachedEventsForTour" },
    { name: "updateGlobalValue" },
    { name: "changeStartingPlayer" },
    { name: "shuffle" },
    { name: "french-card-verify-straight" },
    { name: "french-card-verify-royal-straight" },
    { name: "french-card-verify-straight-flush" },
    { name: "french-card-verify-four-of-a-kind" },
    { name: "french-card-verify-full-house" },
    { name: "french-card-verify-flush" },
    { name: "french-card-verify-three-of-a-kind" },
    { name: "french-card-verify-two-pair" },
    { name: "french-card-verify-one-pair" },
    { name: "french-card-verify-high-card" },
  ],
  give: [],
  variables: [],
  trigger: [
      {
      name: "trigger-condition",
      types: ["schemaCreation"], 
    }, {
      name: "startOfGame",
      description:"",
      types: ["schemaCreation"], 
    },{
      name: "eachStartOfManche",
      types: ["schemaCreation"], 
    },{
      name: "onChangeTour",
      types: ["schemaCreation"], 
    },{
      name: "whenPlayerStatisfyCondition",
      types: ["schemaCreation"], 
    },{
      name: "whenPlayerStatisfyCondition",
      types: ["schemaCreation"], 
    }
  ],
  logicalOperation: [
    {
      name: "operation-condition",
      types: ["condition"], 
    },  {
      name: "operation-comparaison",
      types: ["condition"], 
    },{
      name: "operation-expression",
      types: ["condition"], 
    }
  ],
};

export const typePlayerChoices = [
  "currentPlayer",
  "allPlayersInGame",
  "randomPlayers",
  "specificPlayers",
  "definedPlayer",
];
