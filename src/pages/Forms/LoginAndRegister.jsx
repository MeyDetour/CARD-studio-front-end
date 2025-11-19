import "./style.css";
import "../../assets/form.css";

import {useForm, useWatch} from "react-hook-form";
import {Link} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {useUserProvider} from "../../context/UserProvider.jsx";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar.jsx";

export default function LoginAndRegisterPage() {

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

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    },[token]);


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

    return <form className={"loginRegisterForm form"} onSubmit={handleSubmit(onSubmit)}>

        <div>
            <img src="./src/assets/CARDStudioLogo.svg" alt=""/>
            <h1>CARD Studio</h1>
            <p>Creation Assistant for Rendering & Design</p>
            <p>Créez, éditez et jouez à vos jeux de cartes</p>
        </div>

        <div className={"formContainer"}>
             <div>
                 <h3>Bienvenue</h3>
                 <p>Connectez-vous ou créez un compte pour continuer</p>
             </div>


            <SubNavigationBar buttons={{
                "Connexion": () => setSubPage("Connexion"),
                "Inscription": () => setSubPage("Inscription"),
            }} page={subPage}></SubNavigationBar>


            {error && <span style={{color: 'red'}}>{error}</span>}




            <div className={"inputdiv"}>
                <h3>Email</h3>
                <img src="./src/assets/icon/mail.svg" alt=""/>
                <input {...register("username")} type="text" placeholder="votre@email.com"/>
            </div>

            <div className={"inputdiv"}>
                <h3>Mot de passe</h3>
                <img src="./src/assets/icon/lock.svg" alt=""/>
                <img className={"eye"}  src="./src/assets/icon/eye.svg" alt=""/>
                <input {...register("password")} type="password" placeholder="votre mot de passe"/>
            </div>
            {subPage === "Inscription" && (
                <>
                    <div className={"inputdiv"}>
                        <h3>Confirmer le mot de passe</h3>
                        <img src="./src/assets/icon/lock.svg" alt=""/>
                        <input {...register("username")} type="text" placeholder="*******"/>
                    </div>
                </>
            )}
            {subPage === "Inscription" && (
                <input type="submit" className={"button"} value={"Créer un compte"}/>
            )}
            {subPage === "Connexion" && (
                <div className={"buttonContainer"}>
                       <Link to={"/passwordrecovery"}>Mot de passe oublié ?</Link>
                    <input type="submit" className={"button"} value={"Se connecter"}/>

                </div>
          )}

         </div>
        <p>En vous connectant, vous acceptez nos <b>Conditions d'utilisation</b> et notre <b>Politique de confidentialité</b></p>



    </form>
        ;
}
