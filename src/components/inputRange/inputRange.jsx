import { useTranslation } from "react-i18next";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import TitleContainer from "../TitleContainer/TitleContainer";
export default function InputRange({
  type,
  min = 0,
  max = 100,
  minValue = 0,
  maxValue = 50,
  setMinValue,
  setMaxValue,
}) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);

  // --- Fonctions de conversion ---
  const valToPercent = (val) => ((val - min) / (max - min)) * 100;

  const percentToVal = (percent) => {
    const rawVal = min + (percent / 100) * (max - min);
    return Math.round(rawVal);
  };

  const getPercentFromEvent = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    return Math.min(Math.max(0, percent), 100);
  };

  // --- Handlers ---
  const handleMouseClick = (e) => {
    e.preventDefault();
    const percent = getPercentFromEvent(e);
    const clickedVal = percentToVal(percent);

    if (type === "double") {
      // Déterminer le côté le plus proche
      const distLeft = Math.abs(minValue - clickedVal);
      const distRight = Math.abs(maxValue - clickedVal);

      if (distLeft < distRight) {
        setMinValue(clickedVal);
        setIsDragging("left"); 
      } else {
        setMaxValue(clickedVal);
        setIsDragging("right"); 
      }
    } else {
      setMaxValue(clickedVal);
      setIsDragging("right");
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !sliderRef.current) return;

      const percent = getPercentFromEvent(e);
      const currentVal = percentToVal(percent);

      if (isDragging === "left") {
        const newVal = Math.min(currentVal, maxValue - 1);
        setMinValue(newVal);
      }

      if (isDragging === "right") {
        const newVal = Math.max(currentVal, minValue + 1);
        setMaxValue(newVal);
      }
    };
    const handleMouseUp = () => setIsDragging(null);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minValue, maxValue, min, max]);

  // Calcul des positions CSS
  const leftPos = valToPercent(minValue);
  const rightPos = valToPercent(maxValue);
  return (
    <div className={"inputRange"}>
      {/* C'est ici qu'on place le MouseDown pour capter le clic sur toute la zone */}
      <div
        className="slider"
        onMouseDown={handleMouseClick}
        ref={sliderRef}
        style={{ cursor: "pointer" }}
      >
        <span className="minLabel">{min}</span>
        <span className="maxLabel">{max}</span>

        {type !== "unique" && (
          <div
            className="selectedSlider"
            style={{
              left: leftPos + "%",
              width: rightPos - leftPos + "%",
            }}
          ></div>
        )}

        {type === "double" && (
          <div
            className="leftCursor"
            style={{ left: leftPos + "%" }}
            onMouseDown={(e) => {
              e.stopPropagation(); // On garde stopPropagation pour ne pas déclencher handleMouseClick deux fois
              setIsDragging("left");
            }}
          ></div>
        )}

        <div
          className="rightCursor"
          style={{ left: rightPos + "%" }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging("right");
          }}
        ></div>
      </div>

      {/* Les TickMarks peuvent aussi déclencher le mouvement */}
      <div className="tickMarks" onMouseDown={handleMouseClick}>
        {[...Array(101).keys()].map((index) => {
          const tickVal = percentToVal(index);
          const isColored =
            (tickVal >= minValue && tickVal <= maxValue && type !== "unique") ||
            (type === "unique" && tickVal === maxValue);
          const isActive = tickVal === minValue || tickVal === maxValue;

          return (
            <div
              key={index}
              className={`tickMark ${isActive ? "active" : ""} ${isColored ? "colored" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
