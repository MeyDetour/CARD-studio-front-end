import "./style.css";
import { Mermaid } from "./Mermaid/Mermaid";
import { Legend } from "./Legend/Legend";
import { useState } from "react";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";

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
export default function VisualisationPage({
 gameData,
  getEventFromIdAndType,
}) {
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
  let demons = gameData.demons
  let events = gameData.events
  let actions = gameData.actions
  let withValueEvents = gameData.withValueEvents

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
  console.log(chartDefinition);
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
            ${getEventsOfDemon(d, getEventFromIdAndType)}   
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
function getEventsOfDemon(demon, getEventFromIdAndType) {
  if (!demon.events || demon.events.length === 0) return "";
  return `${demon.events
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
            ${getDemonNode(demon)} --> ${eventNodeID} 
            ${getEventStyle(eventNodeID)} 
            ${getWithValueEventsFrom(event, getEventFromIdAndType, eventNodeID, new Set())}
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

// =====================WITH VALUE EVENTS =========================
function getWithValueEventsFrom(
  currentNode,
  getEventFromIdAndType,
  originNode,
  visited = new Set(),
) {
  if (
    !currentNode.event ||
    !currentNode.event.withValue ||
    currentNode.event.withValue.length === 0
  )
    return "";

  if (visited.has(currentNode.id)) return "";
  const newVisited = new Set(visited);
  newVisited.add(currentNode.id);
  return `${currentNode.event.withValue
    .map((obj) => {
      let vwEvent = getEventFromIdAndType(obj.id, "withValueEvent");
      if (!vwEvent) return "";

      // on donne un identifiant unique à chaque evenement pour que
      // les démons appellent chacun leur evenement sans avoir de fleche croisé
      // Certains evenements apparaitront plusieurs fois si ils sont appellé
      // par  des démons dffferents
      let withValueEventNodeId =
        "WVE" +
        vwEvent.id +
        "-" +
        getRandomNumber() +
        "-" +
        vwEvent.name.replace(/\s/g, "");
      return `  %% INITIALIZE NODE
            ${getWithValueEventNode(withValueEventNodeId, vwEvent)} 
            ${originNode} --> ${withValueEventNodeId} 
            ${getWithValueEventStyle(withValueEventNodeId)} 
            ${getWithValueEventsFrom(vwEvent, getEventFromIdAndType, withValueEventNodeId, visited)}   `;
    })
    .join("\n")}
    `;
}
function getWithValueEventNode(withValueEventNodeId, event) {
  return `${withValueEventNodeId}["${getWithValueEventLabel(event)}"]`;
}
function getWithValueEventLabel(event) {
  return `<span class="withValueEventLabel">${event.name}</span>`.replace(
    /\n/g,
    "",
  );
}

function getWithValueEventStyle(withValueEventNodeId) {
  return `style ${withValueEventNodeId} fill:${colors.withValueEvent.fill},stroke:${colors.withValueEvent.stroke}`;
}

//======================= ACTIONS =========================

function iterateTrhoughActions(actions, getEventFromIdAndType) {
  return `${actions
    .map((action) => {
      return `  %% INITIALIZE ACTION ${action.id} ${action.name}
            ${getActionNode(action)} 
            ${getWithValueEventsOfAction(action, getEventFromIdAndType)}  
            ${getActionStyle(action)}  `;
    })
    .join("\n")}
    `;
}
function getWithValueEventsOfAction(action, getEventFromIdAndType) {
  if (!action.withValue || action.withValue.length === 0) return "";
  return `${action.withValue
    .map((obj) => {
      let vwEvent = getEventFromIdAndType(obj.id, "withValueEvent");
      if (!vwEvent) return "";

      // on donne un identifiant unique à chaque evenement pour que
      // les démons appellent chacun leur evenement sans avoir de fleche croisé
      // Certains evenements apparaitront plusieurs fois si ils sont appellé
      // par  des démons dffferents
      let withValueEventNodeId =
        "VWE" +
        vwEvent.id +
        "-" +
        getRandomNumber() +
        "-" +
        vwEvent.name.replace(/\s/g, "");
      return `  ${getWithValueEventNode(withValueEventNodeId, vwEvent)} 
            ${getActionNode(action)} --> ${withValueEventNodeId} 
            ${getWithValueEventStyle(withValueEventNodeId)} 
            ${getWithValueEventsFrom(vwEvent, getEventFromIdAndType, withValueEventNodeId, new Set())}   `;
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

// ====== RANDOM ========
function getRandomNumber() {
  return Math.random().toString(36).substring(2, 7);
}
