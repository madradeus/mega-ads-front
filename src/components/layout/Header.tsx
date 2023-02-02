import React from "react";
import { MainButton } from "../common/MainButton";
import { SecondaryButton } from "../common/SecondaryButton";
import './Header.css';

export const Header = () => (
    <header>
        <h1><span>Mega</span>Ads 📢</h1>
        <MainButton>DODAJ OGŁOSZENIE</MainButton>
        <form className="search">
            <input type="text"/>
            <SecondaryButton>SZUKAJ</SecondaryButton>
        </form>
    </header>
);