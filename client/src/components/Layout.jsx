import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'sonner'

const Layout = () => {
  return (
    <>
        <Navbar/>
            <div className='min-h-[65vh]'>
                <Outlet/>
            </div>
        <Footer/>
        <Toaster position="top-right" richColors/>
    </>
  )
}

export default Layout