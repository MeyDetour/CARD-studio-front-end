import "./style.css";
import { useEffect, useState } from "react";
import Button from "../../../../../../components/Button/Button.jsx";
import DemonCard from "../../../../../../components/Cards/DemonCard/DemonCard.jsx";
import { useTranslation } from "react-i18next";
import TitleContainer from "../../../../../../components/TitleContainer/TitleContainer.jsx";
import Input from "../../../../../../components/input/Input.jsx";
import { useGameContext } from "../../../../../../context/GameContext.jsx";
import {
  updateElementValue,
  updateValueArray,
} from "../../../../../../helpers/objectManagement.js";
import Alert from "../../../../../../components/Alert/Alert.jsx";
import { useNotificationContext } from "../../../../../../context/NotificationContext.jsx";
import EventCard from "../../../../../../components/Cards/EventCard/EventCard.jsx";

export default function DemonSubpage({
  demons,
  events,
  updateGameValue,
  updateGameValueArray,
}) {
  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  const {
    currentDemon,
    setCurrentDemon,
    setCurrentEvent,
    setCurrentSubpageOfEvents,
  } = useGameContext();
  const { alertList } = useNotificationContext();
   const { t } = useTranslation(); 

  if (!demons) return;

  useEffect(() => {
    if (demons && !currentDemon) {
      setCurrentDemon(demons[0]);
    }
  }, [demons]);

  useEffect(() => {
    if (currentDemon) updateGameValueArray("events.demons", currentDemon);
  }, [currentDemon]);
  return (
    <div className={" demonsubPageOfdemonsAndDeclencheurSubpage"}>
      <div className="left">
        <div className="headerEvent">
          <h2>{t("demons")}</h2>
          <Button
            text={"new"}
            icon={"add-white"}
            type="grey"
            action={() =>
              updateGameValueArray(
                "events.demons",
                {
                  id: Date.now(),
                  condition: "",
                  name: "",
                  events: [],
                },
                "new",
              )
            }
          />
        </div>
        <div className="wrapperdemons">
          {demons &&
            demons.map((demon, index) => (
              <DemonCard
                key={index}
                alertMessage={demon.id + "|demon|"}
                action={() => setCurrentDemon(demon)}
                demon={demon}
                isSelected={currentDemon && demon == currentDemon}
              />
            ))}
        </div>
      </div>

      <div className="right">
        <div className="headerRight">
          <TitleContainer title="demons" description="eventDescription" />
          {playerHasEdit && currentDemon && (
            <Button
              text="save"
              icon="save-white"
              type="violetButton"
              action={() => save(currentDemon)}
            />
          )}
        </div>
 
        {currentDemon ? (
          <>
            <div className="basicContainer">
              <Alert
                alertList={alertList}
                message={
                  currentDemon.id + "|demon|demonNameCannotBeEmpty|alert"
                }
              ></Alert>
              <TitleContainer
                title="demonConfigurationTitle"
                description="demonConfigurationDescription"
              />
              <Input
                title="demonNameLabel"
                defaultValue={currentDemon.name}
                pathInObject="name"
                onChangeFunction={(path, value) =>
                  setCurrentDemon(updateElementValue(path, currentDemon, value))
                }
              />
            </div>

            <div className="basicContainer">
              <Alert
                alertList={alertList}
                message={
                  currentDemon.id + "|demon|demonConditionMustNotBeEmpty|alert"
                }
              ></Alert>

              <Input
                title="condition"
                description="condition"
                defaultValue={currentDemon.condition}
                pathInObject="condition"
                onChangeFunction={(path, value) =>
                  setCurrentDemon(updateElementValue(path, currentDemon, value))
                }
              />
            </div>

            <div className="basicContainer eventAssociatedSection">
              <Alert
                alertList={alertList}
                message={
                  currentDemon.id + "|demon|demonEventsMustNotBeEmpty|alert"
                }
              ></Alert>

              <TitleContainer
                title="events"
                description="demon-event-description"
              />
                 {events && events.length === 0 && (
                          <span className="normalText">{t("noEventInGame")}</span>
                        )}
              <div className="wrapperSelection">
              
                  
                    {events &&
                      events.map((event, index) => (
                        <EventCard
                          alertMessage={event.id + "|event|"}
                          key={index}
                          action={() => {
                            setCurrentDemon(
                              updateValueArray(
                                "events",
                                currentDemon,
                                event.id,
                              ),
                            );
                            setOpenPanelToAddEvent(false);
                          }}
                          event={event}
                          isSelected={event.id && currentDemon.events.includes(event.id)}
                        />
                    ))}

                  
           
              </div>
            </div>
            <div className="basicContainer basicRedContainer rewardsManagementSection">
              <TitleContainer
                title={"deleteDemon"}
                type="h2"
                description={"youDeleteDemonWithoutSave"}
              />

              <Button
                text={"delete"}
                action={async () => {
                  if (confirm(t("doYouRealyWantToDeleteDemon"))) {
                    updateGameValueArray(
                      "events.demons",
                      currentDemon,
                      "delete",
                    );
                    setCurrentDemon(null);
                  }
                }}
              ></Button>
            </div>
          </>
        ) : (
          <span>{t("noDemonSelected")}</span>
        )}
        {/*Declencheurs : listes les elements qui l'appellent*/}
      </div>
    </div>
  );
}
