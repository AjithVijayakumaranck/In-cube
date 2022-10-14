import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css"
import axios from '../../config/config'
// import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState({
        firstName:"",
        lastname:"",
        password:"",
        email:""
    })


    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const validateForm = ()=>{
        let firstNameError = ''

        if( firstName === ''){
            firstNameError = 'First Name required' 
        }

        if( firstNameError !== '' ){
            setErrorMsg({...errorMsg, firstName:firstNameError})
            return false;
        }
        return true;
    }

    const signUpHandler = async (e) => {

        e.preventDefault()
        const isValid = validateForm();
        
        if(isValid){
            const registered = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }

            await axios.post('http://localhost:4000/signup',registered).then((response) => {
                console.log(response.data);
                setEmail("")
                setPassword("")
                setfirstName("")
                setlastName("")
                navigate('/login')

            }).catch((err => {
                console.log(err);
            }))
        } 

    }


    const onChangeHandler = ( event )=>{
        setfirstName(event.target.value);
        if( event.target.name === "firstName" ){
            if( event.target.value.length < 5){
                setErrorMsg({ ...errorMsg, firstName: "Atleast 5 characters required" })
            }
            else setErrorMsg({ ...errorMsg, [event.target.name]:''})
        }
    }
    return (
        <div>

            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                        Create Account
                    </h1>
                    <form className="mt-6" onSubmit={signUpHandler}>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                First Name
                            </label>
                            <input
                                onChange={onChangeHandler}
                                value={firstName}
                                name='firstName'
                                type="text"
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            { errorMsg.firstName !==''? <p className='text-sm p-1 text-red-600'> {errorMsg.firstName} </p>: null }
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Last Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setlastName(e.target.value)
                                    onChangeHandler()
                                }}
                                value={lastName}
                                name="lastname"
                                type="text"
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                                type="email"
                                name="email"
                                required
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
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                name="password"
                                type="password"
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
          
                        <div className="mt-6">
                            <input value="Signup" type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            </input>

                        </div>
                       {/* {error &&  <div className='text-center text-red-600'>{error}</div>} */}
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Already have an account?{" "}
               
                        <Link to="/login" className="font-medium text-purple-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App