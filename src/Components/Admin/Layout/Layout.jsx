import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Dashboard from '../AdminDashboard/Dashboard'

const Layout = () => {
 const navigate=useNavigate()
  useEffect(() => {
    navigate('/admin/application')
  },[])
  
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