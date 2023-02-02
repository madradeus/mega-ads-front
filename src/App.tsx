import React from 'react';
import './App.css'


export function App() {

    return (
        <>
            <header>
                <h1><span>Mega</span>Ads</h1>
                <button className="add">DODAJ OGŁOSZENIE</button>
                <div className="search">
                    <input type="text"/>
                    <button>SZUKAJ</button>
                </div>
            </header>
            <div className="map"></div>
        </>
    );
}


