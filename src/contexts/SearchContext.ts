import { createContext } from "react";

export const SearchContext = createContext({
    nameToSearch: '',
    setNameToSearch: (search: string): void => {
        console.log('default fn')
    }
})