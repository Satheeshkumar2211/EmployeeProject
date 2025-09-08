import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { TbMessage } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { useLocation } from "react-router-dom";


const Sidebar = () => {

    const nav = useNavigate();
    const location = useLocation();


    return (
        <div className='container-fluid  vh-100 border-end  bg-light' >
            <div className="row p-0">
                <ul className='d-flex flex-column justify-content-center align-items-center p-1 gap-2 mt-2'>
                    <li
                        className={`list-inline-item sidebar-text p-3 curso-pointer w-100 ps-4 
    ${location.pathname === "/" ? "active-sidebar" : ""}`}
                        onClick={() => { nav("/") }}
                    >
                        <RiDashboardHorizontalFill className='text-mute' style={{ fontSize: '1.8rem' }} />  Dashboard
                    </li>
                    <li
                        className={`list-inline-item sidebar-text p-3 curso-pointer w-100 ps-4 
    ${location.pathname === "/employee" ? "active-sidebar" : ""}`}
                        onClick={() => { nav("/employee") }}
                    >
                        <HiUsers style={{ fontSize: '1.8rem' }} />  Employee
                    </li>
                    <li
                        className={`list-inline-item sidebar-text p-3 curso-pointer w-100 ps-4 
    ${location.pathname === "/calender" ? "active-sidebar" : ""}`}
                        onClick={() => { nav("/calender") }}
                    >
                        <SlCalender style={{ fontSize: '1.8rem' }} />  Calender
                    </li>
                    <li
                        className={`list-inline-item sidebar-text p-3 curso-pointer w-100 ps-4 
    ${location.pathname === "/message" ? "active-sidebar" : ""}`}
                        onClick={() => { nav("/message") }}
                    >
                        <TbMessage style={{ fontSize: '1.8rem' }} /> Message
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar