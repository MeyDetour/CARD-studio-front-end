import "./style.css";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import GameCreationEnvironnementNavigation from "../../components/GameCreationEnvironnementNavigation/GameCreationEnvironnementNavigation";
import { useUserProvider } from "../../context/UserProvider";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Dashboard from "../subpages/Dashboard/Dashboard";

export default function LoginAndRegisterPage() {
  const { token } = useUserProvider();
  const navigate = useNavigate();
  const {subpage} = useParams()

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className={" gameCreationEnvironnementPage"}>
      <GameCreationEnvironnementHeader name="Skyjo" />
      <div className="content">
        
      <GameCreationEnvironnementNavigation currentPage={subpage}/>
       {(() => {
        switch (subpage) {
          case 'dashboard':
            return <Dashboard/>
          case 'playing':
             return ""
          case 'won':
             return ""
          case 'lost':
            return ""
          default:
            return null
        }
      })()}
      </div>
    </div>
  );
}
