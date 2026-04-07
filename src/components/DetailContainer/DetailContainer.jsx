import "./style.css";
import TitleContainer from "../TitleContainer/TitleContainer";
import { useState } from "react";
import Icon from "../Icon/Icon";

export default function DetailContainer({
  children,
  title,
  description,
  className = "",
  topAlert,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details className={`basicContainer detailBasicContainer ${className}`}>
      <summary onClick={() => setIsOpen(!isOpen)}>
        {topAlert && <div className="topAlert">{topAlert}</div>}
        <TitleContainer title={title} description={description}>
      
        </TitleContainer>
        <Icon name="bottom_arrow" className={isOpen ? "iconRotate" : ""}></Icon>
      </summary>
      <div className="detailContent">{children}</div>
    </details>
  );
}
