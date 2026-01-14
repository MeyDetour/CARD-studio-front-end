import {useState} from 'react'
import './App.css'
import {GameProvider} from "./context/GameProvider.jsx";

import {BrowserRouter, Route, Router, Routes} from "react-router";
import {UserProvider} from "./context/UserProvider.jsx";
import LoginAndRegisterPage from "./pages/Forms/LoginAndRegister.jsx"; 
import Header from "./components/Header/Header"
import SelectGame from './pages/SelectGame/SelectGame.jsx';
import GameCreationEnvironnement from './pages/GameCreationEnvironnement/GameCreationEnvironnement.jsx';
function App() {

    return (
        <>
            <GameProvider>
                <UserProvider>
                    <BrowserRouter>
                    <Header></Header>
                        <Routes>
                            <Route index element={<SelectGame/>}/>

                            <Route path={"login"} element={<LoginAndRegisterPage/>}/> 
                            <Route path={"newGame/:subpage"} element={<GameCreationEnvironnement/>}/> 


                        </Routes>
                    </BrowserRouter>


                </UserProvider>
            </GameProvider>
        </>
    )
}

export default App
