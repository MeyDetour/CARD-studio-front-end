import "./style.css";
import { useEffect, useState } from "react";
import { useUserProvider } from "../../../context/UserProvider";
import { useNavigate, useParams } from "react-router";
import { useApi } from "../../../hooks/useApi";
import TitleContainer from "../../../components/TitleContainer/TitleContainer";
import GameCreationEnvironnementQuickAction from "../../../components/GameCreationEnvironnementQuickAction/GameCreationEnvironnementQuickAction";
import TitleSecondContainer from "../../../components/TitleSecondContainer/TitleSecondContainer";
import GameCreationEnvironnementStatDashboard from "../../../components/GameCreationEnvironnementStatDashboard/GameCreationEnvironnementStatDashboard";
export default function Dashboard() {
  const { token } = useUserProvider();
  const { result, loading, error, fetchData } = useApi();
  const [game, setGame] = useState({
    id: 2,
    notes: [
      {
        note: 2,
        commentaire: "anfnezgkfzf",
      },
    ],
    editionHistory: [],
    demonsCount: 23,
    eventsCount: 10,
    cardsCount: 10,
    gainsCount: 3,
    rolesCount: 2,
  });
  const navigate = useNavigate();
  const { subpage } = useParams();

  useEffect(() => {
    async function getData() {
      const resultGames = await fetchData("api/game/{id}/dashboard", null, {
        token: token,
      });
    }
    if (token) {
      //   getData();
    } else {
      navigate("/login");
    }
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className={" dahsboardSubpage"}>
      <TitleContainer
        title="dashboard"
        description="dashboard-subpage-welcome"
      ></TitleContainer>
      <div className="statSection">
        <GameCreationEnvironnementStatDashboard
          number={game.cardsCount}
          text={"cardsCreated"}
          icon={"layer-violet-background"}
        />
        <GameCreationEnvironnementStatDashboard
          number={game.rolesCount}
          text={"rolesCount"}
          icon={"stat-grey-background"}
        />{" "}
        <GameCreationEnvironnementStatDashboard
          number={game.gainsCount}
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
          <GameCreationEnvironnementQuickAction text="modifyDisplay" icon="screen" />
          <GameCreationEnvironnementQuickAction text="browseAssets" icon="layer" />
        </div> 
      
      </div>
    </div>
  );
}
