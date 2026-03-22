import { useMemo } from "react";

export const useDynamicEntitySuggestions = (
  globalValues, // L'objet contenant "smallBlind", "deck", etc.
  playerGlobalValues, // L'objet contenant "currentBet", "handDeck", etc.
  currentEvent, // Pour savoir si on est dans une boucle
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
    });       suggestions.push({
      label: "len(a)", 
      types: ["number"],
    });   
    suggestions.push({
      label: "startOfGame", 
      types: ["event"],
    });  suggestions.push({
      label: "onChangeTour" ,
      types: ["event"],
    });  suggestions.push({
      label: "eachStartOfManche" ,
      types: ["event"],
    });
    suggestions.push({
      label: "calc(a+b)",
      tooltip: "calculTwoValue",
      types: ["number"],
    });
    suggestions.push({
      label: "comp(a;isEqualNumber;b)",
      types: ["boolean"],
    });   suggestions.push({
      label: "comp(a;isNotEqualNumber;b)",
      types: ["boolean"],
    }); suggestions.push({
      label: "comp(a;isInferiorOrEqual;b)",
      types: ["boolean"],
    }); suggestions.push({
      label: "comp(a;isSuperiorNumber;b)",
      types: ["boolean"],
    }); suggestions.push({
      label: "comp(a;isInferiorNumber;b)",
      types: ["boolean"],
    });suggestions.push({
      label: "comp(a;isEqualString;b)",
      types: ["boolean"],
    });suggestions.push({
      label: "comp(a;notContain;b)",
      types: ["boolean"],
    });suggestions.push({
      label: "comp(a;contain;b)",
      types: ["boolean"],
    });suggestions.push({
      label: "comp(a;differentPlayer;b)",
      types: ["boolean"],
    });suggestions.push({
      label: "comp(a;samePlayer;b)",
      types: ["boolean"],
    });
    suggestions.push({
      label: "exp(a;operation;b)",
      tooltip: "compareTwoValue",
      types: ["boolean"],
    }); 
    suggestions.push({
      label: "{deck}",
      types: ["cardList"],
    });suggestions.push({
      label: "allPlayersHasPlayed/endOfTour",
      types: ["boolean"],
    });
    suggestions.push({
      label: "{discardDeck}",
      types: ["cardList"],
    });  suggestions.push({
      label: "{allPlayersInGame}",
      types: ["cardList"],
    }); suggestions.push({
      label: "{allPlayersWinners}",
      types: ["cardList"],
    }); suggestions.push({
      label: "{allPlayersLoosers}",
      types: ["cardList"],
    });

    const playerBases = [
      "{startPlayer}",
      "getPlayer(<<position>>)",
      "{playerBoucle}", 
    ];

    if (playerGlobalValues) {
      let playerBloglValuesTotal = {
        ...playerGlobalValues,
        handDeck: { types: ["cardList"] },
        personalHandDeck: { types: ["cardList"] },
        personalHandDiscard: { types: ["cardList"] },
        position: { types: ["number"] },
        hasPlayed: { types: ["boolean"] },
        haswin: { types: ["boolean"] },
        actions: { types: ["array"] },
        roles: { types: ["array"] },
      };

      playerBases.forEach((base) => {
        if (!filterType || filterType === "player") {
          suggestions.push({ label: base, type: "player" });
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

    return suggestions;
  }, [globalValues, playerGlobalValues]);
};
