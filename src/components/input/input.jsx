import { useTranslation } from "react-i18next";
import "./style.css";
import { Link } from "react-router";

export default function Input({
  title,
  description="",
  type = "",
  placeholder="",
  inputType = "input",
  defaultValue
}) {
  const { t } = useTranslation();


if (inputType === "toggle"){
  return (
    <div className="inputRow">
        <TitleSecondContainer
        title={title}
        description={description}/> 

      <label class="switch">
        <input type="checkbox" checked={defaultValue}/>
        <span class="slider round"></span>
      </label>
    </div>
  )
}

  return (
    <div className={"input " + type}>
      <span className="normalText">{t(title)}</span>
      {(() => {
        switch (inputType) {
          case "input":
            return <input type="text" placeholder={t(placeholder)} />;

          case "textarea":
            return (
              <textarea id="story" name="story" rows="5" cols="33">
                {t(placeholder)}
              </textarea>
            );
        
        }
      })()}
    </div>
  );
}
