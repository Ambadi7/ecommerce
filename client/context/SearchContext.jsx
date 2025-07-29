import { useState , createContext } from "react";
const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [values,setValues] = useState({
        keyword : "",
        results : [],
    })

    return (
        <SearchContext.Provider value={[values,setValues]}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext