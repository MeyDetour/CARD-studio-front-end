import "./style.css"; 
import TitleContainer from "../../../components/TitleContainer/TitleContainer";
import GameCreationEnvironnementQuickAction from "../../../components/GameCreationEnvironnementQuickAction/GameCreationEnvironnementQuickAction";
import TitleSecondContainer from "../../../components/TitleSecondContainer/TitleSecondContainer";
import GameCreationEnvironnementStatDashboard from "../../../components/GameCreationEnvironnementStatDashboard/GameCreationEnvironnementStatDashboard";
import Separator from "../../../components/Separator/Separator";
export default function Dashboard({gameData}) { 
 
 if (!gameData)return

  return (
    <div className={" dahsboardSubpage"}>
      <TitleContainer
        title="dashboard"
        description="dashboard-subpage-welcome"
      ></TitleContainer>
      <div className="statSection">
        <GameCreationEnvironnementStatDashboard
          number={gameData.cardsCount}
          text={"cardsCreated"}
          icon={"layer-violet-background"}
        />
        <GameCreationEnvironnementStatDashboard
          number={gameData.rolesCount}
          text={"rolesCount"}
          icon={"stat-grey-background"}
        />{" "}
        <GameCreationEnvironnementStatDashboard
          number={gameData.gainsCount}
          text={"prizesCreated"}
          icon={"profile-grey-background"}
        />
      </div>
      <div className="quickActionSection basicContainer">
        <TitleSecondContainer
          title="quickaction-title"
          description="quickaction-main-features"
        />
        <div className="wrapper">
          <GameCreationEnvironnementQuickAction text="createCard" icon="add" />
          <GameCreationEnvironnementQuickAction text="editGame" icon="stat" />
          <GameCreationEnvironnementQuickAction
            text="modifyDisplay"
            icon="screen"
          />
          <GameCreationEnvironnementQuickAction
            text="browseAssets"
            icon="layer"
          />
        </div>
      </div>
      <div className="activityAndCommentSection">
        <div className="basicContainer activitySection">
          <TitleSecondContainer
            title={"recentactivity"}
            description={"yourLastEdits"}
          />
          <div className="wrapper">
            {gameData.editionHistory &&
              gameData.editionHistory.map((e, index) => (
                <>
                  {index != 0 && <Separator></Separator>}
                  <div className="activityElement" key={e.id}>
                    <div className="left">
                      <span className="littleTitle">{e.evenement}</span>
                      <span className="littleMention">{e.action}</span>
                    </div>
                    <span className="littleMention">{e.date_relative}</span>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="basicContainer commentSection">
          <TitleSecondContainer
            title={"comments"}
            description={"commentAreCollectOnGame"}
          />
           <div className="wrapper">
            {gameData.notes &&
              gameData.notes.map((n, index) => (
                <>
                  {index != 0 && <Separator></Separator>}
                  <div className="commentElement" key={index}>
                   
                      <span className="normalText">{n.commentaire}</span>
                    
                    <span className="littleMention">{n.date}</span>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
