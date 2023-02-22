import React, { useContext, useEffect } from 'react';
import { Header } from "../components/layout/Header";
import { Map } from "../components/Map/Map";
import { SearchContext } from "../contexts/SearchContext";

export const MainView = () => {

    const { setNameToSearch } = useContext(SearchContext);

    useEffect(() => {
        return () => {
            setNameToSearch('');
        };
    }, []);


    return (
        <>
            <Header/>
            <Map/>
        </>

    );
};


