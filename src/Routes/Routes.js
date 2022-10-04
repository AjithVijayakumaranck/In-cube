import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Payment from '../Components/Admin/Payment/Payment'
import Application from '../Components/Admin/Application/Application'
import Record from '../Components/Admin/Record/Record'
import Booking from '../Components/Admin/Booking/Booking'
import Shedule from '../Components/Admin/SheduleEvent/Shedule'
import Videos from '../Components/Admin/Videos/Videos'
import { Home, Login, Signup, Admin } from "../Pages/serv"
import Layout from '../Components/Admin/Layout/Layout'

const MainRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Layout />} >
                <Route path="payment" element={<Payment />} />
                <Route path="application" element={<Application />} />
                <Route path="record" element={<Record />} />
                <Route path="booking" element={<Booking />} />
                <Route path="shedule" element={<Shedule />} />
                <Route path="videos" element={<Videos />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes