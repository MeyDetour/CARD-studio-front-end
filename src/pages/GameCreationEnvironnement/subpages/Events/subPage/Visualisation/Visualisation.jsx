import "./style.css";
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
export default function VisualisationSubPage({
  demons,
  events,
  actions,
  withValueEvents,
  getEventFromIdAndType,
}) {
  if (!demons) {
    return <p>Démons manquants</p>;
  }
  if (!events) {
    return <p>Événements manquants</p>;
  }
  if (!withValueEvents) {
    return <p>Événements avec valeur manquants</p>;
  }
  const chartDefinition = `
    graph TD
      %% Section Entrées (Démons)
      ${iterateTrhoughDemons(demons, getEventFromIdAndType)}
 

      %% Section Entrées (Actions)
      ${iterateTrhoughActions(actions, getEventFromIdAndType)}
 
  `;
  console.log(chartDefinition);
  return (
    <div className="visualisationsubPageOfdemonsAndDeclencheurSubpage">
      <Legend colors={colors} />
      <Mermaid chart={chartDefinition} />
    </div>
  );
}

// ===================== DEMONS =========================
function iterateTrhoughDemons(demons, getEventFromIdAndType) {
  return `${demons
    .map((d) => {
      if (d.events.length === 0) return "";
      return `
        
            %% INITIALIZE DEMON ${d.id}
            ${getDemonNode(d)}

            %% INITIALISE EVENTS OF DEMON ${d.id}
            ${getEventsOfDemon(d, getEventFromIdAndType)}    
            
            %% STYLE DEMON ${d.id}
            ${getDemonStyle(d)}
        `;
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
      let eventNodeID = "E" + event.id + "-" + getRandomNumber();
      return `
            %% INITIALIZE NODE
            ${getEventNode(eventNodeID, event)}

            %% RELIER EVENT ${eventNodeID} AU DEMON ${demon.id}
            ${getDemonNode(demon)} --> ${eventNodeID}

            %% EVENT STYLE
            ${getEventStyle(eventNodeID)}

            %% WITH VALUE EVENT OF EVENT
            ${getWithValueEventsFrom(event, getEventFromIdAndType, eventNodeID,new Set())}
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
      let withValueEventNodeId = "WVE" + vwEvent.id + "-" + getRandomNumber();
      return `
            %% INITIALIZE NODE
            ${getWithValueEventNode(withValueEventNodeId, vwEvent)}

            %% RELIER EVENT ${withValueEventNodeId} A ${originNode}
            ${originNode} --> ${withValueEventNodeId}

            %% EVENT STYLE
            ${getWithValueEventStyle(withValueEventNodeId)}

            %% WITH VALUE EVENT OF WITH VALUE EVENT
            ${getWithValueEventsFrom(vwEvent, getEventFromIdAndType, withValueEventNodeId,visited)}
     
        `;
    })
    .join("\n")}
    `;
}
function getWithValueEventNode(withValueEventNodeId, event) {
  return `${withValueEventNodeId}["${getWithValueEventLabel(event)}"]`;
}
function getWithValueEventLabel(event) {
  return `<span class="withValueEventLabel">${event.name}</span>`.replace(/\n/g, "");
}

function getWithValueEventStyle(withValueEventNodeId) {
  return `style ${withValueEventNodeId} fill:${colors.withValueEvent.fill},stroke:${colors.withValueEvent.stroke}`;
}

//======================= ACTIONS =========================

function iterateTrhoughActions(actions, getEventFromIdAndType) {
  return `${actions
    .map((action) => {
       return `
        
            %% INITIALIZE ACTION ${action.id}
            ${getActionNode(action)}

            %% INITIALISE EVENTS OF ACTION ${action.id}
            ${getWithValueEventsOfAction(action, getEventFromIdAndType)}    
            
            %% STYLE ACTION ${action.id}
            ${getActionStyle(action)}
        `;
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
      let withValueEventNodeId = "VWE" + vwEvent.id + "-" + getRandomNumber();
      return `
            %% INITIALIZE NODE
            ${getWithValueEventNode(withValueEventNodeId, vwEvent)}

            %% RELIER EVENT ${withValueEventNodeId} A LACTION ${action.id}
            ${getActionNode(action)} --> ${withValueEventNodeId}

            %% EVENT STYLE
            ${getWithValueEventStyle(withValueEventNodeId)}

            %% WITH VALUE EVENT OF EVENT
            ${getWithValueEventsFrom(vwEvent, getEventFromIdAndType, withValueEventNodeId,new Set())}
        `;
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
