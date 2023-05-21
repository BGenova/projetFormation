import logo from './logo.svg';
import './App.css';
import {NavBar} from "./component/partial/Navbar/NavBar";
import React, {createContext, StrictMode, useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Home} from "./component/page/front/Home/Home";
import ProjectForm from "./component/page/front/Project/ProjectForm/ProjectForm";
import {Projects} from "./component/page/front/Project/Projects/Projects";
import {ProjectShow} from "./component/page/front/Project/ProjectShow/ProjectShow";

export const MetamaskContext = createContext();


export function App() {
    const [isMetamaskConnected, setMetamaskConnected] = useState([
        {
            isMetamaskConnected: false,
            address: null,
        }
    ]);

    return (
        <StrictMode>
            <MetamaskContext.Provider value={{isMetamaskConnected, setMetamaskConnected}}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/team" element={<Home/>}/>
                        <Route path="/project/:id" element={isMetamaskConnected.isMetamaskConnected ? <ProjectShow/> : <Home/>}/>
                        <Route path="/project/create"
                               element={isMetamaskConnected.isMetamaskConnected ? <ProjectForm/> : <Home/>}/>
                        <Route path="/projects" element={isMetamaskConnected.isMetamaskConnected ? <Projects/> : <Home/>}/>
                    </Routes>
                </Router>
            </MetamaskContext.Provider>
        </StrictMode>
    );
}
