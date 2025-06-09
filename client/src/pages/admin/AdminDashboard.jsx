import React from 'react'
import { Link , Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='flex flex-row'>
        <div className=' p-10 h-screen w-1/3 flex  flex-col gap-3'>
            <div>

                <h1>ADMIN DASHBOARD</h1>
            </div>

            <div className='px-2 justify-center flex flex-col'>
                <Link to={"manage-users"}>Manage Users</Link>
                <Link to={"create-collection"}>Create Collection</Link>
                <Link to={"create-product"}>Create Product</Link>
            </div>
            
        </div>
        <div className=' p-10 w-2/3 bg-blue-500'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminDashboard