import { useMemo } from "react";

export const useDynamicEntitySuggestions = (
  globalValues, // L'objet contenant "smallBlind", "deck", etc.
  playerGlobalValues, // L'objet contenant "currentBet", "handDeck", etc.
  gains, // Pour savoir si on est dans une boucle
  filterType = null, // Optionnel : filtrer par "number", "boolean", etc.
) => {
  return useMemo(() => {
    let suggestions = [];

    if (globalValues) {
      Object.entries(globalValues).forEach(([key, data]) => {
        if (!filterType || data.type === filterType) {
          suggestions.push({
            label: `{${key}}`,
            type: data.type,
          });
        }
      });
    }
    suggestions.push({
      label: "*",
      tooltip: "all",
      types: ["number"],
      return : "null",
    });
    suggestions.push({
      label: "len(a)",
      types: ["number"],
      return :"number"
    });
    suggestions.push({
      label: "startOfGame",
      types: ["event"],
      return :"boolean"
      
    });
    suggestions.push({
      label: "onChangeTour",
      types: ["event"],
      return :"boolean"

    });
    suggestions.push({
      label: "eachStartOfManche",
      types: ["event"],
      return :"boolean"
    });
    suggestions.push({
      label: "calc(a+b)",
      tooltip: "calculTwoValue",
      types: ["number"],
      return :"number"
    });
    suggestions.push({
      label: "comp(a;isEqualNumber;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;isNotEqualNumber;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;isInferiorOrEqual;b)",
      types: ["boolean"],
      return :"boolean" 
    });
    suggestions.push({
      label: "comp(a;isSuperiorNumber;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;isInferiorNumber;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;isEqualString;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;notContain;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;contain;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;differentPlayer;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "comp(a;samePlayer;b)",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "exp(a;operation;b)",
      tooltip: "compareTwoValue",
      types: ["boolean"],
      return :"boolean"
    });
    suggestions.push({
      label: "{deck}",
      types: ["cardList"],  
      return :"array"
    });
    suggestions.push({
      label: "allPlayersHasPlayed/endOfTour",
      types: ["boolean"],
    });
    suggestions.push({
      label: "{discardDeck}",
      types: ["cardList"],
      return :"array"
    });
    suggestions.push({
      label: "{allPlayersInGame}",
      types: ["playerList"],
      return : "array"
    });
    suggestions.push({
      label: "{allPlayersWinners}",
      types: ["playerList"],
      return : "array"
    });
    suggestions.push({
      label: "{allPlayersLoosers}",
      types: ["playerList"],
      return : "array"
    });

    const playerBases = [
      "{startPlayer}",
      "getPlayer(<<position>>)",
      "{playerBoucle}",
    ];

    if (playerGlobalValues) {
      let playerBloglValuesTotal = {
        ...playerGlobalValues,
        handDeck: { types: ["cardList"], return: "array" },
        personalHandDeck: { types: ["cardList"], return: "array" },
        personalHandDiscard: { types: ["cardList"], return: "array" },
        position: { types: ["number"], return: "number" },
        hasPlayed: { types: ["boolean"], return: "boolean" },
        haswin: { types: ["boolean"], return: "boolean" },
        actions: { types: ["array"], return: "array" },
        roles: { types: ["array"], return: "array" },
      };

      playerBases.forEach((base) => {
        if (!filterType || filterType === "player") {
          suggestions.push({ label: base, types: ["player"] });
        }

        Object.entries(playerBloglValuesTotal).forEach(([prop, data]) => {
          if (!filterType || data.types.includes(filterType)) {
            const cleanBase = base.replace(/[{}]/g, "");
            suggestions.push({
              label: `{${cleanBase}#${prop}}`,
              types: data.types,
            });
          }
        });
      });
    }
    const gainSuggestions = [];

    for (let s of suggestions) {
      if (s.types?.includes("player")) {
        const cleanBase = s.label.replace(/[{}]/g, "");
        for (let gain of gains) {
          gainSuggestions.push({
            label: `{${cleanBase}#gain#${gain.id}}`,
            types: s.types,
          });
        }
      }
    }

    // Fusionner les deux tableaux à la fin
    const finalSuggestions = [...suggestions, ...gainSuggestions];
 

    return finalSuggestions;
  }, [globalValues, playerGlobalValues, gains]);
};
