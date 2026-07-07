// CSS
import "./style.css";

// External libraries
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import { Mermaid } from "./Mermaid/Mermaid";
import { Legend } from "./Legend/Legend";

// Composant Mermaid corrigé

const colors = {
  trigger: {
    fill: "#ffc2c3",
    stroke: "#ff0101",
  },
  event: {
    fill: "#efb7e2",
    stroke: "#801767",
  },
  withValueEvent: {
    fill: "#cfefff",
    stroke: "#4cacdb",
  },
  action: {
    fill: "#adff83",
    stroke: "#1fc103",
  },
};

// Page principale
export default function VisualisationPage({ gameData, getEventFromIdAndType }) {
  const [subpage, setSubpage] = useState("triggers");
  if (!gameData.triggers) {
    return <p>Démons manquants</p>;
  }
  if (!gameData.events) {
    return <p>Événements manquants</p>;
  }
  if (!gameData.withValueEvents) {
    return <p>Événements avec valeur manquants</p>;
  }
  let triggers = gameData.triggers;
  let events = gameData.events;
  let actions = gameData.actions;
  let withValueEvents = gameData.withValueEvents;

  const chartDefinition = `
    graph TD
      %% Section Entrées (Démons)
      
      ${iterateTrhoughTriggers(triggers, getEventFromIdAndType)}
      
 
  `;
  const chartDefinition2 = `
    graph TD 
      %% Section Entrées (Actions)
      ${iterateTrhoughActions(actions, getEventFromIdAndType)}
  `;

  const charDefinition3 = `
classDiagram   
    ${getGlobalValueClassDefinition(gameData.globalValue)}
    ${getPlayerGlobalValueStaticClassDefinition(gameData.playerGlobalValue)}
    ${getGlobalValueStaticClassDefinition(gameData.globalValueStatic)}
    
        `;
 
  return (
    <div className="visualisationsubPageOftriggersAndDeclencheurSubpage">
      <Legend colors={colors} />
      <SubNavigationBar
        buttons={{
          triggers: () => setSubpage("triggers"),
          actions: () => setSubpage("actions"),
          variables: () => setSubpage("variables"),
        }}
        page={subpage}
      />
      {(() => {
        switch (subpage) {
          case "triggers":
            return <Mermaid chart={chartDefinition} />;
          case "actions":
            return <Mermaid chart={chartDefinition2} />;
          case "variables":
            return <Mermaid chart={charDefinition3} />;
          default:
            return <Mermaid chart={chartDefinition} />;
        }
      })()}
    </div>
  );
}

// ===================== DEMONS =========================
function iterateTrhoughTriggers(triggers, getEventFromIdAndType) {
  return `${triggers
    .map((d) => {
      if (d.events.length === 0) return "";
      let node = getTriggerNode(d);
      return `   %% INITIALIZE DEMON ${d.id} ${d.name}
            ${node} 
            ${getEventsNode(d.events.map((id) => getEventFromIdAndType(id, "event")), node, getEventFromIdAndType)}   
            ${getTriggerStyle(d)} `;
    })
    .join("\n")}
    `;
}

function getTriggerNode(trigger) {
  return `D${trigger.id}["${getTriggerLabel(trigger)}"]`;
}
function getTriggerLabel(trigger) {
  return `<span class="triggerLabel">${trigger.name}</span>`.replace(/\n/g, "");
}
function getTriggerStyle(d) {
  return `style D${d.id} fill:${colors.trigger.fill},stroke:${colors.trigger.stroke}`;
}
// ===================== EVENTS OF DEMON =========================
function getEventsNode(events, parentNode, getEventFromIdAndType,visited = {}) {
  if (!events || events.length === 0) {
    console.warn("No events found for parent node:", parentNode);
    return ""; 
  }
  const newVisited = { ...visited }; 
  return `${events
    .map((event) => {
         if (!event) return "";

     newVisited[event.id] = true;
      // on donne un identifiant unique à chaque evenement pour que
      // les démons appellent chacun leur evenement sans avoir de fleche croisé
      // Certains evenements apparaitront plusieurs fois si ils sont appellé
      // par  des démons dffferents
      let eventNodeID =
        "E" +
        event.id +
        "-" +
        getRandomNumber() +
        "-" +
        event.name.replace(/\s/g, "");
      return ` 
            ${getEventNode(eventNodeID, event)} 
            ${parentNode} --> ${eventNodeID} 
            ${getEventStyle(eventNodeID)} 
            ${event.event?.withValue ? getEventsNode(event.event?.withValue.map((obj) => getEventFromIdAndType(obj.id, "event")), eventNodeID, getEventFromIdAndType, newVisited) : ""}
        `;
    })
    .join("\n")}
    `;
}
function getEventNode(eventNodeID, event) {
  return `${eventNodeID}["${getEventLabel(event)}"]`;
}
function getEventLabel(event) {
  return `<span class="eventLabel">${event.name}</span>`.replace(/\n/g, "");
}

function getEventStyle(eventNodeID) {
  return `style ${eventNodeID} fill:${colors.event.fill},stroke:${colors.event.stroke}`;
}
 
//======================= ACTIONS =========================

function iterateTrhoughActions(actions, getEventFromIdAndType) {
  return `${actions
    .map((action) => {
      return `  %% INITIALIZE ACTION ${action.id} ${action.name}
            ${getActionNode(action)} 
            ${getEventsNode(action.withValue.map((obj) => getEventFromIdAndType(obj.id, "event")), getActionNode(action), getEventFromIdAndType)}  
            ${getActionStyle(action)}  `;
    })
    .join("\n")}
    `;
} 
function getActionNode(action, event) {
  return `ACTION${action.id}["${getActionLabel(action)}"]`;
}
function getActionLabel(action) {
  return `<span class="actionLabel">${action.name}</span>`.replace(/\n/g, "");
}

function getActionStyle(action) {
  return `style ACTION${action.id} fill:${colors.action.fill},stroke:${colors.action.stroke}`;
}

function getGlobalValueClassDefinition(globalValue) {
  const { t } = useTranslation();
  return `${Object.keys(globalValue)
    .map((key) => {
      return `Global : ${key}`;
    })
    .join("\n")}
    `;
}
function getGlobalValueStaticClassDefinition(globalValueStatic) {
  const { t } = useTranslation();
  return `${Object.keys(globalValueStatic)
    .map((key) => {
      return `Static : ${key}`;
    })
    .join("\n")}
    `;
}
function getPlayerGlobalValueStaticClassDefinition(playerGlobalValue) {
  const { t } = useTranslation();
  return `${Object.keys(playerGlobalValue)
    .map((key) => {
      return `Player : ${key}`;
    })
    .join("\n")}
    `;
}

// ====== RANDOM ========
function getRandomNumber() {
  return Math.random().toString(36).substring(2, 7);
}
