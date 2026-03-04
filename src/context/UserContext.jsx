
import {createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router";
const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const getToken = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        return token
    }
    const deleteToken = () => {
        localStorage.removeItem("token") 
    }
    const setToken = (newToken) => {
        localStorage.setItem("token", newToken); 
    };
    
 
    return (<UserContext.Provider value={{ user, setUser ,getToken, setToken , deleteToken}}>
        {children}
    </UserContext.Provider>)
}
export function useUserContext() {
    return useContext(UserContext)
}
