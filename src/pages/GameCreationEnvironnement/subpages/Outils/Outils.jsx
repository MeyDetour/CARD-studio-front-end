import "./style.css";

// External libraries
import { useNavigate } from "react-router";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import  CardSubpage  from "../../../../components/CardSubpage/CardSubpage";
export default function Outils({ gameData }) {
  const navigate = useNavigate();

  return (
    <div className={" outilsSubpage"}>
      <TitleContainer
        title="tools"
        description="toolsDescription"
      ></TitleContainer>
         <div className="wrapper">
      {[
        {
          name: "expressionEditor",
          description: "expressionEditorDescription",
          onclickEvent: () => navigate("/game/expressionEditor/"+gameData.id),
          illustratin : "/src/assets/images/expression-editor-illustration.svg"
        },{
          name: "visualisation",
          description: "visualiseConnexionsBetwwenElements",
          onclickEvent: () => navigate("/game/visualisation/"+gameData.id),
          illustratin : "/src/assets/images/visualisation-illustration.svg"
        },
      ].map((section, key) => (
        <>
          <CardSubpage
            key={key} 
            image = {section.illustratin}
            className={"cardSubpage" + key}
            title={section.name}
            icon={section.icon}
            action={() => { 
              section.onclickEvent();
            }}
            description={section.description}
          />
        </>
      ))}
      </div>
    </div>
  );
}
