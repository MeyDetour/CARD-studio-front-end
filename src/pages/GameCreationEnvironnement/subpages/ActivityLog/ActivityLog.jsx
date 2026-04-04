import "./style.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistoryContext } from "../../../../context/HistoryContext";
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import BarChartPage from "./BarChart/BarChart";
import  SubNavigationBar  from "../../../../components/SubNavigationBar/SubNavigationBar";
import EditionLogElement from "./EditionLogElement/EditionLogElement";
import { useGameContext } from "../../../../context/GameContext"; 
export default function CardManagement({
  game, 
}) {
  const { t } = useTranslation(); 
  const [subPage, setSubpage] = useState("all");
  const [data, setData] = useState([]);
  const {getGame} = useGameContext();
  const {getDetailledHistory} = useHistoryContext();
  useEffect(() => {
    const fetchData = async () => {
      const gameInDb = await getGame(game.id); 
      const detailedHistory = getDetailledHistory(gameInDb,game);
      setData(detailedHistory);
    };
    fetchData();
  }, [game]);

  console.log(data);

  if (!game) return;
  return (
    <div className={" activityLogSubpage"}>
      <TitleContainer
        title={"activityLog"}
        type="h1"
        description="activityLogDescription"
      />
      <div className="basicContainer basicWarningContainer">
        <span>
          <b>0 {t("xUnsavedChanges")}</b>
        </span>
        <span>
          {t("lastSaved")} {new Date(game.requestDate).toLocaleString()}
        </span>
      </div>
      <div className="basicContainer chartBartSection">
        <TitleContainer
          title={"modificationsByCategory"}
          type="h2"
          description="changesByElementType"
        />
        <BarChartPage></BarChartPage>
      </div>
      <div className="basicContainer">
        <TitleContainer
          title={"detailedHistory"}
          type="h2"
          description="detailedHistoryDescription"
        />
        <SubNavigationBar
          buttons={{
            all: () => setSubpage("all"),
            created: () => setSubpage("created"),
            updated: () => setSubpage("updated"),
            deleted: () => setSubpage("deleted"),
          }}
          page={subPage}
        />
        {data.map((item, index) => (
          <EditionLogElement key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
