import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {close,menu} from "../../assets"
import { MyContext } from '../../Context/context';

function NavBar() {
  const { user }  =  useContext(MyContext);
  const [User,setUserName]=useState("")
  const [userConfig, setUserConfig] = user
  console.log(user);
  useEffect(() => {
    const username = localStorage.getItem('userName')
    console.log(username);
    setUserName(username)
  }, [])
  
    const navigate=useNavigate()
    const logoutHandler = async ()=>{
        let result = window.confirm('Are you sure you want to log out?')
        if(result){
            await localStorage.clear()
            navigate('/login')
        }
        }
    const [toggle, setTogle] = useState(false)
  return (
    <div className='fixed z-10 top-0 left-0 w-full shadow-md'>
    <div className=" bg-purple-700 pb-4 ">
       <div className='flex justify-between'>
       <h3 className="text-white font-bold pt-5 pl-5 text-2xl"><span className='text-purple-100'>IN</span>-CUBA</h3>
      <div className='sm:flex hidden '>
      <h2 className='text-white px-3 mt-5' onClick={()=> setUserConfig({...userConfig, name:"Sajith P J"})}>welcome {User}</h2>
        <button className='btn bg-white mr-5 mt-4 rounded-md px-6 text-purple-700 font-semibold' onClick={logoutHandler}>Logout</button>
      </div>
      <div className='sm:hidden  flex flex-col text-white px-3 mt-5 '>
      <img src={toggle ? close : menu} alt="Menu" className='w-[28px] h-[28px] object-contain absolute right-5 '  onClick={()=>{
        setTogle((prev)=> !prev)
      }} />
       
       <ul className={`${toggle ? 'flex flex-col' : "hidden" }   rounded-md text-white text-end px-6 py-3 mt-8`}>
              <li className='text-purple-300 font-medium'>welcome Admin</li>
            <li className='' onClick={logoutHandler}>Logout</li>
        </ul>
       
      </div>
       </div>
    </div>
    </div>
  )
}

export default NavBar