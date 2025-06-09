import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-row'>
        <div className=' p-10 h-screen w-1/3 flex  flex-col gap-3'>
            <div>

                <h1>USER DASHBOARD</h1>
            </div>

            <div className='px-2 justify-center flex flex-col'>
                <Link to={"profile"}>Profile</Link>
                <Link to={"orders"}>Orders</Link>
            </div>
            
        </div>
        <div className=' p-10 w-2/3 bg-amber-500'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard