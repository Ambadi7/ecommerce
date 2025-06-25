import React, { useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Dropdown = () => {
     const [open,setOpen] = useState(false)
     const {auth} =useContext(AuthContext)
     const toggle =()=>{
        setOpen(value=>!value)
     }

  return (
    <div className=' bg-gray-100
    
     text-gray-800 relative inline-block transition-all duration-600 ease-out'>
        <h1 onClick={toggle}>{auth.user.name}</h1>
        
        <div className={` flex-col origin-top-left absolute left-2 mt-2   ${open ? "flex" : "hidden"} `}>
            <h1 className=' block px-4 py-1 ' onClick={toggle}>{auth.user.role}</h1>
            <Link to={`/dashboard/${auth.user.role ==="ADMIN" ? "admin" : "user"}`} className=' block px-4 py-1' onClick={toggle}>dashboard</Link>
        </div>
    </div>
  )
}

export default Dropdown