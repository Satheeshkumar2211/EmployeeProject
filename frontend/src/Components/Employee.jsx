import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import edit from '../asset/edit.png'
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useRef } from "react";
import { TiCameraOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from 'react-toastify';



const Employee = () => {

    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
        department: "",
        designation: "",
        project: "",
        type: "",
        status: "",
    });

    const [employees, setEmployees] = useState([]);
    const [addEmployee, setaddEmployee] = useState("table");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [image, setImage] = useState(null);
    const [updatedimage, setupdatedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [updatepreview, setUpdatePreview] = useState(null);
    const [loading, setLoading] = useState(false);


    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const APIURL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file))
            console.log("Selected file:", file.name);
        }
    };

    const handleUpdateFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setupdatedImage(file);
            setUpdatePreview(URL.createObjectURL(file))
            console.log("Selected file:", file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.employeeId.trim() ||
            !formData.department.trim() ||
            !formData.designation.trim() ||
            !formData.project.trim() ||
            !formData.type.trim() ||
            !formData.status.trim()
        ) {
            toast.error("Please fill all required fields!");
            return;
        }

        if (!image && !formData.image_id) {
            toast.error("Please upload an image!");
            return;
        }

        if (loading) return;
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("employeeId", formData.employeeId);
        data.append("department", formData.department);
        data.append("designation", formData.designation);
        data.append("project", formData.project);
        data.append("type", formData.type);
        data.append("status", formData.status);

        if (image) {
            data.append("image", image);
        }

        try {
            const res = await axios.post(`${APIURL}/employees`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.status == 200) {
                console.log("Success:", res.data);
                toast.success("Employee Added successfully!");
                fetchEmployees();

                setImage(null)
                setTimeout(() => {
                    setaddEmployee("table");
                    setLoading(false);
                    setFormData({
                        name: "",
                        employeeId: "",
                        department: "",
                        designation: "",
                        project: "",
                        type: "",
                        status: "",
                    });
                }, 1500);
            }

        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("Something went wrong. Please try agaijbjbjn!");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${APIURL}/employees/${id}`);
                    Swal.fire("Deleted!", "Employee has been deleted.", "success");
                    fetchEmployees();
                } catch (error) {
                    console.error("Error deleting employee:", error);
                    Swal.fire("Error!", "Failed to delete employee.", "error");
                }
            }
        });
    };

    const handleEdit = (employee) => {
        setUpdatePreview(null)

        setSelectedEmployee(employee);
        setFormData({ ...employee });
        setaddEmployee("editemployee")
    };

    const handleView = (employee) => {
        setaddEmployee("ViewEmployee");
        setFormData({ ...employee });
        // setSelectedEmployee(employee);

    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        const updateData = new FormData();
        updateData.append("name", formData.name);
        updateData.append("employeeId", formData.employeeId);
        updateData.append("department", formData.department);
        updateData.append("designation", formData.designation);
        updateData.append("project", formData.project);
        updateData.append("type", formData.type);
        updateData.append("status", formData.status);

        if (updatedimage) {
            updateData.append("image", updatedimage);
        }

        console.log('updateData', updateData);

        try {
            const responce = await axios.put(
                `${APIURL}/employees/${selectedEmployee.id}`,
                updateData, {
                headers: { "Content-Type": "multipart/form-data" },
            }
            );
            if (responce.status == 200) {
                setupdatedImage("")
                fetchEmployees();
                toast.success("Employee Updated successfully!");
                setTimeout(() => {
                    setaddEmployee("table");
                    setLoading(false);

                }, 1500);

            }

        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error("Something Went Wrong !!!");
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${APIURL}/employees`);
            if (res.status == 200) {
                setEmployees(res.data);
            }
        } catch (err) {
            toast.error("Data Fetch Process Failed");
            console.error("Error fetching employees:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();

    }, [])

    const filteredEmployees = employees.filter((emp) =>
        Object.values(emp).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const AddEmployeeChack = () => {

        setFormData({
            name: "",
            department: "",
            designation: "",
            project: "",
            type: "",
            status: "",
        });
        setImage(null);

        setaddEmployee("table")
    }

    function getContent() {
        let returntxt = ""
        switch (addEmployee) {
            case "table":
                returntxt = <>
                    <div className="row py-4 align-items-center">
                        <div className="col-12 col-md-6">
                            <h2 className="fw-semibold m-0">Employee</h2>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-start gap-3 mt-3 mt-md-0">
                            <div className="position-relative">
                                <IoSearchOutline
                                    className="position-absolute top-50 translate-middle-y ms-2 text-muted"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="form-control ps-5"
                                    id="text-content"
                                    aria-describedby="content"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn basic-background text-white fw-semibold d-flex align-items-center gap-2"
                                onClick={() => {
                                    setaddEmployee("addemployee");
                                    setFormData({
                                        name: "",
                                        department: "",
                                        designation: "",
                                        project: "",
                                        type: "",
                                        status: "",
                                    });
                                    // setImage = ("");
                                    setPreview("")
                                }}
                            >
                                <IoIosAddCircleOutline style={{ fontSize: "1.4rem" }} />
                                Add Employee
                            </button>
                        </div>
                    </div>

                    <div className="py-4">
                        <div className="rounded-4 border">
                            <div className="container">
                                <table class="table mb-0  ">
                                    <thead className='border-bottom'>
                                        <tr className=' text-center'>
                                            <th className='py-2 Table-text py-3'>Employee Name</th>
                                            <th className='py-2 Table-text py-3'>Employee ID</th>
                                            <th className='py-2 Table-text py-3'>Department</th>
                                            <th className='py-2 Table-text py-3'>Designation</th>
                                            <th className='py-2 Table-text py-3'>Project</th>
                                            <th className='py-2 Table-text py-3'>Type</th>
                                            <th className='py-2 Table-text py-3'>Status</th>
                                            <th className='py-2 Table-text py-3'>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEmployees.length > 0 ? (
                                            filteredEmployees.map((emplyee, index) => (
                                                <tr key={emplyee.id} className="text-center align-middle">
                                                    <td className="table-data">
                                                        <div className="d-flex align-items-center justify-content-start gap-2">
                                                            {emplyee.image_id ? (
                                                                <img
                                                                    src={`${APIURL}/uploads/${emplyee.image_id}`}
                                                                    alt={emplyee.name}
                                                                    className="Image-employee"
                                                                />
                                                            ) : (
                                                                <span className="me-2"></span>
                                                            )}
                                                            <span>{emplyee.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="table-data">{emplyee.employeeId}</td>
                                                    <td className="table-data">{emplyee.department}</td>
                                                    <td className="table-data">{emplyee.designation}</td>
                                                    <td className="table-data">{emplyee.project}</td>
                                                    <td className="table-data">{emplyee.type}</td>
                                                    <td className="table-data">{emplyee.status}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center gap-1">
                                                            <button className="btn border-0">
                                                                <FiEye
                                                                    onClick={() => {
                                                                        handleView(emplyee)
                                                                    }}
                                                                />
                                                            </button>
                                                            <button
                                                                className="btn border-0"
                                                                onClick={() => {
                                                                    handleEdit(emplyee);
                                                                }}
                                                            >
                                                                <img style={{ height: ".9rem" }} src={edit} alt="" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(emplyee.id)}
                                                                className="btn border-0"
                                                            >
                                                                <RiDeleteBin6Line />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="fw-bold text-center py-3 text-muted">
                                                    No Record Found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </>
                break;
            case "addemployee":
                returntxt = <>
                    <div className="container-fluid">
                        <div className="pt-4 pb-5 d-flex flex-row gap-2">
                            <IoIosArrowBack
                                className='curso-pointer'
                                style={{ fontSize: '2.4rem' }}
                                onClick={AddEmployeeChack}
                            />
                            <h2 className='mb-0'>
                                Add New Employee
                            </h2>
                        </div>
                        <div className="pb-2 border-bottom">
                            <div className="d-flex flex-start align-items-center gap-2">
                                <FaRegUserCircle className='basic-color' style={{ fontSize: '1.5rem' }} />
                                <p className='fw-semibold  basic-color mb-0' style={{ fontSize: "1.3rem" }}>
                                    Personal Information
                                </p>
                            </div>

                        </div>
                        <div className='container'>
                            <form onSubmit={handleSubmit} className="p-3">
                                <div className="row g-3">
                                    <div className="col-12 col-md-12">
                                        <div className="border d-flex justify-content-center align-items-center" style={{ height: '4rem', width: '5rem', overflow: "hidden" }}>

                                            {
                                                preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Selected"
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <TiCameraOutline
                                                        className='rounded-4 curso-pointer'
                                                        style={{ fontSize: '1.5rem' }}
                                                        onClick={handleImageClick}
                                                    />
                                                )
                                            }

                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="inputName" class="form-label form-lable ">Name*</label>
                                        <input
                                            type="text"
                                            class="form-control "
                                            id="inputName"
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Enter Name'
                                        ></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="inputemplyeeId" class="form-label form-lable ">Employee ID*</label>
                                        <input
                                            name='employeeId'
                                            value={formData.employeeId}
                                            placeholder='Enter EmployeeId'
                                            onChange={handleChange}
                                            type="text"
                                            class="form-control "
                                            id="inputemplyeeId"
                                        ></input>
                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputDepartment" className="form-label form-lable">Department*</label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputDepartment"
                                        >
                                            <option value=""> Select Department </option>
                                            <option value="HR">HR</option>
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputDesignation" className="form-label form-lable">Designation*</label>
                                        <select
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputDesignation"
                                        >
                                            <option value="">Select Designation </option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Team Lead">Team Lead</option>
                                            <option value="Project Manager">Project Manager</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="inputAddress" class="form-label form-lable ">Project*</label>
                                        <input
                                            placeholder='Enter Project'
                                            name='project'
                                            value={formData.project}
                                            onChange={handleChange}
                                            type="text" class="form-control " id="inputProject"></input>
                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputType" className="form-label form-lable">Type*</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputType"
                                        >
                                            <option value=""> Select Type </option>
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Intern">Intern</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="col-12 col-md-6 mb-4 position-relative">
                                        <label htmlFor="inputStatus" className="form-label form-lable">Status*</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputStatus"
                                        >
                                            <option value=""> Select Status </option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="On Leave">On Leave</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="row ">
                                        <div className='d-flex justify-content-end align-items-center gap-2'>
                                            <button onClick={() => { setaddEmployee("table") }}
                                                className='btn border-0   py-2 px-4'>
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className='btn border-0 Submit-btn text-white fw-semibold py-2 px-4'
                                                disabled={loading}
                                            >
                                                {loading ? "Processing..." : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </>
                break;
            case "editemployee":
                returntxt = <>
                    <div className="container-fluid">

                        <div className="pt-4 pb-5 d-flex flex-row gap-2">
                            <IoIosArrowBack
                                className='curso-pointer'
                                style={{ fontSize: '2.4rem' }}
                                onClick={() => { setaddEmployee("table") }}
                            />
                            <h2 className='mb-0'>
                                Edit Employee Details
                            </h2>
                        </div>

                        <div className="pb-2 border-bottom">
                            <div className="d-flex flex-start align-items-center gap-2">
                                <FaRegUserCircle className='basic-color' style={{ fontSize: '1.5rem' }} />
                                <p className='fw-semibold  basic-color mb-0' style={{ fontSize: "1.3rem" }}>
                                    Personal Information
                                </p>
                            </div>
                        </div>

                        <div className='pt-3'>
                            <form onSubmit={handleUpdate} className="p-3">
                                <div className="row g-3">
                                    <div className="row">
                                        <div className="col-12 col-md-2 position-relative">
                                            <img
                                                src={updatepreview ? updatepreview : `${APIURL}/uploads/${formData.image_id}?time=${new Date().getTime()}`}
                                                alt={formData.name}
                                                width="100"
                                                height="100"
                                                className='rounded-2  img-fuid'
                                            />
                                            <img
                                                className="img-fuid position-absolute ms-1 text-muted edit-img-style curso-pointer"
                                                src={edit}
                                                alt="edit"
                                                onClick={handleImageClick}

                                            />
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleUpdateFileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="inputName" class="form-label ">Name*</label>
                                        <input
                                            type="text"
                                            class="form-control "
                                            id="inputName"
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Enter Name'
                                        ></input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label for="inputemplyeeId" class="form-label ">Employee ID*</label>
                                        <input
                                            name='employeeId'
                                            value={formData.employeeId}
                                            placeholder='Enter EmployeeId'
                                            onChange={handleChange}
                                            type="text"
                                            class="form-control "
                                            id="inputemplyeeId"
                                        ></input>
                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputDepartment" className="form-label form-lable">Department*</label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputDepartment"
                                        >
                                            <option value=""> Select Department </option>
                                            <option value="HR">HR</option>
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputDesignation" className="form-label form-lable">Designation*</label>
                                        <select
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputDesignation"
                                        >
                                            <option value="">Select Designation </option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Team Lead">Team Lead</option>
                                            <option value="Project Manager">Project Manager</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label for="inputAddress" class="form-label ">Project*</label>
                                        <input
                                            placeholder='Enter Project'
                                            name='project'
                                            value={formData.project}
                                            onChange={handleChange}
                                            type="text" class="form-control " id="inputProject"></input>
                                    </div>
                                    <div className="col-12 col-md-6 position-relative">
                                        <label htmlFor="inputType" className="form-label form-lable">Type*</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputType"
                                        >
                                            <option value=""> Select Type </option>
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Intern">Intern</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>

                                    <div className="col-12 col-md-6 mb-4 position-relative">
                                        <label htmlFor="inputStatus" className="form-label form-lable">Status*</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="inputStatus"
                                        >
                                            <option value=""> Select Status </option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="On Leave">On Leave</option>
                                        </select>
                                        <IoIosArrowDown className='position-absolute' style={{ right: '1.3rem', top: '3rem' }} />

                                    </div>
                                    <div className="row ">
                                        <div className='d-flex justify-content-end align-items-center gap-2'>
                                            <button onClick={() => { setaddEmployee("table") }} className='btn border-0   py-2 px-4'>
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className='btn border-0 Submit-btn text-white fw-semibold py-2 px-4'
                                                disabled={loading}
                                            >
                                                {loading ? "Processing..." : "Update"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </>
                break;
            case "ViewEmployee":
                returntxt = <>
                    <div className="container-fluid">

                        <div className="pt-4 pb-5 d-flex flex-row gap-2">
                            <IoIosArrowBack
                                className='curso-pointer'
                                style={{ fontSize: '2.4rem' }}
                                onClick={() => { setaddEmployee("table") }}
                            />
                            <h2 className='mb-0'>
                                View Employee Details
                            </h2>
                        </div>

                        <div className="pb-2 border-bottom">
                            <div className="d-flex flex-start align-items-center gap-2">
                                <FaRegUserCircle className='basic-color' style={{ fontSize: '1.5rem' }} />
                                <p className='fw-semibold  basic-color mb-0' style={{ fontSize: "1.3rem" }}>
                                    Personal Information
                                </p>
                            </div>
                        </div>

                        <div className='pt-3'>
                            <form className="p-3">
                                <div className="row g-3">
                                    <div className="row">
                                        <div className="col-12 col-md-2 ">
                                            <img
                                                src={`${APIURL}/uploads/${formData.image_id}`}
                                                alt={formData.name}
                                                width="100"
                                                height="100"
                                                className='rounded-2  img-fuid'
                                            />
                                        </div>
                                    </div>
                                    <div className="row border-2 border-bottom my-2">
                                        <div className="col-12 col-md-6 ">
                                            <label for="inputName" class="form-label ">Name*</label>
                                            <input
                                                type="text"
                                                class="form-control no-border "
                                                id="inputName"
                                                name='name'
                                                value={formData.name}
                                                disabled readonly
                                            ></input>
                                        </div>
                                        <div className="col-12 col-md-6 ">
                                            <label for="inputemplyeeId" class="form-label ">Employee ID*</label>
                                            <input
                                                name='employeeId'
                                                value={formData.employeeId}
                                                type="text"
                                                class="form-control no-border"
                                                id="inputemplyeeId"
                                                disabled readonly
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="row border-2 border-bottom my-2">
                                        <div className="col-12 col-md-6 ">
                                            <label htmlFor="inputDepartment" className="form-label form-lable">Department*</label>

                                            <input
                                                name='department'
                                                value={formData.department}
                                                type="text"
                                                class="form-control no-border"
                                                id="inputDepartment"
                                                disabled readonly
                                            ></input>

                                        </div>
                                        <div className="col-12 col-md-6 ">
                                            <label htmlFor="inputDesignation" className="form-label form-lable">Designation*</label>

                                            <input
                                                name='designation'
                                                value={formData.designation}
                                                type="text"
                                                class="form-control no-border"
                                                id="inputDesignation"
                                                disabled readonly
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="row border-2 border-bottom my-2">
                                        <div className="col-12 col-md-6 ">
                                            <label for="inputAddress" class="form-label ">Project*</label>
                                            <input
                                                placeholder='Enter Project'
                                                name='project'
                                                value={formData.project}
                                                type="text" class="form-control no-border" id="inputProject"
                                                disabled readonly
                                            ></input>
                                        </div>
                                        <div className="col-12 col-md-6 ">
                                            <label htmlFor="inputType" className="form-label form-lable">Type*</label>
                                            <input
                                                name='type'
                                                value={formData.type}
                                                type="text"
                                                class="form-control no-border"
                                                id="inputtype"
                                                disabled readonly
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="row border-2 border-bottom my-2">
                                        <div className="col-12 col-md-6 mb-4 ">
                                            <label htmlFor="inputStatus" className="form-label form-lable">Status*</label>
                                            <input
                                                name='status'
                                                value={formData.status}
                                                type="text" class="form-control no-border" id="inputstatus" disabled readonly></input>

                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </>
                break;



            default:
                break;
        }
        return returntxt
    }

    return (
        <div className='container-fluid bg-light p-0'>
            {
                getContent()

            }
        </div>
    )
}

export default Employee