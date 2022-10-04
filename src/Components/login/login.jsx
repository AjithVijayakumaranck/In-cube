import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../config/config'



function Signup() {
    const navigate =  useNavigate();
    const  token  = localStorage.getItem('token') 
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("") 
    const [error,setError] = useState("")

    const authorizeToken = () => {
      if(token){
            navigate('/');
      }else{
        navigate('/login')
      }
    }


    useEffect(()=>{
        authorizeToken()
    },[])
    const loginHandler = async (e) => {
        console.log("code is not here");
        try {

            e.preventDefault()
            const registered = {
                email: email,
                password: password
            }

            await axios.post("http://localhost:4000/auth/login",registered).then((response) => {
                console.log(response.data);
                const { token } = response.data
                localStorage.setItem( "token", "Bearer " + token);
                setEmail("")
                setPassword("")
                navigate('/')
                
            }).catch((err => {
                console.log(err);
            }))
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status >= 500) {
                setError(error.response.data.message)
            }

        }

    }
  return (
<div>
<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={loginHandler}>
                    <div className="mb-2">
                        <label
                           className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            value={email}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <input type='submit'
                        value="login"

                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" />
                        
                        
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-medium text-purple-600 hover:underline"> Sign up
                    </Link>
                    {/* <a
                        href="/signup"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a> */}
                </p>
            </div>
        </div>
</div>
  )
}

export default Signup