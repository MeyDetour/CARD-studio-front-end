import "./style.css";
import "../../assets/form.css";

import {useForm, useWatch} from "react-hook-form";
import {Link} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {useUserProvider} from "../../context/UserProvider.jsx";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar.jsx";

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

    return <form className={"passwordRecoveryForm form"} onSubmit={handleSubmit(onSubmit)}>

        <div>
            <img src="./src/assets/CARDStudioLogo.svg" alt=""/>
            <h1>CARD Studio</h1>
            <p>Creation Assistant for Rendering & Design</p>
            <p>Créez, éditez et jouez à vos jeux de cartes</p>
        </div>

        <div className={"formContainer"}>
            <div>
                <h3>Vous avez oublié votre mot de pass ? </h3>
            <p>Vous allez recevoir un code de récupération dans votre boite mail une fois le formulaire validé.</p>
            </div>



            {error && <span style={{color: 'red'}}>{error}</span>}


            <div className={"inputdiv"}>
                <h3>Email</h3>
                <img src="./src/assets/icon/mail.svg" alt=""/>
                <input {...register("username")} type="text" placeholder="votre@email.com"/>
            </div>
            <input type="submit" className={"button"} value={"Envoyer le code"}/>


        </div>



    </form>
        ;
}
