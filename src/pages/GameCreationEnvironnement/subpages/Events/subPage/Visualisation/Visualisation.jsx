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
};

// Page principale
export default function VisualisationSubPage({
  demons,
  events,
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
    ${iterateTrhoughDemons(demons,getEventFromIdAndType)}
 
 
 
  `;
  console.log(chartDefinition);
  return (
    <div className="visualisationsubPageOfdemonsAndDeclencheurSubpage">
      <Legend colors={colors} />
      <Mermaid chart={chartDefinition} />
    </div>
  );
}
function iterateTrhoughDemons(demons,getEventFromIdAndType) {
  return `${demons
    .map((d) => {
      if (d.events.length === 0) return ""
      return `
        
            %% INITIALIZE DEMON ${d.id}
            ${getDemonNode(d)}

            %% INITIALISE EVENTS OF DEMON ${d.id}
            ${getEventsOfDemon(d,getEventFromIdAndType)}    
            
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
function getDemonStyle(d){
return `style D${d.id} fill:${colors.demon.fill},stroke:${colors.demon.stroke}`;
}
function getEventsOfDemon(demon,getEventFromIdAndType) {
  if (!demon.events || demon.events.length === 0) return "";
  return `${demon.events
    .map((id) => {
      
    let event = getEventFromIdAndType(id, "event")
    if (!event) return ""

    let eventNodeID = "E"+event.id+"-"+getRandomNumber() 
      return `
            %% INITIALIZE NODE
            ${getEventNode(eventNodeID,event)}

            %% RELIER EVENT ${eventNodeID} AU DEMON ${demon.id}
            D${demon.id} --> ${eventNodeID}

            %% EVENT STYLE
            ${getEventStyle(eventNodeID)}
        `;
    })
    .join("\n")}
    `;
} 
function getEventNode(eventNodeID,event) {
  return `${eventNodeID}["${getEventLabel(event)}"]`;
}
function getEventLabel(event) {
  return `<span class="eventLabel">${event.name}</span>`.replace(/\n/g, "");
}

function getEventStyle(eventNodeID){
  return `style ${eventNodeID} fill:${colors.event.fill},stroke:${colors.event.stroke}`
}
function getRandomNumber(){
  return Math.random()
}