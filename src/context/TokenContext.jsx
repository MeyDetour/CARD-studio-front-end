import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";

const TokenContext = createContext();

export function TokenProvider({ children }) {  
 
  const navigate = useNavigate();
  const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    return token;
  };
  const deleteToken = () => {
    localStorage.removeItem("token");
  };
  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
  }; 
 

  return (
    <TokenContext.Provider
      value={{  getToken, setToken, deleteToken }}
    >
      {children}
    </TokenContext.Provider>
  );
}
export function useTokenContext() {
  return useContext(TokenContext);
}
