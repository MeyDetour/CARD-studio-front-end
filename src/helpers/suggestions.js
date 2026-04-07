export function getSugggestionForPlayer(playerPrefix, playerGlobalValues) {
  let suggestions = [];

  let playerBloglValuesTotal = {
    ...playerGlobalValues,
    handDeck: { types: ["cardList"] },
    position: { types: ["number"] },
    personalHandDeck: { types: ["cardList"] },
    personalHandDiscard: { types: ["cardList"] },
    hasPlayed: { types: ["boolean"] },
    haswin: { types: ["boolean"] },
    actions: { types: ["array"] },
    roles: { types: ["array"] },
  };

  Object.entries(playerBloglValuesTotal).forEach(([prop, data]) => {
    suggestions.push({
      label: `{${playerPrefix}#${prop}}`,
      types: data.types,
    });
  });

  return suggestions;
}
 
