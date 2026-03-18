import "./style.css";
import TitleContainer from "../TitleContainer/TitleContainer";
import { useState } from "react";
import Icon from "../Icon/Icon";

export default function DetailContainer({ children, title ,description}) {
  const [isOpen, setIsOpen] = useState(false);
    return (
    <details className="basicContainer detailBasicContainer">
      <summary onClick={()=>setIsOpen(!isOpen)}>
        <TitleContainer title={title} description={description}> </TitleContainer>
    <Icon name="bottom_arrow" className={isOpen? "iconRotate":""}></Icon>  
      </summary>
      {children}
    </details>
  );
}
