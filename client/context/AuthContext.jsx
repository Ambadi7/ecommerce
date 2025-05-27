
import axios from "axios";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext()
export const AuthContextProvider =({children})=>{

    const[auth,setAuth] = useState({
        user:null,
        token:""
    })
    useEffect( () => {
        const data = localStorage.getItem("auth")
        if(data){
            const parseData = JSON.parse(data)
            setAuth({ ...auth , user : parseData.user , token : parseData.token})
        }
    //eslint-disable-next-line
    } , [] )
    const values ={ 
        auth,
        setAuth
    }

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext