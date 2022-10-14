import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../../Context/context'
import { fromJSON } from 'postcss'
import FormStatus from './FormStatus'


function Home() {
    let foram
    const { user } = useContext(MyContext)
    const navigate = useNavigate()
    const [formStatus, setFormStatus] = useState({
        pendingStatus: ""
    }
    )
    const token = localStorage.getItem('token')
    console.log(token);
    const [application, setApplication] = useState({})
    const [userCode, setUseCode] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);
    const logoutHandler = async () => {
        let result = window.confirm('Are you sure you want to log out?')
        if (result) {
            await localStorage.clear()
            navigate('/login')
        }
    }

    const [errorMsg, setErrorMsg] = useState({
        firstName: "",
        lastname: "",
        password: "",
        email: ""
    })


    const [form, setForm] = useState({
        name: '',
        address: "",
        city: "",
        state: "",
        email: "",
        phoneNumber: "", 
        companyName: "",
        companyLogo: "",
        backGround: "",
        products: "",
        problem: "",
        solution: "",
        vPropostion: "",
        incubation: "",
        logo: "",
        applicantId: ""
    })

    const functionsStatus = () => {
        console.log(formStatus, "loooooooooo");
    }

    const authorizeToken = async () => {
        if (token) {
            const userId = await localStorage.getItem('userId')
            console.log(userId, 'loog');
            setForm({ ...form, applicantId: userId });
            console.log(userCode, "bull shit");
            navigate('/');
            fetchId(userId)
        } else {
            navigate('/login')
        }
    }

    const fetchId = async (Id) => {
        // console.log(userId,'ohayo')
        axios.post('http://localhost:4000/auth/formsubmited', { userId: Id }).then(async (response) => {
            console.log(response.data, "lookam moonji")
            const forms = response.data.pendingstatus;

            console.log(forms, "looooogoooo");
            //   setFormStatus({...formStatus,pendingStatus:forms.pendingstatus})
            // formStatus.pendingStatus=forms
            setFormStatus({ ...formStatus, ...response.data })
            // foram=formdata
            console.log(formStatus, 'hello sisri iam alexa');
            functionsStatus()
        })
    }

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const uploadFile = (event) => {
        let file = event.target.files[0];
        console.log(file);
        setForm({ ...form, logo: file });
    }

    //   const radioHandler = (e)=>{
    //     setForm({...form,[e.target.name]:e.target.})
    //   }


    useEffect(() => {
        authorizeToken()
    }, [])
    console.log(formStatus, " lokam  theernumanam ayi");
    const onSubmitfunction = async (e) => {

        e.preventDefault()
        console.log(userCode, "yoooo");
        console.log(form, 'yo yo hony');
        // await setForm({...form,applicantId:userCode})
        // console.log(form,"hony");
        let data = new FormData();
        for (let key in form) {
            data.append(key, form[key]) // email , 
        }
        // data.applicantId=userCode
        axios.post('http://localhost:4000/auth/test', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(() => {
            // console.log({...form},'lool');
            setForm({
                ...form,
                name: '',
                address: "",
                city: "",
                state: "",
                email: "",
                phoneNumber: "",
                companyName: "",
                companyLogo: "",
                backGround: "",
                products: "",
                problem: "",
                solution: "",
                vPropostion: "",
                incubation: "",
                logo: "",

            })
            setIsSubmitted(true);
            console.log({ ...form }, 'loolsadas');
            console.log(form, 'hello gooooogle');
        })
        console.log(form, "hello siri")

    }
    return (
        <div>
            {


                !formStatus.pendingstatus && !isSubmitted ? <div>

                    {

                        console.log(formStatus.pendingStatus, "hello google chechi")

                    }
                    <div className="flex relative top-[50px] z-0 flex-col justify-center pt-3 overflow-hidden">
                        <div className="w-full p-6 m-auto bg-white rounded-md  ">
                            <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                                IN-CUBA <span className='text-slate-600'>application</span>
                            </h1>

                            <hr className='mt-6  bg-purple-700 w-[50%] mx-auto h-[2px]' />
                            <form className="mt-6" onSubmit={onSubmitfunction} >
                                <div className='flex flex-col lg:flex-row justify-evenly'>
                                    <div className="mb-2 px-3 lg:w-[50%] ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.name}
                                            name='name'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                    <div className="mb-2 px-3 lg:w-[50%]">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Address
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.address}
                                            name='address'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 md:col-span-1 pr-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            City
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.city}
                                            name='city'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>

                                    <div className="mb-2 col-span-2 md:col-span-1 md:pl-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            State
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.state}
                                            name='state'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 md:col-span-1 pr-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.phoneNumber}
                                            name='phoneNumber'
                                            type="number"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>

                                    <div className="mb-2 col-span-2 md:col-span-1 md:pl-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Email
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.email}
                                            name='email'
                                            type="email"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Conpany Name
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={form.companyName}
                                            name='companyName'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Describe your Team and Background
                                        </label>
                                        <textarea rows="2"
                                            onChange={onChangeHandler}
                                            value={form.backGround}
                                            name='backGround'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Describe your Company and Products
                                        </label>
                                        <textarea rows="2"
                                            onChange={onChangeHandler}
                                            value={form.products}
                                            name='products'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Describe the problem you are trying to solve
                                        </label>
                                        <textarea rows="2"
                                            onChange={onChangeHandler}
                                            value={form.problem}
                                            name='problem'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            What is unique about your solution?
                                        </label>
                                        <textarea rows="2"
                                            onChange={onChangeHandler}
                                            value={form.solution}
                                            name='solution'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 px-3'>

                                </div>
                                <div className='grid grid-cols-2 px-3'>
                                    <div className="mb-2 col-span-2 ">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            What is value propotion for the customer?
                                        </label>
                                        <textarea rows="2"
                                            onChange={onChangeHandler}
                                            value={form.vPropostion}
                                            name='vPropostion'
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border border--500 rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        {errorMsg.firstName !== '' ? <p> {errorMsg.firstName} </p> : null}
                                    </div>
                                </div>
                                <div className="mb-2 col-span-2 ">
                                    <label
                                        className="block text-sm font-semibold text-gray-800 text-center mt-2 mb-5"
                                    >
                                        Type of Incubation you need
                                    </label>
                                    <div className='grid grid-cols-4 mt-2'>
                                        <div onChange={onChangeHandler} className='md:col-span-1 md:col-start-2 pl-5 col-span-4 mb-4 text-white bg-purple-700 rounded py-3 mr-2'>
                                            <input type="radio" name="incubation" value="physical_Incubation" className='' /><span className='font-medium pl-6'>Physical Incubation</span></div>
                                        <div onChange={onChangeHandler} className='md:col-span-1 md:col-start-3 pl-5 col-span-4 mb-4 text-white bg-purple-700 rounded py-3 mr-2'>
                                            <input type="radio" name="incubation" value="Virtual_Incubation" className='' /><span className='font-medium pl-6'>Virtual Incubation</span></div>
                                    </div>

                                </div>
                                <div className='grid grid-cols-3 mt-2'>
                                    <label
                                        className="block text-sm font-semibold text-gray-800 text-center mt-2 mb-5 col-span-3 "
                                    >
                                        Choose Company logo
                                    </label>

                                    <label htmlFor="chooseFile" className='text-white text-center rounded-md bg-purple-700 btn col-span-1 col-start-2 py-3'>Upload</label>
                                    {/* <h6>{form.companyLogo}</h6> */}

                                    <input className='col-start-2  hidden' id="chooseFile" type="file" onChange={uploadFile} name='logo' />
                                </div>
                                <div className="mt-6 grid grid-cols-3">
                                    <input value="Submit" type="submit" className="md:col-span-1 md:col-start-2 px-4 py-2 tracking-wide col-span-3 text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    </input>
                                </div>
                                {/* {error &&  <div className='text-center text-red-600'>{error}</div>} */}
                            </form>


                        </div>
                    </div>
                </div> : <div className="flex relative top-[50px] z-0 flex-col justify-center pt-3 overflow-hidden">
                    <div className='flex justify-center pt-[200px]'>
                        <h1 className='text-purple-700 font-bold text-4xl'>Form Submited</h1>
                    </div>
                </div>

            }
        </div>
    )
}

export default Home