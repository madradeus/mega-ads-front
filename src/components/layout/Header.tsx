import React from "react";
import { MainButton } from "../common/MainButton";
import './Header.css';
import { SearchBox } from "../SearchBox/SearchBox";

export const Header = () => (
    <header>
        <a className="logo" href="/">
            <h1 className='logo'><span>mega</span>Ads 📣</h1>
        </a>
        <MainButton>create new ad</MainButton>
        <SearchBox/>
    </header>
);