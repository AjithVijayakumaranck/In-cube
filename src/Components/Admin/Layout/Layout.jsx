import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../AdminDashboard/Dashboard'

const Layout = () => {
  return (
    <div className='flex overflow-hidden h-screen'>
        <div>
        <Dashboard />
        </div>
        <div className=" w-full overflow-y-auto ">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout