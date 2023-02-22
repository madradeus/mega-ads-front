import React, { ChangeEvent, useContext, useState } from 'react';
import { SecondaryButton } from "../common/SecondaryButton";
import { SearchContext } from "../../contexts/SearchContext";
import './SearchBox.css'
import { CloseIcon } from '@chakra-ui/icons';

export const SearchBox = () => {

    const { nameToSearch, setNameToSearch } = useContext(SearchContext);

    const [inputValue, setInputValue] = useState(nameToSearch);
    const [isExpanded, setIsExpanded] = useState(false);

    const passSearchValue = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameToSearch(inputValue);
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
                    <CloseIcon boxSize={3} onClick={() => setInputValue('')}/>
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

