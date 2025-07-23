import { useState , createContext } from "react";

const SearchContext = createContext()
const SearchContextProvider = ({ children }) =>{
    const [auth,setAuth] =useState ({
        keyword : "",
        results : [],
    })

    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider