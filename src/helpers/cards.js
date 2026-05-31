export function createNewORderForCard(cards) {
    let i = 1;
    let newCards = {...cards}
    console.log(cards);
      for (let index of sortCardsKeyInOrder(cards)) {
       
                      newCards[index].order = i;
                      i++;
                    }
                    console.log(newCards);
    return newCards;

}

export function sortCardsKeyInOrder(cards) {
    return Object.keys(cards).sort((a, b) => !cards[a].order ? -1 : !cards[b].order ? 1 : parseInt(cards[a].order) - parseInt(cards[b].order));
}