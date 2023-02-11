import React, { useState } from 'react';
import { Header } from "./components/layout/Header";
import { Map } from "./components/Map/Map";
import { SearchContext } from "./contexts/SearchContext";


export function App() {

    const [nameToSearch, setNameToSearch] = useState('');

    return (
        <SearchContext.Provider value={{
            nameToSearch,
            setNameToSearch,
        }}>
            <Header/>
            <Map/>
        </SearchContext.Provider>
    );
}


