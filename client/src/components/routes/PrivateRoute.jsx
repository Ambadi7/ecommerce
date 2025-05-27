import React, { useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader'

const PrivateRoute = () => {
    const {auth} = useContext(AuthContext)
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        const authCheck = async () =>{
            const {data} = await axios.get("/api/v1/auth/user-auth")
            if(data.ok){
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if(auth?.token) authCheck()
    },[auth?.token])
  return (
    ok ? <Outlet/> : <Loader/>
  )
}

export default PrivateRoute