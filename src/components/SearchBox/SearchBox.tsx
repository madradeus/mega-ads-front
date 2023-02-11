import React from 'react';
import { SecondaryButton } from "../common/SecondaryButton";
import './SearchBox.css'

export const SearchBox = () => {
    return (
        <form className="search">
            <input type="text"/>
            <SecondaryButton>szukaj</SecondaryButton>
        </form>
    );
};

