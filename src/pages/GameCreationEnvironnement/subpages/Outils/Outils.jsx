import "./style.css";

// External libraries
import { useNavigate } from "react-router";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import  CardSubpage  from "../../../../components/CardSubpage/CardSubpage";
export default function Outils({ gameData }) {
  const navigate = useNavigate();

  return (
    <div className={" dahsboardSubpage"}>
      <TitleContainer
        title="tools"
        description="toolsDescription"
      ></TitleContainer>
      {[
        {
          name: "expressionEditor",
          description: "expressionEditorDescription",
          onclickEvent: () => navigate("/game/expressionEditor/"+gameData.id),
        },
      ].map((section, key) => (
        <>
          <CardSubpage
            key={key} 
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
  );
}
