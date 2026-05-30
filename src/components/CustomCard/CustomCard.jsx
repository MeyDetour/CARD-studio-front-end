import "./style.css";
export default function CustomCard({
  card,
  dataKey,
  radius,
  hoverable = false,
  aspectRatio="0.67/1",
  isSelected = false,
  children,
  classAdded,
  action,
}) {
  if (!card ) {
     

    return (
      <div className={`customCardContainer `} style={{aspectRatio: aspectRatio, borderRadius: (radius ?? 8) + "px"}}>
       
      </div>
    );
  } 

  // le radius est determiné visuelelment par l'utilisateur
  // dans la page management , la carte fait 200px de largeur, avec un radius de 34px
  // il faut donc que le radius soit cacluler au préalable
  // pour que le radius s'adapte bien à la taille de la carte
  // ex si on veut afficher le radius d'une carte de 50px de large
  // le radius doit etre de 34*50/200 = 8.5px ( tableau en croix )
  return (
    <div
      className={`customCardContainer `}
      onClick={(e) => {
        if (isSelected) return;
        if (hoverable && action) {
          action();
        }
      }}
    >
      <div
        className={`customCard ${hoverable ? "hoverable" : ""} ${classAdded ?? ""} ${isSelected ? "selected" : ""}`}
        style={{ borderRadius: (radius ?? 8) + "px", aspectRatio: aspectRatio }}
        data-key={dataKey ?? null}
      >
        <img draggable={false} alt={card.name ?? ""} src={card.url} />
      </div>
      {children}
    </div>
  );
}
