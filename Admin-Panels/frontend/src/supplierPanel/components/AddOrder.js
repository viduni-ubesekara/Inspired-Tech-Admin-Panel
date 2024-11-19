import React, { useState, useRef } from "react";
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddOrder() {
    // State variables
    const [oid, setOid] = useState(""); 
    const [supplier, setSupplier] = useState(""); 
    const [bname, setBname] = useState(""); 
    const [quantity, setQuantity] = useState(""); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const form = useRef();

    // Function to send data to the server

    const navigate= useNavigate(); 
    
    const sendData = (e) => {
        e.preventDefault();
        const newOrder = {
            oid,
            supplier,
            date: selectedDate, 
            bname,
            quantity
        };

        axios.post('http://localhost:5000/order/add', newOrder)
            .then(() => {
                alert("Successfully added the order");
                navigate('/supplierPanel/allOrders');
            })
            .catch((err) => {
                alert(err);
            });
    };

    // Function to send email
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_emxur9p', 'template_7o4wl1g', form.current, {
            publicKey: 'LTu5eL1Qw36dHobjH',
        }).then(
            () => {
                console.log('SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error.text);
            },
        );
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            sendData(e);
            sendEmail(e);
        } else {
            setErrors(errors);
        }
    };

    // Function to validate form fields
    const validateForm = () => {
        const errors = {};
        if (!oid.trim()) {
            errors.oid = "Order ID is required";
        }
        if (!supplier.trim()) {
            errors.supplier = "Supplier name is required";
        }
        if (!bname.trim()) {
            errors.bname = "Brand name is required";
        }
        if (!quantity.trim()) {
            errors.quantity = "Quantity is required";
        }
        return errors;
    };

    return (
        <div style={{ marginLeft: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className="container">
            <div style={{ width: '400px', border: '2px solid rgba(0, 0, 0, 0.2)', padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                <form ref={form} onSubmit={handleSubmit}>
                    <h1 style={{ fontSize: '28px', fontFamily: 'Times New Roman', fontWeight: 'bold' }}>Add New Order</h1>
                    <div className="form-group">
                        <label htmlFor="name">Order ID</label>
                        <input
                            type="text"
                            className={`form-control ${errors.oid && 'is-invalid'}`}
                            id="oid"
                            placeholder="Enter Order ID"
                            value={oid}
                            onChange={(e) => setOid(e.target.value)}
                        />
                        {errors.oid && <div className="invalid-feedback">{errors.oid}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sup">Supplier</label>
                        <input
                            type="text"
                            className={`form-control ${errors.supplier && 'is-invalid'}`}
                            id="supplier"
                            placeholder="Enter Supplier name"
                            value={supplier}
                            name="supplier"
                            onChange={(e) => setSupplier(e.target.value)}
                        />
                        {errors.supplier && <div className="invalid-feedback">{errors.supplier}</div>}
                    </div>
                    <div className="form-group">
                        <label style={{width:'100%'}} htmlFor="date">Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Brand Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.bname && 'is-invalid'}`}
                            id="bname"
                            placeholder="Enter Brand Name"
                            value={bname}
                            name="bname"
                            onChange={(e) => setBname(e.target.value)}
                        />
                        {errors.bname && <div className="invalid-feedback">{errors.bname}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="wname">Quantity</label>
                        <input
                            type="text"
                            className={`form-control ${errors.quantity && 'is-invalid'}`}
                            id="quantity"
                            placeholder="Enter Quantity"
                            value={quantity}
                            name="quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                    </div>
                    <button style={{ cursor: 'pointer', width: '100%', marginTop: '20px' }} type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddOrder;
