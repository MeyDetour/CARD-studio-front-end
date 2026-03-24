import "./style.css";
import "../../assets/form.css";
import Icon from "../../components/Icon/Icon.jsx";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useTokenContext } from "../../context/TokenContext.jsx";
import { useUserContext } from "../../context/UserContext.jsx";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar.jsx";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button.jsx";
import { useApi } from "../../hooks/useApi.js";
export default function LoginAndRegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { setUser } = useUserContext();
  const { result, loading, error, fetchData, setError } = useApi();
  const [subPage, setSubPage] = useState("navLogin");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { setToken, getToken, deleteToken } = useTokenContext();
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let token = getToken();
    if (token) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    if (subPage === "navRegister" && data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: t("passwordNotMatch") });
      return;
    }
    let res = null;
    try {
      if (subPage == "navLogin") {
        res = await fetchData("api/login_check", data);
        console.log(res);
        if (res && res.token) {
          setToken(res.token);
          navigate("/");
        }
      } else {
        res = await fetchData("register", data);
        if (res.message === "ok") {
          setSubPage("navLogin");
        }
      }
    } catch (err) {
      console.warn("Login/register failed:", err.message);
      return;
    }
 
  };

  if (loading) return <p>Chargement...</p>;
  return (
    <div className={" formPage"}>
      {/* HEADER WITH LOGO */}
      <div className={"headerContainer"}>
        <img src="/src/assets/CARDStudioLogo.svg" alt="" />
        <h1>{t("appName")}</h1>
        <p>Creation Assistant for Rendering & Design</p>
        <p>{t("appTagline")}</p>
      </div>

      <form className={"formContainer"} onSubmit={handleSubmit(onSubmit)}>
        {/* Back to forms when you forgot password */}
        {subPage === "forgotPassword" && (
          <Button
            text={"Retour"}
            icon={"left_arrow"}
            action={(e) => {
              e.preventDefault();
              setSubPage("navLogin");
            }}
            type="withoutBorder"
          ></Button>
        )}

        {/* Header with title form */}
        <div className={"headerContainer"}>
          <h3>
            {t(
              subPage !== "forgotPassword"
                ? "welcomeTitle"
                : "forgotPasswordFromTitle",
            )}
          </h3>
          <p>
            {t(
              subPage !== "forgotPassword"
                ? "welcomeSubtitle"
                : "ForgotPasswordFormSubtitle",
            )}
          </p>
        </div>

        {/* To navigate between login and register */}
        {subPage !== "forgotPassword" && (
          <SubNavigationBar
            buttons={{
              navLogin: () => {
                setSubPage("navLogin");
                resetError();
              },
              navRegister: () => {
                setSubPage("navRegister");
                resetError();
              },
            }}
            page={subPage}
          ></SubNavigationBar>
        )}

        {/* Username input */}
        {subPage !== "forgotPassword" && (
          <div className={"inputdiv"}>
            <h3>{t("usernameLabel")}</h3>
            <span style={{ color: "red" }}>
              <ErrorMessage errors={errors} name="username" />
            </span>
            <Icon name="profile-grey"></Icon>
            <input
              {...register("username", {
                required: t("errorEnterUsername"),
                value: "mey2",
                minLength: {
                  value: 3,
                  message: t("errorLength", { length: 8 }),
                },
              })}
              type="text"
              placeholder={t("usernamePlaceholder")}
            />
          </div>
        )}

        {/* Email input */}
        {/* <div className={"inputdiv"}>
          <h3>{t("emailLabel")}</h3>
          <span style={{ color: "red" }}>
            
            <ErrorMessage errors={errors} name="email" />
          </span>
          <img src="/src/assets/icon/mail.svg" alt="" />
          <input
            {...register("email", {
              required: t("errorEnterUsername"),
              minLength: {
                value: 8,
                message: t("errorLength", { length: 8 }),
              },
            })}
            type="text"
            placeholder={t("emailPlaceholder")}
          />
        </div> */}

        {/* Password input */}
        {subPage !== "forgotPassword" && (
          <div className={"inputdiv"}>
            <h3>{t("passwordLabel")}</h3>
            <Icon name="lock-grey"></Icon>

            <Icon
              name="lock-grey"
              callback={() => setShowPassword(!showPassword)}
              className={"eye"}
            ></Icon>
            <span style={{ color: "red" }}>
              <ErrorMessage errors={errors} name="password" />
            </span>
            <input
              {...register("password", {
                required: t("errorEnterPassword"),
                value: "meymey",
                minLength: {
                  value: 5,
                  message: t("errorLength", { length: 5 }),
                },
              })}
              autoComplete="true"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
            />
          </div>
        )}

        {/* Password Confirmation input */}
        {subPage === "navRegister" && (
          <>
            <div className={"inputdiv"}>
              <h3>{t("passwordConfirmLabel")}</h3>
              <Icon name="lock-grey"></Icon>
              <Icon
                name="eye"
                callback={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                className={"eye"}
              ></Icon>

              <span style={{ color: "red" }}>
                <ErrorMessage errors={errors} name="passwordConfirm" />
              </span>
              <input
                {...register("passwordConfirm", {
                  value: "meymey",
                  required: t("errorEnterPassword"),
                  minLength: {
                    value: 5,
                    message: t("errorLength", { length: 5 }),
                  },
                })}
                type={showPasswordConfirmation ? "text" : "password"}
                placeholder={t("passwordConfirmPlaceholder")}
              />
            </div>
          </>
        )}
        {error && <span style={{ color: "red" }}>{error}</span>}

        {/* Submit button */}
        <div className={"buttonContainer"}>
          {subPage === "navLogin" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSubPage("forgotPassword");
              }}
              to={"/passwordrecovery"}
            >
              {t("forgotPassword")}
            </button>
          )}
          {subPage === "navRegister" ? (
            <input
              disabled={loading}
              type="submit"
              className={"button"}
              value={t("registerButton")}
            />
          ) : (
            <input
              disabled={loading}
              type="submit"
              className={"button"}
              value={t("loginButton")}
            />
          )}
        </div>
      </form>
      <p>
        {t("legalNotice")} <b>{t("termsOfUse")}</b>, <b>{t("privacyPolicy")}</b>
      </p>
    </div>
  );
}
