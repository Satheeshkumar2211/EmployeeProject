import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";




const Header = () => {
    return (
        <div className='container-fluid bg-light'>
            <div className="row align-items-center border-bottom">
                <div className="col-12 col-md-3 border-end d-flex justify-content-center align-items-center py-3">
                    <h4 className="fw-semibold basic-color fs-3 m-0">RS-TECH</h4>
                </div>

                <div className="col-12 col-md-9">
                    <div className="d-flex justify-content-end align-items-center gap-3 py-3">
                        <div className="rounded-circle light-grey d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                            <button className="btn border-0 p-0">
                                <IoSettingsOutline style={{ fontSize: "1.2rem" }} />
                            </button>
                        </div>

                        <div className="rounded-circle light-grey d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                            <button className="btn border-0 p-0">
                                <IoMdNotificationsOutline style={{ fontSize: "1.2rem" }} />
                            </button>
                        </div>

                        <div className="rounded-circle light-grey d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                            <button className="btn border-0 p-0">
                                <FaRegUserCircle style={{ fontSize: "1.2rem" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header