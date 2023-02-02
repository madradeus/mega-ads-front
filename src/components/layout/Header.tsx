import React from "react";
import { MainButton } from "../common/MainButton";
import { SecondaryButton } from "../common/SecondaryButton";
import './Header.css';

export const Header = () => (
    <header>
        <a href="/">
            <h1><span>mega</span>Ads 📣</h1>
        </a>
        <MainButton>dodaj ogłoszenie</MainButton>
        <form className="search">
            <input type="text"/>
            <SecondaryButton>szukaj</SecondaryButton>
        </form>
    </header>
);