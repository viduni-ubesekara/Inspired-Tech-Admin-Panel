import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSupplier() {
    const { nic } = useParams(); 
    const [values, setValues] = useState({
        name: "",
        nic: nic || "",
        address: "",
        mobile: "",
        email:"",
        wname: ""
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    useEffect(() => {
        axios.get(`http://localhost:5000/supplier/get/${nic}`)
            .then((res) => {
                console.log("Response data:", res.data);

                setValues({
                    ...values,
                    name: res.data.order.name,
                    address: res.data.order.address,
                    mobile: res.data.order.mobile,
                    email: res.data.order.email,
                    wname: res.data.order.wname  
                });
                console.log("Updated values:", values);
            })
            .catch((err) => {
                console.error("Error fetching supplier:", err);
                setValues({ ...values, nic: "Error fetching NIC" });
            });
    },[nic]);

    const navigate= useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
         
        // Validate form fields
        const validationErrors = {};
        const nicRegex = /^\d{12}$/;
        const mobileRegex = /^\d{10}$/;

        if (!values.name.trim()) {
            validationErrors.name = "Name is required";
        }
        if (!nicRegex.test(values.nic.trim())) {
            validationErrors.nic = "NIC should be 12 digits";
        }
        if (!values.address.trim()) {
            validationErrors.address = "Address is required";
        }
        if (!mobileRegex.test(values.mobile.toString().trim())) {
            validationErrors.mobile = "Mobile number should be 10 digits";
        }
        if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
            validationErrors.email = "Invalid email address";
        }

        if (Object.keys(validationErrors).length === 0) {
            // If no errors, submit the form
            axios.put(`http://localhost:5000/supplier/update/${nic}`, values)
                .then((res) => {
                    console.log("Supplier updated successfully:", res.data);
                    navigate('/supplierPanel');
                })
                .catch((err) => {
                    console.error("Error updating supplier:", err);
                });
        } else {
            // If there are errors, set the errors state
            setErrors(validationErrors);
        }
    }

    return (
        <div style={{marginLeft:'100px' ,display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} className="container">
            <div style={{ backgroundColor:'#ededed',width: '400px' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }}>
            <h1 style={{fontFamily:'serif',fontWeight:'bold',textAlign:'center'}}>Update Supplier Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="nic">NIC</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nic"
                        value={values.nic}
                        readOnly
                    />
                    {errors.nic && <div className="text-danger">{errors.nic}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={values.address}
                        onChange={(e) => setValues({ ...values, address: e.target.value })}
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        value={values.mobile}
                        onChange={(e) => setValues({ ...values, mobile: e.target.value })}
                    />
                    {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="wname">Warehouse Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="wname"
                        value={values.wname}
                        onChange={(e) => setValues({ ...values, wname: e.target.value })}
                    />
                </div>
                <button style={{backgroundColor:'green',width:'100%'}} type="submit" className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
    );
}

export default UpdateSupplier;
