import { useTranslation } from "react-i18next";
import "./style.css";
import Icon from "../Icon/Icon";
import { useState } from "react";
export default function VerticalInputSelect({ selected, items, setSelected }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (!items)return

  if (isOpen && items.length > 0) {
    return (
      <div className={"verticalInputSelect "}>
        <div className="choices">
          {items.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={"verticalInputSelect "}>
      <span onClick={() => setIsOpen(true)}>{selected}</span>
    </div>
  );
}
