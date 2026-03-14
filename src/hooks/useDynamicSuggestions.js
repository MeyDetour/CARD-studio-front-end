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
      type: "number",
    });
    suggestions.push({
      label: "calc(a;operation;b)",
      tooltip: "calculTwoValue",
      type: "number",
    });
    suggestions.push({
      label: "exp(a;operation;b)",
      tooltip: "compareTwoValue",
      type: "boolean",
    });
    suggestions.push({
      label: "<<(a;operation;b)>>",
      tooltip: "textualValue",
      type: "other",
    }); suggestions.push({
      label: "<<;operation;b)>>",
      tooltip: "textualValue",
      type: "other",
    });

    const playerBases = ["{startPlayer}", "getPlayer(...)", "{playerBoucle}"];

    if (playerGlobalValues) {
      let playerBloglValuesTotal = {
        ...playerGlobalValues,
        handDeck: { type: "cardList" },
        personalHandDeck: { type: "cardList" },
        personalHandDiscard: { type: "cardList" },
        hasPlayed: { type: "boolean" },
        haswin: { type: "boolean" },
        actions: { type: "array" },
        roles: { type: "array" },
      };

      playerBases.forEach((base) => {
        if (!filterType || filterType === "player") {
          suggestions.push({ label: base, type: "player" });
        }

        Object.entries(playerBloglValuesTotal).forEach(([prop, data]) => {
          if (!filterType || data.type === filterType) {
            const cleanBase = base.replace(/[{}]/g, "");
            suggestions.push({
              label: `{${cleanBase}#${prop}}`,
              type: data.type,
            });
          }
        });
      });
    }

    return suggestions;
  }, [globalValues, playerGlobalValues]);
};
