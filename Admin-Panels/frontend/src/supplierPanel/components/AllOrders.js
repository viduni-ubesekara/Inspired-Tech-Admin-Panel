import React, {useState,useEffect, useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useReactToPrint} from "react-to-print";

 export default  function AllOrders(){

    const [orders,setOrders]=useState([]);

    useEffect(()=>{

        function getOrders(){

            axios.get('http://localhost:5000/order/').then((res)=>{

            setOrders(res.data)
            }).catch((err)=>{

                alert(err)
            })
        }
        getOrders();
    },[])


    const deleteOrder = (oid) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Order?");
        if (isConfirmed) {
        axios.delete(`http://localhost:5000/order/delete/${oid}`)
            .then((res) => {
                window.location.reload();
                
                
            })
            .catch((err) => {
                alert(err);
            });
        }
    };
    const clearAll = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete all orders?");
        if (isConfirmed) {
            axios.delete(`http://localhost:5000/order/delete`)
                .then((res) => {
                    window.location.reload();
                    alert("All orders deleted");
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };
    

    const ComponentsRef = useRef();

    const handlePrint = useReactToPrint({
        content:()=> ComponentsRef.current,
        DocumentTitle:"Order Report",
        onafterprint:(e)=>alert("Printed")

    })
 
    return(

        <div  className="container"> 
        <div>
        <h2 style={{fontSize:'28px',fontFamily:'Times New Roman',fontWeight:'bold'}}>All Orders</h2>
        <button  style={{float:"right",fontWeight:"bold",color:"blue",cursor:"pointer",borderRadius:"5px",padding:"5px"}}><Link to={'/supplierPanel/addOrder'}>Add Order</Link></button>
        <button style={{backgroundColor:'blue',border:'none',color:'white',padding:'8px 20px',fontSize:'16px',fontWeight:'bold',borderRadius:'10px',margin:'20px',cursor:'pointer'}} className="generate-report-button" onClick={handlePrint}>Generate Report</button>
        <button style={{backgroundColor:'red',border:'none',color:'white',padding:'8px 20px',fontSize:'16px',fontWeight:'bold',borderRadius:'10px',margin:'20px',cursor:'pointer'}} className="Clear-All-button" onClick={clearAll}>Clear All</button>

        </div>
            
        <div  style={{ width: '100%' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }} ref={ComponentsRef}>   
            <table>
                <thead>
                    <tr>
                    
                        <th>Order ID</th>
                        <th>supllier</th>
                        <th>Date</th>
                        <th>Brand Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr  key={index}>
                            <td>{order.oid}</td>
                            <td>{order.supplier}</td>
                            <td>{order.date}</td>
                            <td>{order.bname}</td>
                            <td>{order.quantity}</td>
                            
                           
                                             
                                <Link className="action-button1"  to={`/supplierPanel/updat/${order.oid}`}>Edit</Link>
                                <button className="action-button2" onClick={() => deleteOrder(order.oid)}>Delete</button>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
       
    )

 } 