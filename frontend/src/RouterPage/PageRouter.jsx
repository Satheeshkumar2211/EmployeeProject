import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Sidebar from '../Components/Sidebar';
import Employee from '../Components/Employee';
import Calender from '../Components/Calender';
import Message from '../Components/Message';

const PageRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/sidebar' element={<Sidebar />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/calender' element={<Calender />} />
            <Route path='/message' element={<Message />} />
        </Routes>
    )
}

export default PageRouter