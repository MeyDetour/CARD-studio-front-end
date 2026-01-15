
import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setTokenState] = useState(  localStorage.getItem("token"));

    const deleteToken = () => {
        localStorage.removeItem("token")
    }
    const setToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setTokenState(newToken);
    };
    useEffect(() => {

        async function fetchUser() {

            // let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/user/me", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`
            //     }
            // })
            // if (!jsonResponse.ok) {
            //     throw new Error(`Response status: ${jsonResponse.status}`);
            // }
            // if (jsonResponse.status === 401) {
            //     deleteToken()
            //     window.location.href = "/registerLoginPage";
            // }

         //   const result = await jsonResponse.json();
            setToken({
                "token": "fjkregkjvsjcnkjdfd",
            });


        }
        // if (!token) {
        //     setUser(null);
        //     return
        // }
        if (!token ) {
         //   fetchUser();
        }


    }, [token,user])

    console.log(user,token)
    return (<UserContext.Provider value={{ user, setUser ,token, setToken , deleteToken}}>
        {children}
    </UserContext.Provider>)
}
export function useUserContext() {
    return useContext(UserContext)
}
