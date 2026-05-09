import "./style.css";
import { useState } from "react";

// Contexts
import { useGameContext } from "../../context/GameContext";

// Hooks
import { useApi } from "../../hooks/useApi";

// Components
import Button from "../Button/Button";
export default function ImageUploadFileContainer({ buttonText, actionOnFileChange }) {
 
  return (  <div className="imageUploadContainer">
                <Button
                  icon="star"
                  action={() => {}}
                  type="whiteWithBordure"
                  text={buttonText}
                /> 
                <input
                  type="file"
                  onChange={actionOnFileChange}
                />
              </div>
  );
}
