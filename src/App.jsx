import {useState} from 'react'
import './App.css'
import {GameProvider} from "./context/GameProvider.jsx";

import {BrowserRouter, Route, Router, Routes} from "react-router";
import {UserProvider} from "./context/UserProvider.jsx";
import LoginAndRegisterPage from "./pages/Forms/LoginAndRegister.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery.jsx";

function App() {

    return (
        <>
            <GameProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Dashboard/>}/>

                            <Route path={"login"} element={<LoginAndRegisterPage/>}/>
                            <Route path={"passwordrecovery"} element={<PasswordRecovery/>}/>


                        </Routes>
                    </BrowserRouter>


                </UserProvider>
            </GameProvider>
        </>
    )
}

export default App
