import React from 'react'
import { useNavigate } from "react-router-dom";

// Components
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function AdminPanel() {
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <div className="admin-panel-top-section">
                <p>Admin Panel</p>
            </div>
            <div className="body-container">
                <div className="panel-box" onClick={() => navigate('/inventoryPanel')}>
                    <div className="inner-box">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/inspiretech2024.appspot.com/o/assets%2Fhome-inventory-panel.png?alt=media&token=b2436f55-3ea4-42e6-a1ab-8d28104fa4a3"
                            alt="inventory-panel"
                            className='panel-box-img'
                        />
                        <p>Inventory Control Panel</p>
                    </div>
                </div>
                <div className="panel-box">
                    <div className="inner-box" onClick={() => navigate('/supplierPanel')}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/inspiretech2024.appspot.com/o/assets%2FScreenshot%202024-05-11%20110757.png?alt=media&token=38006506-68f4-4687-8c46-0d1ca5cbc0df"
                            alt="supplier-panel"
                            className='panel-box-img'
                        />
                        <p>Supplier Management Panel</p>
                    </div>
                </div>
                <div className="panel-box" onClick={() => navigate('/feedbackPanel')}>
                    <div className="inner-box">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/inspiretech2024.appspot.com/o/assets%2FScreenshot%202024-05-11%20075031.png?alt=media&token=3b1ad128-6672-4a03-a4b7-9dcc1ad6b8c8"
                            alt="customer-service-panel"
                            className='panel-box-img'
                        />
                        <p>Customer Service Management Panel</p>
                    </div>
                </div>
                <div className="panel-box" onClick={() => navigate('/marketingPanel')}>
                    <div className="inner-box">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/inspiretech2024.appspot.com/o/assets%2FScreenshot%202024-05-11%20080043.png?alt=media&token=beb6c4ce-5d21-41d1-a82d-179a821c8adf"
                            alt="marketing-panel"
                            className='panel-box-img'
                        />
                        <p>Marketing Management Panel</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AdminPanel