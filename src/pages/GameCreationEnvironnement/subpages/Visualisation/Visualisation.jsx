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
  demon: {
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
  const [subpage, setSubpage] = useState("demons");
  if (!gameData.demons) {
    return <p>Démons manquants</p>;
  }
  if (!gameData.events) {
    return <p>Événements manquants</p>;
  }
  if (!gameData.withValueEvents) {
    return <p>Événements avec valeur manquants</p>;
  }
  let demons = gameData.demons;
  let events = gameData.events;
  let actions = gameData.actions;
  let withValueEvents = gameData.withValueEvents;

  const chartDefinition = `
    graph TD
      %% Section Entrées (Démons)
      
      ${iterateTrhoughDemons(demons, getEventFromIdAndType)}
      
 
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
    <div className="visualisationsubPageOfdemonsAndDeclencheurSubpage">
      <Legend colors={colors} />
      <SubNavigationBar
        buttons={{
          demons: () => setSubpage("demons"),
          actions: () => setSubpage("actions"),
          variables: () => setSubpage("variables"),
        }}
        page={subpage}
      />
      {(() => {
        switch (subpage) {
          case "demons":
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
function iterateTrhoughDemons(demons, getEventFromIdAndType) {
  return `${demons
    .map((d) => {
      if (d.events.length === 0) return "";
      return `   %% INITIALIZE DEMON ${d.id} ${d.name}
            ${getDemonNode(d)} 
            ${getEventsNode(d.events.map((id) => getEventFromIdAndType(id, "event")), getDemonNode(d), getEventFromIdAndType)}   
            ${getDemonStyle(d)} `;
    })
    .join("\n")}
    `;
}

function getDemonNode(demon) {
  return `D${demon.id}["${getDemonLabel(demon)}"]`;
}
function getDemonLabel(demon) {
  return `<span class="demonLabel">${demon.name}</span>`.replace(/\n/g, "");
}
function getDemonStyle(d) {
  return `style D${d.id} fill:${colors.demon.fill},stroke:${colors.demon.stroke}`;
}
// ===================== EVENTS OF DEMON =========================
function getEventsNode(events, parentNode, getEventFromIdAndType,visited = new Set()) {
  if (!events || events.length === 0) return "";
  if (visited.has(currentNode.id)) return "";
  const newVisited = new Set(visited);
  newVisited.add(currentNode.id);
  return `${events
    .map((id) => {
      let event = getEventFromIdAndType(id, "event");
      if (!event) return "";

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
            ${getEventsNode(event.event?.withValue.map((obj) => getEventFromIdAndType(obj.id, "event")), eventNodeID, getEventFromIdAndType, newVisited)})}
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
