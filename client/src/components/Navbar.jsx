import React from 'react'
import { Link } from 'react-router-dom'
import { useContext , useState } from 'react'
import AuthContext from '../../context/AuthContext'
import CartContext from '../../context/CartContext'
import useCollection from '../hooks/useCollection'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { toast } from 'sonner'
import axios from 'axios'
import Dropdown from './Dropdown'
import Search from './forms/Search'


const Navbar = () => {
    const {auth,setAuth} = useContext(AuthContext)
    const [extendNav,setExtendNav] = useState(false)
    const [openCollection , setOpenCollection ] = useState(false)
    const collections =useCollection()
    const [cart] = useContext(CartContext)

    const toggle =()=>{
        setOpenCollection(value=>!value)
     }
    
   console.log(collections)

    const handleLogout = async (e) =>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/v1/auth/logout")
            if(data.success){
                setAuth({...auth,user:null,token:""})
                localStorage.removeItem("auth")
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Something wemt wrong in logout")
        }

    }
  return (
    <>
        <div>
            <header className="p-4 bg-gray-100 text-gray-800">
                <div className={`container flex justify-between  mx-auto transition-all duration-400 ${extendNav ? "h-60" : "h-16"}`}>
                    <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="h-16 flex items-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-orange-600">
                            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11. 922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
                            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
                        </svg>
                    </a>

                        <Search/>

                    <ul className={` absolute md:static items-stretch  space-x-3  md:flex transition-all duration-500 ${extendNav ? "flex flex-col  gap-6 left-[79vw] top-20" : "left-[900px] top-[-100px]"}`}>
                        <li className="flex">
                            <Link to={"/"} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Home </Link>
                        </li>
                        <li className="flex">
                                    <Link to={"about"} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent ">About</Link>
                        </li>
                        {/* { 
                            auth.user && 
                            <li className="flex">
                                <Link  rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-emerald-500">{auth.user.name} </Link>
                            </li>
                        } */}
                        {!auth.user ? 
                            <ul className={`items-stretch  space-x-3  md:flex ${extendNav ? "flex flex-col gap-6 " : ""}`}>
                                <li className="flex">
                                    <Link to={"login"} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Login</Link>
                                </li>
                                <li className="flex">
                                    <Link to={"signup"} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Sign up</Link>
                                </li>
                            </ul> 
                            : 
                            <ul className={`items-stretch  space-x-3  md:flex ${extendNav ? "flex flex-col gap-6" : ""}`}>
                                <li className="flex">
                                    <div onClick={toggle} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Collection
                                        <div className={` flex-col top-16 absolute    ${openCollection ? "flex" : "hidden"} `}>
                                                    <Link onClick={toggle} to={"/collection"} className=' block px-4 py-1 ' >Allcollection</Link>
                                                    {
                                                        collections.map((item) => {
                                                            return (
                                                                <div key={item._id}>
                                                                    <Link to={`/collection/${item.slug}`}>{item.name}</Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                        </div>
                                    </div>
                                    
                                </li>
                                
                                <li className="flex">
                                    <Link to={"cart"} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"><ShoppingCartIcon/>{cart?.length}</Link>
                                </li>
                                {/* { 
                                    auth.user && 
                                    <li className="flex">
                                        <Link  rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-emerald-500">{auth.user.name} </Link>
                                    </li>
                                    
                                } */}
                                
                                <li className="flex items-center px-4 -mb-1 border-b-2 border-transparent">
                                    <Dropdown/>
                                </li>
                                <li className="flex">
                                    <Link to={"/"}  onClick={handleLogout} rel="noopener noreferrer"  className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Log out</Link>
                                </li>
                                
                            </ul> 
                        }
                        
                        
                    </ul>
                    <button className="flex justify-end p-4 md:hidden" onClick={()=>{setExtendNav(open=>!open)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    </>
  )
}

export default Navbar