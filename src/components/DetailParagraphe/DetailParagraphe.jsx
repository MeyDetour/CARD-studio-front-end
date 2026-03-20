import "./style.css";
import TitleContainer from "../TitleContainer/TitleContainer";
import { useState } from "react";
import Icon from "../Icon/Icon";

export default function DetailParagraphe({ children, title ,description,className=""}) {
  const [isOpen, setIsOpen] = useState(false);
    return (
    <details className={`  detailParagraphe ${className}`}>
      <summary onClick={()=>setIsOpen(!isOpen)}>
        <TitleContainer title={title} description={description} type="h3"> </TitleContainer>
    <Icon name="bottom_arrow" className={isOpen? "iconRotate":""}></Icon>  
      </summary>
      <div className="detailContent">
      {children}
      </div>
    </details>
  );
}
