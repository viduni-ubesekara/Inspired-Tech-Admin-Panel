import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


function AddSupp() {
    const [name, setName] = useState(""); 
    const [nic, setNic] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [mobile, setMobile] = useState(""); 
    const [email, setEmail] = useState("");
    const [wname, setWname] = useState(""); 

    const [errors, setErrors] = useState({});

    function validateForm() {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!nic.trim()) {
            errors.nic = "NIC is required";
        }
        if (!address.trim()) {
            errors.address = "Address is required";
        }
        if (!mobile.trim()) {
            errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobile.trim())) {
            errors.mobile = "Mobile number must be 10 digits";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = "Invalid email address";
        }
    
        if (!wname.trim()) {
            errors.wname = "Warehouse name is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const navigate= useNavigate();

    function sendData(e) { 
        e.preventDefault();

        if (validateForm()) {
            const newSupplier = { name, nic, address, mobile,email, wname };

            axios.post('http://localhost:5000/supplier/add', newSupplier)
                .then(() => {
                    alert("Successfully added the supplier");
                    navigate('/');
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    return (
        <div style={{marginLeft:'100px' ,display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} className="container">
            <div style={{ width: '400px' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }}>
            <form onSubmit={sendData}>
                <h1 style={{fontSize:'28px',fontFamily:'Times New Roman',fontWeight:'bold'}}>Add New Supplier</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.name && 'is-invalid'}`} 
                        id="name"  
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                         
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">NIC</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.nic && 'is-invalid'}`} 
                        id="nic"  
                        placeholder="Enter NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        
                    />
                    {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Address</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.address && 'is-invalid'}`} 
                        id="address"  
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Mobile</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.mobile && 'is-invalid'}`} 
                        id="name"  
                        placeholder="Enter Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.email && 'is-invalid'}`} 
                        id="name"  
                        placeholder="Enter Mobile"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Warehouse</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.wname && 'is-invalid'}`} 
                        id="wname"  
                        placeholder="Enter Warehouse Name"
                        value={wname}
                        onChange={(e) => setWname(e.target.value)}
                    />
                    {errors.wname && <div className="invalid-feedback">{errors.wname}</div>}
                </div>
                <button style={{cursor:'pointer',width:'100%',marginTop:'20px',fontWeight:'bold'}} type="submit" className="btn-primary">Submit</button>
            </form>
            </div>
        </div>
        
    );
}

export default AddSupp;
