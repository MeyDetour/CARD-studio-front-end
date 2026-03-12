import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { useTokenContext } from "./TokenContext";
import { useNotificationContext } from "./NotificationContext";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { fetchData } = useApi();
  const { getToken } = useTokenContext();
  const {displayError} = useNotificationContext();
  const navigate = useNavigate();

  const fetchUser = async () => {
   let res = await fetchData("api/me", null , {
      token: getToken(),
    });
    if (!res){
      displayError("FailedToRetrieveUserData");
    }
    return res;
  };
  const editUser = async (user) => {
   let res = await fetchData("api/edit/me", user , {
      token: getToken(),
      methode:"PUT"
    });
    if (!res){
      displayError("FailedToModifyUserData");
    }

    return res;
  };

  return (
    <UserContext.Provider value={{ fetchUser , editUser}}>
      {children}
    </UserContext.Provider>
  );
}
export function useUserContext() {
  return useContext(UserContext);
}
