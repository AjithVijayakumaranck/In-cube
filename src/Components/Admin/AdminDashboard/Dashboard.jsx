import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { shield } from '../../../assets'
import { SideBarWidth } from '../../../Context/sidebarContext'


// import {} from 

const menu = [
    {
        menuitem: "Application List",
        path: '/admin/application',
        logo: "A"
    },
    {
        menuitem: "Record Track",
        path: '/admin/record',
        logo: "R"
    },
    {
        menuitem: "Booking Slots",
        path: '/admin/booking',
        logo: "B"
    },
    {
        menuitem: "Declined List",
        path: '/admin/shedule',
        logo: "D"
    },
    {
        menuitem: "Allocated List",
        path: '/admin/videos',
        logo: "V"
    },
    {
        menuitem: "Payment",
        path: '/admin/payment',
        logo: "P"
    },
   
   
]

function Dashboard() {
    // const wid = useContext(SideBarWidth)
    const [open, setOpen] = useState(true)
    // const[open,setOpen] =  wid
    const openHandler = () => {
        setOpen(!open)
    }
    const navigate = useNavigate()
    return (
        <div className=''>
                <div className='relative'>
                    <button onClick={openHandler} className="absolute right-[-12px]  top-5 p-0 m-0  bg-purple-500 w-8 h-8 shadow-md"></button>
                </div>
            <div className={`h-[100vh] in_cuba-scroller overflow-y-auto bg-purple-700 ${open ? 'w-[250px]' : 'w-20'} duration-300`}>
                <div className='flex justify-center bg-purple-800'>
                    {
                        open ? <h3 className={` text-white font-bold pt-5 pb-5 text-2xl duration-300 ease-in-out `}><span className='text-purple-100'>IN</span>-CUBA</h3> : <h3 className=" text-white font-bold pt-5 pb-5  text-3xl duration-300 ease-in-out "><span className='text-purple-100'>IN</span></h3>
                    }
                </div>

                <div>

                </div>
                <div className='pt-8 flex flex-col align-baseline'>

                    <ul>

                        {menu.map((menuItem, index) => {
                            return (
                                <li key={index} className={`${window.location.pathname==menuItem.path ? 'bg-purple-600' : null }`} onClick={() => {
                                    navigate(menuItem.path)
                                }}>

                                    {
                                        open ? <h2 className='text-white text-left pl-3 font-normal py-4 origin-left duration-300  hover:bg-purple-600 hover:text-white hover:scale-100 border-b-[1px] border-purple-600 cursor-pointer'>
                                            {menuItem.menuitem}
                                        </h2> : <h2 className='text-white text-center font-normal py-4 origin-left duration-300 hover:bg-purple-600 hover:text-white hover:scale-100 border-b-[1px] border-purple-600 cursor-pointer'>{menuItem.logo}</h2>
                                    }

                                </li>


                            )
                        })}
                    </ul>







                </div>
                <div className='mb-0'>
                    {
                        open ? <h2 className='text-white text-left pl-3 font-normal py-4 origin-left duration-300  hover:bg-purple-600 hover:text-white hover:scale-100 border-b-[1px] border-purple-600 cursor-pointer'>
                            Logout
                        </h2> : <h2 className='text-white text-center font-normal py-4 origin-left duration-300 hover:bg-purple-600 hover:text-white hover:scale-100 border-b-[1px] border-purple-600 cursor-pointer'>L</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard