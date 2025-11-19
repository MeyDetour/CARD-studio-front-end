import "./style.css";
import "../../assets/form.css";

import {useForm, useWatch} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useUserProvider} from "../../context/UserProvider.jsx";
import {useTranslation} from "react-i18next";
import Button from "../../components/Button/Button.jsx";

export default function PasswordRecovery() {

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {}
    })
    const [error, setError] = useState(null);
    const {token, setToken, deleteToken} = useUserProvider()
    let navigate = useNavigate();
    const [subPage, setSubPage] = useState("Connexion");
    const {t} = useTranslation();

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token]);


    const onSubmit = async (data) => {

        //check inputs

        if (!data.username) {
            setError("Please enter your username");
            return
        }
        if (!data.password) {
            setError("Please enter your password");
            return
        }


        // send request
        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/login_check", {
            method: "POST",
            body: JSON.stringify(data), headers: {
                "Content-Type": "application/json"
            },
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            navigate("/registerLoginPage/login")
        }


        const result = await jsonResponse.json();
        if (!result.token) {
            //render error
            setError(result);

        } else {

            //login
            setToken(result.token);
            navigate("/museums")
        }


    }

    return <div className={"formPage"}>

        <div className={"titleContainer"}>
            <img src="./src/assets/CARDStudioLogo.svg" alt=""/>
            <h1>{t("appName")}</h1>
            <p>Creation Assistant for Rendering & Design</p>
            <p>{t("appTagline")}</p>
        </div>

        <form className={"formContainer"} onSubmit={handleSubmit(onSubmit)}>

            <div className={"backContainer"}>
                <Button
                    to={`/login`}
                    text={"back"}
                    type={"withoutBorder"}
                    icon={"back.svg"}
                ></Button>
            </div>

            <div className={"titleContainer"}>
                <h3>{t("forgotPassword")}</h3>
                <p>Vous allez recevoir un code de récupération dans votre boite mail une fois le formulaire validé.</p>
            </div>


            {error && <span style={{color: 'red'}}>{error}</span>}


            <div className={"inputdiv"}>
                <h3>{t("emailLabel")}</h3>
                <img src="./src/assets/icon/mail.svg" alt=""/>
                <input {...register("username")} type="text" placeholder={t("emailPlaceholder")}/>
            </div>


            <div className={"buttonContainer"}>
                <input type="submit" className={"button"} value={"Envoyer le code"}/>
            </div>

        </form>


    </div>
        ;
}
