// External libraries
import { useEffect, useState } from "react";

// Contexts
import { useUserContext } from "../../../../context/UserContext.jsx";
import { useNotificationContext } from "../../../../context/NotificationContext.jsx";
import { useApi } from "../../../../hooks/useApi";

// Components
import TitleContainer from "../../../../components/TitleContainer/TitleContainer";
import SubNavigationBar from "../../../../components/SubNavigationBar/SubNavigationBar";
import Input from "../../../../components/input/Input";
import InputSelect from "../../../../components/inputSelect/InputSelect";

export default function HelpAndSettings({
  gameData,
  user,
  editUserHandler,
  updateGameValueArray,
  updateGameValue,
}) {
  const { canDisplayError, setCanDisplayError } = useNotificationContext();
  const [subPage, setSubpage] = useState("settings");
  const { result, fetchData } = useApi();
  const { editUser } = useUserContext();
 

  return (
    <div className="helpAndSettingsSubpage">
      <TitleContainer
        title="helpAndSettings"
        description="onThisPageYouWillFindAllSettingsToConfigureRoundsAndManches"
      ></TitleContainer>

      <SubNavigationBar
        buttons={{
          settings: () => setSubpage("settings"),
          help: () => setSubpage("help"),
        }}
        page={subPage}
      />
      <div className="basicContainer visibilitySection">
        <TitleContainer title={"generalSettings"} type="h2"></TitleContainer>
        <InputSelect
          title={"language"}
          updateValueArray={(value) => editUserHandler({ ...user, lang: value })}
          closeAfterSelect={true}
          selected={user?.lang ? [user.lang] : ["fr"]}
          items={["en", "fr"]}
        />
      </div>

      <div className="basicContainer visibilitySection">
        <TitleContainer title={"errorVisibility"} type="h2"></TitleContainer>
        <Input
          title="displayErrorsAndWarnings"
          description="displayErrorsAndWarningsToggle"
          inputType="toggle"
          onChangeFunction={(value) => editUserHandler({ ...user, displayErrors: value })}
          defaultValue={canDisplayError}
        />
      </div>
    </div>
  );
}
