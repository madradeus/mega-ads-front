import React, { ChangeEvent, useContext, useState } from 'react';
import { SecondaryButton } from "../common/SecondaryButton";
import { SearchContext } from "../../contexts/SearchContext";
import './SearchBox.css'

export const SearchBox = () => {

    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const { setNameToSearch } = useContext(SearchContext);

    const passSearchValue = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameToSearch(inputValue);
        setInputValue('')
    };

    // const handleSearchExpand = (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     setIsExpanded(prevState => !prevState)
    // };

    return (
        <>
            {isExpanded
                ?
                <form className="search" onSubmit={passSearchValue}>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    <SecondaryButton>search</SecondaryButton>
                </form>
                :
                <button onClick={() => setIsExpanded(prevState => !prevState)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '34px', fontWeight: 'bold' }}>
                        search
                    </span>
                </button>

            }
        </>
    )
}

