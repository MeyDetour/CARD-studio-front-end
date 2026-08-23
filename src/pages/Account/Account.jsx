import { use, useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import Input from "../../components/Input/Input";
import TitleContainer from "../../components/TitleContainer/TitleContainer";
import { useTokenContext } from "../../context/TokenContext";
import Button from "../../components/Button/Button";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar";
import './style.css'; 
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
export default function Account() { 

    const [user, setUser] = useState(null);
const {t} = useTranslation()
const navigate = useNavigate()
    const { fetchUser } = useUserContext();
    const { deleteToken } = useTokenContext();
    useEffect(async ()=>{
             const res = await fetchUser();
            if (res) {
                setUser(res); 
            }
    },[])
    if (!user)return
    console.log(user);
    return (
        <div className="accountPage">
            <Button
                text={"backToSelectGame"}
                to={"/"}
                type={"withoutBorder"}
                icon={"left_arrow"}
            ></Button> 
                <div className="basicContainer">
                    <TitleContainer
                    type="h2"
                    title={"informationAboutUser"} 
                    ></TitleContainer>
                    <div className="row">
                    <Input
                        title="Username"
                        defaultValue={user.username}
                        onChangeFunction={(path, value) => {
                        
                        }}
                        editable={false}
                      
                    />
                    </div>
                </div>  
                <div className="basicContainer basicWarningContainer deleteManagementSection">
                        <TitleContainer
                          title={"deleteGameTitle"}
                          type="h2"
                          description={"signoutDescription"}
                        />
                
                        <Button
                          text={"Disconnect"}
                          type={"yellowButton"}
                          action={async () => {
                            if (confirm(t("beCarefulYouWillBeDisconnected"))) {
                            deleteToken()
                                navigate("/login");
                              
                            }
                          }}
                        ></Button>
                      </div>
                   
        </div>
    );
}