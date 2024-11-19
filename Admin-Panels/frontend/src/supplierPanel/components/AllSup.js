import React, {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
 export default  function AllSup(){

    const [suppliers,setSuppliers]=useState([]);

    useEffect(()=>{

        function getSuppliers(){

            axios.get('http://localhost:5000/supplier/').then((res)=>{

                setSuppliers(res.data)
            }).catch((err)=>{

                alert(err)
            })
        }
        getSuppliers();
    },[])

    const deleteSupplier = (nic) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this supplier?");
        if (isConfirmed) {
            axios.delete(`http://localhost:5000/supplier/delete/${nic}`)
                .then((res) => {
                    window.location.reload();
                    
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };
    

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults]=useState(false);

    const handleSearch = (e) => {
        const filteredSuppliers = suppliers.filter((supplier) =>
          Object.values(supplier).some((field) =>
            field.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setSuppliers(filteredSuppliers);
        setNoResults(filteredSuppliers.length === 0);
    };
    

    return(

        <div className="container"> 
            <h2 style={{fontSize:'28px',fontFamily:'Times New Roman',fontWeight:'bold'}}>All Suppliers</h2>
            <button  style={{float:"right",fontWeight:"bold",color:"blue",cursor:"pointer",borderRadius:"5px",padding:"5px"}}><Link to={'/supplierPanel/add'}>Add Supplier</Link></button>
            <div style={{alignItems:'center',marginBottom:'20px'}}>
            <input style={{border:'1px solid #ccc',outline:'none',flex:'1',padding:'0px 8px',fontSize:'16px',borderRadius:'5px',marginRight:'5px'}} onChange={(e)=>setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Supplier"></input>

            <button style={{backgroundColor:'blue',border:'none',cursor:'pointer',color:'white',borderRadius:'8px',padding:'3px',fontSize:'15px',fontWeight:'bold'}} onClick={handleSearch}>Search</button>
            </div >
            <div style={{ width: '1300px' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }}>
            {noResults ? (

                <div>
                    <p>No user</p>
                </div>
            ):( 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>NIC</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Warehouse Name</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.name}</td>
                            <td>{supplier.nic}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.mobile}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.wname}</td>
                            <td>
                                <Link className="action-button1"  to={`/supplierPanel/update/${supplier.nic}`}>Edit</Link>
                                <button className="action-button2" onClick={() => deleteSupplier(supplier.nic)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            </div>
        </div>
    )

 } 