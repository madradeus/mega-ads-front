import React, { useState } from 'react';
import { SearchContext } from "./contexts/SearchContext";
import { MainView } from "./views/MainView";
import { Route, Routes } from "react-router-dom";
import { AddFormView } from "./views/AddFormView";


export function App() {

    const [nameToSearch, setNameToSearch] = useState('');

    return (
        <SearchContext.Provider value={{
            nameToSearch,
            setNameToSearch,
        }}>
            <Routes>
                <Route path="/" element={<MainView/>}/>
                <Route path="/add" element={<AddFormView/>}/>
            </Routes>

        </SearchContext.Provider>
    );
}


