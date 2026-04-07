import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import { set } from "react-hook-form";
import { useState } from "react";
import { allElements } from "./elements.js";
import Icon from "../../Icon/Icon.jsx";
export default function ChoicePanel({
  context,
  globalstructure,  addToStructure ,updateBlock
}) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(""); 
  const [currentValue, setCurrentValue] = useState(""); 
const [isChoicePanelOpen, setIsChoicePanelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Conditions préfaites");
 
  return (
    <div className="choicePanelContainer">
   {  isChoicePanelOpen ? 
        <div className="choicePanel">
          <div className="headerAndSearch">
              <SearchBar callback={(value)=>setSearchValue(value)} ></SearchBar>
            <Icon callback={()=>setIsChoicePanelOpen(false)} name="close"></Icon>
          </div>
        
          <div className="choiceContainer">
            <div className="choiceCategories">
              {Object.keys(allElements).map((category) => {

                // if no element in this category match the search, skip it
                if(allElements[category].filter((element)=>t(element.name).includes(searchValue)).length===0){
                  return null;
                }
                // if the element types do not include the context, skip it
                if(allElements[category].filter((element)=>element.types?.includes(context)).length===0){
                  return null;
                }
                return  <div
                  className={"category " + (selectedCategory === category ? " selected" : "")}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span> {t(category)}</span>
                </div>
             })}
            </div>
            <div className="choiceOfTheCategories">
                {
                  allElements[selectedCategory]?.map((element)=>(
                    t(element.name).includes(searchValue) && element.types?.includes(context) &&
                    <div onClick={()=>{addToStructure(element);setIsChoicePanelOpen(false)}} className="element">
                      <span>> {t(element.name)}</span>
                    </div>
                  ))
                }
            </div>
          </div>
        </div> : 
       <div className="add" onClick={()=>setIsChoicePanelOpen(true)}>
                   <Icon name="add"></Icon>
                 </div>
}
    </div>
  );
}
