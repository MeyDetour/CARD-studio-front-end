import Input from "../../../../../components/input/Input";
import InputSelect from "../../../../../components/inputSelect/InputSelect";
import TitleContainer from "../../../../../components/TitleContainer/TitleContainer"; 


// Contexts
import { useUserContext } from "../../../../../context/UserContext.jsx";
import { useNotificationContext } from "../../../../../context/NotificationContext.jsx";
import { useApi } from "../../../../../hooks/useApi";


export default function Settings( {
  user,
  editUserHandler
}){
    const { result, fetchData } = useApi();
  const { editUser } = useUserContext();
 
 const { canDisplayError, setCanDisplayError } = useNotificationContext();

    return (
    <>
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
      
      </>
      )
}