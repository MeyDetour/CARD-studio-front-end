import "./style.css";
import { useEffect, useState } from "react";
import Input from "../../../../../../components/input/Input.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Icon from "../../../../../../components/Icon/Icon.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import InputSelect from "../../../../../../components/inputSelect/InputSelect.jsx";
import SubNavigationBar from "../../../../../../components/SubNavigationBar/SubNavigationBar.jsx";
import Button from "../../../../../../components/Button/Button.jsx";
export default function VariableSubpage({
  globalValue,
  playerGlobalValue,
  updateGameValue,
  updateGameValueArray,
}) {
  const { t } = useTranslation();

  const [subPage, setSubpage] = useState("globalValue");
  const [editedObject, setEditedObject] = useState({});

  const currentData =
    subPage === "globalValue" ? globalValue : playerGlobalValue;
  const currentKey =
    subPage === "globalValue" ? "globalValue" : "playerGlobalValue";

  function save() {
    let newCurrentData = { ...currentData };
    let currentElement = { ...newCurrentData[editedObject.oldName] };

    if (editedObject.name !== editedObject.oldName) {
      delete newCurrentData[editedObject.oldName];
    }

    newCurrentData[editedObject.name] = currentElement;
    setEditedObject(null);
    updateGameValue(currentKey, newCurrentData);
  }
  useEffect(() => {
    setEditedObject(null);
  }, [subPage]);
 

  return (
    <div className={" globalValuesubPageOfdemonsAndDeclencheurSubpage"}>
      <SubNavigationBar
        buttons={{
          globalValue: () => {
            setSubpage("globalValue");
          },
          playerGlobalValue: () => {
            setSubpage("playerGlobalValue");
          },
        }}
        page={subPage}
      />

      <TitleContainer
        title={"globalValue"}
        description={"globalValueDescription"}
      ></TitleContainer>
      {currentData &&
        Object.keys(currentData)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => {
            const isEditing = editedObject && key === editedObject.oldName;
            const item = currentData[key];
            return isEditing ? (
              <div key={key} className="basicContainer globalValueElement">
           
                <Input
                title="name"
                  inputType="input"
                  placeholder="enterName"
                  defaultValue={editedObject.name}
                  onChangeFunction={(value) => {
                    setEditedObject((prev) => ({ ...prev, name: value }));
                  }}
                />
                <div className="row">
                 
                <InputSelect
                  title="typeOfVariable"
                  items={[
                    "cardList",
                    "list",
                    "number",
                    "string",
                    "gainObject",
                    "object",
                  ]}
                  selected={editedObject?.type ? [editedObject.type] : []}
                  closeAfterSelect={true}
                  updateValueArray={(value) => {
                    setEditedObject((prev) => ({ ...prev, type: value }));
                  }}
                />

                <Input
                  title="defaultValue"
                  inputType="input"
                  placeholder="enterValue"
                  defaultValue={editedObject.defaultValue}
                  onChangeFunction={(value) => {
                    setEditedObject((prev) => ({
                      ...prev,
                      defaultValue: value,
                    }));
                  }}
                />
                </div>

                <Button text={"save"} type="violetButton" action={save}> 
                </Button>
              </div>
            ) : (
              <div key={key} className="basicContainer globalValueElement">
                <div className="elementHeader">
                  <h3>{key}</h3>
                  <Icon
                    name="pen"
                    callback={() => {
                      setEditedObject({
                        name: key,
                        oldName: key,
                        type: item.type,
                        defaultValue: item.defaultValue,
                      });
                    }}
                  />
                </div>

                <p>Type : {item.type}</p>
                <p>default value : {item.defaultValue ?? "Aucune"}</p>
              </div>
            );
          })}
    </div>
  );
}
