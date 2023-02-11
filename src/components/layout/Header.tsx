import React from "react";
import { MainButton } from "../common/MainButton";
import './Header.css';
import { SearchBox } from "../SearchBox/SearchBox";

export const Header = () => (
    <header>
        <a href="/">
            <h1 className='logo'><span>mega</span>Ads 📣</h1>
        </a>
        <MainButton>dodaj ogłoszenie</MainButton>
        <SearchBox/>
    </header>
);