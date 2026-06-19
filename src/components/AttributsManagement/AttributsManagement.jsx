import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import Input from "../Input/Input";
import TitleContainer from "../TitleContainer/TitleContainer";
import { t } from "i18next"; 
import "./style.css";
export default function AttributsManagement({
    attributs,
    //function that will update the attributs in the parent component, 
    // it takes the new attributs as a parameter (attributs)=>
    updateAttributs,
    cards,
    // function that will update the cards in the parent component,
    // it takes the new cards as a parameter (cards)=>
    updateCards
}) {
  return (
    <div className="basicContainer attributsManager">
      <div className="row rowOfAttributsHeader">
        <TitleContainer
          title="attributsOfCards"
          type="h2"
          description="renderingOfCardDescription"
        ></TitleContainer>
        <Button
          icon="add-white"
          text="addAttribut"
          type="violetButton"
          action={() => {
            let addedAttributs = attributs ?? {};

            const newKey = `new_attribut_${Date.now()}`;
            const updatedAttributs = { ...addedAttributs, [newKey]: "" };
            updateAttributs(updatedAttributs);
          }}
        ></Button>
      </div>
      {attributs &&
        Object.keys(attributs).filter(attributKey => attributKey !== "symbol").map((attributKey, key) => (
          <div className="rowAttribut row">
            <Icon
              name="close"
              callback={() => {
                if (
                  window.confirm(t("areYouSureToRemoveThisAttributsToAllCArds"))
                ) {
                  const newAttributs = {
                    ...(attributs ?? {}),
                  };
                  if (attributKey in newAttributs) {
                    delete newAttributs[attributKey];
                  }
                  let newAssetCards = { ...cards };

                  for (let cardKey of Object.keys(newAssetCards)) {
                    let card = newAssetCards[cardKey];
                    if (
                      card &&
                      card.addedAttributs &&
                      attributKey in card.addedAttributs
                    ) {
                      delete card.addedAttributs[attributKey];
                    }
                  }
                  updateAttributs(newAttributs);
                  updateCards(newAssetCards);
                }
              }}
            ></Icon>
            {/* ===========Clé======= */}
            <Input
              title="attributKey"
              defaultValue={attributKey=="temp_remaining_name_5456458541"?"":attributKey}
              pathInObject={
                attributKey ? "addedAttributs." + attributKey : null
              }
              onChangeFunction={(path, value) => {
                if (value){  
                value = value.replaceAll(" ", "_");
                value = value.replaceAll("temp_remaining_name_5456458541", "");

                value = value.toLowerCase();
                }else{
                  value ="temp_remaining_name_5456458541"
                }
                const newAttributs = {
                  ...(attributs ?? {}),
                };
                const existingValue =
                  attributs?.[attributKey] ?? "";
                newAttributs[value] = existingValue;
                if (attributKey in newAttributs) {
                  delete newAttributs[attributKey];
                }
                let newAssetCards = { ...cards };

                for (let cardKey of Object.keys(newAssetCards)) {
                  let card = newAssetCards[cardKey];
                  if (card && card.addedAttributs?.[attributKey]) {
                    card.addedAttributs[value] = String(
                      card.addedAttributs[attributKey],
                    );
                    delete card.addedAttributs[attributKey];
                  }
                }
                updateAttributs(newAttributs);
                updateCards(newAssetCards);
              }}
            />
           
          </div>
        ))}
    </div>
  );
}
