import "./style.css";
import "../../assets/form.css";

import {ErrorMessage} from "@hookform/error-message";
import {useForm, useWatch} from "react-hook-form";
import {Link} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {useUserProvider} from "../../context/UserProvider.jsx";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar.jsx";
import {useTranslation} from "react-i18next";

export default function LoginAndRegisterPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {}
    })
    const [error, setError] = useState(null);
    const [subPage, setSubPage] = useState("navLogin");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {token, setToken, deleteToken} = useUserProvider()
    let navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token]);


    const onSubmit = async (data) => {
        console.log(data)
        //check inputs
        if (subPage === "navRegister" &&  data.password !== data.passwordConfirm){
            setError(t("passwordNotMatch"))
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

    return <div className={" formPage"}>


        {/* HEADER WITH LOGO */}
        <div className={"titleContainer"}>
            <img src="./src/assets/CARDStudioLogo.svg" alt=""/>
            <h1>{t("appName")}</h1>
            <p>Creation Assistant for Rendering & Design</p>
            <p>{t("appTagline")}</p>
        </div>


        <form className={"formContainer"} onSubmit={handleSubmit(onSubmit)}>

            {/* Header with title form */}
            <div className={"titleContainer"}>
                <h3>{t("welcomeTitle")}</h3>
                <p>{t("welcomeSubtitle")}</p>
            </div>


            {/* To navigate between login and register */}
            <SubNavigationBar buttons={{
                "navLogin": () => setSubPage("navLogin"),
                "navRegister": () => setSubPage("navRegister"),
            }} page={subPage}></SubNavigationBar>


            {/* Email input */}
            <div className={"inputdiv"}>
                <h3>{t("emailLabel")}</h3>
                <span style={{color: 'red'}}>  <ErrorMessage errors={errors} name="email"/></span>
                <img src="./src/assets/icon/mail.svg" alt=""/>
                <input {...register("email", {
                    required: t("errorEnterUsername"),
                    minLength: {
                        value: 8,
                        message: t("errorLength", {"length": 8})
                    }
                })} type="text" placeholder={t("emailPlaceholder")}/>
            </div>


            {/* Password input */}
            <div className={"inputdiv"}>
                <h3>{t("passwordLabel")}</h3>
                <img src="./src/assets/icon/lock.svg" alt=""/>
                <img onClick={()=>setShowPassword(!showPassword)} className={"eye"} src="./src/assets/icon/eye.svg" alt=""/>
                <span style={{color: 'red'}}>  <ErrorMessage errors={errors} name="password"/></span>
                <input {...register("password", {
                    required:t("errorEnterPassword"),
                    minLength: {
                        value: 8,
                        message: t("errorLength", {"length": 8})
                    }
                })} type={showPassword? "text":"password"} placeholder={t("passwordPlaceholder")}/>
            </div>


            {/* Password Confirmation input */}
            {subPage === "navRegister" && (
                <>
                    <div className={"inputdiv"}>
                        <h3>{t("passwordConfirmLabel")}</h3>
                        <img src="./src/assets/icon/lock.svg" alt=""/>
                        <img onClick={()=>setShowPasswordConfirmation(!showPasswordConfirmation)} className={"eye"} src="./src/assets/icon/eye.svg" alt=""/>
                        <span style={{color: 'red'}}>  <ErrorMessage errors={errors} name="passwordConfirm"/></span>
                        <input {...register("passwordConfirm", {
                            required:t("errorEnterPassword"),
                            minLength: {
                                value: 8,
                                message: t("errorLength", {"length": 8})
                            }
                        })} type={showPasswordConfirmation?"text":"password"} placeholder={t("passwordConfirmPlaceholder")}/>
                    </div>
                </>
            )}
            {error &&  <span style={{color: 'red'}}>{error}</span>  }

            {/* Submit button */}
            <div className={"buttonContainer"}>
                {subPage === "navLogin" && (
                    <Link to={"/passwordrecovery"}>{t("forgotPassword")}</Link>
                )}
                {subPage === "navRegister" ?
                    <input type="submit" className={"button"} value={t("registerButton")}/>
                    : <input type="submit" className={"button"} value={t("loginButton")}/>
                }
            </div>


        </form>
        <p>{t("legalNotice")} <b>{t("termsOfUse")}</b>, <b>{t('privacyPolicy')}</b></p>


    </div>
        ;
}
