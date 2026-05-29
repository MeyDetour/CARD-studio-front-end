import "./style.css";
export default function DefaultCard({ card, setCurrentCard  , classAdded , isSelected,dataKey, children}) {
  //  { id: "1", suit: "hearts", value: "9", faceUp: true },

  if (!card) {
    return (
      <div className={`defaultCardOfGame `}>
       PLEASE PROVIDE CARD
      </div>
    );
  }
  if (!card.value || !card.addedAttributs) {
    return (
      <div className={`defaultCardOfGame `}> PLEASE PROVIDE SUIT
      </div>
    );
  }
  const color =
    card.addedAttributs?.couleur === "coeur" ||
    card.addedAttributs?.couleur === "carreau"
      ? "text-red-600"
      : "text-slate-900";

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case "coeur":
        return "♥";
      case "carreau":
        return "♦";
      case "trefle":
        return "♣";
      case "pique":
        return "♠";
      default:
        return "";
    }
  };
  return (
    <div
      onClick={() => {
    if (isSelected) return;
        setCurrentCard(card);
      }}
      className={`defaultCardOfGame ${setCurrentCard ? "hoverable" : ""} ${classAdded}`}
    data-key={dataKey}
    >
      <span className="leftValue">{card.value}</span>
      <span className={`leftSuit ${color}`}>{getSuitSymbol(card.addedAttributs?.couleur)}</span>
      <span className={`suit ${color}`}>{getSuitSymbol(card.addedAttributs?.couleur)}</span>
      <span className={`rightSuit ${color}`}>{getSuitSymbol(card.addedAttributs?.couleur)}</span>

      <span className="rightValue">{card.value}</span>
      {children}
    </div>
  );
}
