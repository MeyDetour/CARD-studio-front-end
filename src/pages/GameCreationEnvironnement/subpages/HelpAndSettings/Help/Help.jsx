import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";
import Separator from "../../../../../components/Separator/Separator";
import DetailParagraphe from "../../../../../components/DetailParagraphe/DetailParagraphe";

import { useTranslation } from "react-i18next";
export default function Help() {
  const { t } = useTranslation();
  return (
    <>
      <div className="basicContainer  ">
        <TitleContainer
          title={"quickStart"}
          description={"basicsToGetStarted"}
          type="h1"
        ></TitleContainer>
        <TitleContainer
          title={"createYourFirstGame"}
          description={"createGameInstruction"}
          number={1}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>
        <TitleContainer
          title={"createCards"}
          description={"createCardsInstruction"}
          number={2}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>
        <TitleContainer
          title={"configureRules"}
          description={"configureRulesInstruction"}
          number={1}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>
        <TitleContainer
          title={"testYourGame"}
          description={"testYourGameInstruction"}
          number={1}
          type="h3"
        ></TitleContainer>
      </div>

      <div className="basicContainer  ">
        <TitleContainer
          title={"tipsAndBestPractices"}
          description={"optimizeYourExperience"}
          type="h1"
        ></TitleContainer>

        <TitleContainer
          title={"useTemplates"}
          description={"useTemplatesTip"}
          icon="astuce-round-icon"
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"organizeColors"}
          description={"organizeColorsTip"}
          icon="astuce-round-icon"
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"defineVariablesEarly"}
          description={"defineVariablesEarlyTip"}
          icon="astuce-round-icon"
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"testRegularly"}
          description={"testRegularlyTip"}
          icon="astuce-round-icon"
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"saveYourAssets"}
          description={"saveYourAssetsTip"}
          icon="astuce-round-icon"
          type="h3"
        ></TitleContainer>
      </div>

      <div className="basicContainer  ">
        <TitleContainer
          title={"frequentlyAskedQuestions"}
          type="h1"
        ></TitleContainer>
        <TitleContainer
          title={"howToChangeGame"}
          description={"howToChangeGameAnswer"}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"canIImportImages"}
          description={"canIImportImagesAnswer"}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"howToInvitePlayers"}
          description={"howToInvitePlayersAnswer"}
          type="h3"
        ></TitleContainer>
        <Separator></Separator>

        <TitleContainer
          title={"areChangesSavedAutomatically"}
          description={"areChangesSavedAutomaticallyAnswer"}
          type="h3"
        ></TitleContainer>
      </div>
      <div className="basicContainer">
        <TitleContainer title={"tutoriels"} type="h1"></TitleContainer>
        <DetailParagraphe title={"configurationDistributionOfCard"}>
          <p>{t("howToConfigureDistributionOfCard")}</p>
        </DetailParagraphe>

           <DetailParagraphe title={"howToChangeTurn"}>
          <p>{t("howToChangeTurnDescription")}</p>
        </DetailParagraphe>
      </div>
    </>
  );
}
