 
import DefaultCard from "../DefaultCard/DefaultCard";
import {sortCardsKeyInOrder} from "../../helpers/cards.js";
import CustomCard from "../CustomCard/CustomCard"; 
import "./style.css";
export default function CardListReadOnly({ 
  cards,
  cardParams,
}) { 
  if (!cards) return <div>{t("noCardInThisDeck")}</div>;

  return (
    <>
     
        <div className="cardListReadOnly">
          {sortCardsKeyInOrder(cards).map((key) => {
            const card = cards[key];
           
 
            if (card.type == "french_standard") {
              return (
                <DefaultCard
                  card={card}
                  classAdded=" s40"
                  key={key} 
                  dataKey={key}  

                > 
                </DefaultCard>
              );
            }
            // resize radius of custom card to fit in the library ( library card are 78px width, but in the edition page they are 200px width, so we need to resize the radius to fit the new size )
            return (
              <CustomCard
                action={() => {
                  setCurrentCard(card);
                }}
                key={key}
                card={card}
                radius={cardParams?.radius ? cardParams.radius * 40 : 0}
                aspectRatio={cardParams?.ratio??"0.67/1"}
                hoverable={false}   
              > 
              </CustomCard>
            );
          })}
        </div>   
    </>
  );
}
