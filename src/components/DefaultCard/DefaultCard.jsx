import "./style.css";
export default function DefaultCard({
  card,
  setCurrentCard=null,
  classAdded,
  isSelected,
  dataKey,
  children,
}) {
  //  { id: "1", suit: "hearts", value: "9", faceUp: true },

  if (!card) {
    return <div className={`defaultCardOfGame `}>PLEASE PROVIDE CARD</div>;
  }
  if (!card.addedAttributs) {
    return <div className={`defaultCardOfGame `}> PLEASE PROVIDE SUIT</div>;
  }
  const color =
    card.addedAttributs?.symbol === "coeur" ||
    card.addedAttributs?.symbol === "carreau"
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
  };  const getValueSymbol = (value) => {
    switch (value) {
      case 11:
        return "V";
      case 12:
        return "D";
      case 13:
        return "R"; 
      default:
        return value
    }
  };
  return (
    <div
      onClick={() => {
        if (isSelected) return;
        if (setCurrentCard)
        setCurrentCard(card);
      }}
      className={`defaultCardOfGame ${setCurrentCard ? "hoverable" : ""} ${classAdded}`}
      data-key={dataKey}
    >
      <span className="leftValue">{getValueSymbol(card.addedAttributs?.value)}</span>
      <span className={`leftSuit ${color}`}>
        {getSuitSymbol(card.addedAttributs?.symbol)}
      </span>
      <span className={`suit ${color}`}>
        {getSuitSymbol(card.addedAttributs?.symbol)}
      </span>
      <span className={`rightSuit ${color}`}>
        {getSuitSymbol(card.addedAttributs?.symbol)}
      </span>

      <span className="rightValue">{getValueSymbol(card.addedAttributs?.value)}</span>
      {children}
    </div>
  );
}
