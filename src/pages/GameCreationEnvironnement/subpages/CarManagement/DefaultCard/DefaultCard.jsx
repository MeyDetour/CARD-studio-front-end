import "./style.css";
export default function DefaultCard({ card, setCurrentCard }) {
  //  { id: "1", suit: "hearts", value: "9", faceUp: true },

  if (!card) {
    return "PLEASE PROVIDE CARD";
  }
  if (!card.value || !card.addedAttributs) {
    return "PLEASE PROVODE SUIT";
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
  let suit = getSuitSymbol(card.addedAttributs?.couleur);
  return (
    <div
      onClick={() => {
        setCurrentCard(card);
      }}
      className={`defaultCardOfGame ${setCurrentCard ? "hoverable" : ""}`}
    >
      <span className="leftValue">{card.value}</span>
      <span className={`leftSuit ${color}`}>{suit}</span>
      <span className={`suit ${color}`}>{suit}</span>
      <span className={`rightSuit ${color}`}>{suit}</span>

      <span className="rightValue">{card.value}</span>
    </div>
  );
}
